/* AVOCATO Cabinet Features - A1/A2/A3/A4/C1/C2/C3/D4/F1/F2/F3
   Offline, localStorage - extends window.Cabinet after cabinet.js loads
   Features: Frais, Abonnements, Tresorerie, Objectif, Delais, Conflits, Veille, ICS, Funnel, Bottleneck
*/
(function(){
  "use strict";
  var LS = window.AvocatoStore.LS;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.from((r||document).querySelectorAll(s)); };
  var { esc, uid, fmtMoney, fmtDate, toISODate, todayISO, calcTTC, addDaysISO } = window.AvocatoCore;
  /* Liens veille : http(s) uniquement (pas de javascript:, data:, file:). */
  function safeUrl(u){
    var s=String(u||"").trim();
    return /^https?:\/\//i.test(s) ? s : "";
  }
  function addMonthsISO(iso,n){
    var d=new Date(iso+"T12:00:00");
    var day=d.getDate();
    d.setMonth(d.getMonth()+n);
    // handle month overflow (e.g., Jan 31 + 1 month = Feb 28)
    if(d.getDate()!==day){ d.setDate(0); }
    return toISODate(d);
  }
  function isAbonnement(d){
    if(!d) return false;
    if(d.abonnementActif) return true;
    var m=(d.mission||"").toLowerCase();
    return m.indexOf("abonnement")!==-1;
  }
  function getNextBilling(d){
    if(!isAbonnement(d)) return null;
    if(d.abonnementNext) return d.abonnementNext;
    if(d.abonnementDebut) return d.abonnementDebut;
    return todayISO();
  }
  // ---- Treasury helpers (A2) ----
  function computeTreasury(){
    var dossiers=LS.get("dossiers",[]);
    var factures=LS.get("factures",[]);
    var frais=LS.get("frais",[]);
    var encaisseTTC=0, encaisseHT=0, encaisseTVA=0;
    var aEncaisserTTC=0, aEncaisserHT=0, aEncaisserTVA=0;
    var fraisHT=0, fraisTTC=0, fraisARembourser=0, fraisRefactures=0;
    factures.forEach(function(f){
      if(f.statut==="Encaissée"){
        encaisseTTC+=Number(f.ttc)||0;
        encaisseHT+=Number(f.ht)||0;
        encaisseTVA+=Number(f.tva)||0;
      } else if(f.statut==="Émise"){
        aEncaisserTTC+=Number(f.ttc)||0;
        aEncaisserHT+=Number(f.ht)||0;
        aEncaisserTVA+=Number(f.tva)||0;
      }
    });
    frais.forEach(function(fr){
      var ht=Number(fr.montantHT)||0;
      var tva=Number(fr.tva)||0;
      var ttc=ht+tva;
      if(fr.statut==="Facturé"){ fraisRefactures+=ttc; } else { fraisHT+=ht; fraisTTC+=ttc; }
      if(fr.remboursable && fr.statut==="À facturer") fraisARembourser+=ttc;
    });
    // previsionnel 90j
    var previsionnelTTC=0, previsionnelHT=0;
    var today=todayISO();
    var in90=addDaysISO(today,90);
    dossiers.forEach(function(d){
      if(["Abandonné","Clôturé"].indexOf(d.statut)!==-1) return;
      var c=calcTTC(d.honoraires, d.tva);
      var factForD=factures.filter(function(f){ return f.dossierId===d.id; });
      var hasProv=factForD.some(function(f){ return f.type==="Reçu provision"; });
      var hasSolde=factForD.some(function(f){ return f.type==="Facture solde"; });
      if(!hasProv && c.ttc){
        // provision not yet billed is part of previsionnel (if prospect)
        // we count full TTC as previsionnel if not yet invoiced
        // But if provision exists as Émise, already in aEncaisser, don't double count
      }
      if(!hasSolde && c.ttc){
        var provPct=Number(d.provisionPct)||50;
        var solde=Math.round(c.ttc*(100-provPct)/100);
        // only count if dossier is at least Convention signée or En cours
        if(["Convention signée","En cours","Livré - solde dû"].indexOf(d.statut)!==-1){
          previsionnelTTC+=solde;
          previsionnelHT+=Math.round(solde/(1+(Number(d.tva)||0)/100));
        } else if(d.statut==="Prospect"||d.statut==="Convention envoyée"){
          // 30% probability weight for prospect? keep full for now
          previsionnelTTC+=c.ttc;
          previsionnelHT+=c.ht;
        }
      }
      // abonnement next 3 months
      if(isAbonnement(d) && d.abonnementActif!==false){
        var montant=Number(d.abonnementMontant)||Number(d.honoraires)||0;
        if(montant){
          // count 3 months if next billing within 90j
          var next=getNextBilling(d);
          for(var i=0;i<3;i++){
            var billingDate=addMonthsISO(next,i);
            if(billingDate>=today && billingDate<=in90){
              var ab=calcTTC(montant, d.tva);
              previsionnelTTC+=ab.ttc;
              previsionnelHT+=ab.ht;
            }
          }
        }
      }
    });
    return {
      encaisse:{ttc:encaisseTTC, ht:encaisseHT, tva:encaisseTVA},
      aEncaisser:{ttc:aEncaisserTTC, ht:aEncaisserHT, tva:aEncaisserTVA},
      frais:{ht:fraisHT, ttc:fraisTTC, aRembourser:fraisARembourser, refactures:fraisRefactures},
      previsionnel:{ttc:previsionnelTTC, ht:previsionnelHT, in90:in90},
      netEncaisse: encaisseTTC - fraisTTC
    };
  }
  function getObjectif(){
    return LS.get("objectifCA", null);
  }
  function setObjectif(obj){
    LS.set("objectifCA", obj);
  }
  function computeObjectifProgress(){
    var obj=getObjectif();
    if(!obj || !obj.targetHT) return null;
    var dossiers=LS.get("dossiers",[]);
    var factures=LS.get("factures",[]);
    var now=new Date();
    var period=obj.period||"mensuel";
    var target=Number(obj.targetHT)||0;
    var currentHT=0;
    if(period==="mensuel"){
      var ym=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0");
      factures.forEach(function(f){
        if(f.statut==="Encaissée" && f.date && f.date.indexOf(ym)===0) currentHT+=Number(f.ht)||0;
      });
      dossiers.forEach(function(d){
        // also count dossiers created this month as pipeline contribution? no, only encaisse is real
      });
    } else {
      var y=String(now.getFullYear());
      factures.forEach(function(f){
        if(f.statut==="Encaissée" && f.date && f.date.indexOf(y)===0) currentHT+=Number(f.ht)||0;
      });
    }
    var pct=target?Math.min(100, Math.round(100*currentHT/target)):0;
    return {target:target, current:currentHT, pct:pct, period:period, remaining:Math.max(0,target-currentHT)};
  }
  // ---- Frais (A3) ----
  var FRAIS_CATS=["Timbre / Droit","OMPIC / Dépôt","CNDP","Greffe / Tribunal","Déplacement","Traduction","Autre"];
  function addFrais(obj){
    var arr=LS.get("frais",[]);
    var fr={ id:uid(), dossierId:obj.dossierId||"", date:obj.date||todayISO(), label:obj.label||"", montantHT:Number(obj.montantHT)||0, tva:Number(obj.tva)||0, categorie:obj.categorie||"Autre", remboursable: !!obj.remboursable, statut:obj.statut||"À facturer", createdAt:new Date().toISOString() };
    arr.push(fr);
    LS.set("frais", arr);
    return fr;
  }
  function delFrais(id){
    var arr=LS.get("frais",[]);
    var removed=arr.find(function(x){ return x.id===id; });
    LS.set("frais", arr.filter(function(x){ return x.id!==id; }));
    return removed;
  }
  function getFraisForDossier(dossierId){
    return LS.get("frais",[]).filter(function(f){ return f.dossierId===dossierId; });
  }
  function calcFraisTotal(dossierId){
    var list=getFraisForDossier(dossierId);
    var ht=0,ttc=0;
    list.forEach(function(fr){ var tva=Number(fr.tva)||0; var h=Number(fr.montantHT)||0; ht+=h; ttc+=h+tva; });
    return {ht:ht, ttc:ttc, count:list.length};
  }
  // ---- Abonnement (A1) ----
  function ensureAbonnementFields(d){
    if(!d) return d;
    if(d.abonnementMontant==null) d.abonnementMontant="";
    if(d.abonnementDebut==null) d.abonnementDebut="";
    if(d.abonnementJour==null) d.abonnementJour="1";
    if(d.abonnementNext==null) d.abonnementNext=d.abonnementDebut||"";
    if(d.abonnementActif==null) d.abonnementActif=isAbonnement(d)?true:false;
    return d;
  }
  function processAbonnements(silent){
    var dossiers=LS.get("dossiers",[]);
    var echeances=LS.get("echeances",[]);
    var factures=LS.get("factures",[]);
    var today=todayISO();
    var changed=false;
    var created=[];
    dossiers.forEach(function(d){
      if(!isAbonnement(d)) return;
      if(["Abandonné","Clôturé"].indexOf(d.statut)!==-1) return;
      if(d.abonnementActif===false) return;
      var montant=Number(d.abonnementMontant)||Number(d.honoraires)||0;
      if(!montant) return;
      var next=d.abonnementNext || d.abonnementDebut || today;
      // if next is empty, set to next month
      if(!next){ next=addMonthsISO(today,1); d.abonnementNext=next; changed=true; }
      // loop while next <= today (catch up)
      while(next && next<=today){
        // check if facture already exists for this month
        var ym=next.slice(0,7);
        var already=factures.some(function(f){ return f.dossierId===d.id && f.date && f.date.slice(0,7)===ym && f.type==="Facture solde"; });
        var c=calcTTC(montant, d.tva);
        // determine HT/TVA breakdown
        if(!already){
          var num=nextNumCached("FH", factures);
          var f={ id:uid(), dossierId:d.id, num:num, date:next, type:"Facture solde", ht:c.ht, tva:c.tva, ttc:c.ttc, statut:"Émise", abonnement:true, periode:ym };
          factures.push(f);
          LS.set("numSeq:FH:"+new Date().getFullYear(), parseInt(num.split("-")[2],10));
          created.push({dossier:d, facture:f});
          // echeance for paiement
          echeances.push({ id:uid(), dossierId:d.id, date:next, type:"Renouvellement abonnement", intitule:"Abonnement "+d.client+" - "+ym, done:false, auto:"ABO" });
        }
        // advance next
        next=addMonthsISO(next,1);
        d.abonnementNext=next;
        changed=true;
      }
    });
    if(changed){
      LS.set("dossiers", dossiers);
      LS.set("echeances", echeances);
      LS.set("factures", factures);
      if(!silent && created.length){
        var tot=created.reduce(function(s,x){ return s+Number(x.facture.ttc); },0);
        if(window.Cabinet && window.Cabinet.toast) window.Cabinet.toast(created.length+" facture(s) abonnement générée(s) ("+fmtMoney(tot)+" TTC)");
      }
    }
    return created.length;
  }
  function nextNumCached(prefix, list){
    // replicate cabinet.js nextNum but using LS
    var year=new Date().getFullYear();
    var re=new RegExp("^"+prefix+"-"+year+"-(\\d+)$");
    var seqKey="numSeq:"+prefix+":"+year;
    var max=Number(LS.get(seqKey,0))||0;
    (list||[]).forEach(function(it){ var m=re.exec(it.num||""); if(m) max=Math.max(max, parseInt(m[1],10)); });
    var n=max+1;
    LS.set(seqKey, n);
    return prefix+"-"+year+"-"+String(n).padStart(3,"0");
  }
  // ---- Conflits (C2) ----
  var { normalize, jaccard, isSimilar } = window.AvocatoCore;
  function tokens(s){ return normalize(s).split(/\s+/).filter(Boolean); }
  function checkConflitsFor(client, ice, adverse, excludeId){
    var dossiers=LS.arr("dossiers");
    var list=LS.arr("conflictList");
    var hits=[];
    dossiers.forEach(function(d){
      if(excludeId && d.id===excludeId) return;
      if(client && d.client && isSimilar(client, d.client)) hits.push({type:"dossier", dossier:d, reason:"Client similaire: "+d.client});
      if(ice && d.ice && String(ice).replace(/\D/g,"")===String(d.ice).replace(/\D/g,"") && ice.length>=5) hits.push({type:"dossier", dossier:d, reason:"ICE identique: "+d.ice});
      if(adverse && d.client && isSimilar(adverse, d.client)) hits.push({type:"dossier", dossier:d, reason:"Adverse déjà client: "+d.client});
      if(adverse && d.adverse && isSimilar(adverse, d.adverse)) hits.push({type:"dossier", dossier:d, reason:"Même adverse: "+d.adverse});
      if(client && d.adverse && isSimilar(client, d.adverse)) hits.push({type:"dossier", dossier:d, reason:"Client est adverse dans "+d.client});
    });
    list.forEach(function(entry){
      if(client && isSimilar(client, entry)) hits.push({type:"blacklist", entry:entry, reason:"Liste noire: "+entry});
      if(adverse && isSimilar(adverse, entry)) hits.push({type:"blacklist", entry:entry, reason:"Adverse en liste noire: "+entry});
      if(ice && String(ice).replace(/\D/g,"").length>5 && normalize(entry).indexOf(normalize(String(ice).replace(/\D/g,"")).slice(0,6))!==-1) hits.push({type:"blacklist", entry:entry, reason:"ICE proche liste noire"});
    });
    return hits;
  }
  // ---- Veille (C3) ----
  var VEILLE_SOURCES=["BO","sgg.gov.ma","CNDP","OMPIC","DGI / tax.gov.ma","Office des Changes","Autre"];
  var VEILLE_STATUTS=["À lire","Lu","Action requise","Archivé"];
  function addVeille(obj){
    var arr=LS.get("veille",[]);
    var v={ id:uid(), date:obj.date||todayISO(), source:obj.source||"Autre", title:obj.title||"", url:obj.url||"", tags:obj.tags||"", dossierId:obj.dossierId||"", statut:obj.statut||"À lire", notes:obj.notes||"", createdAt:new Date().toISOString() };
    arr.push(v); LS.set("veille",arr); return v;
  }
  function delVeille(id){
    var arr=LS.get("veille",[]);
    var r=arr.find(function(x){ return x.id===id; });
    LS.set("veille", arr.filter(function(x){ return x.id!==id; }));
    return r;
  }
  function updateVeille(id,patch){
    var arr=LS.get("veille",[]);
    var i=arr.findIndex(function(x){ return x.id===id; });
    if(i<0) return;
    arr[i]=Object.assign({},arr[i],patch);
    LS.set("veille",arr);
  }
  // ---- ICS (D4) ----
  var escapeICS = window.AvocatoCore.escapeICS;
  function formatDateICS(iso){
    // DTSTART as floating date YYYYMMDD (all day) or UTC 12:00
    return iso.replace(/-/g,"");
  }
  function generateICS(echeance, dossier){
    var dt=formatDateICS(echeance.date);
    var uidStr=echeance.id+"@avocato.local";
    var now=new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
    var summary=escapeICS(echeance.intitule||echeance.type||"Echeance");
    if(dossier) summary+=" - "+escapeICS(dossier.client);
    var desc=escapeICS("Dossier: "+(dossier?dossier.client:"")+(dossier&&dossier.mission?" - "+dossier.mission:"")+"\\nType: "+(echeance.type||"")+"\\nIntitulé: "+(echeance.intitule||""));
    var ics=[
      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//AVOCATO//Cabinet//FR","CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:"+uidStr,
      "DTSTAMP:"+now,
      "DTSTART;VALUE=DATE:"+dt,
      "DTEND;VALUE=DATE:"+formatDateICS(addDaysISO(echeance.date,1)),
      "SUMMARY:"+summary,
      "DESCRIPTION:"+desc,
      "END:VEVENT","END:VCALENDAR"
    ].join("\r\n");
    return ics;
  }
  function downloadICS(echeance, dossier){
    var ics=generateICS(echeance, dossier);
    var blob=new Blob([ics],{type:"text/calendar;charset=utf-8"});
    var a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    var safe=(dossier?dossier.client+"-":"")+ (echeance.intitule||echeance.type||"echeance");
    safe=safe.replace(/[^a-z0-9]+/gi,"_").slice(0,40);
    a.download=safe+"-"+echeance.date+".ics";
    a.click();
    URL.revokeObjectURL(a.href);
    if(window.Cabinet && window.Cabinet.toast) window.Cabinet.toast("Fichier .ics téléchargé pour "+(dossier?dossier.client:"")+" - "+echeance.date);
  }
  // ---- Delais (C1) ----
  // Fetés MA 2026-2027 (fixes + estimés lunaire - à confirmer)
  var FERIES_FIXES=[
    "2026-01-01","2026-01-11","2026-05-01","2026-07-30","2026-08-14","2026-08-20","2026-08-21","2026-11-06","2026-11-18",
    "2027-01-01","2027-01-11","2027-05-01","2027-07-30","2027-08-14","2027-08-20","2027-08-21","2027-11-06","2027-11-18"
  ];
  // Estimés lunaire 2026: Aid al-Fitr ~20 mars, Aid al-Adha ~27 mai, 1er Moharram ~16 juin, Mouloud ~25 aout (varie 1-2j - flag estimatif)
  var FERIES_LUNAIRE_ESTIM=["2026-03-20","2026-03-21","2026-05-27","2026-05-28","2026-06-16","2026-08-25","2026-09-03","2027-03-10","2027-05-16","2027-06-06"];
  function isWeekend(iso){
    var d=new Date(iso+"T12:00:00");
    var w=d.getDay();
    return w===0 || w===6; // Dimanche/Samedi (Maroc: samedi/dimanche depuis  à vérifier - si vendredi/samedi, adapter)
  }
  function isFerie(iso){
    if(FERIES_FIXES.indexOf(iso)!==-1) return true;
    if(FERIES_LUNAIRE_ESTIM.indexOf(iso)!==-1) return true;
    if(isWeekend(iso)) return true;
    return false;
  }
  function nextOuvrable(iso){
    var cur=iso;
    var guard=0;
    while(isFerie(cur) && guard<30){ cur=addDaysISO(cur,1); guard++; }
    return cur;
  }
  // CPC presets
  var DELAIS_PRESETS=[
    {label:"Opposition (15j - CPC art.130)", jours:15, type:"calendaire"},
    {label:"Appel civil (30j - CPC art.134)", jours:30, type:"calendaire"},
    {label:"Appel commerce (15j)", jours:15, type:"calendaire"},
    {label:"Pourvoi cassation (30j)", jours:30, type:"calendaire"},
    {label:"Injonction de payer - opposition (15j)", jours:15, type:"calendaire"},
    {label:"Contredit (15j)", jours:15, type:"calendaire"},
    {label:"Réponse 09-08 CNDP (60j)", jours:60, type:"calendaire"},
    {label:"Personnalisé", jours:"", type:"calendaire"}
  ];
  function computeDelai(startISO, delaiJours, mode){
    if(!startISO || delaiJours==="" || delaiJours==null) return null;
    var n=Number(delaiJours);
    if(!(n>=0)) return null;
    var brut=addDaysISO(startISO, n);
    // Si échéance tombe un férié/weekend, report next ouvrable (CPC art.512 - si dernier jour férié, prorogé)
    var ajour=brut;
    var reporte=nextOuvrable(brut);
    var isReporte=reporte!==brut;
    if(isReporte) ajour=reporte;
    // Mode ouvrables: compter seulement jours ouvrables
    if(mode==="ouvrable"){
      var cur=startISO;
      var count=0;
      while(count<n){
        cur=addDaysISO(cur,1);
        if(!isFerie(cur)) count++;
      }
      brut=cur;
      ajour=brut; // déjà ouvrable
      isReporte=false;
    }
    return {brut:brut, ajustee:ajour, reporte:isReporte, mode:mode, ferie:isFerie(brut)};
  }
  // ---- Funnel (F1) & Bottleneck (F2) ----
  var PIPES=["Prospect","Convention envoyée","Convention signée","En cours","Livré - solde dû","Clôturé"];
  function computeFunnel(){
    var dossiers=LS.get("dossiers",[]);
    var counts={};
    PIPES.forEach(function(p){ counts[p]=0; });
    var abandoned=0;
    dossiers.forEach(function(d){
      var s=d.statut||"Prospect";
      if(s==="Abandonné") abandoned++;
      else if(counts.hasOwnProperty(s)) counts[s]++;
      else counts["Prospect"]++;
    });
    var total=dossiers.length-abandoned;
    var ordered=PIPES.map(function(p){ return {statut:p, count:counts[p]}; });
    // conversion Prospect -> Signee
    var prospect=counts["Prospect"];
    var envoyee=counts["Convention envoyée"];
    var signee=counts["Convention signée"];
    var encours=counts["En cours"];
    var livre=counts["Livré - solde dû"];
    var cloture=counts["Clôturé"];
    var conv1= prospect? Math.round(100*signee/(prospect+envoyee+signee)):0;
    var conv2= signee? Math.round(100*(encours+livre+cloture)/signee):0;
    return {ordered:ordered, total:total, abandoned:abandoned, convProspectSignee:conv1, convSigneeCloture:conv2, counts:counts};
  }
  function computeBottlenecks(){
    var dossiers=LS.get("dossiers",[]);
    var echeances=LS.get("echeances",[]);
    var today=todayISO();
    var list=[];
    dossiers.forEach(function(d){
      if(["Clôturé","Abandonné"].indexOf(d.statut)!==-1) return;
      var upd=d.updatedAt||d.createdAt||today;
      var days=Math.floor((new Date(today+"T12:00:00")-new Date(upd+"T12:00:00"))/86400000);
      var overdueEch=echeances.some(function(e){ return e.dossierId===d.id && !e.done && e.date && e.date<today; });
      var threshold=14;
      if(d.statut==="Prospect") threshold=7;
      else if(d.statut==="Convention envoyée") threshold=10;
      else if(d.statut==="En cours") threshold=14;
      else if(d.statut==="Livré - solde dû") threshold=7;
      if(days>threshold || overdueEch){
        list.push({dossier:d, days:days, overdue:overdueEch, threshold:threshold});
      }
    });
    list.sort(function(a,b){ return b.days-a.days; });
    return list.slice(0,8);
  }
  // ---- Render Frais (A3) ----
  function renderFrais(){
    var frais=LS.get("frais",[]);
    var dossiers=LS.get("dossiers",[]);
    var map={}; dossiers.forEach(function(d){ map[d.id]=d; });
    frais=frais.slice().sort(function(a,b){ return (b.date||"").localeCompare(a.date||""); });
    var totalHT=frais.reduce(function(s,f){ return s+(Number(f.montantHT)||0); },0);
    var totalTTC=frais.reduce(function(s,f){ return s+(Number(f.montantHT)||0)+(Number(f.tva)||0); },0);
    var aRemb=frais.filter(function(f){ return f.remboursable && f.statut==="À facturer"; }).reduce(function(s,f){ return s+(Number(f.montantHT)||0)+(Number(f.tva)||0); },0);
    var content=document.getElementById("content");
    content.innerHTML=`
      <div class="cab">
        <div class="kicker">Débours — HT + TVA</div>
        <h2>Frais &amp; Débours</h2>
        <p class="sub">${frais.length} ligne(s) \u2014 HT ${fmtMoney(totalHT)} \u2014 TTC ${fmtMoney(totalTTC)} \u2014 à refacturer ${fmtMoney(aRemb)}</p>
        <div class="dash-cards">
          <div class="dash-card"><div class="num">${fmtMoney(totalHT)}</div><div class="lbl">Total HT</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(totalTTC)}</div><div class="lbl">Total TTC</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(aRemb)}</div><div class="lbl">À refacturer</div></div>
          <div class="dash-card"><div class="num">${frais.filter(function(f){ return f.statut!=="Facturé"; }).length}</div><div class="lbl">En attente</div></div>
        </div>
        <div class="cab-toolbar">
          <button class="btn btn-primary" id="btnNewFrais">+ Ajouter un frais</button>
          <select id="fraisFilterDossier" aria-label="Filtrer les frais par dossier"><option value="">Tous dossiers</option>${dossiers.map(function(d){ return `<option value="${esc(d.id)}">${esc(d.client)}</option>`; }).join("")}</select>
          <select id="fraisFilterStatut" aria-label="Filtrer les frais par statut"><option value="">Tous statuts</option><option>À facturer</option><option>Facturé</option><option>Non remboursable</option></select>
        </div>
        <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Dossier</th><th>Catégorie</th><th>Libellé</th><th>HT</th><th>TVA</th><th>TTC</th><th>Remb.</th><th>Statut</th><th></th></tr></thead><tbody id="fraisBody">
          ${frais.map(function(f){
            var d=map[f.dossierId];
            var ttc=(Number(f.montantHT)||0)+(Number(f.tva)||0);
            return `<tr data-fid="${esc(f.id)}" data-dossier="${esc(f.dossierId)}" data-statut="${esc(f.statut)}">
              <td class="mono" title="${esc(f.date||"")}">${esc(fmtDate(f.date))}</td><td>${esc(d?d.client:"\u2014")}</td><td><span class="badge">${esc(f.categorie)}</span></td><td style="max-width:200px;white-space:normal">${esc(f.label)}</td><td class="mono">${fmtMoney(f.montantHT)}</td><td class="mono">${fmtMoney(f.tva)}</td><td class="mono"><strong>${fmtMoney(ttc)}</strong></td><td>${f.remboursable?"Oui":"Non"}</td><td>${esc(f.statut)}</td><td><button class="btn btn-danger" data-del-frais="${esc(f.id)}" aria-label="Supprimer le frais ${esc(f.label || '')}">${window.ico?window.ico("trash"):"x"}</button></td></tr>`;
          }).join("")}
        </tbody></table>${frais.length===0?`<div class="empty-state" style="padding:20px">Aucun frais. Ajoutez les timbres, dépôts OMPIC/CNDP, déplacements.</div>`:""}</div>
        <div class="dash-panel" style="margin-top:16px"><h3>Aide</h3><p style="font-size:13px;color:var(--text-dim)">Frais = débours en sus des honoraires. Cochez \u201CRemboursable\u201D si à refacturer au client (ajouté au solde). Statut \u201CFacturé\u201D = déjà inclus dans une facture solde.</p></div>
      </div>`;
    document.getElementById("crumbs").innerHTML=`<span class="cur">Cabinet \u2014 Frais &amp; Débours</span>`;
    document.getElementById("btnNewFrais").addEventListener("click", openDlgFrais);
    var fd=document.getElementById("fraisFilterDossier");
    var fs=document.getElementById("fraisFilterStatut");
    function filter(){
      var dval=fd.value, sval=fs.value;
      $$("#fraisBody tr").forEach(function(tr){
        var okD=!dval||tr.dataset.dossier===dval;
        var okS=!sval||tr.dataset.statut===sval;
        tr.style.display=okD&&okS?"":"none";
      });
    }
    fd.addEventListener("change",filter);
    fs.addEventListener("change",filter);
    $$("[data-del-frais]").forEach(function(b){
      b.addEventListener("click", function(){
        var id=b.dataset.delFrais;
        var rem=delFrais(id);
        if(rem){
          // also free from backup undo
          renderFrais();
          if(window.Cabinet&&window.Cabinet.toast) window.Cabinet.toast("Frais supprimé.",{undo:function(){ var arr=LS.get("frais",[]); arr.push(rem); LS.set("frais",arr); renderFrais(); }});
        }
      });
    });
  }
  function openDlgFrais(prefillDossierId){
    var sel=document.getElementById("fraisDossierSel");
    if(sel){
      var dossiers=LS.get("dossiers",[]);
      sel.innerHTML=`<option value="">\u2014 Sans dossier \u2014</option>`+dossiers.map(function(d){ return `<option value="${esc(d.id)}" ${d.id===prefillDossierId?"selected":""}>${esc(d.client)}</option>`; }).join("");
      if(prefillDossierId) sel.value=prefillDossierId;
      document.querySelector(`#formFrais [name="date"]`).value=todayISO();
      document.getElementById("dlgFrais").showModal();
    }
  }
  function renderVeille(){
    var veille=LS.get("veille",[]).slice().sort(function(a,b){ return (b.date||"").localeCompare(a.date||""); });
    var dossiers=LS.get("dossiers",[]);
    var content=document.getElementById("content");
    content.innerHTML=`
      <div class="cab">
        <div class="kicker">BO · CNDP · OMPIC · DGI · Office des Changes</div>
        <h2>Veille juridique</h2>
        <p class="sub">${veille.length} entrée(s) \u2014 BO / sgg / CNDP / OMPIC / DGI / OC \u2014 filtrez par source ou statut.</p>
        <div class="cab-toolbar">
          <button class="btn btn-primary" id="btnNewVeille">+ Nouvelle veille</button>
          <select id="veilleFilterSource" aria-label="Filtrer la veille par source"><option value="">Toutes sources</option>${VEILLE_SOURCES.map(function(s){ return `<option>${esc(s)}</option>`; }).join("")}</select>
          <select id="veilleFilterStatut" aria-label="Filtrer la veille par statut"><option value="">Tous statuts</option>${VEILLE_STATUTS.map(function(s){ return `<option>${esc(s)}</option>`; }).join("")}</select>
          <input id="veilleSearch" placeholder="Rechercher titre, tag..." aria-label="Rechercher dans la veille" style="flex:1;min-width:180px">
        </div>
        <div class="cab-table-wrap"><table class="cab-table"><thead><tr><th>Date</th><th>Source</th><th>Titre</th><th>Dossier lié</th><th>Statut</th><th>Actions</th></tr></thead><tbody id="veilleBody">
          ${veille.map(function(v){
            var d=dossiers.find(function(x){ return x.id===v.dossierId; });
            return `<tr data-vid="${esc(v.id)}" data-source="${esc(v.source)}" data-statut="${esc(v.statut)}">
              <td class="mono" title="${esc(v.date||"")}">${esc(fmtDate(v.date))}</td><td><span class="badge">${esc(v.source)}</span></td><td style="max-width:320px;white-space:normal"><strong>${esc(v.title||"")}</strong><br><span style="font-size:11px;color:var(--text-dim)">${esc(v.tags||"")} ${safeUrl(v.url)?`<a href="${esc(safeUrl(v.url))}" target="_blank" rel="noopener">lien</a>`:""}</span><br><span style="font-size:12px;white-space:normal">${esc(v.notes||"")}</span></td><td>${esc(d?d.client:"\u2014")}</td><td>${esc(v.statut)}</td><td><button class="btn" data-edit-veille="${esc(v.id)}">Éditer</button> <button class="btn btn-danger" data-del-veille="${esc(v.id)}" aria-label="Supprimer la veille ${esc(v.title || '')}">${window.ico?window.ico("trash"):"x"}</button></td></tr>`;
          }).join("")}
        </tbody></table>${veille.length===0?`<div class="empty-state" style="padding:20px">Aucune veille. Ajoutez la prochaine BO, décision CNDP ou barème OMPIC.</div>`:""}</div>
        <div class="dash-panel" style="margin-top:16px"><h3>Sources à surveiller</h3><p style="font-size:13px;color:var(--text-dim)">sgg.gov.ma (BO) · cndp.ma (sanctions art.64/65) · ompic.ma (ROMARIN) · tax.gov.ma (CGI/DGI) · oc.gov.ma (IGOC) \u2014 notez au moins 1 entrée par semaine dans \u201CAction requise\u201D pour alimenter le pipeline.</p></div>
      </div>`;
    document.getElementById("crumbs").innerHTML=`<span class="cur">Cabinet \u2014 Veille juridique</span>`;
    document.getElementById("btnNewVeille").addEventListener("click", function(){ openDlgVeille(); });
    var fSrc=document.getElementById("veilleFilterSource"), fSta=document.getElementById("veilleFilterStatut"), q=document.getElementById("veilleSearch");
    function apply(){
      var sv=fSrc.value, st=fSta.value, qq=(q.value||"").toLowerCase();
      $$("#veilleBody tr").forEach(function(tr){
        var ok1=!sv||tr.dataset.source===sv;
        var ok2=!st||tr.dataset.statut===st;
        var txt=tr.textContent.toLowerCase();
        var ok3=!qq||txt.indexOf(qq)!==-1;
        tr.style.display=ok1&&ok2&&ok3?"":"none";
      });
    }
    fSrc.addEventListener("change",apply); fSta.addEventListener("change",apply);
    var debV=null; q.addEventListener("input",function(){ clearTimeout(debV); debV=setTimeout(apply,120); });
    $$("[data-del-veille]").forEach(function(b){
      b.addEventListener("click", function(){
        var id=b.dataset.delVeille;
        var r=delVeille(id);
        renderVeille();
        if(window.Cabinet&&window.Cabinet.toast) window.Cabinet.toast("Veille supprimée.",{undo:function(){ var arr=LS.get("veille",[]); arr.push(r); LS.set("veille",arr); renderVeille(); }});
      });
    });
    $$("[data-edit-veille]").forEach(function(b){
      b.addEventListener("click", function(){ openDlgVeille(b.dataset.editVeille); });
    });
  }
  function openDlgVeille(editId){
    var form=document.getElementById("formVeille");
    if(!form) return;
    form.reset();
    var v=editId?LS.get("veille",[]).find(function(x){ return x.id===editId; }):null;
    document.getElementById("dlgVeilleTitle").textContent=v?"Modifier veille":"Nouvelle veille";
    form.dataset.editId=v?v.id:"";
    if(v){
      form.date.value=v.date||todayISO();
      form.source.value=v.source||"Autre";
      form.title.value=v.title||"";
      form.url.value=v.url||"";
      form.tags.value=v.tags||"";
      form.dossierId.value=v.dossierId||"";
      form.statut.value=v.statut||"À lire";
      form.notes.value=v.notes||"";
    } else {
      form.date.value=todayISO();
      // populate dossier select
      var dossiers=LS.get("dossiers",[]);
      var sel=form.dossierId;
      sel.innerHTML=`<option value="">\u2014 Aucun \u2014</option>`+dossiers.map(function(d){ return `<option value="${esc(d.id)}">${esc(d.client)}</option>`; }).join("");
    }
    // ensure dossier select is populated even in edit
    if(v){
      var dossiers2=LS.get("dossiers",[]);
      var sel2=form.dossierId;
      sel2.innerHTML=`<option value="">\u2014 Aucun \u2014</option>`+dossiers2.map(function(d){ return `<option value="${esc(d.id)}" ${d.id===v.dossierId?"selected":""}>${esc(d.client)}</option>`; }).join("");
    }
    document.getElementById("dlgVeille").showModal();
  }
  function renderDelais(){
    var content=document.getElementById("content");
    content.innerHTML=`
      <div class="cab">
        <div class="kicker">Délais francs — art. 512 CPC</div>
        <h2>Calculateur de délais \u2014 CPC &amp; 09-08/CNDP</h2>
        <p class="sub">Calculez un délai franc : notification + N jours. Report automatique au prochain jour ouvrable si échéance fériée (art.512 CPC). Fériés MA 2026-27 inclus (fixes + lunaires estimés).</p>
        <div class="dash-grid">
          <div class="dash-panel">
            <h3>Paramètres</h3>
            <div class="form-grid" style="grid-template-columns:1fr">
              <label>Preset<select id="delaiPreset">${DELAIS_PRESETS.map(function(p){ return `<option value="${esc(p.label)}" data-jours="${esc(p.jours)}" data-type="${esc(p.type)}">${esc(p.label)}</option>`; }).join("")}</select></label>
              <label>Date de notification / départ<input type="date" id="delaiStart" value="${todayISO()}"></label>
              <label>Délai (jours) <input type="number" id="delaiJours" value="15" min="0"></label>
              <label>Mode<select id="delaiMode"><option value="calendaire">Jours calendaires (CPC)</option><option value="ouvrable">Jours ouvrables (hors fériés/weekend)</option></select></label>
              <label>Dossier lié (optionnel)<select id="delaiDossier"><option value="">\u2014 Aucun \u2014</option>${LS.get("dossiers",[]).map(function(d){ return `<option value="${esc(d.id)}">${esc(d.client)}</option>`; }).join("")}</select></label>
              <label>Type d&apos;échéance<select id="delaiType"><option>Remise livrables</option><option>Opposition</option><option>Appel</option><option>Pourvoi</option><option>Dépôt CNDP/OMPIC/CRI</option><option>Relance provision</option><option>Autre</option></select></label>
              <label>Intitulé<input id="delaiIntitule" placeholder="Ex: Opposition jugement - SARL Atlas"></label>
              <button class="btn btn-primary" id="btnDelaiCalc">Calculer</button>
            </div>
          </div>
          <div>
            <div class="dash-panel" id="delaiResult" style="min-height:200px"><h3>Résultat</h3><p style="color:var(--text-dim);font-size:13px">Renseignez la date et le délai puis \u201CCalculer\u201D.</p></div>
            <div class="dash-panel" style="margin-top:14px"><h3>Notes</h3><ul style="font-size:12.5px;color:var(--text-dim);margin:0;padding-left:18px"><li>Délai franc : on ne compte ni le jour de départ ni le jour d&apos;échéance si férié (report).</li><li>Weekend MA = samedi/dimanche (si vendredi/samedi chez vous, cochez ouvrable et ajustez).</li><li>Fêtes lunaires estimées (± 1j) \u2014 vérifiez BO.</li><li>Toujours épingler le texte CPC/BO consolidé (art.512).</li></ul></div>
          </div>
        </div>
      </div>`;
    document.getElementById("crumbs").innerHTML=`<span class="cur">Cabinet \u2014 Délais</span>`;
    var preset=document.getElementById("delaiPreset"), joursEl=document.getElementById("delaiJours"), modeEl=document.getElementById("delaiMode");
    preset.addEventListener("change", function(){
      var opt=preset.options[preset.selectedIndex];
      var j=opt.getAttribute("data-jours");
      var t=opt.getAttribute("data-type");
      if(j!=="") joursEl.value=j;
      if(t) modeEl.value=t;
    });
    document.getElementById("btnDelaiCalc").addEventListener("click", function(){
      var start=document.getElementById("delaiStart").value;
      var j=joursEl.value;
      var mode=modeEl.value;
      if(!start){ if(window.Cabinet) window.Cabinet.toast("Date de départ requise",{kind:"error"}); return; }
      var res=computeDelai(start,j,mode);
      if(!res){ if(window.Cabinet) window.Cabinet.toast("Délai invalide",{kind:"error"}); return; }
      var isFerieBrut=isFerie(res.brut);
      var fetesInfo=FERIES_FIXES.concat(FERIES_LUNAIRE_ESTIM).indexOf(res.brut)!==-1?" (férié)": isWeekend(res.brut)?" (weekend)":"";
      document.getElementById("delaiResult").innerHTML=`
        <h3>Résultat</h3>
        <div class="dash-cards" style="grid-template-columns:1fr 1fr">
          <div class="dash-card"><div class="num mono">${esc(res.brut)}${fetesInfo?"*":""}</div><div class="lbl">Échéance brute (+${esc(j)}j)</div></div>
          <div class="dash-card" style="${res.reporte?"border-color:var(--warn)":""}"><div class="num mono">${esc(res.ajustee)}</div><div class="lbl">Échéance retenue ${res.reporte?"(reportée)":""}</div></div>
        </div>
        ${res.reporte?`<p class="field-help" style="color:var(--warn)">Échéance brute tombe un férié/weekend \u2014 report au prochain jour ouvrable (CPC art.512).</p>`:`<p class="field-help">Échéance ouvrable \u2014 aucune prorogation.</p>`}
        <p style="font-size:12px;color:var(--text-dim)">Mode: ${esc(mode)} \u2014 Du ${esc(start)} + ${esc(j)} jours = <strong>${esc(res.ajustee)}</strong> ${res.reporte?`(brut ${esc(res.brut)} reporté)`:``}.</p>
        <div class="cab-toolbar"><button class="btn btn-primary" id="btnDelaiCreate">Créer l&apos;échéance</button> <button class="btn" id="btnDelaiICS">Télécharger .ics</button></div>`;
      document.getElementById("btnDelaiCreate").addEventListener("click", function(){
        var dossierId=document.getElementById("delaiDossier").value;
        var type=document.getElementById("delaiType").value;
        var intitule=document.getElementById("delaiIntitule").value|| (preset.options[preset.selectedIndex].textContent+" - échéance "+res.ajustee);
        var arr=LS.get("echeances",[]);
        var e={ id:uid(), dossierId:dossierId||"", date:res.ajustee, type:type, intitule:intitule, done:false, auto:"DELAI", delai:{start:start, jours:j, brut:res.brut, ajuste:res.ajustee} };
        arr.push(e);
        LS.set("echeances",arr);
        if(window.Cabinet&&window.Cabinet.toast) window.Cabinet.toast("Échéance créée : "+res.ajustee+" \u2014 "+type);
      });
      document.getElementById("btnDelaiICS").addEventListener("click", function(){
        var fake={id:uid(), date:res.ajustee, type:document.getElementById("delaiType").value, intitule:document.getElementById("delaiIntitule").value||preset.options[preset.selectedIndex].textContent};
        var d=null;
        var did=document.getElementById("delaiDossier").value;
        if(did) d=LS.get("dossiers",[]).find(function(x){ return x.id===did; });
        downloadICS(fake,d);
      });
    });
  }
  // ---- Treasury & Objectif rendering (A2/A4) ----
  function renderTreasuryPanel(){
    var t=computeTreasury();
    return `
      <div class="dash-panel">
        <h3>Trésorerie réelle</h3>
        <div class="dash-cards" style="grid-template-columns:repeat(4,1fr)">
          <div class="dash-card"><div class="num">${fmtMoney(t.encaisse.ttc)}</div><div class="lbl">Encaissée TTC</div><div style="font-size:10.5px;color:var(--text-dim)">HT ${fmtMoney(t.encaisse.ht)} + TVA ${fmtMoney(t.encaisse.tva)}</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(t.aEncaisser.ttc)}</div><div class="lbl">À encaisser TTC</div><div style="font-size:10.5px;color:var(--text-dim)">Factures Émises</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(t.previsionnel.ttc)}</div><div class="lbl">Prévisionnel 90j TTC</div><div style="font-size:10.5px;color:var(--text-dim)">Jusqu\u2019au ${esc(t.previsionnel.in90)}</div></div>
          <div class="dash-card"><div class="num">${fmtMoney(t.frais.ttc)}</div><div class="lbl">Frais débours TTC</div><div style="font-size:10.5px;color:var(--warn)">À refacturer ${fmtMoney(t.frais.aRembourser)}</div></div>
        </div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <span class="badge">TVA encaissée ${fmtMoney(t.encaisse.tva)}</span>
          <span class="badge">Net encaissé (TTC - frais) ${fmtMoney(t.netEncaisse)}</span>
          <span class="badge" style="background:${t.aEncaisser.ttc>0?"var(--danger-soft)":"var(--accent-soft)"}">Relances: ${LS.get("factures",[]).filter(function(f){ return f.statut==="Émise"; }).length} facture(s)</span>
        </div>
      </div>`;
  }
  function renderObjectifPanel(){
    var prog=computeObjectifProgress();
    var obj=getObjectif();
    if(!obj){
      return `<div class="dash-panel"><h3>Objectif CA ${window.ico?window.ico("flag"):""}</h3><p style="font-size:13px;color:var(--text-dim)">Définissez un objectif pour animer le cabinet. <button class="btn btn-sm" id="btnObjDefine">Définir objectif</button></p></div>`;
    }
    if(!prog) return "";
    var pct=prog.pct;
    var lvl=pct>=100?"· Or":pct>=70?"· Argent":pct>=40?"· Bronze":"";
    var barColor=pct>=80?"linear-gradient(90deg, var(--petrol), var(--accent-cms))":"linear-gradient(90deg, var(--accent-cms), var(--petrol))";
    return `<div class="dash-panel">
      <h3>Objectif CA ${esc(prog.period)} ${window.ico?window.ico("flag"):""} <span class="mono" style="color:var(--text-dim);font-size:11px;margin-left:auto">${esc(lvl)} ${pct}%</span></h3>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span>Objectif: <strong>${fmtMoney(obj.targetHT)} HT</strong></span><span>Réalisé: <strong>${fmtMoney(prog.current)} HT</strong></span></div>
      <div class="daily-progress" style="margin-top:4px"><span class="bar"><span class="fill" style="width:${pct}%;background:${barColor}"></span></span><span class="mono dp-num">${pct}%</span></div>
      <p style="font-size:12px;color:var(--text-dim);margin:6px 0 0">Reste ${fmtMoney(prog.remaining)} HT \u2014 ${pct>=100?"Objectif atteint !":""} <button class="btn btn-sm" id="btnObjDefine" style="margin-left:8px">Modifier</button></p>
    </div>`;
  }
  function openDlgObjectif(){
    var obj=getObjectif()||{targetHT:50000, period:"mensuel"};
    var dlg=document.getElementById("dlgObjectif");
    if(!dlg) return;
    dlg.querySelector(`[name="targetHT"]`).value=obj.targetHT||"";
    dlg.querySelector(`[name="period"]`).value=obj.period||"mensuel";
    dlg.showModal();
  }
  // ---- Funnel & Bottleneck panels (F1/F2) ----
  function renderFunnelPanel(){
    var f=computeFunnel();
    var max=Math.max(1, Math.max.apply(null, f.ordered.map(function(o){ return o.count; })));
    var bars=f.ordered.map(function(o){
      var w=Math.round(100*o.count/max);
      return `<div style="display:flex;align-items:center;gap:8px;margin:6px 0">
        <span style="min-width:140px;font-size:11.5px;letter-spacing:.04em;text-transform:uppercase;color:var(--text-dim)">${esc(o.statut)}</span>
        <span style="flex:1;height:14px;background:var(--surface-2);border:1px solid var(--line);border-radius:999px;overflow:hidden;position:relative"><span style="display:block;height:100%;width:${w}%;background:linear-gradient(90deg, var(--petrol), var(--accent-cms));transition:width .3s"></span></span>
        <span class="mono" style="min-width:36px;text-align:right;font-size:12px">${o.count}</span>
      </div>`;
    }).join("");
    return `<div class="dash-panel"><h3>Entonnoir Prospect \u2192 Signé ${window.ico?window.ico("chart"):""}</h3>
      ${bars}
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <span class="badge">Conv. Prospect\u2192Signé: ${f.convProspectSignee}%</span>
        <span class="badge">Signé\u2192Clôturé: ${f.convSigneeCloture}%</span>
        <span class="badge" style="background:var(--surface-2)">Abandonnés: ${f.abandoned}</span>
      </div>
    </div>`;
  }
  function renderBottleneckPanel(){
    var list=computeBottlenecks();
    if(!list.length){
      return `<div class="dash-panel"><h3>Goulots d\u2019étranglement ${window.ico?window.ico("flag"):""}</h3><p style="font-size:13px;color:var(--text-dim)">Aucun dossier bloqué (&gt; seuil). Le pipeline est fluide.</p></div>`;
    }
    var rows=list.map(function(it){
      var d=it.dossier;
      var lateBadge=it.overdue?`<span class="ech-late" title="En retard">${window.ico?window.ico("flag"):"!"}</span>`:"";
      return `<div class="today-action ${it.overdue?"late":""}"><span class="ta-ico">${window.ico?window.ico("clock"):""}</span><span class="ta-date mono">${it.days}j</span><span class="ta-body"><strong>${esc(d.client)}</strong> \u2014 ${esc(d.statut)} ${lateBadge} <span style="font-size:11px;color:var(--text-dim)">(seuil ${it.threshold}j)</span></span><button class="btn btn-sm" data-open-bottleneck="${esc(d.id)}">Ouvrir</button></div>`;
    }).join("");
    return `<div class="dash-panel"><h3>Goulots \u2014 bloqués &gt; seuil ${window.ico?window.ico("clock"):""}</h3>${rows}</div>`;
  }
  // ---- Wrap dashboards ----
  function injectDashboardExtras(){
    var content=document.getElementById("content");
    if(!content) return;
    var cab=content.querySelector(".cab");
    if(!cab) return;
    // avoid double injection
    if(cab.querySelector("#feat-treasury")) return;
    // Insert treasury at top before dash-cards? Find first dash-cards
    var treasuryWrap=document.createElement("div");
    treasuryWrap.id="feat-treasury";
    treasuryWrap.innerHTML=renderTreasuryPanel() + renderObjectifPanel();
    // Insert after h2/sub
    var h2=cab.querySelector("h2");
    var sub=cab.querySelector(".sub");
    var insertAfter=sub||h2;
    if(insertAfter && insertAfter.nextSibling){
      cab.insertBefore(treasuryWrap, insertAfter.nextSibling);
    } else {
      cab.prepend(treasuryWrap);
    }
    // Funnel + bottleneck after existing dash-grid
    var funnelWrap=document.createElement("div");
    funnelWrap.id="feat-funnel";
    funnelWrap.className="dash-grid";
    funnelWrap.style.marginBottom="16px";
    funnelWrap.innerHTML=renderFunnelPanel() + renderBottleneckPanel();
    // Find first dash-grid
    var grids=cab.querySelectorAll(".dash-grid");
    if(grids.length){
      var firstGrid=grids[0];
      firstGrid.parentNode.insertBefore(funnelWrap, firstGrid.nextSibling);
    } else {
      cab.appendChild(funnelWrap);
    }
    // wire objectif button
    var btn=document.getElementById("btnObjDefine");
    if(btn) btn.addEventListener("click", openDlgObjectif);
    // wire bottleneck open
    $$("[data-open-bottleneck]", cab).forEach(function(b){
      b.addEventListener("click", function(){ if(window.Cabinet) window.Cabinet.viewDossier(b.dataset.openBottleneck); });
    });
    // also add abonnement processing hint
    var aboCount=processAbonnements(true);
    if(aboCount>0){
      // already toasted inside process, but add visual badge
    }
    // render mini charts for funnel? no need, html bars suffice
  }
  function augmentEcheancesICS(){
    // adds .ics button per row in echeances view
    var rows=$$("#echBody tr");
    if(!rows.length) return;
    rows.forEach(function(tr){
      if(tr.querySelector("[data-ics]")) return;
      var eid=tr.dataset.eid;
      // find echeance
      var e=LS.get("echeances",[]).find(function(x){ return String(x.id)===String(eid); });
      if(!e) return;
      var dossiers=LS.get("dossiers",[]);
      var d=dossiers.find(function(x){ return x.id===e.dossierId; });
      var cell=tr.querySelector("td:last-child");
      if(!cell) return;
      var btn=document.createElement("button");
      btn.className="btn";
      btn.dataset.ics=eid;
      btn.title="Télécharger .ics";
      btn.innerHTML=window.ico?window.ico("calendar"):"ICS";
      btn.style.marginLeft="4px";
      btn.addEventListener("click", function(){ downloadICS(e,d); });
      cell.appendChild(btn);
    });
  }
  // ---- Wrap viewDossier ----
  function augmentViewDossier(originalId){
    var content=document.getElementById("content");
    if(!content) return;
    var cab=content.querySelector(".cab");
    if(!cab) return;
    var dossiers=LS.get("dossiers",[]);
    var d=dossiers.find(function(x){ return x.id===originalId; });
    if(!d) return;
    // Frais panel
    var fraisList=getFraisForDossier(originalId);
    var fraisTot=calcFraisTotal(originalId);
    var fraisPanel=document.createElement("div");
    fraisPanel.className="dash-panel";
    fraisPanel.style.marginTop="16px";
    fraisPanel.innerHTML=`
      <h3>Frais &amp; Débours (${fraisList.length}) \u2014 Total HT ${fmtMoney(fraisTot.ht)} / TTC ${fmtMoney(fraisTot.ttc)}</h3>
      ${fraisList.length?`<div style="overflow-x:auto"><table class="cab-table"><thead><tr><th>Date</th><th>Catégorie</th><th>Libellé</th><th>HT</th><th>TVA</th><th>TTC</th><th>Statut</th><th></th></tr></thead><tbody>${fraisList.map(function(fr){
        var ttc=(Number(fr.montantHT)||0)+(Number(fr.tva)||0);
        return `<tr><td class="mono" title="${esc(fr.date)}">${esc(fmtDate(fr.date))}</td><td><span class="badge">${esc(fr.categorie)}</span></td><td style="max-width:220px;white-space:normal">${esc(fr.label)}</td><td class="mono">${fmtMoney(fr.montantHT)}</td><td class="mono">${fmtMoney(fr.tva)}</td><td class="mono">${fmtMoney(ttc)}</td><td>${esc(fr.statut)} <br><span style="font-size:11px">${fr.remboursable?"Remb.":"Non remb."}</span></td><td><button class="btn btn-danger" data-del-frais-inline="${esc(fr.id)}" aria-label="Supprimer le frais ${esc(fr.label || '')}">${window.ico?window.ico("trash"):"x"}</button></td></tr>`;
      }).join("")}</tbody></table></div>`:`<p style="color:var(--text-dim);font-size:13px">Aucun frais pour ce dossier.</p>`}
      <div class="cab-toolbar"><button class="btn btn-primary" id="btnAddFraisInline">+ Ajouter un frais</button> ${fraisTot.ttc?`<span class="badge">Total débours à refacturer: ${fmtMoney(fraisList.filter(function(f){ return f.remboursable && f.statut==="À facturer"; }).reduce(function(s,f){ return s+(Number(f.montantHT)||0)+(Number(f.tva)||0); },0))}</span>`:""}</div>`;
    // Insert after Factures panel or before timeline
    var timeline=cab.querySelector(".timeline");
    var anchor=(timeline && typeof timeline.closest==="function" ? timeline.closest(".dash-panel") : null);
    if(anchor) cab.insertBefore(fraisPanel, anchor);
    else cab.appendChild(fraisPanel);
    document.getElementById("btnAddFraisInline").addEventListener("click", function(){ openDlgFrais(originalId); });
    $$("[data-del-frais-inline]", fraisPanel).forEach(function(b){
      b.addEventListener("click", function(){
        delFrais(b.dataset.delFraisInline);
        // re-render dossier view
        if(window.Cabinet) window.Cabinet.viewDossier(originalId);
        if(window.Cabinet&&window.Cabinet.toast) window.Cabinet.toast("Frais supprimé.");
      });
    });
    // Abonnement panel if applicable
    if(isAbonnement(d)){
      var aboPanel=document.createElement("div");
      aboPanel.className="dash-panel";
      aboPanel.style.marginTop="16px";
      var next=getNextBilling(d);
      var montant=Number(d.abonnementMontant)||Number(d.honoraires)||0;
      var abC=calcTTC(montant, d.tva);
      var isAct=d.abonnementActif!==false;
      aboPanel.innerHTML=`
        <h3>Abonnement mensuel ${isAct?`<span class="badge" style="background:var(--accent-soft)">Actif</span>`:`<span class="badge" style="background:var(--danger-soft)">Inactif</span>`}</h3>
        <div style="overflow-x:auto"><table class="cab-table" style="border:0"><tbody>
          <tr><td>Montant mensuel</td><td class="mono">${fmtMoney(abC.ht)} HT \u2014 ${fmtMoney(abC.ttc)} TTC</td></tr>
          <tr><td>Prochaine facturation</td><td class="mono">${esc(next||"\u2014")} ${next && next<=todayISO()?`<span style="color:var(--warn)">échue</span>`:""}</td></tr>
          <tr><td>Début</td><td class="mono">${esc(d.abonnementDebut||"\u2014")}</td></tr>
          <tr><td>Statut facturation</td><td>${montant?"Auto chaque mois via \u201CTraitement abonnements\u201D":"Montant non défini"}</td></tr>
        </tbody></table></div>
        <div class="cab-toolbar"><button class="btn" id="btnAboGenNow">Générer facture du mois</button> <button class="btn" id="btnAboToggle">${isAct?"Désactiver":"Activer"}</button> <button class="btn" id="btnAboProcess">Traiter tous les abonnements</button></div>`;
      if(anchor) cab.insertBefore(aboPanel, fraisPanel);
      else cab.appendChild(aboPanel);
      document.getElementById("btnAboGenNow").addEventListener("click", function(){
        if(!montant){ if(window.Cabinet) window.Cabinet.toast("Montant abonnement non défini",{kind:"error"}); return; }
        var arr=LS.get("factures",[]);
        var num=nextNumCached("FH", arr);
        var c=calcTTC(montant, d.tva);
        var ym=(next||todayISO()).slice(0,7);
        var f={ id:uid(), dossierId:d.id, num:num, date:todayISO(), type:"Facture solde", ht:c.ht, tva:c.tva, ttc:c.ttc, statut:"Émise", abonnement:true, periode:ym };
        arr.push(f); LS.set("factures",arr);
        LS.set("numSeq:FH:"+new Date().getFullYear(), parseInt(num.split("-")[2],10));
        // advance next
        var dossiers2=LS.get("dossiers",[]);
        var idx=dossiers2.findIndex(function(x){ return x.id===d.id; });
        if(idx>=0){ dossiers2[idx].abonnementNext=addMonthsISO(next||todayISO(),1); LS.set("dossiers",dossiers2); }
        if(window.Cabinet) window.Cabinet.toast("Facture abonnement "+num+" générée "+fmtMoney(c.ttc));
        window.Cabinet.viewDossier(originalId);
      });
      document.getElementById("btnAboToggle").addEventListener("click", function(){
        var arr=LS.get("dossiers",[]);
        var idx=arr.findIndex(function(x){ return x.id===d.id; });
        if(idx>=0){ arr[idx].abonnementActif=!isAct; LS.set("dossiers",arr); window.Cabinet.viewDossier(originalId); }
      });
      document.getElementById("btnAboProcess").addEventListener("click", function(){ var n=processAbonnements(); if(!n && window.Cabinet) window.Cabinet.toast("Aucun abonnement à facturer aujourd\u2019hui."); });
    }
    // Conflits panel (read-only check display)
    var hits=checkConflitsFor(d.client, d.ice, d.adverse, d.id);
    if(hits.length){
      var confPanel=document.createElement("div");
      confPanel.className="verrou-banner";
      confPanel.style.borderColor="var(--warn)";
      confPanel.innerHTML=`<span class="vb-ico">\u26A0</span><div class="vb-body"><strong>${hits.length} conflit(s) potentiel(s)</strong><span class="vb-sub">${hits.slice(0,3).map(function(h){ return esc(h.reason); }).join(" \u2014 ")}</span></div><button class="btn btn-sm" data-open-conflit> Voir détail</button>`;
      var anchor=cab.querySelector(".dash-cards")||cab.querySelector(".stats-band");
      cab.insertBefore(confPanel, anchor ? anchor.nextSibling : null);
      confPanel.querySelector("[data-open-conflit]").addEventListener("click", function(){
        var sub = confPanel.querySelector(".vb-sub");
        var expanded = confPanel.classList.toggle("expanded");
        if (expanded) {
          sub.textContent = hits.map(function(h){ return "\u2022 " + h.reason; }).join(" \u2014 ");
          this.textContent = " Réduire";
        } else {
          sub.textContent = hits.slice(0,3).map(function(h){ return h.reason; }).join(" \u2014 ");
          this.textContent = " Voir détail";
        }
        if (window.Cabinet) window.Cabinet.toast(hits.length + " conflit(s) potentiel(s) — vérifiez avant signature.");
      });
    }
    // ICS for existing echeances in this dossier
    var echs=LS.get("echeances",[]).filter(function(e){ return e.dossierId===originalId; });
    echs.forEach(function(e){
      // find its row? we will add ics in table already via global augment? For dossier view, add ics buttons next to each checkbox row
    });
    // Add veil link if any
    var veilleLinked=LS.get("veille",[]).filter(function(v){ return v.dossierId===originalId; });
    if(veilleLinked.length){
      var vPanel=document.createElement("div");
      vPanel.className="dash-panel";
      vPanel.style.marginTop="16px";
      vPanel.innerHTML=`<h3>Veille liée (${veilleLinked.length})</h3><ul style="font-size:13px;margin:0;padding-left:18px">${veilleLinked.map(function(v){ return `<li>${esc(v.date)} \u2014 ${esc(v.source)}: <strong>${esc(v.title)}</strong> ${safeUrl(v.url)?`<a href="${esc(safeUrl(v.url))}" target="_blank" rel="noopener">lien</a>`:""} \u2014 ${esc(v.statut)}</li>`; }).join("")}</ul>`;
      cab.appendChild(vPanel);
    }
  }
  // ---- Hooks : cabinet.js émet 'avocato:rendered' après chaque rendu (vue + dossierId en fiche).
  // Les anciens monkey-patches de window.Cabinet étaient contournés par les appels internes (goView),
  // d'où la disparition des panneaux après navigation. Un seul chemin : l'événement.
  function initHooks(){
    if(initHooks._done) return;
    initHooks._done=true;
    document.addEventListener('avocato:rendered', function(e){
      var d=(e&&e.detail)||{};
      try{
        if(d.view==="dashboard"){
          setTimeout(function(){
            try{ injectDashboardExtras(); }catch(err){ console.warn(err); }
            try{ processAbonnements(true); }catch (err) { console.warn('avocato', err); }
          }, 50);
        } else if(d.view==="echeances"){
          setTimeout(function(){ try{ augmentEcheancesICS(); }catch (err) { console.warn('avocato', err); } }, 80);
        }
        if(d.dossierId){
          setTimeout(function(){ try{ augmentViewDossier(d.dossierId); }catch(err){ console.warn(err); } }, 60);
        }
      }catch(err){ console.warn(err); }
    });
  }
  // ---- Init ----
  var booted=false;
  function initFeatures(){
    if(!booted){
      booted=true;
      initHooks();
      // process abonnements on load
      setTimeout(function(){ try{ processAbonnements(true); }catch (e) { console.warn('avocato', e); } }, 1000);
      // also add ICS to global echeances view periodically
      setInterval(function(){
        try{
          var cv=LS.get("cabinetView","");
          if(cv==="echeances") augmentEcheancesICS();
        }catch (e) { console.warn('avocato', e); }
      }, 1500);
    }
    // extend dossier dialog with new fields (idempotent par flag _featExtended)
    extendDossierDialog();
    wireFraisDialog();
    wireVeilleDialog();
    wireObjectifDialog();
  }
  function extendDossierDialog(){
    var form=document.getElementById("formDossier");
    if(!form || form._featExtended) return;
    form._featExtended=true;
    // Add adverse + abonnement section after notes
    var notesLabel=form.querySelector(`textarea[name="notes"]`);
    if(notesLabel){
      var container=(typeof notesLabel.closest==="function" ? notesLabel.closest("label") : null); if(!container) return;
      if(container){
        var adverseLab=document.createElement("label");
        adverseLab.className="span-2";
        adverseLab.innerHTML=`Partie adverse / Société adverse (conflits)<input name="adverse" placeholder="Ex: SARL Concurrente, M. X"> <span class="field-help">Pour le check conflits fuzzy (insensible accents/casse). Laissez vide si aucun.</span><span id="conflictHint" class="field-help" style="display:none;color:var(--warn)"></span>`;
        container.parentNode.insertBefore(adverseLab, container.nextSibling);
        var adverseInput=adverseLab.querySelector(`input[name="adverse"]`);
        var conflictHint=document.getElementById("conflictHint");
        function updateConflictHint(){
          var client=form.client.value.trim();
          var ice=form.ice.value.trim();
          var adv=adverseInput.value.trim();
          var editId=(window.Cabinet && window.Cabinet.editingId)||null;
          var hits=checkConflitsFor(client, ice, adv, editId);
          if(hits.length){
            conflictHint.style.display="block";
            conflictHint.textContent="\u26A0 "+hits.length+" conflit(s): "+hits.slice(0,2).map(function(h){ return h.reason; }).join(" \u2014 ");
          } else {
            conflictHint.style.display="none";
          }
        }
        ["input","change"].forEach(function(ev){
          form.client.addEventListener(ev, updateConflictHint);
          form.ice.addEventListener(ev, updateConflictHint);
          adverseInput.addEventListener(ev, updateConflictHint);
        });
      }
    }
    // Abonnement section in step2
    var step2=document.getElementById("dlgStep2");
    if(step2){
      var aboBox=document.createElement("div");
      aboBox.className="span-2 verrous-box";
      aboBox.style.borderLeftColor="var(--accent-2)";
      aboBox.innerHTML=`
        <span class="verrous-title">Abonnement mensuel (A1)</span>
        <label class="chk"><input type="checkbox" name="abonnementActif"> Dossier en abonnement mensuel</label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:6px">
          <label style="font:600 11.5px var(--font-body);color:var(--text-dim)">Montant mensuel HT<input name="abonnementMontant" type="number" min="0" placeholder="4000"></label>
          <label style="font:600 11.5px var(--font-body);color:var(--text-dim)">Début<input name="abonnementDebut" type="date"></label>
          <label style="font:600 11.5px var(--font-body);color:var(--text-dim)">Prochaine facturation<input name="abonnementNext" type="date"></label>
          <label style="font:600 11.5px var(--font-body);color:var(--text-dim)">Jour préféré<input name="abonnementJour" type="number" min="1" max="28" placeholder="1"></label>
        </div>
        <span class="field-help">Si Mission = Abonnement, coché auto. Génère facture FH + échéance chaque mois (traitement auto au dashboard).</span>
      `;
      // insert before verrous-box? after echeance+contact
      var contactLabel=form.querySelector(`input[name="contact"]`);
      try{
        if(contactLabel && typeof contactLabel.closest==="function"){ var lbl=contactLabel.closest("label"); if(lbl && lbl.parentNode) lbl.parentNode.insertBefore(aboBox, lbl.nextSibling); } else if(typeof step2.appendChild==="function"){ try{ step2.appendChild(aboBox); }catch (e) { console.warn('avocato', e); } }
        else if(step2 && typeof step2.appendChild==="function") step2.appendChild(aboBox);
      }catch (e) { console.warn('avocato', e); }
      // auto-check when mission is abonnement
      var missionSel=form.mission;
      if(missionSel){
        function syncAbo(){
          var isAbo=(missionSel.value||"").toLowerCase().indexOf("abonnement")!==-1;
          var chk=form.querySelector(`input[name="abonnementActif"]`);
          if(chk && isAbo) chk.checked=true;
        }
        try{ missionSel.addEventListener("change", syncAbo); }catch (e) { console.warn('avocato', e); }
      }
      // on open, sync
    }
    // Intercept submit to include new fields? cabinet.js submit reads FormData; new fields will be auto included.
    // But need to handle checkbox booleans for abonnementActif etc. Extend cabinet.js submit handler? We'll wrap it.
    // Instead, add an extra submit listener that patches FormData before cabinet.js? The cabinet.js listener uses FormData.get for known fields.
    // We add a listener in capture phase to set hidden handling? Simpler: override form submit to inject values into LS after commit.
    // We will wrap window.Cabinet.viewDossier already handles, but for create we need to ensure abonnement fields are persisted.
    // Patch: listen to submit, store temp
    form.addEventListener("submit", function(e){
      // let cabinet.js handle first, then patch stored dossier with extra fields after a delay
      setTimeout(function(){
        try{
          var dossiers=LS.get("dossiers",[]);
          // find last created or editing
          // We stored fields via FormData but cabinet.js extract only specific fields; new fields will be in obj via Object.fromEntries
          // Actually cabinet.js does: const obj = Object.fromEntries(fd.entries());  -> includes all named inputs, so adverse etc will be in obj
          // Need to handle checkbox -> fd.get === "on" but our code does direct Number conversion only for known fields; new checkboxes need boolean handling.
          // So we patch dossiers to normalize booleans
          dossiers.forEach(function(d){
            if(d.abonnementActif==="on") d.abonnementActif=true;
            if(d.abonnementActif==null && isAbonnement(d)) d.abonnementActif=true;
            // ensure dates are strings
          });
          LS.set("dossiers", dossiers);
        }catch (err) { console.warn('avocato', err); }
      }, 100);
    });
  }
  function wireFraisDialog(){
    var form=document.getElementById("formFrais");
    if(!form || form._wired) return;
    form._wired=true;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var fd=new FormData(form);
      var obj=Object.fromEntries(fd.entries());
      // normalize
      obj.montantHT=Number(obj.montantHT)||0;
      obj.tva=Number(obj.tva)||0;
      obj.remboursable=fd.get("remboursable")==="on";
      if(!obj.label){ if(window.Cabinet) window.Cabinet.toast("Libellé requis",{kind:"error"}); return; }
      addFrais(obj);
      document.getElementById("dlgFrais").close();
      // refresh current view
      var cv=LS.get("cabinetView","");
      if(cv==="frais") renderFrais();
      else if(form.dataset.dossierId){
        // if opened from dossier, re-open dossier
        var did=form.dataset.dossierId || obj.dossierId;
        if(did && window.Cabinet) window.Cabinet.viewDossier(did);
      }
      if(window.Cabinet&&window.Cabinet.toast) window.Cabinet.toast("Frais ajouté: "+fmtMoney(obj.montantHT));
    });
    document.getElementById("btnCancelFrais").addEventListener("click", function(){ document.getElementById("dlgFrais").close(); });
    // delegate open
  }
  function wireVeilleDialog(){
    var form=document.getElementById("formVeille");
    if(!form || form._wired) return;
    form._wired=true;
    // populate dossier select on open is done in openDlgVeille
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var fd=new FormData(form);
      var obj=Object.fromEntries(fd.entries());
      var editId=form.dataset.editId;
      if(editId){
        updateVeille(editId, obj);
        if(window.Cabinet) window.Cabinet.toast("Veille mise à jour.");
      } else {
        addVeille(obj);
        if(window.Cabinet) window.Cabinet.toast("Veille ajoutée.");
      }
      document.getElementById("dlgVeille").close();
      renderVeille();
    });
    document.getElementById("btnCancelVeille").addEventListener("click", function(){ document.getElementById("dlgVeille").close(); });
  }
  function wireObjectifDialog(){
    var form=document.getElementById("formObjectif");
    if(!form || form._wired) return;
    form._wired=true;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var fd=new FormData(form);
      var targetHT=Number(fd.get("targetHT"))||0;
      var period=fd.get("period")||"mensuel";
      if(!targetHT){ if(window.Cabinet) window.Cabinet.toast("Montant cible requis",{kind:"error"}); return; }
      setObjectif({targetHT:targetHT, period:period, updatedAt:new Date().toISOString()});
      document.getElementById("dlgObjectif").close();
      // re-render dashboard
      if(LS.get("cabinetView")==="dashboard" && window.Cabinet) window.Cabinet.renderCabinet();
      if(window.Cabinet) window.Cabinet.toast("Objectif CA défini: "+fmtMoney(targetHT)+" HT / "+period);
    });
    document.getElementById("btnCancelObjectif").addEventListener("click", function(){ document.getElementById("dlgObjectif").close(); });
  }
  // Expose
  window.Features={
    renderFrais: renderFrais,
    renderVeille: renderVeille,
    renderDelais: renderDelais,
    openDlgFrais: openDlgFrais,
    openDlgVeille: openDlgVeille,
    processAbonnements: processAbonnements,
    checkConflitsFor: checkConflitsFor,
    generateICS: generateICS,
    downloadICS: downloadICS,
    computeTreasury: computeTreasury,
    computeFunnel: computeFunnel,
    computeBottlenecks: computeBottlenecks,
    computeObjectifProgress: computeObjectifProgress,
    getObjectif: getObjectif,
    computeDelai: computeDelai,
    isFerie: isFerie,
    nextOuvrable: nextOuvrable
  };
  // boot
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", initFeatures);
  else initFeatures();
  // also retry after cabinet init delay
  setTimeout(initFeatures, 800);
  setTimeout(initFeatures, 2000);

// ---- Patch Plaque dialog for conflict blacklist (C2) ----
  function extendPlaqueDialog(){
    try{
    var form=document.getElementById("formPlaque");
    if(!form || form._confExtended) return;
    form._confExtended=true;
    var ribBanqueLabel=form.querySelector(`input[name="ribBanque"]`);
    if(ribBanqueLabel && typeof ribBanqueLabel.closest === "function"){
      var container=(typeof ribBanqueLabel.closest==="function" ? ribBanqueLabel.closest("label") : null);
      if(!container) return;
      if(container){
        var confLab=document.createElement("label");
        confLab.className="span-2";
        confLab.innerHTML=`Liste noire conflits (un par ligne)<textarea name="conflictList" rows="3" placeholder="Ex: SARL Concurrente&#10;M. Dupont&#10;ICE 123456789012345"></textarea><span class="field-help">Noms / societes / ICE a signaler comme conflit (fuzzy). Stocke dans localStorage.</span>`;
        container.parentNode.insertBefore(confLab, container.nextSibling);
        // Populate the conflict blacklist whenever the plaque dialog opens
        // (event emitted by cabinet.js openDlgPlaque -- no monkey-patching).
        document.addEventListener("avocato:plaque-open", function(){
          try{
            var list=LS.get("conflictList",[]);
            var ta=form.querySelector(`textarea[name="conflictList"]`);
            if(ta) ta.value=list.join("\n");
          }catch (e) { console.warn('avocato', e); }
        });
        // Save on submit: intercept form submit
        form.addEventListener("submit", function(e){
          // let original handler run first (cabinet.js), then save conflictList after
          setTimeout(function(){
            try{
              var ta=form.querySelector(`textarea[name="conflictList"]`);
              if(!ta) return;
              var lines=ta.value.split("\n").map(function(s){ return s.trim(); }).filter(Boolean);
              LS.set("conflictList", lines);
              if(window.Cabinet && window.Cabinet.toast && lines.length) window.Cabinet.toast("Liste noire conflits enregistree ("+lines.length+")");
            }catch (err) { console.warn('avocato', err); }
          }, 50);
        });
      }
    }
    }catch(e){ console.warn(e); }
  }
  // extend initFeatures to include plaque patch
  // extend initFeatures to include plaque patch
  setTimeout(function(){ try{ extendPlaqueDialog(); }catch (e) { console.warn('avocato', e); } }, 600);
  document.addEventListener("DOMContentLoaded", function(){ try{ extendPlaqueDialog(); }catch (e) { console.warn('avocato', e); } });
})();
