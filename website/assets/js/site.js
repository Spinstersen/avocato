(function () {
  'use strict';

  var reduce = false, fine = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  try { fine = window.matchMedia('(pointer: fine)').matches; } catch (e) {}

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (fn) { return setTimeout(fn, 16); };

  function toast(message) {
    var el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('is-visible'); }, 2600);
  }

  if ($('#hero') && !$('.to-top')) {
    var toTopBtn = document.createElement('button');
    toTopBtn.className = 'to-top';
    toTopBtn.type = 'button';
    toTopBtn.setAttribute('aria-label', 'Revenir en haut');
    toTopBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(toTopBtn);
  }

  var topbar = $('.topbar');
  var toTop = $('.to-top');
  var heroEl = $('#hero');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    raf(function () {
      ticking = false;
      if (topbar) topbar.classList.toggle('is-scrolled', window.scrollY > 12);
      if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 720);
      if (heroEl) {
        var prog = $('.progress');
        if (prog) prog.style.width = Math.min(100, (window.scrollY / Math.max(heroEl.offsetHeight, 1)) * 100) + '%';
      }
      var article = $('.prose');
      var bar = $('.progress-bar');
      if (article && bar) {
        var rect = article.getBoundingClientRect();
        var total = rect.height - window.innerHeight + 260;
        var seen = Math.min(Math.max(-rect.top + 160, 0), Math.max(total, 0));
        bar.style.width = total > 0 ? (seen / total) * 100 + '%' : '0%';
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  var menuBtn = $('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('.mobile-panel a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var reveals = $$('[data-reveal]');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  var rotator = $('.rotator');
  if (rotator) {
    var words = (rotator.getAttribute('data-words') || '').split('|').filter(Boolean);
    var wordEl = $('.word', rotator);
    if (wordEl && words.length > 1 && !reduce) {
      var i = 0;
      setInterval(function () {
        rotator.classList.add('is-out');
        setTimeout(function () {
          i = (i + 1) % words.length;
          wordEl.textContent = words[i];
          rotator.classList.remove('is-out');
        }, 360);
      }, 2800);
    }
  }

  /* ---------- Hero v2 : kinetic split, loader, clock, ink field ---------- */
  (function splitTitle() {
    var title = $('#heroTitle');
    if (!title) return;
    var state = { i: 0 };
    var splitTextNode = function (node) {
      var text = node.textContent;
      if (!text.trim()) return;
      var frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
        var word = document.createElement('span');
        word.className = 'word';
        part.split('').forEach(function (ch) {
          var c = document.createElement('span');
          c.className = 'char';
          c.textContent = ch;
          c.style.setProperty('--i', state.i++);
          word.appendChild(c);
        });
        frag.appendChild(word);
      });
      node.parentNode.replaceChild(frag, node);
    };
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) splitTextNode(child);
        else if (child.nodeType === 1 && !child.classList.contains('rotator') && !child.classList.contains('sr-only')) walk(child);
      });
    };
    walk(title);
  })();

  var hero = $('#hero');
  var loaderEl = $('#loader');
  var startField = function () {};
  var introDone = false;
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    if (loaderEl) loaderEl.classList.add('done');
    document.body.classList.remove('is-loading');
    if (hero) hero.classList.add('is-ready');
    if (!reduce) { try { sessionStorage.setItem('avocato:intro', 'done'); } catch (e) {} }
    startField();
  }

  var introSeen = false;
  try { introSeen = sessionStorage.getItem('avocato:intro') === 'done'; } catch (e) {}
  if (loaderEl) {
    if (reduce || introSeen) {
      loaderEl.style.display = 'none';
      finishIntro();
    } else {
      document.body.classList.add('is-loading');
      var lbar = $('#loaderBar');
      var lcount = $('#loaderCount');
      var t0 = Date.now();
      (function progress() {
        var p = Math.min(100, Math.round(((Date.now() - t0) / 620) * 100));
        if (lcount) lcount.textContent = String(p).padStart(2, '0');
        if (lbar) lbar.style.width = p + '%';
        if (p < 100 && !introDone) raf(progress);
        else setTimeout(finishIntro, 200);
      })();
      setTimeout(finishIntro, 2800);
    }
  } else if (hero) {
    finishIntro();
  }

  var clockEl = $('#clock');
  if (clockEl) {
    var tickClock = function () {
      var now = new Date();
      try {
        var t = new Intl.DateTimeFormat('fr-FR', {
          timeZone: 'Africa/Casablanca', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).format(now);
        clockEl.textContent = t + ' · CASA';
      } catch (e) {
        clockEl.textContent = now.toLocaleTimeString('fr-FR');
      }
    };
    tickClock();
    setInterval(tickClock, 1000);
  }

  if (hero && !$('.progress')) {
    var progEl = document.createElement('div');
    progEl.className = 'progress';
    progEl.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(progEl, document.body.firstChild);
  }

  if (hero && !reduce && $('#field')) {
    (function field() {
      var canvas = $('#field');
      var ctx = null;
      try { ctx = canvas.getContext('2d'); } catch (e) { ctx = null; }
      if (!ctx) return;

      var dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 900 ? 1.25 : 1.75);
      var W = 0, H = 0, particles = [], running = false, visible = true;

      var hash = function (x, y) {
        var s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        return s - Math.floor(s);
      };
      var noise = function (x, y) {
        var xi = Math.floor(x), yi = Math.floor(y);
        var xf = x - xi, yf = y - yi;
        var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
        var a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
        return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
      };

      var pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
      var lastPointer = { x: 0, y: 0 };

      function resize() {
        var w = window.innerWidth, h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        W = w; H = h;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = '#07272d';
        ctx.fillRect(0, 0, W, H);
        var count = Math.max(220, Math.min(850, Math.round((W * H) / 15000)));
        particles = [];
        for (var i = 0; i < count; i++) {
          particles.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, brass: Math.random() < 0.12 });
        }
      }

      function step(t, draw) {
        var time = t * 0.00004;
        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          var angle = noise(p.x * 0.0015 + time, p.y * 0.0015 - time * 0.7) * Math.PI * 4;
          var fx = Math.cos(angle) * 0.9, fy = Math.sin(angle) * 0.9;
          if (pointer.active) {
            var dx = p.x - pointer.x, dy = p.y - pointer.y;
            var d2 = dx * dx + dy * dy;
            var R = 200;
            if (d2 < R * R && d2 > 0.01) {
              var d = Math.sqrt(d2);
              var f = (1 - d2 / (R * R)) * 1.6;
              fx += (-dy / d) * f + (dx / d) * f * 0.55 + pointer.vx * 0.012 * f;
              fy += (dx / d) * f + (dy / d) * f * 0.55 + pointer.vy * 0.012 * f;
            }
          }
          p.vx = (p.vx + fx * 0.16) * 0.94;
          p.vy = (p.vy + fy * 0.16) * 0.94;
          var nx = p.x + p.vx, ny = p.y + p.vy;
          if (draw) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = p.brass ? 'rgba(211, 181, 120, .10)' : 'rgba(42, 127, 138, .07)';
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
          p.x = nx; p.y = ny;
          if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        }
      }

      function loop(t) {
        if (!running) return;
        ctx.fillStyle = 'rgba(7, 39, 45, .075)';
        ctx.fillRect(0, 0, W, H);
        step(t, true);
        pointer.vx *= 0.92;
        pointer.vy *= 0.92;
        raf(loop);
      }
      function start() { if (!running) { running = true; raf(loop); } }
      function stop() { running = false; }

      window.addEventListener('pointermove', function (e) {
        pointer.vx = e.clientX - lastPointer.x;
        pointer.vy = e.clientY - lastPointer.y;
        lastPointer.x = e.clientX; lastPointer.y = e.clientY;
        pointer.x = e.clientX; pointer.y = e.clientY;
        pointer.active = true;
      }, { passive: true });
      window.addEventListener('pointerleave', function () { pointer.active = false; });

      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () { resize(); if (!running) step(1, true); }, 180);
      });
      document.addEventListener('visibilitychange', function () {
        visible = !document.hidden;
        if (visible) start(); else stop();
      });
      if ('IntersectionObserver' in window) {
        var hio = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting && visible) start(); else stop();
        }, { threshold: 0.01 });
        hio.observe(hero);
      }

      resize();
      startField = start;
      if (!document.body.classList.contains('is-loading')) start();
    })();
  }

  (function cursor() {
    if (!fine || reduce) return;
    var cur = $('.cursor');
    if (!cur) {
      cur = document.createElement('div');
      cur.className = 'cursor';
      cur.setAttribute('aria-hidden', 'true');
      cur.innerHTML = '<span class="cursor-dot"></span><span class="cursor-ring"></span><span class="cursor-label">Voir</span>';
      document.body.appendChild(cur);
    }
    document.body.classList.add('cursor-on');
    var dot = $('.cursor-dot', cur);
    var ring = $('.cursor-ring', cur);
    var label = $('.cursor-label', cur);
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    var dx = x, dy = y, rx = x, ry = y;
    window.addEventListener('pointermove', function (e) { x = e.clientX; y = e.clientY; }, { passive: true });
    document.addEventListener('mouseover', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('a, button, [data-cursor]') : null;
      cur.classList.toggle('cursor--link', !!t && t.getAttribute('data-cursor') !== 'view');
      cur.classList.toggle('cursor--view', !!t && t.getAttribute('data-cursor') === 'view');
    });
    (function move() {
      dx += (x - dx) * 0.42; dy += (y - dy) * 0.42;
      rx += (x - rx) * 0.14; ry += (y - ry) * 0.14;
      if (dot) dot.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0) translate(-50%,-50%)';
      if (ring) ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      if (label) label.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      raf(move);
    })();
  })();

  var POLES = [
    { no: '01', title: 'Entreprise & sociétés', text: 'Constitution, gouvernance, contrats commerciaux et restructurations — une structure solide avant la croissance.', tags: ['SARL & SAS', 'Pactes', 'Cessions'], count: '6 expertises' },
    { no: '02', title: 'Digital & données', text: 'Conformité 09-08, contrats technologiques, propriété intellectuelle et e-commerce, sans freiner le produit.', tags: ['CNDP', 'CGV', 'Marques'], count: '5 expertises' },
    { no: '03', title: 'International & MRE', text: 'Investir au Maroc, constituer à distance, organiser la mobilité et la fiscalité internationale.', tags: ['MRE', 'Apostille', 'Change'], count: '6 expertises' },
    { no: '04', title: 'Fiscalité & change', text: 'Résidence fiscale, retenues à la source, Office des Changes et rapatriement des revenus.', tags: ['IGOC', 'RAS', 'Dividendes'], count: '4 expertises' }
  ];
  var preview = $('#preview');
  var indexList = $('#indexList');
  var items = $$('.index-item');
  if (items.length) {
    var previewNo = $('#previewNo'), previewTitle = $('#previewTitle'), previewText = $('#previewText'), previewTags = $('#previewTags'), previewCount = $('#previewCount');
    var fillPole = function (i) {
      var p = POLES[i];
      if (!p) return;
      if (previewNo) previewNo.textContent = p.no;
      if (previewTitle) previewTitle.textContent = p.title;
      if (previewText) previewText.textContent = p.text;
      if (previewTags) previewTags.innerHTML = p.tags.map(function (tag) { return '<li>' + tag + '</li>'; }).join('');
      if (previewCount) previewCount.textContent = p.count;
    };
    var setActive = function (i) {
      if (indexList) indexList.classList.add('is-active');
      items.forEach(function (it, k) { it.classList.toggle('is-active', k === i); });
      fillPole(i);
      if (preview && (fine || window.innerWidth > 980)) preview.classList.add('is-visible');
    };
    var clearActive = function () {
      if (indexList) indexList.classList.remove('is-active');
      items.forEach(function (it) { it.classList.remove('is-active'); });
      if (preview && (fine || window.innerWidth > 980)) preview.classList.remove('is-visible');
    };
    items.forEach(function (item, i) {
      item.addEventListener('mouseenter', function () { setActive(i); });
      item.addEventListener('focus', function () { setActive(i); });
      item.addEventListener('blur', clearActive);
      item.addEventListener('click', function () {
        setActive(i);
        var v = item.getAttribute('data-filter-value');
        if (v && typeof applyFilter === 'function') applyFilter(v);
        var target = $('#expertises');
        if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      });
    });
    if (indexList) indexList.addEventListener('mouseleave', clearActive);

    if (preview && fine && !reduce) {
      var px = window.innerWidth / 2, py = window.innerHeight / 2;
      var tx = px, ty = py, lastX = px, tilt = 0;
      window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
      (function follow() {
        px += (tx - px) * 0.12;
        py += (ty - py) * 0.12;
        var vel = Math.max(-7, Math.min(7, (px - lastX) * 0.55));
        tilt += (vel - tilt) * 0.1;
        lastX = px;
        if (window.innerWidth > 980) {
          var x2 = Math.max(12, Math.min(window.innerWidth - 312, px + 30));
          var y2 = Math.max(12, Math.min(window.innerHeight - 330, py - 170));
          preview.style.transform = 'translate3d(' + x2 + 'px,' + y2 + 'px,0) rotate(' + tilt.toFixed(2) + 'deg) scale(' + (preview.classList.contains('is-visible') ? 1 : 0.92) + ')';
        }
        raf(follow);
      })();
    }
  }

  if (fine && !reduce) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) * 0.16;
        var my = (e.clientY - r.top - r.height / 2) * 0.22;
        el.style.transform = 'translate(' + mx.toFixed(1) + 'px,' + my.toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }


  var counters = $$('[data-count]');
  if (counters.length && !reduce) {
    var animate = function (el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var start = null;
      var tick = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1400, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) raf(tick);
      };
      raf(tick);
    };
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animate(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(animate);
    }
  }

  var nicheGrid = $('[data-niche-grid]');
  if (nicheGrid) {
    var chips = $$('[data-filter]', $('[data-filters]') || document);
    var applyFilter = function (value) {
      var shown = 0;
      $$('.niche-card', nicheGrid).forEach(function (card) {
        var isCta = card.classList.contains('niche-card--cta');
        var cats = (card.getAttribute('data-cat') || '').split(' ');
        var show = isCta || value === 'all' || cats.indexOf(value) !== -1;
        card.hidden = !show;
        if (show && !isCta) shown++;
      });
      chips.forEach(function (chip) {
        chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter') === value));
      });
      var countEl = $('[data-niche-count]');
      if (countEl) countEl.textContent = shown + ' expertise' + (shown > 1 ? 's' : '');
    };
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () { applyFilter(chip.getAttribute('data-filter')); });
    });
  }

  var dialog = $('#niche-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    var fill = function (card) {
      var data = card._nicheData || {};
      $('#niche-dialog-no').textContent = data.no || '';
      $('#niche-dialog-title').textContent = data.title || '';
      $('#niche-dialog-summary').textContent = data.summary || '';
      $('#niche-dialog-for').innerHTML = (data.for || []).map(function (x) { return '<li>' + x + '</li>'; }).join('');
      $('#niche-dialog-missions').innerHTML = (data.missions || []).map(function (x) { return '<li>' + x + '</li>'; }).join('');
      var cta = $('#niche-dialog-cta');
      if (cta) cta.setAttribute('href', data.cta || '#contact');
    };
    $$('.niche-card').forEach(function (card) {
      if (card.classList.contains('niche-card--cta')) return;
      var dataScript = card.querySelector('script[type="application/json"]');
      try { card._nicheData = JSON.parse(dataScript ? dataScript.textContent : '{}'); } catch (e) { card._nicheData = {}; }
      card.addEventListener('click', function (event) {
        if (event.target.closest('a')) return;
        fill(card);
        dialog.showModal();
      });
    });
    $$('[data-dialog-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { dialog.close(); });
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  var blogList = $('[data-blog-list]');
  if (blogList) {
    var search = $('#blog-search');
    var bchips = $$('[data-blog-filter]');
    var empty = $('[data-blog-empty]');
    var count = $('[data-blog-count]');
    var activeCat = 'all';
    var render = function () {
      var query = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      $$('.post-card', blogList).forEach(function (card) {
        var hay = (card.getAttribute('data-search') || '').toLowerCase();
        var cats = (card.getAttribute('data-cat') || '').split(' ');
        var okCat = activeCat === 'all' || cats.indexOf(activeCat) !== -1;
        var okQuery = !query || hay.indexOf(query) !== -1;
        var show = okCat && okQuery;
        card.hidden = !show;
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = shown + ' article' + (shown > 1 ? 's' : '');
    };
    if (search) {
      var debounce;
      search.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(render, 120);
      });
    }
    bchips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeCat = chip.getAttribute('data-blog-filter');
        bchips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        render();
      });
    });
    render();
  }

  var prose = $('.prose');
  var tocLinks = $$('.toc a');
  if (prose && tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (link) {
      var id = (link.getAttribute('href') || '').replace('#', '');
      var heading = document.getElementById(id);
      if (heading) map[id] = link;
    });
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-100px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { sio.observe(document.getElementById(id)); });
  }

  var copyBtn = $('[data-copy-link]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var url = window.location.href;
      var done = function () { toast('Lien copié'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () { window.prompt('Copier le lien :', url); });
      } else {
        window.prompt('Copier le lien :', url);
      }
    });
  }

  $$('form[data-validate]').forEach(function (form) {
    var success = $('[data-form-success]', form.parentNode) || $('[data-form-success]', form);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      $$('[required]', form).forEach(function (input) {
        var field = input.closest('.field');
        var error = field ? $('.field-error', field) : null;
        var value = (input.value || '').trim();
        var ok = value !== '';
        if (ok && input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        if (!ok) valid = false;
        if (field) field.classList.toggle('has-error', !ok);
        if (error) {
          if (!error.id) error.id = (input.id || 'field') + '-error';
          error.textContent = ok ? '' : (input.type === 'email' ? 'Adresse e-mail invalide.' : 'Champ requis.');
        }
        if (ok) input.removeAttribute('aria-invalid');
        else {
          input.setAttribute('aria-invalid', 'true');
          if (error) input.setAttribute('aria-describedby', error.id);
        }
      });
      if (!valid) {
        var firstError = $('.has-error input, .has-error select, .has-error textarea', form);
        if (firstError) firstError.focus();
        return;
      }
      var data = {};
      $$('input, select, textarea', form).forEach(function (input) {
        if (input.name) data[input.name] = (input.value || '').trim();
      });
      var subject = 'Demande — ' + (data.topic || 'site') + (data.company ? ' — ' + data.company : '');
      var body = [
        'Nom : ' + (data.name || ''),
        'Société : ' + (data.company || '—'),
        'E-mail : ' + (data.email || ''),
        'Téléphone : ' + (data.phone || '—'),
        'Besoin : ' + (data.topic || '—'),
        '',
        data.message || ''
      ].join('\n');
      try { window.location.href = 'mailto:[email]?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); } catch (e) {}
      var button = $('button[type="submit"]', form);
      if (button) { button.disabled = true; button.textContent = 'Préparation…'; }
      setTimeout(function () {
        form.hidden = true;
        if (success) {
          success.hidden = false;
          var msg = success.querySelector('p');
          if (msg) msg.textContent = 'Votre logiciel de messagerie va s’ouvrir avec votre demande pré-remplie. Si rien ne se passe, écrivez-nous à [email].';
        }
        toast('Demande préparée');
      }, 350);
    });
    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field) field.classList.remove('has-error');
      });
    });
  });

  var newsletter = $('[data-newsletter]');
  if (newsletter) {
    newsletter.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = $('input', newsletter);
      if (!input || !input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        toast('Adresse e-mail invalide');
        if (input) input.focus();
        return;
      }
      input.value = '';
      toast('Inscription confirmée');
    });
  }

  $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  if ($('#hero')) {
    var mcta = document.createElement('a');
    mcta.className = 'mobile-cta';
    mcta.href = '#contact';
    mcta.innerHTML = 'Prendre rendez-vous <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(mcta);
    document.body.classList.add('has-mobile-cta');
    var mctaShown = false;
    window.addEventListener('scroll', function () {
      var show = window.scrollY > 520;
      if (show !== mctaShown) { mctaShown = show; mcta.classList.toggle('is-visible', show); }
    }, { passive: true });
  }

  if ($('#hero')) {
    var navLinks = $$('.topbar .nav a[href^="#"]');
    var spySections = [];
    navLinks.forEach(function (a) {
      var el = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (el) spySections.push({ link: a, el: el });
    });
    if (spySections.length && 'IntersectionObserver' in window) {
      var navIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          var hit = spySections.find(function (s) { return s.el === entry.target; });
          if (hit) hit.link.setAttribute('aria-current', 'location');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      spySections.forEach(function (s) { navIo.observe(s.el); });
    }
  }

  window.__avocatoReady = true;
})();
