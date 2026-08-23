const fs = require('fs');
const fixes = [
// ---- Glossaire ----
['00_START_HERE/03_Glossaire_12_Concepts_Cles.md', [
 ['IR 1-2% (ex: 150k \u00e0 2% = 3k)', 'IR lib\u00e9ratoire 0,5-1 % (ex: 150k services \u00d7 1 % = 1,5k)'],
 ['(ex: 100k b\u00e9n\u00e9fice \u00d715% =15k)', '(ex: 100k b\u00e9n\u00e9fice \u00d7 20 % = 20k)'],
 ['AE 500k/200k, IS 15/20/32%, capital 10k', 'AE 500k/200k, IS 20 % (LF 2026), capital 10k'],
 ['b\u00e9n\u00e9fice tax\u00e9 Maroc seulement 15% <300k.', 'b\u00e9n\u00e9fice tax\u00e9 au Maroc seulement \u2014 20 % (LF 2026).']
]],
// ---- Glossaire trilingue ----
['00_START_HERE/06_Glossaire_Trilingue_50_Termes_FR_EN_AR.md', [
 ['| CIT 15% <300k profit |', '| CIT 20% flat (LF 2026) |'],
 ['| 20% 300k-1M, 32% >1M PLF |', '| 35% si >100M MAD (LF 2026) |']
]],
// ---- Niche6 overview ----
['01_Strategy/03_Unsaturated_Niches_Overview/08_Niche6_AE_vers_SARL.md', [
 ['- AE : 350 k \u00e0 2% = 7 000 DH IR + CNSS forfaitaire 500 DH = 7 500 DH/an.',
  '- AE (commerce) : 350 k \u00d7 0,5 % = 1 750 DH IR + CNSS forfaitaire 500 DH \u2248 2 250 DH/an.'],
 ['- SARL : IS 15% sur b\u00e9n\u00e9fice (350 k - charges 200 k = 150 k b\u00e9n\u00e9fice \u00d7 15% = 22 500 DH IS',
  '- SARL : IS 20 % (LF 2026) sur b\u00e9n\u00e9fice (350 k - charges 200 k = 150 k \u00d7 20 % = 30 000 DH IS']
]],
// ---- AE vers SARL : cas pratique + douleurs + canaux SEO + juris footer ----
['02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling/05_Cas_Pratique.md', [
 ['- AE : 350 k \u00e0 2% = 7 000 DH IR + CNSS forfaitaire 500 DH = 7 500 DH/an.',
  '- AE (commerce) : 350 k \u00d7 0,5 % = 1 750 DH IR + CNSS forfaitaire 500 DH \u2248 2 250 DH/an.'],
 ['= 150 k b\u00e9n\u00e9fice \u00d7 15% = 22 500 DH IS', '= 150 k \u00d7 20 % = 30 000 DH IS'],
 ['(127 500 vs 7 500)', '(135 000 vs 2 250)']
]],
['02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling/02_Douleurs_Juridiques.md', [
 ["- SARL : IS 10% (<300k), 20% (300k-1M), 30% (>1M) (CGI art.19, LF 2024)",
  "- SARL : **IS 20 % unifi\u00e9** (LF 2026, CGI art.19) sur b\u00e9n\u00e9fice net ; cotisation minimale 0,5 % du CA, min 3 000 DH."]
]],
['02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling/04_Canaux_SEO_Partenaires.md', [
 ['fiscalit\u00e9 AE vs SARL IS 15% 300k | 180 | Info | 12 | CGI IS 15%/20%/32%',
  'fiscalit\u00e9 AE vs SARL IS 2026 | 180 | Info | 12 | CGI art.19 : IS 20 % unifi\u00e9 (LF 2026)']
]],
['02_Niches_Deep_Dive/06_Autoentrepreneur_to_SARL_Scaling/09_Jurisprudence_Niche.md', [
 ['CGI art.19 IS 15%', 'CGI art.19 : IS 20 % (LF 2026)']
]],
// ---- Freelancers ----
['02_Niches_Deep_Dive/01_Freelancers_Agencies_Offshore/02_Douleurs_Juridiques.md', [
 ["- IS : 15% sur les b\u00e9n\u00e9fices jusqu'\u00e0 300 000 DH, 31% au-del\u00e0.",
  "- IS : 20 % unifi\u00e9 (LF 2026) si b\u00e9n\u00e9fice net <100M MAD ; 35 % au-del\u00e0."]
]],
['02_Niches_Deep_Dive/01_Freelancers_Agencies_Offshore/03_Offre_Productisee.md', [
 ['IS 10% <300k / 20% 300k-1M / 30% >1M', 'IS 20 % unifi\u00e9 (LF 2026)']
]],
['02_Niches_Deep_Dive/02_Ecommerce_Dropshipping_YouCan/11_Arbre_Decision_Niche.md', [
 ['SARL IS 15% si b\u00e9n\u00e9fice <300k', 'SARL IS 20 % (LF 2026)']
]],
['04_Skills_To_Learn/07_Sharp_Legal_Mind/03a_Numbers_Fiscal.md', [
 ['| IS taux r\u00e9duit PME | **15% sur b\u00e9n\u00e9fice net \u2264 300 000 DH** | CGI, bar\u00e8me progressif (loi de finances) | sgg.gov.ma, 01/01/2025 |',
  '| IS taux PME | **20 % unifi\u00e9** (b\u00e9n\u00e9fice net <100M MAD ; 35 % au-del\u00e0) | CGI art.19 \u2014 LF 2026 (loi 50-25) | sgg.gov.ma, 23/08/2026 |']
]],
// ---- Finance cabinet OS ----
['04_Skills_To_Learn/12_Finance_Cabinet_OS/05_05_Comparatif_Statuts_Fiscal.md', [
 ['1 % servicesice lib\u00e9ratoire | IS 20 % (LF 2026), 20% 300k-1M', '1 % services lib\u00e9ratoire | IS 20 % (LF 2026)'],
 ['| **Co\u00fbt fixe/an** | 0 + IR 2% (ex: 150kx2%=3k) | 5000 charges + IS 15% (ex: 100k b\u00e9nx15%=15k)',
  '| **Co\u00fbt fixe/an** | 0 + IR 1 % services (ex: 150k\u00d71%=1,5k) | 5 000 charges + IS 20 % (ex: 100k\u00d720%=20k)'],
 ['redressement IS 15%+38%+30%', 'redressement r\u00e9sultat r\u00e9el + majoration 30 %'],
 ['AE 500k/200k, IS 15/20/32%, capital 10k', 'AE 500k/200k, IS 20 % (LF 2026), capital 10k'],
 ['CA 150k service \u2192 AE IR 150kx2%=3k vs SARL b\u00e9n\u00e9fice 80kx15%=12k \u2192 AE gagne 9k. CA 350k service b\u00e9n\u00e9fice 150k \u2192 AE radiation + IS 68k vs SARL IS 22.5k \u2192 SARL gagne 45k.',
  'CA 150k service \u2192 AE IR 150k\u00d71%=1,5k vs SARL b\u00e9n\u00e9fice 80k\u00d720%=16k \u2192 AE gagne ~14,5k. CA 350k service (>plafond 200k) \u2192 AE radi\u00e9, bascule obligatoire vs SARL b\u00e9n\u00e9fice 150k\u00d720%=30k \u2192 SARL seule voie conforme.'],
 ['Sinon SARL Casa tax\u00e9e Maroc seul 15%.', 'Sinon SARL Casa tax\u00e9e au Maroc seul \u2014 20 % (LF 2026).']
]],
['04_Skills_To_Learn/12_Finance_Cabinet_OS/08_08_Metriques_Rentabilite.md', [
 ['CGI IS 15%', 'CGI : IS 20 % (LF 2026)']
]],
['04_Skills_To_Learn/12_Finance_Cabinet_OS/09_09_Arbre_Prix_Mission.md', [
 ['CGI IS 15%', 'CGI : IS 20 % (LF 2026)']
]],
['04_Skills_To_Learn/17_Finance_Op/11_Cas_Annee_1_Objectif_300k.md', [
 ['budget on the','budget on the'] // no-op garde
]],
// ---- Rapatriement / dividende MRE ----
['02_Niches_Deep_Dive/08_Fiscalite_Internationale_Rapatriement/06_Rapatriement_Dividendes_Salaires_Change.md', [
 ['B\u00e9n\u00e9fice 100k \u2192 IS 15% (15k)', 'B\u00e9n\u00e9fice 100k \u2192 IS 20 % (LF 2026) = 20k'],
 ['\u2192 net 85k.', '\u2192 net 80k.']
]],
['02_Niches_Deep_Dive/08_Fiscalite_Internationale_Rapatriement/09_Cas_Pratiques_3_Internationaux.md', [
 ['non-r\u00e9sident \u2192 IS Maroc 15% seulement', 'non-r\u00e9sident \u2192 IS Maroc 20 % (LF 2026) seulement'],
 ['100k b\u00e9n\u00e9fice \u2192 IS 15k \u2192 dividende 50k', '100k b\u00e9n\u00e9fice \u2192 IS 20k (LF 2026) \u2192 dividende 50k'],
 ['= \u00e9conomie 15k)', '= \u00e9conomie 5k)']
]],
['02_Niches_Deep_Dive/10_MRE_Entrepreneurs/06_Change_MRE_Rapatriement_Dividende.md', [
 ['B\u00e9n\u00e9fice 100k \u2192 IS 15% 15k \u2192 net 85k', 'B\u00e9n\u00e9fice 100k \u2192 IS 20 % (LF 2026) = 20k \u2192 net 80k']
]],
['02_Niches_Deep_Dive/05_MRE_Foreign_Investors/10_Comparatif_International.md', [
 ['IS Maroc sur reste 200k =30k \u2192 total **80k**', 'IS Maroc sur reste 200k =40k (20 % LF 2026) \u2192 total **90k**'],
 ['\u2192 SARL Casa seule \u2192 total 30k + dividende 10% =38k', '\u2192 SARL Casa seule \u2192 total 40k + dividende 10% =48k']
]],
['02_Niches_Deep_Dive/10_MRE_Entrepreneurs/05_Fiscalite_MRE_Residence_NonResident.md', [
 ['b\u00e9n\u00e9fice SARL Casa 15%', 'b\u00e9n\u00e9fice SARL Casa 20 % (LF 2026)']
]],
['02_Niches_Deep_Dive/10_MRE_Entrepreneurs.md', [
 ['RC 10k, IS15%', 'RC 10k, IS 20 % (LF 2026)']
]],
['02_Niches_Deep_Dive/11_Nomads_Digital/11_Cas_Pratiques_3_Nomads.md', [
 ['IS 15% sur 300k b\u00e9n\u00e9fice =45k vs 12k IR', 'IS 20 % (LF 2026) sur 300k b\u00e9n\u00e9fice =60k vs 12k IR']
]],
['02_Niches_Deep_Dive/11_Nomads_Digital/10_SEO_Nomad_Mots_Cles.md', [
 ['Loi 5-96 capital 10k IS15%', 'Loi 5-96 capital 10k / IS 20 % (LF 2026)']
]]
];
let tot = 0;
for (const [f, rs] of fixes) {
  let c = fs.readFileSync(f, 'utf8'), n = 0;
  for (const [a, b] of rs) {
    if (a === b) continue;
    if (c.includes(a)) { c = c.split(a).join(b); n++; }
    else console.log('!! introuvable:', f, '::', a.slice(0, 55));
  }
  if (n) { fs.writeFileSync(f, c); tot += n; }
}
console.log('--- remplacements:', tot);
