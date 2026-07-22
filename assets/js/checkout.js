/* LUVIT — checkout: delivery details → fake payment gateway → success / declined.
   Demo rule: any card is accepted EXCEPT a number ending in 0000 (declined). */
(function () {
  'use strict';

  var state = 'delivery'; /* delivery | payment | success | declined */
  var completed = false;  /* order placed in this visit (cart already cleared) */
  var delivery = { name: '', phone: '', wilaya: '', address: '' };

  /* ---------- helpers ---------- */

  function show(id, visible) {
    document.getElementById(id).hidden = !visible;
  }

  function setSteps() {
    var s1 = document.getElementById('step1');
    var s2 = document.getElementById('step2');
    var s3 = document.getElementById('step3');
    [s1, s2, s3].forEach(function (s) { s.classList.remove('is-active', 'is-done'); });
    if (state === 'delivery') s1.classList.add('is-active');
    if (state === 'payment') { s1.classList.add('is-done'); s2.classList.add('is-active'); }
    if (state === 'success') { s1.classList.add('is-done'); s2.classList.add('is-done'); s3.classList.add('is-done'); }
    if (state === 'declined') { s1.classList.add('is-done'); s2.classList.add('is-active'); }
  }

  function setView() {
    show('panelDelivery', state === 'delivery');
    show('panelPayment', state === 'payment');
    show('panelSuccess', state === 'success');
    show('panelDeclined', state === 'declined');
    setSteps();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderWilayas() {
    var sel = document.getElementById('coWilaya');
    var lang = I18N.getLang();
    var current = sel.value;
    sel.innerHTML = DB.WILAYAS.map(function (w) {
      return '<option value="' + w.id + '">' + UI.esc(w[lang]) + '</option>';
    }).join('');
    if (current) sel.value = current;
  }

  function renderSummary() {
    var lines = DB.cartDetailed();
    var lang = I18N.getLang();
    document.getElementById('miniItems').innerHTML = lines.map(function (l) {
      return (
        '<div class="mini-item">' +
          '<span class="mini-item__art">' + UI.productMedia(l.product) + '</span>' +
          '<span>' +
            '<p class="mini-item__name">' + UI.esc(l.product.name[lang]) + '</p>' +
            '<p class="mini-item__qty">' + UI.esc(I18N.t('summary.qty')) + ': ' + l.qty + '</p>' +
          '</span>' +
          '<span class="mini-item__price">' + UI.esc(DB.fmtPrice(l.line)) + '</span>' +
        '</div>'
      );
    }).join('');

    var totals = DB.cartTotals();
    document.getElementById('coSubtotal').textContent = DB.fmtPrice(totals.subtotal);
    document.getElementById('coDelivery').textContent =
      totals.delivery === 0 ? I18N.t('cart.free') : DB.fmtPrice(totals.delivery);
    document.getElementById('coTotal').textContent = DB.fmtPrice(totals.total);
    document.getElementById('payBtn').textContent = I18N.t('pay.pay', { amount: DB.fmtPrice(totals.total) });
  }

  /* ---------- card input formatting ---------- */

  function digitsOnly(v) { return v.replace(/\D/g, ''); }

  function wireCardInputs() {
    var num = document.getElementById('ccNum');
    var name = document.getElementById('ccName');
    var exp = document.getElementById('ccExp');

    num.addEventListener('input', function () {
      var d = digitsOnly(num.value).slice(0, 16);
      num.value = (d.match(/.{1,4}/g) || []).join(' ');
      document.getElementById('cardfaceNum').textContent =
        num.value === '' ? '•••• •••• •••• ••••' : num.value;
    });
    name.addEventListener('input', function () {
      document.getElementById('cardfaceName').textContent =
        name.value.trim() === '' ? 'CARD HOLDER' : name.value.toUpperCase();
    });
    exp.addEventListener('input', function () {
      var d = digitsOnly(exp.value).slice(0, 4);
      exp.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
      document.getElementById('cardfaceExp').textContent = exp.value === '' ? 'MM/YY' : exp.value;
    });
  }

  /* ---------- payment ---------- */

  function validCard() {
    var d = digitsOnly(document.getElementById('ccNum').value);
    var exp = document.getElementById('ccExp').value;
    var cvv = document.getElementById('ccCvv').value;
    return d.length === 16 && /^\d{2}\/\d{2}$/.test(exp) && digitsOnly(cvv).length >= 3;
  }

  function placeOrder() {
    var lines = DB.cartDetailed();
    var totals = DB.cartTotals();
    var order = {
      id: 'o' + Date.now().toString(36),
      number: DB.newOrderNumber(),
      name: delivery.name,
      phone: delivery.phone,
      wilaya: delivery.wilaya,
      address: delivery.address,
      items: lines.map(function (l) {
        return { id: l.product.id, qty: l.qty, price: l.product.price, name: l.product.name };
      }),
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      total: totals.total,
      status: 'new',
      date: new Date().toISOString()
    };
    DB.addOrder(order);
    DB.clearCart();
    return order;
  }

  function pay() {
    var err = document.getElementById('payError');
    if (!validCard()) {
      err.classList.add('is-visible');
      return;
    }
    err.classList.remove('is-visible');

    var declined = digitsOnly(document.getElementById('ccNum').value).slice(-4) === '0000';
    var overlay = document.getElementById('processing');
    overlay.classList.add('is-visible');

    setTimeout(function () {
      overlay.classList.remove('is-visible');
      if (declined) {
        state = 'declined';
        setView();
        return;
      }
      var order = placeOrder();
      completed = true;
      document.getElementById('okMsg').textContent = I18N.t('ok.msg', { name: delivery.name.split(' ')[0] });
      document.getElementById('okOrderNum').textContent = order.number;
      UI.updateCartBadge();
      state = 'success';
      setView();
    }, 1900);
  }

  /* ---------- init ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    I18N.init();
    UI.initHeader();

    /* Empty cart → nothing to check out */
    if (DB.cartCount() === 0) {
      location.replace('cart.html');
      return;
    }

    renderWilayas();
    renderSummary();
    wireCardInputs();
    setView();

    document.getElementById('deliveryForm').addEventListener('submit', function (e) {
      e.preventDefault();
      delivery = {
        name: document.getElementById('coName').value.trim(),
        phone: document.getElementById('coPhone').value.trim(),
        wilaya: document.getElementById('coWilaya').value,
        address: document.getElementById('coAddress').value.trim()
      };
      var err = document.getElementById('deliveryError');
      if (!delivery.name || !delivery.phone || !delivery.address) {
        err.classList.add('is-visible');
        return;
      }
      err.classList.remove('is-visible');
      state = 'payment';
      setView();
    });

    document.getElementById('backToDelivery').addEventListener('click', function () {
      state = 'delivery';
      setView();
    });

    document.getElementById('payForm').addEventListener('submit', function (e) {
      e.preventDefault();
      pay();
    });

    document.getElementById('retryBtn').addEventListener('click', function () {
      state = 'payment';
      setView();
      document.getElementById('ccNum').focus();
    });

    document.addEventListener('luvit:lang', function () {
      renderWilayas();
      if (!completed) renderSummary();
      if (state === 'success') {
        document.getElementById('okMsg').textContent = I18N.t('ok.msg', { name: delivery.name.split(' ')[0] });
      }
    });
  });
})();
