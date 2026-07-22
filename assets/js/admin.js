/* LUVIT — admin panel (login, dashboard, products CRUD, orders).
   Demo auth: admin / luvit123, session kept in sessionStorage. */
(function () {
  'use strict';

  var SESSION_KEY = 'luvit_admin';
  var CREDS = { user: 'admin', pass: 'luvit123' };
  var STATUSES = ['new', 'shipped', 'delivered', 'cancelled'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var toastTimer = null;
  function toast(message) {
    var el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2200);
  }

  function loggedIn() {
    try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch (e) { return false; }
  }

  /* ================= LOGIN ================= */

  function initLogin() {
    if (loggedIn()) { location.replace('dashboard.html'); return; }
    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var u = document.getElementById('loginUser').value.trim();
      var p = document.getElementById('loginPass').value;
      if (u === CREDS.user && p === CREDS.pass) {
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (err) {}
        location.href = 'dashboard.html';
        return;
      }
      var err = document.getElementById('loginError');
      err.classList.add('is-visible');
      var card = document.getElementById('loginCard');
      card.classList.remove('shake');
      void card.offsetWidth; /* restart animation */
      card.classList.add('shake');
    });
  }

  /* ================= SHELL ================= */

  function initShell() {
    if (!loggedIn()) { location.replace('index.html'); return false; }

    var logout = document.getElementById('logoutBtn');
    if (logout) {
      logout.addEventListener('click', function (e) {
        e.preventDefault();
        try { sessionStorage.removeItem(SESSION_KEY); } catch (err) {}
        location.href = 'index.html';
      });
    }

    var toggle = document.getElementById('sideToggle');
    var side = document.getElementById('adminSide');
    var scrim = document.getElementById('sideScrim');
    if (toggle && side && scrim) {
      var close = function () {
        side.classList.remove('is-open');
        scrim.classList.remove('is-visible');
      };
      toggle.addEventListener('click', function () {
        side.classList.toggle('is-open');
        scrim.classList.toggle('is-visible', side.classList.contains('is-open'));
      });
      scrim.addEventListener('click', close);
      side.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    }
    return true;
  }

  /* Product visual for admin pages (one level below site root, hence the ../ prefix) */
  function media(p) {
    if (p.img) {
      var src = /^https?:/i.test(p.img) ? p.img : '../' + p.img;
      return '<img class="media-img" src="' + esc(src) + '" alt="" loading="lazy">';
    }
    return LuvitArt.productArt(p.art);
  }

  function statusPill(status) {
    return '<span class="status status--' + esc(status) + '">' + esc(I18N.t('st.' + status)) + '</span>';
  }

  function stockPill(stock) {
    var cls = stock <= 0 ? ' out' : (stock <= 5 ? ' low' : '');
    return '<span class="stock-pill' + cls + '">' + stock + '</span>';
  }

  function itemsCount(order) {
    return order.items.reduce(function (n, it) { return n + it.qty; }, 0);
  }

  /* ================= DASHBOARD ================= */

  function initDashboard() {
    function render() {
      var orders = DB.getOrders();
      var products = DB.getProducts();
      var active = orders.filter(function (o) { return o.status !== 'cancelled'; });
      var revenue = active.reduce(function (n, o) { return n + o.total; }, 0);
      var low = products.filter(function (p) { return p.stock <= 5; });

      document.getElementById('statRevenue').textContent = DB.fmtPrice(revenue);
      document.getElementById('statOrders').textContent = orders.length;
      document.getElementById('statProducts').textContent = products.length;
      document.getElementById('statLow').textContent = low.length;

      document.getElementById('recentBody').innerHTML = orders.slice(0, 5).map(function (o) {
        return (
          '<tr>' +
            '<td><strong>' + esc(o.number) + '</strong></td>' +
            '<td>' + esc(o.name) + '</td>' +
            '<td>' + esc(DB.fmtDate(o.date)) + '</td>' +
            '<td>' + itemsCount(o) + '</td>' +
            '<td class="price">' + esc(DB.fmtPrice(o.total)) + '</td>' +
            '<td>' + statusPill(o.status) + '</td>' +
          '</tr>'
        );
      }).join('');

      var lang = I18N.getLang();
      var lowBody = document.getElementById('lowBody');
      var lowEmpty = document.getElementById('lowEmpty');
      var lowWrap = document.getElementById('lowWrap');
      if (low.length === 0) {
        lowWrap.hidden = true;
        lowEmpty.hidden = false;
      } else {
        lowWrap.hidden = false;
        lowEmpty.hidden = true;
        lowBody.innerHTML = low.map(function (p) {
          return (
            '<tr>' +
              '<td><div class="prod-cell">' +
                '<span class="prod-cell__art">' + media(p) + '</span>' +
                '<span><p class="prod-cell__name">' + esc(p.name[lang]) + '</p></span>' +
              '</div></td>' +
              '<td>' + esc(I18N.t('cat.' + p.category)) + '</td>' +
              '<td class="price">' + esc(DB.fmtPrice(p.price)) + '</td>' +
              '<td>' + stockPill(p.stock) + '</td>' +
            '</tr>'
          );
        }).join('');
      }
    }
    render();
    document.addEventListener('luvit:lang', render);
  }

  /* ================= PRODUCTS ================= */

  var editingId = null;
  var artState = { shape: 'jar', palette: 'blush' };

  function initProducts() {
    var query = '';

    function render() {
      var lang = I18N.getLang();
      var list = DB.getProducts().filter(function (p) {
        if (!query) return true;
        var q = query.toLowerCase();
        return p.name.en.toLowerCase().indexOf(q) > -1 || (p.name.ar || '').indexOf(query) > -1;
      });
      document.getElementById('prodBody').innerHTML = list.map(function (p) {
        return (
          '<tr data-id="' + esc(p.id) + '">' +
            '<td><div class="prod-cell">' +
              '<span class="prod-cell__art">' + media(p) + '</span>' +
              '<span>' +
                '<p class="prod-cell__name">' + esc(p.name[lang]) + '</p>' +
                '<p class="prod-cell__sub">' + esc(p.name[lang === 'en' ? 'ar' : 'en']) + '</p>' +
              '</span>' +
            '</div></td>' +
            '<td>' + esc(I18N.t('cat.' + p.category)) + '</td>' +
            '<td class="price">' + esc(DB.fmtPrice(p.price)) + '</td>' +
            '<td>' + stockPill(p.stock) + '</td>' +
            '<td><div class="row-actions">' +
              '<button class="icon-btn js-edit" type="button" title="' + esc(I18N.t('adm.pr.edit')) + '">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>' +
              '</button>' +
              '<button class="icon-btn icon-btn--danger js-delete" type="button" title="' + esc(I18N.t('adm.pr.delete')) + '">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
              '</button>' +
            '</div></td>' +
          '</tr>'
        );
      }).join('');
      document.getElementById('prodEmpty').hidden = list.length > 0;
    }

    /* ----- modal form ----- */

    function fillSelects() {
      document.getElementById('fCat').innerHTML = DB.CATEGORIES.map(function (c) {
        return '<option value="' + c + '">' + esc(I18N.t('cat.' + c)) + '</option>';
      }).join('');
      document.getElementById('fShape').innerHTML = LuvitArt.SHAPES.map(function (s) {
        return '<option value="' + s + '">' + esc(I18N.t('shape.' + s)) + '</option>';
      }).join('');
    }

    function renderSwatches() {
      document.getElementById('fSwatches').innerHTML = Object.keys(LuvitArt.PALETTES).map(function (key) {
        var pal = LuvitArt.PALETTES[key];
        return '<button type="button" class="swatch' + (artState.palette === key ? ' is-active' : '') + '"' +
          ' data-pal="' + key + '" title="' + esc(I18N.t('pal.' + key)) + '"' +
          ' aria-label="' + esc(I18N.t('pal.' + key)) + '"' +
          ' style="background:linear-gradient(135deg,' + pal.hi + ',' + pal.lo + ');"></button>';
      }).join('');
    }

    function renderPreview() {
      var el = document.getElementById('fPreview');
      var url = document.getElementById('fImg').value.trim();
      if (url) {
        var src = /^https?:/i.test(url) ? url : '../' + url;
        el.innerHTML = '<img class="media-img" src="' + esc(src) + '" alt="" style="aspect-ratio:1/1;">';
      } else {
        el.innerHTML = LuvitArt.productArt(artState);
      }
    }

    function openModal(product) {
      editingId = product ? product.id : null;
      document.getElementById('prodModalTitle').textContent =
        I18N.t(product ? 'adm.pr.edit' : 'adm.pr.new');
      document.getElementById('prodError').classList.remove('is-visible');
      fillSelects();

      document.getElementById('fNameEn').value = product ? product.name.en : '';
      document.getElementById('fNameAr').value = product ? product.name.ar : '';
      document.getElementById('fTagEn').value = product ? product.tagline.en : '';
      document.getElementById('fTagAr').value = product ? product.tagline.ar : '';
      document.getElementById('fDescEn').value = product ? product.desc.en : '';
      document.getElementById('fDescAr').value = product ? product.desc.ar : '';
      document.getElementById('fPrice').value = product ? (product.price / 1000).toFixed(3) : '';
      document.getElementById('fStock').value = product ? product.stock : '';
      document.getElementById('fCat').value = product ? product.category : DB.CATEGORIES[0];
      document.getElementById('fFeatured').checked = product ? !!product.featured : false;
      document.getElementById('fImg').value = product ? (product.img || '') : '';

      artState = product
        ? { shape: product.art.shape, palette: product.art.palette }
        : { shape: 'jar', palette: 'blush' };
      document.getElementById('fShape').value = artState.shape;
      renderSwatches();
      renderPreview();

      document.getElementById('prodModal').classList.add('is-open');
      document.getElementById('fNameEn').focus();
    }

    function closeModal() {
      document.getElementById('prodModal').classList.remove('is-open');
      editingId = null;
    }

    function save(e) {
      e.preventDefault();
      var nameEn = document.getElementById('fNameEn').value.trim();
      var priceOmr = parseFloat(document.getElementById('fPrice').value);
      var stock = parseInt(document.getElementById('fStock').value, 10);
      var err = document.getElementById('prodError');

      if (!nameEn || isNaN(priceOmr) || priceOmr < 0 || isNaN(stock) || stock < 0) {
        err.classList.add('is-visible');
        return;
      }
      err.classList.remove('is-visible');

      var existing = editingId ? DB.getProduct(editingId) : null;
      var nameAr = document.getElementById('fNameAr').value.trim() || nameEn;
      var tagEn = document.getElementById('fTagEn').value.trim();
      var tagAr = document.getElementById('fTagAr').value.trim() || tagEn;
      var descEn = document.getElementById('fDescEn').value.trim();
      var descAr = document.getElementById('fDescAr').value.trim() || descEn;

      var product = {
        id: editingId || DB.newProductId(),
        category: document.getElementById('fCat').value,
        price: Math.round(priceOmr * 1000),
        stock: stock,
        featured: document.getElementById('fFeatured').checked,
        badge: existing ? existing.badge : '',
        img: document.getElementById('fImg').value.trim(),
        art: { shape: document.getElementById('fShape').value, palette: artState.palette },
        name: { en: nameEn, ar: nameAr },
        tagline: { en: tagEn, ar: tagAr },
        desc: { en: descEn, ar: descAr },
        ingredients: existing ? existing.ingredients : { en: '', ar: '' },
        howto: existing ? existing.howto : { en: '', ar: '' }
      };
      DB.upsertProduct(product);
      closeModal();
      render();
      toast(I18N.t('adm.pr.saved'));
    }

    /* ----- wiring ----- */

    document.getElementById('addProductBtn').addEventListener('click', function () { openModal(null); });
    document.getElementById('prodModalClose').addEventListener('click', closeModal);
    document.getElementById('prodCancel').addEventListener('click', closeModal);
    document.getElementById('prodModal').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
    document.getElementById('prodForm').addEventListener('submit', save);

    document.getElementById('fSwatches').addEventListener('click', function (e) {
      var sw = e.target.closest('.swatch');
      if (!sw) return;
      artState.palette = sw.getAttribute('data-pal');
      renderSwatches();
      renderPreview();
    });
    document.getElementById('fShape').addEventListener('change', function (e) {
      artState.shape = e.target.value;
      renderPreview();
    });
    document.getElementById('fImg').addEventListener('input', renderPreview);

    document.getElementById('prodBody').addEventListener('click', function (e) {
      var row = e.target.closest('tr');
      if (!row) return;
      var id = row.getAttribute('data-id');
      if (e.target.closest('.js-edit')) {
        openModal(DB.getProduct(id));
      } else if (e.target.closest('.js-delete')) {
        if (confirm(I18N.t('adm.pr.confirm'))) {
          DB.deleteProduct(id);
          render();
          toast(I18N.t('adm.pr.deleted'));
        }
      }
    });

    document.getElementById('prodSearch').addEventListener('input', function (e) {
      query = e.target.value.trim();
      render();
    });

    render();
    document.addEventListener('luvit:lang', function () {
      render();
      if (document.getElementById('prodModal').classList.contains('is-open')) {
        fillSelects();
        document.getElementById('fShape').value = artState.shape;
        renderSwatches();
      }
    });
  }

  /* ================= ORDERS ================= */

  function initOrders() {
    function render() {
      var orders = DB.getOrders();
      var body = document.getElementById('ordersBody');
      document.getElementById('ordersEmpty').hidden = orders.length > 0;

      body.innerHTML = orders.map(function (o) {
        var options = STATUSES.map(function (s) {
          return '<option value="' + s + '"' + (o.status === s ? ' selected' : '') + '>' +
            esc(I18N.t('st.' + s)) + '</option>';
        }).join('');
        return (
          '<tr data-id="' + esc(o.id) + '">' +
            '<td><strong>' + esc(o.number) + '</strong></td>' +
            '<td>' + esc(o.name) + '<br><span class="muted" style="font-size:12.5px;">' + esc(DB.wilayaName(o.wilaya)) + '</span></td>' +
            '<td>' + esc(DB.fmtDate(o.date)) + '</td>' +
            '<td>' + itemsCount(o) + '</td>' +
            '<td class="price">' + esc(DB.fmtPrice(o.total)) + '</td>' +
            '<td><select class="status-select js-status">' + options + '</select></td>' +
            '<td><button class="icon-btn js-view" type="button" title="' + esc(I18N.t('adm.or.detail')) + '">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>' +
            '</button></td>' +
          '</tr>'
        );
      }).join('');
    }

    function openDetail(order) {
      var lang = I18N.getLang();
      var items = order.items.map(function (it) {
        return (
          '<div class="mini-item" style="display:flex;align-items:center;gap:10px;padding-block:8px;border-bottom:1px solid var(--line);">' +
            '<span>' + esc(it.name[lang]) + ' × ' + it.qty + '</span>' +
            '<span style="margin-inline-start:auto;font-weight:700;">' + esc(DB.fmtPrice(it.price * it.qty)) + '</span>' +
          '</div>'
        );
      }).join('');

      document.getElementById('orderDetail').innerHTML =
        '<div class="od-row"><b>' + esc(I18N.t('tbl.order')) + '</b><span><strong>' + esc(order.number) + '</strong> · ' + statusPill(order.status) + '</span></div>' +
        '<div class="od-row"><b>' + esc(I18N.t('tbl.customer')) + '</b><span>' + esc(order.name) + '</span></div>' +
        '<div class="od-row"><b>' + esc(I18N.t('tbl.phone')) + '</b><span dir="ltr">' + esc(order.phone) + '</span></div>' +
        '<div class="od-row"><b>' + esc(I18N.t('tbl.address')) + '</b><span>' + esc(DB.wilayaName(order.wilaya)) + ' — ' + esc(order.address) + '</span></div>' +
        '<div class="od-row"><b>' + esc(I18N.t('tbl.date')) + '</b><span>' + esc(DB.fmtDate(order.date)) + '</span></div>' +
        '<div class="od-items">' + items + '</div>' +
        '<div class="summary-row"><span>' + esc(I18N.t('cart.subtotal')) + '</span><span class="price">' + esc(DB.fmtPrice(order.subtotal)) + '</span></div>' +
        '<div class="summary-row"><span>' + esc(I18N.t('cart.delivery')) + '</span><span class="price">' + (order.delivery === 0 ? esc(I18N.t('cart.free')) : esc(DB.fmtPrice(order.delivery))) + '</span></div>' +
        '<div class="summary-row summary-row--total"><span>' + esc(I18N.t('cart.total')) + '</span><span class="price">' + esc(DB.fmtPrice(order.total)) + '</span></div>';

      document.getElementById('orderModal').classList.add('is-open');
    }

    function closeDetail() {
      document.getElementById('orderModal').classList.remove('is-open');
    }

    document.getElementById('ordersBody').addEventListener('change', function (e) {
      if (!e.target.classList.contains('js-status')) return;
      var row = e.target.closest('tr');
      DB.setOrderStatus(row.getAttribute('data-id'), e.target.value);
      render();
    });

    document.getElementById('ordersBody').addEventListener('click', function (e) {
      if (!e.target.closest('.js-view')) return;
      var row = e.target.closest('tr');
      var order = DB.getOrders().find(function (o) { return o.id === row.getAttribute('data-id'); });
      if (order) openDetail(order);
    });

    document.getElementById('orderModalClose').addEventListener('click', closeDetail);
    document.getElementById('orderCloseBtn').addEventListener('click', closeDetail);
    document.getElementById('orderModal').addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeDetail();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDetail();
    });

    render();
    document.addEventListener('luvit:lang', render);
  }

  /* ================= BOOT ================= */

  document.addEventListener('DOMContentLoaded', function () {
    I18N.init();
    var page = document.body.getAttribute('data-page');
    if (page === 'login') { initLogin(); return; }
    if (!initShell()) return;
    if (page === 'dashboard') initDashboard();
    if (page === 'products') initProducts();
    if (page === 'orders') initOrders();
  });
})();
