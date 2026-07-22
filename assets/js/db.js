/* LUVIT — data layer.
   localStorage acts as the demo "database": products, orders, cart.
   Prices are stored in BAISA (1 OMR = 1000 baisa) to avoid floating-point errors. */
(function (global) {
  'use strict';

  var K = {
    products: 'luvit_products',
    orders: 'luvit_orders',
    cart: 'luvit_cart',
    seed: 'luvit_seed_v2'
  };

  var FREE_DELIVERY_MIN = 35000; /* baisa */
  var DELIVERY_FEE = 2000;       /* baisa */

  var CATEGORIES = ['classic', 'embroidered', 'occasion', 'kaftans', 'hijabs'];

  /* ---------- Seed data ---------- */

  var SEED_PRODUCTS = [
    {
      id: 'p1', category: 'classic', price: 24000, stock: 30, featured: true, badge: 'bestseller',
      art: { shape: 'draped', palette: 'black' },
      img: 'assets/img/products/p1.jpg',
      name: { en: 'Essential Black Abaya', ar: 'عباية سوداء أساسية' },
      tagline: { en: 'The everyday abaya, cut for effortless movement.', ar: 'عباية اليوميات، مفصّلة لحرية الحركة.' },
      desc: {
        en: 'Our best-selling silhouette in a heavyweight matte crepe that skims the body without clinging. A dropped shoulder and soft A-line cut make it easy to move, pray and sit in comfortably, from the school run to the majlis.',
        ar: 'قصّتنا الأكثر مبيعًا بخامة الكريب الثقيل المطفي الذي ينساب على الجسم دون التصاق. كتف منسدل وقصة أ خط ناعمة تمنحك سهولة الحركة والصلاة والجلوس، من توصيل الأطفال إلى المجلس.'
      },
      ingredients: { en: '100% matte crepe. Machine wash cold, hang dry, cool iron if needed.', ar: '100% كريب مطفي. يُغسل بالغسالة بماء بارد، يُجفف معلقًا، ويُكوى بحرارة منخفضة عند الحاجة.' },
      howto: { en: 'Wear open over a simple dress, or closed with the inner tie for a polished daily look.', ar: 'تُلبس مفتوحة فوق فستان بسيط، أو مغلقة بالرباط الداخلي لإطلالة يومية أنيقة.' }
    },
    {
      id: 'p2', category: 'classic', price: 27500, stock: 24, featured: true, badge: '',
      art: { shape: 'buttoned', palette: 'charcoal' },
      img: 'assets/img/products/p2.jpg',
      name: { en: 'Open-Front Button Abaya', ar: 'عباية أمامية بأزرار' },
      tagline: { en: 'A structured front-open abaya you can dress up or down.', ar: 'عباية أمامية مفتوحة بقصة منظّمة تناسب كل مناسبة.' },
      desc: {
        en: 'A refined charcoal abaya with a centre button placket from collar to hem, so it layers beautifully over an abaya dress or jeans. The nida fabric holds its shape all day without feeling stiff.',
        ar: 'عباية رمادية داكنة أنيقة بأزرار أمامية من الياقة حتى الطرف، تُلبس بشكل جميل فوق فستان العباية أو البنطال. قماش النيدا يحافظ على شكله طوال اليوم دون أن يكون قاسيًا.'
      },
      ingredients: { en: '100% nida fabric. Dry clean recommended for a crisp finish.', ar: '100% قماش نيدا. يُفضّل التنظيف الجاف للحفاظ على مظهره الأنيق.' },
      howto: { en: 'Leave open over separates for daytime, or button fully for a modest evening look.', ar: 'تُترك مفتوحة فوق ملابس منفصلة للنهار، أو تُزرّر بالكامل لإطلالة مسائية محتشمة.' }
    },
    {
      id: 'p3', category: 'classic', price: 22000, stock: 26, featured: false, badge: '',
      art: { shape: 'draped', palette: 'sand' },
      img: 'assets/img/products/p3.jpg',
      name: { en: 'Butter Crepe Abaya — Sand', ar: 'عباية كريب ناعمة — رملي' },
      tagline: { en: 'Soft, breathable and easy on warm Omani days.', ar: 'قماش ناعم يتنفس، مثالي لأيام عُمان الدافئة.' },
      desc: {
        en: 'A lightweight butter-soft crepe in a warm sand tone, cut with a relaxed A-line so it never clings in the heat. A quiet, versatile alternative to black for everyday wear.',
        ar: 'كريب خفيف وناعم بلون رملي دافئ، بقصة أ خط مريحة لا تلتصق بالجسم في الحر. بديل هادئ ومتعدد الاستخدامات عن الأسود للارتداء اليومي.'
      },
      ingredients: { en: '100% butter crepe. Machine wash cold with similar colours.', ar: '100% كريب ناعم. يُغسل بالغسالة بماء بارد مع ألوان مشابهة.' },
      howto: { en: 'Pairs naturally with a matching or ivory hijab for a soft, monochrome look.', ar: 'تتناسق بشكل طبيعي مع حجاب بنفس اللون أو بلون عاجي لإطلالة ناعمة أحادية اللون.' }
    },
    {
      id: 'p4', category: 'embroidered', price: 39000, stock: 14, featured: true, badge: 'bestseller',
      art: { shape: 'embellished', palette: 'black' },
      img: 'assets/img/products/p4.jpg',
      name: { en: 'Nakhl Embroidered Abaya', ar: 'عباية النخل المطرزة' },
      tagline: { en: 'Palm-frond embroidery in gold thread down the front panel.', ar: 'تطريز بنقشة سعف النخيل بخيط ذهبي على اللوحة الأمامية.' },
      desc: {
        en: 'A black crepe abaya with a hand-guided embroidery panel inspired by the palm frond, stitched in fine gold thread from collar to hem. Understated by day, striking under evening light.',
        ar: 'عباية كريب سوداء بلوحة تطريز مُنفّذة يدويًا مستوحاة من سعفة النخيل، مطرزة بخيط ذهبي دقيق من الياقة حتى الطرف. أنيقة بهدوء نهارًا، ولافتة تحت أضواء المساء.'
      },
      ingredients: { en: '100% crepe with metallic gold-thread embroidery. Dry clean only.', ar: '100% كريب مع تطريز بخيط ذهبي معدني. تنظيف جاف فقط.' },
      howto: { en: 'Let the embroidered panel hang open and centred — avoid folding the front closed.', ar: 'اترك اللوحة المطرزة مفتوحة وفي المنتصف — تجنّبي طي الأمام بالكامل.' }
    },
    {
      id: 'p5', category: 'embroidered', price: 45000, stock: 10, featured: false, badge: 'new',
      art: { shape: 'embellished', palette: 'olive' },
      img: '',
      name: { en: 'Beaded Front Panel Abaya — Olive', ar: 'عباية باللؤلؤ والخرز — زيتوني' },
      tagline: { en: 'Hand-sewn beadwork on deep olive crepe.', ar: 'خرز مخيط يدويًا على كريب زيتوني داكن.' },
      desc: {
        en: 'Deep olive crepe with a hand-sewn beaded panel at the front and cuffs. A quiet colour with a luxe finish, made for gatherings without shouting for attention.',
        ar: 'كريب زيتوني داكن بلوحة خرز مخيطة يدويًا عند الأمام والأكمام. لون هادئ بلمسة فاخرة، صُنعت للمناسبات دون أن تلفت الأنظار بصخب.'
      },
      ingredients: { en: '100% crepe with hand-sewn glass beadwork. Dry clean only, store flat.', ar: '100% كريب مع خرز زجاجي مخيط يدويًا. تنظيف جاف فقط، يُحفظ مسطحًا.' },
      howto: { en: 'Best worn closed at the waist tie to let the beaded panel sit flat.', ar: 'يُفضّل ارتداؤها مربوطة عند الخصر لتبقى لوحة الخرز مسطحة.' }
    },
    {
      id: 'p6', category: 'occasion', price: 68000, stock: 8, featured: true, badge: 'bestseller',
      art: { shape: 'kimono', palette: 'burgundy' },
      img: 'assets/img/products/p6.jpg',
      name: { en: 'Malak Evening Abaya', ar: 'عباية ملاك المسائية' },
      tagline: { en: 'Wide kimono sleeves in a deep burgundy satin-crepe.', ar: 'أكمام كيمونو واسعة بخامة الساتان كريب بلون العنابي الداكن.' },
      desc: {
        en: 'A statement occasion abaya in burgundy satin-crepe with dramatic wide kimono sleeves and a fluid, floor-length drape. Designed for weddings, Eid gatherings and evenings that call for a little more.',
        ar: 'عباية مناسبات لافتة بخامة الساتان كريب العنابية، بأكمام كيمونو واسعة درامية وانسيابية تلامس الأرض. صُممت للأعراس وتجمعات العيد والأمسيات التي تستحق إطلالة أكثر تميزًا.'
      },
      ingredients: { en: 'Satin-crepe blend, fully lined. Dry clean only.', ar: 'خليط ساتان كريب، مبطنة بالكامل. تنظيف جاف فقط.' },
      howto: { en: 'Let the sleeves fall open when walking or greeting guests — the drape is the detail.', ar: 'اتركي الأكمام تنسدل مفتوحة عند المشي أو استقبال الضيوف — فالانسدال هو تفصيل الإطلالة.' }
    },
    {
      id: 'p7', category: 'occasion', price: 89000, stock: 5, featured: false, badge: 'new',
      art: { shape: 'embellished', palette: 'rust' },
      img: 'assets/img/products/p7.jpg',
      name: { en: 'Zahra Signature Abaya', ar: 'عباية زهرة المميزة' },
      tagline: { en: 'Our house colour, in a hand-finished occasion piece.', ar: 'لوننا المميز، في قطعة مناسبات منتهية يدويًا.' },
      desc: {
        en: 'LUVIT’s own rust-terracotta shade, cut as a fluid occasion abaya with a hand-finished embroidered edge along the front and cuffs. A signature piece for those who want to be remembered.',
        ar: 'لون التيراكوتا المميز الخاص بـ LUVIT، بقصة عباية مناسبات انسيابية مع حافة مطرزة منتهية يدويًا عند الأمام والأكمام. قطعة مميزة لمن تريد إطلالة لا تُنسى.'
      },
      ingredients: { en: 'Premium crepe with hand-finished embroidered trim. Dry clean only.', ar: 'كريب فاخر بحافة مطرزة منتهية يدويًا. تنظيف جاف فقط.' },
      howto: { en: 'A statement piece on its own — keep jewellery minimal and let the colour lead.', ar: 'قطعة مميزة بذاتها — اكتفِ بإكسسوارات بسيطة ودعي اللون يتصدّر الإطلالة.' }
    },
    {
      id: 'p8', category: 'kaftans', price: 18000, stock: 20, featured: false, badge: '',
      art: { shape: 'kaftan', palette: 'taupe' },
      img: 'assets/img/products/p8.jpg',
      name: { en: 'Home Kaftan — Taupe', ar: 'قفطان منزلي — بيج رمادي' },
      tagline: { en: 'Loose, breathable and made for lounging.', ar: 'فضفاض ويتنفس، مصمم للراحة المنزلية.' },
      desc: {
        en: 'A wide, breezy kaftan in soft taupe viscose, with dropped sleeves and side pockets. Made for slow mornings, family visits and everything in between.',
        ar: 'قفطان واسع ومنعش من قماش الفيسكوز الناعم بلون البيج الرمادي، بأكمام منسدلة وجيوب جانبية. صُنع لصباحات هادئة وزيارات عائلية وكل ما بينهما.'
      },
      ingredients: { en: '100% viscose. Machine wash cold, tumble dry low.', ar: '100% فيسكوز. يُغسل بالغسالة بماء بارد، ويُجفف بحرارة منخفضة.' },
      howto: { en: 'Wear belted at the waist for shape, or loose for maximum comfort.', ar: 'يُلبس بحزام عند الخصر لإبراز القوام، أو فضفاضًا لأقصى درجات الراحة.' }
    },
    {
      id: 'p9', category: 'kaftans', price: 21000, stock: 18, featured: false, badge: '',
      art: { shape: 'kaftan', palette: 'ivory' },
      img: 'assets/img/products/p9.jpg',
      name: { en: 'Souq Kaftan — Ivory & Rust', ar: 'قفطان السوق — عاجي وتيراكوتا' },
      tagline: { en: 'A hand-blocked print in our signature rust.', ar: 'طبعة مطبوعة يدويًا بلوننا المميز التيراكوتا.' },
      desc: {
        en: 'An ivory kaftan finished with a hand-blocked geometric border in LUVIT rust, echoing the pattern on our own emblem. Roomy, light and easy to throw on.',
        ar: 'قفطان بلون عاجي منتهٍ بحدود هندسية مطبوعة يدويًا بلون التيراكوتا الخاص بـ LUVIT، تُذكّر بزخرفة شعارنا. واسع وخفيف وسهل الارتداء.'
      },
      ingredients: { en: '100% cotton-viscose blend. Machine wash cold, iron on reverse.', ar: '100% قطن ممزوج بالفيسكوز. يُغسل بالغسالة بماء بارد، ويُكوى من الجهة الخلفية.' },
      howto: { en: 'Layer over a plain abaya for travel days, or wear alone at home.', ar: 'تُلبس فوق عباية بسيطة في أيام السفر، أو بمفردها في المنزل.' }
    },
    {
      id: 'p10', category: 'hijabs', price: 8500, stock: 40, featured: true, badge: '',
      art: { shape: 'shawl', palette: 'ivory' },
      img: 'assets/img/products/p10.jpg',
      name: { en: 'Chiffon Hijab Set (3-Pack)', ar: 'طقم حجاب شيفون (3 قطع)' },
      tagline: { en: 'Three everyday shades, one soft chiffon.', ar: 'ثلاثة ألوان يومية بخامة شيفون ناعمة.' },
      desc: {
        en: 'Three lightweight chiffon hijabs in ivory, sand and taupe — our best-selling everyday set. Easy to drape, easy to pin, and finished with a hand-rolled edge so they never fray.',
        ar: 'ثلاثة حجابات شيفون خفيفة بألوان العاجي والرملي والبيج الرمادي — طقمنا الأكثر مبيعًا للاستخدام اليومي. سهلة التنسيق والتثبيت، ومنتهية بحافة ملفوفة يدويًا لا تتسحّل.'
      },
      ingredients: { en: '100% chiffon, hand-rolled edges. Hand wash cold.', ar: '100% شيفون بحواف ملفوفة يدويًا. يُغسل يدويًا بماء بارد.' },
      howto: { en: 'Use a soft inner cap underneath for grip, and pin at the chin for an all-day hold.', ar: 'استخدمي طاقية داخلية ناعمة أسفلها للتثبيت، وثبّتيه عند الذقن لثبات طوال اليوم.' }
    },
    {
      id: 'p11', category: 'hijabs', price: 9500, stock: 30, featured: false, badge: '',
      art: { shape: 'shawl', palette: 'taupe' },
      img: 'assets/img/products/p11.jpg',
      name: { en: 'Georgette Shawl — Taupe', ar: 'شال جورجيت — بيج رمادي' },
      tagline: { en: 'A longer, heavier drape for a no-slip hold.', ar: 'انسدال أطول وأثقل لثبات بلا انزلاق.' },
      desc: {
        en: 'An extra-long georgette shawl with just enough weight to sit without slipping. One of our most requested shades — a warm, wearable taupe that goes with almost everything.',
        ar: 'شال جورجيت طويل بوزن كافٍ يجعله يستقر دون انزلاق. من أكثر ألواننا طلبًا — بيج رمادي دافئ يتناسق مع كل شيء تقريبًا.'
      },
      ingredients: { en: '100% georgette. Hand wash cold, do not wring.', ar: '100% جورجيت. يُغسل يدويًا بماء بارد، ولا يُعصر.' },
      howto: { en: 'Drape long over one shoulder for an occasion look, or wrap close for everyday.', ar: 'يُسدل طويلاً على كتف واحدة لإطلالة مناسبات، أو يُلف بإحكام للاستخدام اليومي.' }
    },
    {
      id: 'p12', category: 'hijabs', price: 11000, stock: 22, featured: false, badge: 'new',
      art: { shape: 'shawl', palette: 'rust' },
      img: 'assets/img/products/p12.jpg',
      name: { en: 'Rosette Embroidered Hijab', ar: 'حجاب مطرز بنقشة الوردة' },
      tagline: { en: 'A small embroidered corner, in our signature rust.', ar: 'زاوية مطرزة صغيرة، بلوننا المميز التيراكوتا.' },
      desc: {
        en: 'A soft modal-chiffon hijab in our rust shade, with a small hand-embroidered rosette in one corner — a quiet signature detail that pairs beautifully with the Zahra abaya.',
        ar: 'حجاب من قماش المودال شيفون الناعم بلوننا التيراكوتا، بزهرة مطرزة يدويًا صغيرة في إحدى الزوايا — تفصيلة مميزة هادئة تتناسق بجمال مع عباية زهرة.'
      },
      ingredients: { en: 'Modal-chiffon blend with hand embroidery. Hand wash cold.', ar: 'مزيج مودال وشيفون مع تطريز يدوي. يُغسل يدويًا بماء بارد.' },
      howto: { en: 'Position the embroidered corner to fall near the shoulder when draped.', ar: 'ضعي الزاوية المطرزة بحيث تقع بالقرب من الكتف عند الإسدال.' }
    }
  ];

  var SEED_ORDERS = [
    {
      id: 'o1', number: 'LV-4102', name: 'Fatma Al-Habsi', phone: '9231 4567',
      wilaya: 'muscat', address: 'Al Khuwair, Way 3128, Building 7, Apt 4',
      items: [
        { id: 'p1', qty: 1, price: 24000, name: { en: 'Essential Black Abaya', ar: 'عباية سوداء أساسية' } },
        { id: 'p10', qty: 1, price: 8500, name: { en: 'Chiffon Hijab Set (3-Pack)', ar: 'طقم حجاب شيفون (3 قطع)' } }
      ],
      subtotal: 32500, delivery: 2000, total: 34500, status: 'delivered', date: '2026-06-30T11:15:00'
    },
    {
      id: 'o2', number: 'LV-4187', name: 'Noor Al-Rawahi', phone: '9587 2201',
      wilaya: 'salalah', address: 'Al Saadah, Way 9, House 21',
      items: [
        { id: 'p6', qty: 1, price: 68000, name: { en: 'Malak Evening Abaya', ar: 'عباية ملاك المسائية' } }
      ],
      subtotal: 68000, delivery: 0, total: 68000, status: 'shipped', date: '2026-07-10T16:40:00'
    },
    {
      id: 'o3', number: 'LV-4233', name: 'Hind Al-Farsi', phone: '9902 7734',
      wilaya: 'sohar', address: 'Falaj Al Qabail, Way 44, Villa 12',
      items: [
        { id: 'p4', qty: 1, price: 39000, name: { en: 'Nakhl Embroidered Abaya', ar: 'عباية النخل المطرزة' } },
        { id: 'p12', qty: 1, price: 11000, name: { en: 'Rosette Embroidered Hijab', ar: 'حجاب مطرز بنقشة الوردة' } }
      ],
      subtotal: 50000, delivery: 0, total: 50000, status: 'new', date: '2026-07-18T09:05:00'
    }
  ];

  var WILAYAS = [
    { id: 'muscat', en: 'Muscat', ar: 'مسقط' },
    { id: 'muttrah', en: 'Muttrah', ar: 'مطرح' },
    { id: 'seeb', en: 'Al Seeb', ar: 'السيب' },
    { id: 'bawshar', en: 'Bawshar', ar: 'بوشر' },
    { id: 'amerat', en: 'Al Amerat', ar: 'العامرات' },
    { id: 'sohar', en: 'Sohar', ar: 'صحار' },
    { id: 'salalah', en: 'Salalah', ar: 'صلالة' },
    { id: 'nizwa', en: 'Nizwa', ar: 'نزوى' },
    { id: 'sur', en: 'Sur', ar: 'صور' },
    { id: 'barka', en: 'Barka', ar: 'بركاء' },
    { id: 'rustaq', en: 'Al Rustaq', ar: 'الرستاق' },
    { id: 'ibri', en: 'Ibri', ar: 'عبري' }
  ];

  /* ---------- Storage helpers ---------- */

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function seed() {
    if (!localStorage.getItem(K.seed)) {
      write(K.products, SEED_PRODUCTS);
      if (!read(K.orders, []).length) write(K.orders, SEED_ORDERS);
      try { localStorage.setItem(K.seed, '1'); } catch (e) {}
    }
  }

  /* ---------- Products ---------- */

  function getProducts() { return read(K.products, []); }
  function saveProducts(list) { write(K.products, list); }
  function getProduct(id) {
    return getProducts().find(function (p) { return p.id === id; }) || null;
  }
  function upsertProduct(product) {
    var list = getProducts();
    var i = list.findIndex(function (p) { return p.id === product.id; });
    if (i > -1) list[i] = product; else list.push(product);
    saveProducts(list);
  }
  function deleteProduct(id) {
    saveProducts(getProducts().filter(function (p) { return p.id !== id; }));
  }
  function newProductId() {
    return 'p' + Date.now().toString(36);
  }

  /* ---------- Cart ---------- */

  function getCart() { return read(K.cart, []); } /* [{id, qty}] */
  function setCart(cart) {
    write(K.cart, cart);
    document.dispatchEvent(new CustomEvent('luvit:cart'));
  }
  function addToCart(id, qty) {
    var cart = getCart();
    var line = cart.find(function (l) { return l.id === id; });
    if (line) line.qty += qty; else cart.push({ id: id, qty: qty });
    setCart(cart);
  }
  function setQty(id, qty) {
    var cart = getCart();
    var line = cart.find(function (l) { return l.id === id; });
    if (!line) return;
    if (qty <= 0) cart = cart.filter(function (l) { return l.id !== id; });
    else line.qty = qty;
    setCart(cart);
  }
  function removeFromCart(id) {
    setCart(getCart().filter(function (l) { return l.id !== id; }));
  }
  function clearCart() { setCart([]); }
  function cartCount() {
    return getCart().reduce(function (n, l) { return n + l.qty; }, 0);
  }
  /* Cart lines joined with product data; silently drops products deleted in admin */
  function cartDetailed() {
    var products = getProducts();
    return getCart().map(function (l) {
      var p = products.find(function (x) { return x.id === l.id; });
      return p ? { product: p, qty: l.qty, line: p.price * l.qty } : null;
    }).filter(Boolean);
  }
  function cartTotals() {
    var subtotal = cartDetailed().reduce(function (n, l) { return n + l.line; }, 0);
    var delivery = subtotal === 0 ? 0 : (subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE);
    return { subtotal: subtotal, delivery: delivery, total: subtotal + delivery };
  }

  /* ---------- Orders ---------- */

  function getOrders() {
    return read(K.orders, []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
  }
  function addOrder(order) {
    var list = read(K.orders, []);
    list.push(order);
    write(K.orders, list);
    /* reduce stock */
    var products = getProducts();
    order.items.forEach(function (it) {
      var p = products.find(function (x) { return x.id === it.id; });
      if (p) p.stock = Math.max(0, p.stock - it.qty);
    });
    saveProducts(products);
  }
  function setOrderStatus(id, status) {
    var list = read(K.orders, []);
    var o = list.find(function (x) { return x.id === id; });
    if (o) { o.status = status; write(K.orders, list); }
  }
  function newOrderNumber() {
    return 'LV-' + (4100 + (read(K.orders, []).length * 7) % 900 + Math.floor(Math.random() * 90));
  }

  /* ---------- Formatting ---------- */

  /* 24000 baisa -> "24.000 OMR" / "24.000 ر.ع." */
  function fmtPrice(baisa) {
    var omr = (baisa / 1000).toFixed(3);
    var lang = (global.I18N && global.I18N.getLang()) || 'en';
    return lang === 'ar' ? omr + ' ر.ع.' : omr + ' OMR';
  }
  function fmtDate(iso) {
    var d = new Date(iso);
    var lang = (global.I18N && global.I18N.getLang()) || 'en';
    try {
      return d.toLocaleDateString(lang === 'ar' ? 'ar-OM' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return d.toDateString();
    }
  }
  function wilayaName(id) {
    var lang = (global.I18N && global.I18N.getLang()) || 'en';
    var w = WILAYAS.find(function (x) { return x.id === id; });
    return w ? w[lang] : id;
  }

  seed();

  global.DB = {
    CATEGORIES: CATEGORIES,
    WILAYAS: WILAYAS,
    FREE_DELIVERY_MIN: FREE_DELIVERY_MIN,
    DELIVERY_FEE: DELIVERY_FEE,
    getProducts: getProducts,
    getProduct: getProduct,
    upsertProduct: upsertProduct,
    deleteProduct: deleteProduct,
    newProductId: newProductId,
    getCart: getCart,
    addToCart: addToCart,
    setQty: setQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    cartCount: cartCount,
    cartDetailed: cartDetailed,
    cartTotals: cartTotals,
    getOrders: getOrders,
    addOrder: addOrder,
    setOrderStatus: setOrderStatus,
    newOrderNumber: newOrderNumber,
    fmtPrice: fmtPrice,
    fmtDate: fmtDate,
    wilayaName: wilayaName
  };
})(window);
