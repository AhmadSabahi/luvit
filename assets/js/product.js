/* LUVIT — product details page */
(function () {
  'use strict';

  function getId() {
    return new URLSearchParams(location.search).get('id');
  }

  function stockLine(p) {
    if (p.stock <= 0) return '<p class="pd__stock out">' + UI.esc(I18N.t('pd.out')) + '</p>';
    if (p.stock <= 5) return '<p class="pd__stock low">' + UI.esc(I18N.t('pd.low', { n: p.stock })) + '</p>';
    return '<p class="pd__stock ok">✓ ' + UI.esc(I18N.t('pd.instock')) + '</p>';
  }

  function render() {
    var root = document.getElementById('pdRoot');
    var p = DB.getProduct(getId());
    var lang = I18N.getLang();

    if (!p) {
      root.innerHTML =
        '<div class="notfound">' +
          '<h1>' + UI.esc(I18N.t('pd.notfound')) + '</h1>' +
          '<a class="btn" href="index.html#shop">' + UI.esc(I18N.t('pd.back')) + '</a>' +
        '</div>';
      document.getElementById('relatedWrap').hidden = true;
      return;
    }

    document.title = p.name[lang] + ' — LUVIT';
    document.getElementById('crumbName').textContent = p.name[lang];
    var out = p.stock <= 0;

    root.innerHTML =
      '<article class="pd">' +
        '<div class="pd__media">' + UI.productMedia(p) + '</div>' +
        '<div class="pd__info">' +
          '<p class="pd__cat">' + UI.esc(I18N.t('cat.' + p.category)) + '</p>' +
          '<h1>' + UI.esc(p.name[lang]) + '</h1>' +
          '<p class="pd__tag">' + UI.esc(p.tagline[lang]) + '</p>' +
          '<p class="pd__price">' + UI.esc(DB.fmtPrice(p.price)) + '</p>' +
          stockLine(p) +
          '<div class="pd__buy">' +
            '<div class="qty">' +
              '<button type="button" id="qtyMinus" aria-label="−">−</button>' +
              '<input id="qtyInput" type="number" inputmode="numeric" value="1" min="1" max="' + Math.max(1, p.stock) + '" aria-label="' + UI.esc(I18N.t('pd.qty')) + '">' +
              '<button type="button" id="qtyPlus" aria-label="+">+</button>' +
            '</div>' +
            '<button class="btn btn--big" id="addBtn"' + (out ? ' disabled' : '') + '>' + UI.esc(I18N.t('pd.add')) + '</button>' +
          '</div>' +
          '<div class="accordion">' +
            '<details open><summary>' + UI.esc(I18N.t('pd.desc')) + '</summary><div class="acc-body">' + UI.esc(p.desc[lang]) + '</div></details>' +
            '<details><summary>' + UI.esc(I18N.t('pd.ing')) + '</summary><div class="acc-body">' + UI.esc(p.ingredients[lang]) + '</div></details>' +
            '<details><summary>' + UI.esc(I18N.t('pd.how')) + '</summary><div class="acc-body">' + UI.esc(p.howto[lang]) + '</div></details>' +
          '</div>' +
        '</div>' +
      '</article>';

    /* qty stepper */
    var input = document.getElementById('qtyInput');
    var clamp = function (n) { return Math.min(Math.max(1, n || 1), Math.max(1, p.stock)); };
    document.getElementById('qtyMinus').addEventListener('click', function () {
      input.value = clamp(parseInt(input.value, 10) - 1);
    });
    document.getElementById('qtyPlus').addEventListener('click', function () {
      input.value = clamp(parseInt(input.value, 10) + 1);
    });
    input.addEventListener('change', function () { input.value = clamp(parseInt(input.value, 10)); });

    document.getElementById('addBtn').addEventListener('click', function () {
      DB.addToCart(p.id, clamp(parseInt(input.value, 10)));
      UI.updateCartBadge();
      UI.toast(I18N.t('toast.added'));
    });

    /* related products: same category first, then others */
    var others = DB.getProducts().filter(function (x) { return x.id !== p.id; });
    var related = others.filter(function (x) { return x.category === p.category; })
      .concat(others.filter(function (x) { return x.category !== p.category; }))
      .slice(0, 4);
    var wrap = document.getElementById('relatedWrap');
    wrap.hidden = related.length === 0;
    var grid = document.getElementById('relatedGrid');
    grid.innerHTML = related.map(UI.productCard).join('');
    UI.revealGrid(grid);
  }

  document.addEventListener('DOMContentLoaded', function () {
    I18N.init();
    UI.initHeader();
    render();
    UI.wireAddButtons(document.getElementById('relatedGrid'));
    document.addEventListener('luvit:lang', render);
  });
})();
