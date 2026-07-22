/* LUVIT — home page logic */
(function () {
  'use strict';

  var activeCat = 'all';
  var query = '';

  function renderHeroArt() {
    var el = document.getElementById('heroArt');
    if (!el) return;
    el.innerHTML =
      '<div class="art-tile">' + LuvitArt.heroScene('draped') + '</div>' +
      '<div class="art-tile">' + LuvitArt.heroScene('embellished') + '</div>';
  }

  function renderAboutArt() {
    var el = document.getElementById('aboutArt');
    if (!el) return;
    el.innerHTML = LuvitArt.aboutScene();
  }

  function renderFeatured() {
    var el = document.getElementById('featuredGrid');
    if (!el) return;
    var featured = DB.getProducts().filter(function (p) { return p.featured; }).slice(0, 4);
    el.innerHTML = featured.map(UI.productCard).join('');
    UI.revealGrid(el);
  }

  function renderChips() {
    var el = document.getElementById('catChips');
    if (!el) return;
    var cats = ['all'].concat(DB.CATEGORIES);
    el.innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip' + (c === activeCat ? ' is-active' : '') + '" data-cat="' + c + '">' +
        UI.esc(I18N.t('cat.' + c)) + '</button>';
    }).join('');
  }

  function matches(p) {
    if (activeCat !== 'all' && p.category !== activeCat) return false;
    if (!query) return true;
    var q = query.toLowerCase();
    return (
      p.name.en.toLowerCase().indexOf(q) > -1 ||
      (p.name.ar || '').indexOf(query) > -1 ||
      p.tagline.en.toLowerCase().indexOf(q) > -1 ||
      (p.tagline.ar || '').indexOf(query) > -1
    );
  }

  function renderShop() {
    var el = document.getElementById('shopGrid');
    var empty = document.getElementById('shopEmpty');
    if (!el) return;
    var list = DB.getProducts().filter(matches);
    el.innerHTML = list.map(UI.productCard).join('');
    UI.revealGrid(el);
    if (empty) empty.hidden = list.length > 0;
  }

  function renderAll() {
    renderHeroArt();
    renderAboutArt();
    renderFeatured();
    renderChips();
    renderShop();
  }

  document.addEventListener('DOMContentLoaded', function () {
    I18N.init();
    UI.initHeader();
    renderAll();

    document.getElementById('catChips').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      activeCat = chip.getAttribute('data-cat');
      renderChips();
      renderShop();
    });

    document.getElementById('searchInput').addEventListener('input', function (e) {
      query = e.target.value.trim();
      renderShop();
    });

    UI.wireAddButtons(document.getElementById('featuredGrid'));
    UI.wireAddButtons(document.getElementById('shopGrid'));

    document.addEventListener('luvit:lang', renderAll);
  });
})();
