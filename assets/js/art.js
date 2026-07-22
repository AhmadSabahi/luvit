/* LUVIT — generated SVG product art (no image files needed).
   Every product gets { shape, palette } and is drawn as a warm, cohesive illustration.
   Embroidery/beadwork shimmer (.art-glint) is animated from base.css. */
(function (global) {
  'use strict';

  var PALETTES = {
    black:    { bg: '#F1ECE6', hi: '#4A4A4A', lo: '#161616', cap: '#0A0A0A', deco: '#C7A97E', trim: '#E4C99A' },
    charcoal: { bg: '#EFEAE3', hi: '#6B6660', lo: '#332F2B', cap: '#1E1B18', deco: '#B7A78C', trim: '#D8C7A8' },
    sand:     { bg: '#F6EFE3', hi: '#E4CFA8', lo: '#BE9F70', cap: '#6E5636', deco: '#8E5C45', trim: '#F0DBB8' },
    taupe:    { bg: '#F2ECE4', hi: '#C9B8A4', lo: '#9C8872', cap: '#5C4C3C', deco: '#8E5C45', trim: '#E6D3BC' },
    rust:     { bg: '#F5E7DD', hi: '#B3785A', lo: '#8E5C45', cap: '#4A2C1E', deco: '#6E4630', trim: '#E8B896' },
    burgundy: { bg: '#F1E4E1', hi: '#8A4A46', lo: '#5C2A28', cap: '#2E1210', deco: '#B98276', trim: '#D9A99A' },
    olive:    { bg: '#EEEEE1', hi: '#7C7A54', lo: '#4C4A30', cap: '#242316', deco: '#A79B6E', trim: '#D9CFA0' },
    ivory:    { bg: '#F8F4EC', hi: '#EDE3CF', lo: '#D8C7A8', cap: '#8E5C45', deco: '#B7A78C', trim: '#F3E9D4' }
  };

  var SHAPES = ['draped', 'buttoned', 'embellished', 'kimono', 'kaftan', 'shawl'];

  var uid = 0;

  /* Garment body trapezoid: shoulders at (200 ± topHalf, 100), hem at (200 ± hemHalf, 358) */
  function bodyPath(topHalf, hemHalf, fill, opacity) {
    var d = 'M' + (200 - topHalf) + ' 100 Q200 84 ' + (200 + topHalf) + ' 100 ' +
      'L' + (200 + hemHalf) + ' 358 Q200 376 ' + (200 - hemHalf) + ' 358 Z';
    return '<path d="' + d + '" fill="' + fill + '"' + (opacity ? ' opacity="' + opacity + '"' : '') + '/>';
  }
  function hemShadow(cap) {
    return '<ellipse cx="200" cy="362" rx="150" ry="13" fill="' + cap + '" opacity=".16"/>';
  }
  function collarNotch(cap) {
    return '<path d="M182 100 Q200 118 218 100" fill="none" stroke="' + cap + '" stroke-width="4" opacity=".8"/>';
  }
  function drapeFolds(color) {
    return (
      '<path d="M160 118 C150 200 140 282 120 350" stroke="' + color + '" stroke-width="3" fill="none" opacity=".3"/>' +
      '<path d="M200 106 C196 200 196 282 196 356" stroke="' + color + '" stroke-width="3" fill="none" opacity=".24"/>' +
      '<path d="M240 118 C250 200 260 282 280 350" stroke="' + color + '" stroke-width="3" fill="none" opacity=".3"/>'
    );
  }

  function vessel(shape, p, gid) {
    var g = 'url(#' + gid + ')';
    switch (shape) {
      case 'draped': /* everyday closed abaya, soft drape folds */
        return (
          bodyPath(60, 140, g) +
          collarNotch(p.cap) +
          drapeFolds(p.lo) +
          hemShadow(p.cap)
        );
      case 'buttoned': /* front-open, button placket, lapel notch */
        return (
          bodyPath(60, 140, g) +
          '<path d="M176 100 L200 130 L224 100" fill="none" stroke="' + p.cap + '" stroke-width="4" opacity=".85"/>' +
          '<rect x="193" y="118" width="14" height="238" fill="' + p.bg + '" opacity=".45"/>' +
          '<circle cx="200" cy="146" r="4" fill="' + p.cap + '"/>' +
          '<circle cx="200" cy="182" r="4" fill="' + p.cap + '"/>' +
          '<circle cx="200" cy="218" r="4" fill="' + p.cap + '"/>' +
          '<circle cx="200" cy="254" r="4" fill="' + p.cap + '"/>' +
          '<circle cx="200" cy="290" r="4" fill="' + p.cap + '"/>' +
          '<circle cx="200" cy="326" r="4" fill="' + p.cap + '"/>' +
          drapeFolds(p.lo) +
          hemShadow(p.cap)
        );
      case 'embellished': /* decorative embroidered/beaded front panel */
        return (
          bodyPath(60, 140, g) +
          collarNotch(p.cap) +
          drapeFolds(p.lo) +
          '<rect x="181" y="112" width="38" height="234" rx="7" fill="' + p.deco + '" opacity=".24"/>' +
          diamondLattice(200, 132, 34, p.deco) +
          '<circle class="art-glint" cx="200" cy="132" r="5" fill="' + p.trim + '"/>' +
          '<circle class="art-glint" style="animation-delay:.8s" cx="200" cy="200" r="5" fill="' + p.trim + '"/>' +
          '<circle class="art-glint" style="animation-delay:1.6s" cx="200" cy="268" r="5" fill="' + p.trim + '"/>' +
          '<circle class="art-glint" style="animation-delay:2.3s" cx="200" cy="330" r="5" fill="' + p.trim + '"/>' +
          hemShadow(p.cap)
        );
      case 'kimono': /* wide flared kimono sleeves, occasion silhouette */
        return (
          '<path d="M140 112 L38 196 L70 306 L152 208 Z" fill="' + p.hi + '" opacity=".92"/>' +
          '<path d="M140 112 L38 196 L70 306 L152 208 Z" fill="none" stroke="' + p.lo + '" stroke-width="2" opacity=".4"/>' +
          '<path d="M260 112 L362 196 L330 306 L248 208 Z" fill="' + p.hi + '" opacity=".92"/>' +
          '<path d="M260 112 L362 196 L330 306 L248 208 Z" fill="none" stroke="' + p.lo + '" stroke-width="2" opacity=".4"/>' +
          bodyPath(56, 132, g) +
          collarNotch(p.cap) +
          drapeFolds(p.lo) +
          hemShadow(p.cap)
        );
      case 'kaftan': /* voluminous, dropped sleeves, patch pockets */
        return (
          bodyPath(90, 160, g) +
          '<rect x="56" y="118" width="76" height="52" rx="12" fill="' + g + '"/>' +
          '<rect x="268" y="118" width="76" height="52" rx="12" fill="' + g + '"/>' +
          collarNotch(p.cap) +
          '<rect x="94" y="272" width="52" height="62" rx="9" fill="' + p.lo + '" opacity=".22"/>' +
          '<rect x="254" y="272" width="52" height="62" rx="9" fill="' + p.lo + '" opacity=".22"/>' +
          drapeFolds(p.lo) +
          hemShadow(p.cap)
        );
      case 'shawl': /* folded flat-lay hijab/shawl */
        return (
          '<g transform="rotate(-4 200 240)"><rect x="62" y="158" width="276" height="176" rx="24" fill="' + g + '"/></g>' +
          '<g transform="rotate(3 200 196)"><rect x="96" y="122" width="208" height="150" rx="20" fill="' + p.hi + '" opacity=".85"/></g>' +
          '<g transform="rotate(-2 200 158)"><rect x="122" y="98" width="156" height="122" rx="18" fill="' + p.lo + '" opacity=".55"/></g>' +
          '<path d="M140 116 Q200 132 260 116" stroke="' + p.cap + '" stroke-width="2.5" fill="none" opacity=".3"/>' +
          (p.rosette ? rosette(288, 132, p) : '')
        );
      default:
        return '';
    }
  }

  /* Small repeating diamond/lattice motif for the embellished front panel */
  function diamondLattice(cx, startY, step, color) {
    var out = '';
    for (var i = 0; i < 7; i++) {
      var y = startY + i * step;
      out += '<rect x="' + (cx - 7) + '" y="' + (y - 7) + '" width="14" height="14" fill="' + color + '" opacity="' +
        (i % 2 === 0 ? '.85' : '.55') + '" transform="rotate(45 ' + cx + ' ' + y + ')"/>';
    }
    return out;
  }

  /* Small hand-embroidered rosette motif (Rosette Embroidered Hijab) */
  function rosette(cx, cy, p) {
    var petals = '';
    for (var i = 0; i < 6; i++) {
      var a = i * 60;
      petals += '<ellipse class="art-glint" style="animation-delay:' + (i * 0.4) + 's" cx="' + cx + '" cy="' + (cy - 10) +
        '" rx="6" ry="10" fill="' + p.trim + '" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')"/>';
    }
    return petals + '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="' + p.cap + '"/>';
  }

  /**
   * productArt({shape:'draped', palette:'black'}, {className:'...'})
   * Returns an <svg> string, viewBox 0 0 400 400.
   */
  function productArt(art, opts) {
    opts = opts || {};
    var p = PALETTES[art && art.palette] || PALETTES.sand;
    /* palette 'rust' hijabs get the rosette accent — ties the Zahra abaya and its matching hijab together */
    p = (art && art.palette === 'rust') ? Object.assign({}, p, { rosette: true }) : p;
    var shape = (art && SHAPES.indexOf(art.shape) > -1) ? art.shape : 'draped';
    var gid = 'lv' + (++uid);
    var cls = opts.className ? ' class="' + opts.className + '"' : '';
    return (
      '<svg' + cls + ' viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="' + p.hi + '"/><stop offset="1" stop-color="' + p.lo + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="400" height="400" fill="' + p.bg + '"/>' +
      '<circle cx="330" cy="70" r="110" fill="#FFFFFF" opacity=".4"/>' +
      '<circle cx="40" cy="360" r="130" fill="' + p.deco + '" opacity=".10"/>' +
      vessel(shape, p, gid) +
      '</svg>'
    );
  }

  /* ---------- Decorative scenes (hero tiles + about) ---------- */

  /* Light, warm 3:4 tiles for the hero. kind: 'draped' | 'embellished' */
  function heroScene(kind) {
    var gid = 'lvglow' + (++uid);
    var p = kind === 'embellished' ? PALETTES.rust : PALETTES.black;
    var head =
      '<svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="' + p.hi + '"/><stop offset="1" stop-color="' + p.lo + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="300" height="400" fill="' + p.bg + '"/>' +
      /* pointed-arch frame, echoing the logo's Islamic-architecture line-work */
      '<path d="M34 388V186c0-84 42-134 116-134s116 50 116 134v202" fill="none" stroke="#724A37" stroke-width="2" opacity=".3"/>';

    var bodyD = 'M' + (150 - 44) + ' 96 Q150 82 ' + (150 + 44) + ' 96 L' + (150 + 96) + ' 340 Q150 356 ' + (150 - 96) + ' 340 Z';
    var garment = '<path d="' + bodyD + '" fill="url(#' + gid + ')"/>' +
      '<path d="M132 96 Q150 112 168 96" fill="none" stroke="' + p.cap + '" stroke-width="3" opacity=".7"/>' +
      '<ellipse cx="150" cy="344" rx="108" ry="11" fill="' + p.cap + '" opacity=".15"/>';

    if (kind === 'embellished') {
      garment +=
        '<rect x="135" y="108" width="30" height="204" rx="6" fill="' + p.deco + '" opacity=".26"/>' +
        '<circle class="art-glint" cx="150" cy="130" r="4" fill="' + p.trim + '"/>' +
        '<circle class="art-glint" style="animation-delay:.9s" cx="150" cy="210" r="4" fill="' + p.trim + '"/>' +
        '<circle class="art-glint" style="animation-delay:1.7s" cx="150" cy="290" r="4" fill="' + p.trim + '"/>';
    }
    return head + garment + '</svg>';
  }

  /* Warm, light 4:3 scene for the About section */
  function aboutScene() {
    var gid = 'lvab' + (++uid);
    var p = PALETTES.black;
    return (
      '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="' + p.hi + '"/><stop offset="1" stop-color="' + p.lo + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="400" height="300" fill="#F4E3D3"/>' +
      '<circle cx="330" cy="54" r="86" fill="#FFFFFF" opacity=".5"/>' +
      '<circle cx="40" cy="280" r="110" fill="#8E5C45" opacity=".10"/>' +
      /* draped abaya, left */
      '<path d="M96 76 Q140 62 184 76 L200 268 Q140 282 80 268 Z" fill="url(#' + gid + ')"/>' +
      '<path d="M124 76 Q140 90 156 76" fill="none" stroke="' + p.cap + '" stroke-width="3" opacity=".7"/>' +
      '<ellipse cx="140" cy="270" rx="66" ry="9" fill="' + p.cap + '" opacity=".15"/>' +
      /* small folded shawl stack, right */
      '<g transform="rotate(-3 306 190)"><rect x="270" y="150" width="96" height="70" rx="12" fill="#8E5C45" opacity=".85"/></g>' +
      '<g transform="rotate(2 306 168)"><rect x="282" y="130" width="72" height="56" rx="10" fill="#B3785A" opacity=".8"/></g>' +
      '<ellipse cx="200" cy="262" rx="150" ry="12" fill="#57492F" opacity=".08"/>' +
      '</svg>'
    );
  }

  global.LuvitArt = {
    productArt: productArt,
    heroScene: heroScene,
    aboutScene: aboutScene,
    PALETTES: PALETTES,
    SHAPES: SHAPES
  };
})(window);
