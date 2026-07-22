/* LUVIT — shared storefront UI helpers */
(function (global) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var lastCount = null;
  function updateCartBadge() {
    var n = DB.cartCount();
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = n;
      el.classList.toggle('is-empty', n === 0);
      if (lastCount !== null && n > lastCount) {
        el.classList.remove('pop');
        void el.offsetWidth; /* restart animation */
        el.classList.add('pop');
      }
    });
    lastCount = n;
  }

  /* ---------- Scroll-reveal (elements with .reveal fade in as they enter) ---------- */
  var revealObserver = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-revealed');
            revealObserver.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' })
    : null;

  function reveal(root) {
    var els = (root || document).querySelectorAll('.reveal:not(.is-revealed)');
    els.forEach(function (el) {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add('is-revealed');
    });
  }

  /* Tag a freshly-rendered grid's children with staggered reveals */
  function revealGrid(container) {
    if (!container) return;
    Array.prototype.forEach.call(container.children, function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', ((i % 4) * 0.07) + 's');
    });
    reveal(container);
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

  /* Product visual: real photo when the product has one, generated SVG art otherwise.
     `prefix` fixes relative paths from subfolders (admin pages pass '../'). */
  function productMedia(p, prefix) {
    if (p.img) {
      var src = /^https?:/i.test(p.img) ? p.img : (prefix || '') + p.img;
      var lang = I18N.getLang();
      return '<img class="media-img" src="' + esc(src) + '" alt="' + esc(p.name[lang]) + '" loading="lazy">';
    }
    return LuvitArt.productArt(p.art);
  }

  function badgeFor(product) {
    if (product.stock <= 0) return { key: 'badge.out', cls: 'badge--out' };
    if (product.badge === 'bestseller') return { key: 'badge.bestseller', cls: 'badge--best' };
    if (product.badge === 'new') return { key: 'badge.new', cls: 'badge--new' };
    if (product.stock <= 5) return { key: 'badge.low', cls: 'badge--low' };
    return null;
  }

  /* One product card (used on home grid + related products) */
  function productCard(p) {
    var lang = I18N.getLang();
    var badge = badgeFor(p);
    var out = p.stock <= 0;
    return (
      '<article class="card" data-id="' + esc(p.id) + '">' +
        '<a class="card__media" href="product.html?id=' + esc(p.id) + '" aria-label="' + esc(p.name[lang]) + '">' +
          productMedia(p) +
          (badge ? '<span class="badge ' + badge.cls + '">' + esc(I18N.t(badge.key)) + '</span>' : '') +
        '</a>' +
        '<div class="card__body">' +
          '<p class="card__cat">' + esc(I18N.t('cat.' + p.category)) + '</p>' +
          '<h3 class="card__name"><a href="product.html?id=' + esc(p.id) + '">' + esc(p.name[lang]) + '</a></h3>' +
          '<p class="card__tag">' + esc(p.tagline[lang]) + '</p>' +
          '<div class="card__foot">' +
            '<span class="card__price">' + esc(DB.fmtPrice(p.price)) + '</span>' +
            '<button class="btn btn--small js-add" data-id="' + esc(p.id) + '"' + (out ? ' disabled' : '') + '>' +
              esc(I18N.t('card.add')) +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* Delegate clicks inside any container that holds cards:
     "Add to cart" stays a button; a click anywhere else on the card opens the details page */
  function wireAddButtons(container) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-add');
      if (btn) {
        if (!btn.disabled) {
          DB.addToCart(btn.getAttribute('data-id'), 1);
          updateCartBadge();
          toast(I18N.t('toast.added'));
        }
        return;
      }
      if (e.target.closest('a')) return; /* image/title links navigate on their own */
      var card = e.target.closest('.card[data-id]');
      if (card) location.href = 'product.html?id=' + encodeURIComponent(card.getAttribute('data-id'));
    });
  }

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    var burger = document.querySelector('.nav-burger');
    var nav = document.querySelector('.site-nav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          nav.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    }
    updateCartBadge();
    reveal();
  }

  global.UI = {
    esc: esc,
    toast: toast,
    updateCartBadge: updateCartBadge,
    productCard: productCard,
    productMedia: productMedia,
    wireAddButtons: wireAddButtons,
    badgeFor: badgeFor,
    initHeader: initHeader,
    reveal: reveal,
    revealGrid: revealGrid
  };
})(window);
