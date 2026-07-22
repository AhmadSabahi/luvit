/* LUVIT — cart page */
(function () {
  'use strict';

  function lineHtml(l) {
    var lang = I18N.getLang();
    var p = l.product;
    return (
      '<div class="cart-line" data-id="' + UI.esc(p.id) + '">' +
        '<a class="cart-line__art" href="product.html?id=' + UI.esc(p.id) + '" aria-hidden="true" tabindex="-1">' +
          UI.productMedia(p) +
        '</a>' +
        '<div>' +
          '<h3 class="cart-line__name"><a href="product.html?id=' + UI.esc(p.id) + '">' + UI.esc(p.name[lang]) + '</a></h3>' +
          '<p class="cart-line__unit">' + UI.esc(DB.fmtPrice(p.price)) + '</p>' +
          '<div class="cart-line__ctrls">' +
            '<div class="qty">' +
              '<button type="button" class="js-minus" aria-label="−">−</button>' +
              '<input type="number" inputmode="numeric" class="js-qty" value="' + l.qty + '" min="1" aria-label="' + UI.esc(I18N.t('pd.qty')) + '">' +
              '<button type="button" class="js-plus" aria-label="+">+</button>' +
            '</div>' +
            '<button type="button" class="cart-line__remove js-remove">' + UI.esc(I18N.t('cart.remove')) + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="cart-line__total">' + UI.esc(DB.fmtPrice(l.line)) + '</div>' +
      '</div>'
    );
  }

  function render() {
    var lines = DB.cartDetailed();
    var empty = document.getElementById('cartEmpty');
    var layout = document.getElementById('cartLayout');

    if (lines.length === 0) {
      empty.hidden = false;
      layout.hidden = true;
      UI.updateCartBadge();
      return;
    }
    empty.hidden = true;
    layout.hidden = false;

    document.getElementById('cartLines').innerHTML = lines.map(lineHtml).join('');

    var totals = DB.cartTotals();
    document.getElementById('sumSubtotal').textContent = DB.fmtPrice(totals.subtotal);
    document.getElementById('sumDelivery').textContent =
      totals.delivery === 0 ? I18N.t('cart.free') : DB.fmtPrice(totals.delivery);
    document.getElementById('sumTotal').textContent = DB.fmtPrice(totals.total);

    var note = document.getElementById('freeNote');
    if (totals.subtotal >= DB.FREE_DELIVERY_MIN) {
      note.textContent = I18N.t('cart.freeok');
    } else {
      note.textContent = I18N.t('cart.freenote', { amount: DB.fmtPrice(DB.FREE_DELIVERY_MIN - totals.subtotal) });
    }
    UI.updateCartBadge();
  }

  document.addEventListener('DOMContentLoaded', function () {
    I18N.init();
    UI.initHeader();
    render();

    document.getElementById('cartLines').addEventListener('click', function (e) {
      var row = e.target.closest('.cart-line');
      if (!row) return;
      var id = row.getAttribute('data-id');
      var input = row.querySelector('.js-qty');
      var qty = parseInt(input.value, 10) || 1;

      if (e.target.closest('.js-minus')) DB.setQty(id, qty - 1);
      else if (e.target.closest('.js-plus')) DB.setQty(id, qty + 1);
      else if (e.target.closest('.js-remove')) DB.removeFromCart(id);
      else return;
      render();
    });

    document.getElementById('cartLines').addEventListener('change', function (e) {
      var row = e.target.closest('.cart-line');
      if (!row || !e.target.classList.contains('js-qty')) return;
      var qty = parseInt(e.target.value, 10);
      DB.setQty(row.getAttribute('data-id'), isNaN(qty) ? 1 : Math.max(1, qty));
      render();
    });

    document.addEventListener('luvit:lang', render);
  });
})();
