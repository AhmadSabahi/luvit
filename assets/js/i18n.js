/* LUVIT — i18n (English / Arabic with RTL) */
(function (global) {
  'use strict';

  var DICT = {
    en: {
      'brand.name': 'LUVIT',
      'brand.tagline': 'Abayas & modest wear from Oman',
      'announce': 'Free delivery across Oman on orders over 35.000 OMR',
      'nav.shop': 'Shop',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.cart': 'Cart',

      'hero.kicker': 'Abayas & Modest Wear · Oman',
      'hero.title': 'Abayas designed to be lived in',
      'hero.sub': 'LUVIT makes everyday and occasion abayas — soft crepes, hand embroidery and considered cuts — for women across Oman, from the school run to the wedding hall.',
      'hero.cta': 'Shop the collection',
      'hero.cta2': 'Our story',

      'usp.natural.t': 'Considered fabrics',
      'usp.natural.d': 'Breathable crepe, nida and viscose, chosen for Oman’s climate.',
      'usp.hand.t': 'Hand-finished details',
      'usp.hand.d': 'Embroidery and beadwork finished by hand in small batches.',
      'usp.lasting.t': 'Cut to move in',
      'usp.lasting.d': 'Relaxed silhouettes made for daily life and prayer.',
      'usp.delivery.t': 'Fast delivery',
      'usp.delivery.d': 'Across all wilayas of Oman.',

      'featured.title': 'Our bestsellers',
      'featured.sub': 'The pieces our customers reach for again and again.',
      'shop.title': 'Shop all products',
      'shop.sub': 'Honest pieces, honest prices — in Omani Rial.',
      'shop.search': 'Search products…',
      'shop.empty': 'No products match your search.',

      'cat.all': 'All',
      'cat.classic': 'Classic Abayas',
      'cat.embroidered': 'Embroidered Abayas',
      'cat.occasion': 'Occasion & Evening',
      'cat.kaftans': 'Kaftans',
      'cat.hijabs': 'Hijabs & Shawls',

      'badge.bestseller': 'Bestseller',
      'badge.new': 'New',
      'badge.low': 'Low stock',
      'badge.out': 'Out of stock',
      'card.add': 'Add to cart',
      'toast.added': 'Added to cart',

      'about.title': 'Made to be worn, not just admired',
      'about.p1': 'LUVIT started the way most Omani wardrobes do — with pieces we couldn’t find anywhere else. What began as abayas we sewed and styled for ourselves became LUVIT: abayas, kaftans and hijabs cut the way women actually want to wear them.',
      'about.p2': 'Every piece is finished in small batches, with real embroidery, real beadwork and fabrics chosen for Oman’s heat. Honest prices, in Omani Rial, from our home to yours.',

      'contact.title': 'Get in touch',
      'contact.sub': 'Questions about a piece or your order? We reply within a day.',

      'footer.shop': 'Shop',
      'footer.help': 'Help',
      'footer.faq': 'FAQ',
      'footer.shipping': 'Shipping & returns',
      'footer.privacy': 'Privacy policy',
      'footer.contact': 'Contact',
      'footer.rights': '© 2026 LUVIT. All rights reserved.',
      'footer.demo': 'Demo website — no real orders or payments are processed.',

      'pd.home': 'Home',
      'pd.desc': 'Description',
      'pd.ing': 'Fabric & care',
      'pd.how': 'Styling tips',
      'pd.qty': 'Quantity',
      'pd.add': 'Add to cart',
      'pd.instock': 'In stock',
      'pd.low': 'Only {n} left in stock',
      'pd.out': 'Out of stock',
      'pd.related': 'You may also like',
      'pd.notfound': 'Product not found.',
      'pd.back': 'Back to shop',

      'cart.title': 'Your cart',
      'cart.empty.t': 'Your cart is empty',
      'cart.empty.d': 'Browse the collection and find a piece you’ll love.',
      'cart.browse': 'Browse products',
      'cart.summary': 'Order summary',
      'cart.subtotal': 'Subtotal',
      'cart.delivery': 'Delivery',
      'cart.free': 'Free',
      'cart.total': 'Total',
      'cart.freenote': 'Add {amount} more for free delivery.',
      'cart.freeok': 'You’ve unlocked free delivery! 🎉',
      'cart.checkout': 'Proceed to checkout',
      'cart.continue': 'Continue shopping',
      'cart.remove': 'Remove',

      'co.title': 'Checkout',
      'co.step1': 'Delivery',
      'co.step2': 'Payment',
      'co.step3': 'Done',
      'co.details': 'Delivery details',
      'co.name': 'Full name',
      'co.name.ph': 'e.g. Fatma Al-Habsi',
      'co.phone': 'Phone number',
      'co.phone.ph': 'e.g. 9123 4567',
      'co.wilaya': 'Wilaya / City',
      'co.address': 'Address',
      'co.address.ph': 'Way, building, apartment…',
      'co.continue': 'Continue to payment',
      'co.back': 'Back',
      'co.backcart': 'Back to cart',
      'err.required': 'Please fill in all the fields.',

      'pay.title': 'Card payment',
      'pay.hint': 'Demo gateway — any card details are accepted, except a card number ending in 0000, which is declined (to demo a failed payment). No real payment happens.',
      'pay.number': 'Card number',
      'pay.name': 'Name on card',
      'pay.expiry': 'Expiry (MM/YY)',
      'pay.cvv': 'CVV',
      'pay.pay': 'Pay {amount}',
      'pay.processing': 'Processing payment…',
      'pay.secure': 'Secured demo checkout · nothing is charged',
      'err.card': 'Please check your card details — card number must be 16 digits.',

      'ok.title': 'Payment successful!',
      'ok.msg': 'Thank you, {name}. Your order is confirmed and is being prepared.',
      'ok.order': 'Order number',
      'ok.home': 'Back to shop',
      'no.title': 'Payment declined',
      'no.msg': 'Your card was declined by the bank. Please try a different card.',
      'no.retry': 'Try again',

      'summary.title': 'Order summary',
      'summary.qty': 'Qty',

      /* Admin */
      'adm.title': 'LUVIT Admin',
      'adm.login.t': 'Admin sign in',
      'adm.login.d': 'Manage products, prices and orders.',
      'adm.login.user': 'Username',
      'adm.login.pass': 'Password',
      'adm.login.btn': 'Sign in',
      'adm.login.hint': 'Demo access — username: admin · password: luvit123',
      'adm.login.err': 'Wrong username or password.',
      'adm.nav.dashboard': 'Dashboard',
      'adm.nav.products': 'Products',
      'adm.nav.orders': 'Orders',
      'adm.nav.store': 'View store',
      'adm.nav.logout': 'Log out',

      'adm.dash.t': 'Dashboard',
      'adm.dash.d': 'A quick look at how the shop is doing.',
      'adm.stat.revenue': 'Revenue',
      'adm.stat.orders': 'Orders',
      'adm.stat.products': 'Products',
      'adm.stat.low': 'Low stock',
      'adm.stat.revenue.d': 'Paid orders, all time',
      'adm.stat.orders.d': 'All orders',
      'adm.stat.products.d': 'In catalogue',
      'adm.stat.low.d': '5 items or fewer',
      'adm.dash.recent': 'Recent orders',
      'adm.dash.viewall': 'View all',
      'adm.dash.lowlist': 'Low stock products',
      'adm.dash.lowempty': 'All products are well stocked. ✨',

      'adm.pr.t': 'Products',
      'adm.pr.d': 'Add, edit and remove products. Changes appear in the shop immediately.',
      'adm.pr.add': 'Add product',
      'adm.pr.edit': 'Edit product',
      'adm.pr.new': 'New product',
      'adm.pr.search': 'Search products…',
      'adm.pr.nameEn': 'Name (English)',
      'adm.pr.nameAr': 'Name (Arabic)',
      'adm.pr.tagEn': 'Tagline (English)',
      'adm.pr.tagAr': 'Tagline (Arabic)',
      'adm.pr.descEn': 'Description (English)',
      'adm.pr.descAr': 'Description (Arabic)',
      'adm.pr.price': 'Price (OMR)',
      'adm.pr.stock': 'Stock',
      'adm.pr.cat': 'Category',
      'adm.pr.featured': 'Show in “Bestsellers”',
      'adm.pr.shape': 'Garment shape',
      'adm.pr.img': 'Product photo — URL or path (leave empty to use the drawn art)',
      'adm.pr.palette': 'Colour theme',
      'adm.pr.preview': 'Preview',
      'adm.pr.save': 'Save product',
      'adm.pr.cancel': 'Cancel',
      'adm.pr.delete': 'Delete',
      'adm.pr.confirm': 'Delete this product? This cannot be undone.',
      'adm.pr.saved': 'Product saved',
      'adm.pr.deleted': 'Product deleted',
      'adm.pr.empty': 'No products found.',
      'err.pr.form': 'Please fill in the English name, a valid price and stock.',

      'adm.or.t': 'Orders',
      'adm.or.d': 'Orders placed through the shop checkout.',
      'adm.or.none': 'No orders yet. Orders placed in the shop will appear here.',
      'adm.or.detail': 'Order details',
      'adm.or.close': 'Close',

      'tbl.order': 'Order',
      'tbl.customer': 'Customer',
      'tbl.date': 'Date',
      'tbl.items': 'Items',
      'tbl.total': 'Total',
      'tbl.status': 'Status',
      'tbl.product': 'Product',
      'tbl.category': 'Category',
      'tbl.price': 'Price',
      'tbl.stock': 'Stock',
      'tbl.actions': 'Actions',
      'tbl.phone': 'Phone',
      'tbl.address': 'Address',

      'st.new': 'New',
      'st.shipped': 'Shipped',
      'st.delivered': 'Delivered',
      'st.cancelled': 'Cancelled',

      'shape.draped': 'Draped abaya',
      'shape.buttoned': 'Open-front button abaya',
      'shape.embellished': 'Embroidered / beaded panel',
      'shape.kimono': 'Wide kimono sleeve',
      'shape.kaftan': 'Kaftan',
      'shape.shawl': 'Hijab / shawl (flat-lay)',

      'pal.black': 'Black',
      'pal.charcoal': 'Charcoal',
      'pal.sand': 'Sand',
      'pal.taupe': 'Taupe',
      'pal.rust': 'Rust',
      'pal.burgundy': 'Burgundy',
      'pal.olive': 'Olive',
      'pal.ivory': 'Ivory'
    },

    ar: {
      'brand.name': 'LUVIT',
      'brand.tagline': 'عبايات وأزياء محتشمة من عُمان',
      'announce': 'توصيل مجاني داخل عُمان للطلبات فوق 35.000 ر.ع.',
      'nav.shop': 'المتجر',
      'nav.about': 'من نحن',
      'nav.contact': 'تواصل معنا',
      'nav.cart': 'السلة',

      'hero.kicker': 'عبايات وأزياء محتشمة · عُمان',
      'hero.title': 'عبايات صُممت لتُعاش، لا لتُعرض فقط',
      'hero.sub': 'تصنع LUVIT عبايات يومية ومناسبات — كريب ناعم وتطريز يدوي وقصات مدروسة — لنساء عُمان، من توصيل المدرسة إلى قاعة الأفراح.',
      'hero.cta': 'تسوّقي المجموعة',
      'hero.cta2': 'قصتنا',

      'usp.natural.t': 'أقمشة مدروسة',
      'usp.natural.d': 'كريب ونيدا وفيسكوز يتنفس، اختير لمناخ عُمان.',
      'usp.hand.t': 'تفاصيل منتهية يدويًا',
      'usp.hand.d': 'تطريز وخرز منتهي يدويًا بدفعات صغيرة.',
      'usp.lasting.t': 'قصة تسمح بالحركة',
      'usp.lasting.d': 'قصات مريحة صُنعت للحياة اليومية والصلاة.',
      'usp.delivery.t': 'توصيل سريع',
      'usp.delivery.d': 'إلى جميع ولايات السلطنة.',

      'featured.title': 'الأكثر مبيعًا',
      'featured.sub': 'القطع التي تعود إليها عميلاتنا مرة بعد مرة.',
      'shop.title': 'تسوّقي كل المنتجات',
      'shop.sub': 'قطع أصيلة وأسعار صادقة — بالريال العُماني.',
      'shop.search': 'ابحثي عن منتج…',
      'shop.empty': 'لا توجد منتجات تطابق بحثك.',

      'cat.all': 'الكل',
      'cat.classic': 'عبايات كلاسيكية',
      'cat.embroidered': 'عبايات مطرزة',
      'cat.occasion': 'مناسبات وسهرة',
      'cat.kaftans': 'قفاطين',
      'cat.hijabs': 'حجابات وشيلان',

      'badge.bestseller': 'الأكثر مبيعًا',
      'badge.new': 'جديد',
      'badge.low': 'كمية محدودة',
      'badge.out': 'نفدت الكمية',
      'card.add': 'أضف إلى السلة',
      'toast.added': 'أُضيف إلى السلة',

      'about.title': 'صُممت لتُلبس، لا لتُعجب فقط',
      'about.p1': 'بدأت LUVIT كما تبدأ معظم خزائن الملابس العُمانية — بقطع لم نجدها في أي مكان آخر. ما بدأ كعبايات نخيطها وننسقها لأنفسنا أصبح LUVIT: عبايات وقفاطين وحجابات مفصّلة بالطريقة التي تريد المرأة ارتداءها فعلًا.',
      'about.p2': 'كل قطعة تُنجز بدفعات صغيرة، بتطريز حقيقي وخرز حقيقي وأقمشة اختيرت لحرارة عُمان. أسعار صادقة، بالريال العُماني، من بيتنا إلى بيتك.',

      'contact.title': 'تواصلي معنا',
      'contact.sub': 'لديك سؤال عن قطعة أو عن طلبك؟ نرد خلال يوم واحد.',

      'footer.shop': 'المتجر',
      'footer.help': 'المساعدة',
      'footer.faq': 'الأسئلة الشائعة',
      'footer.shipping': 'الشحن والإرجاع',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.contact': 'تواصل معنا',
      'footer.rights': '© 2026 LUVIT. جميع الحقوق محفوظة.',
      'footer.demo': 'موقع تجريبي — لا تتم معالجة أي طلبات أو مدفوعات حقيقية.',

      'pd.home': 'الرئيسية',
      'pd.desc': 'الوصف',
      'pd.ing': 'القماش والعناية',
      'pd.how': 'نصائح التنسيق',
      'pd.qty': 'الكمية',
      'pd.add': 'أضف إلى السلة',
      'pd.instock': 'متوفر',
      'pd.low': 'تبقّى {n} فقط',
      'pd.out': 'نفدت الكمية',
      'pd.related': 'قد يعجبك أيضًا',
      'pd.notfound': 'المنتج غير موجود.',
      'pd.back': 'العودة إلى المتجر',

      'cart.title': 'سلة التسوق',
      'cart.empty.t': 'سلتك فارغة',
      'cart.empty.d': 'تصفّحي المجموعة واعثري على قطعة تحبينها.',
      'cart.browse': 'تصفّح المنتجات',
      'cart.summary': 'ملخص الطلب',
      'cart.subtotal': 'المجموع الفرعي',
      'cart.delivery': 'التوصيل',
      'cart.free': 'مجاني',
      'cart.total': 'الإجمالي',
      'cart.freenote': 'أضيفي {amount} أخرى للحصول على توصيل مجاني.',
      'cart.freeok': 'حصلتِ على توصيل مجاني! 🎉',
      'cart.checkout': 'إتمام الطلب',
      'cart.continue': 'مواصلة التسوق',
      'cart.remove': 'إزالة',

      'co.title': 'إتمام الطلب',
      'co.step1': 'التوصيل',
      'co.step2': 'الدفع',
      'co.step3': 'تم',
      'co.details': 'بيانات التوصيل',
      'co.name': 'الاسم الكامل',
      'co.name.ph': 'مثال: فاطمة الحبسية',
      'co.phone': 'رقم الهاتف',
      'co.phone.ph': 'مثال: 9123 4567',
      'co.wilaya': 'الولاية / المدينة',
      'co.address': 'العنوان',
      'co.address.ph': 'السكة، المبنى، الشقة…',
      'co.continue': 'المتابعة إلى الدفع',
      'co.back': 'رجوع',
      'co.backcart': 'العودة إلى السلة',
      'err.required': 'يرجى تعبئة جميع الحقول.',

      'pay.title': 'الدفع بالبطاقة',
      'pay.hint': 'بوابة تجريبية — تُقبل أي بيانات بطاقة، ما عدا رقم بطاقة ينتهي بـ 0000 فسيُرفض (لعرض حالة فشل الدفع). لا يتم أي دفع حقيقي.',
      'pay.number': 'رقم البطاقة',
      'pay.name': 'الاسم على البطاقة',
      'pay.expiry': 'تاريخ الانتهاء (شهر/سنة)',
      'pay.cvv': 'رمز التحقق CVV',
      'pay.pay': 'ادفع {amount}',
      'pay.processing': 'جارٍ معالجة الدفع…',
      'pay.secure': 'دفع تجريبي آمن · لن يتم خصم أي مبلغ',
      'err.card': 'يرجى التحقق من بيانات البطاقة — يجب أن يتكون الرقم من 16 خانة.',

      'ok.title': 'تم الدفع بنجاح!',
      'ok.msg': 'شكرًا لك، {name}. تم تأكيد طلبك وجارٍ تجهيزه.',
      'ok.order': 'رقم الطلب',
      'ok.home': 'العودة إلى المتجر',
      'no.title': 'تم رفض الدفع',
      'no.msg': 'رفض البنك بطاقتك. يرجى تجربة بطاقة أخرى.',
      'no.retry': 'المحاولة مرة أخرى',

      'summary.title': 'ملخص الطلب',
      'summary.qty': 'الكمية',

      /* Admin */
      'adm.title': 'لوحة تحكم LUVIT',
      'adm.login.t': 'تسجيل دخول المشرف',
      'adm.login.d': 'إدارة المنتجات والأسعار والطلبات.',
      'adm.login.user': 'اسم المستخدم',
      'adm.login.pass': 'كلمة المرور',
      'adm.login.btn': 'تسجيل الدخول',
      'adm.login.hint': 'دخول تجريبي — المستخدم: admin · كلمة المرور: luvit123',
      'adm.login.err': 'اسم المستخدم أو كلمة المرور غير صحيحة.',
      'adm.nav.dashboard': 'لوحة التحكم',
      'adm.nav.products': 'المنتجات',
      'adm.nav.orders': 'الطلبات',
      'adm.nav.store': 'عرض المتجر',
      'adm.nav.logout': 'تسجيل الخروج',

      'adm.dash.t': 'لوحة التحكم',
      'adm.dash.d': 'نظرة سريعة على أداء المتجر.',
      'adm.stat.revenue': 'الإيرادات',
      'adm.stat.orders': 'الطلبات',
      'adm.stat.products': 'المنتجات',
      'adm.stat.low': 'مخزون منخفض',
      'adm.stat.revenue.d': 'الطلبات المدفوعة، كل الفترات',
      'adm.stat.orders.d': 'جميع الطلبات',
      'adm.stat.products.d': 'في الكتالوج',
      'adm.stat.low.d': '5 قطع أو أقل',
      'adm.dash.recent': 'أحدث الطلبات',
      'adm.dash.viewall': 'عرض الكل',
      'adm.dash.lowlist': 'منتجات بمخزون منخفض',
      'adm.dash.lowempty': 'جميع المنتجات متوفرة بكميات جيدة. ✨',

      'adm.pr.t': 'المنتجات',
      'adm.pr.d': 'أضف وعدّل واحذف المنتجات. تظهر التغييرات في المتجر فورًا.',
      'adm.pr.add': 'إضافة منتج',
      'adm.pr.edit': 'تعديل المنتج',
      'adm.pr.new': 'منتج جديد',
      'adm.pr.search': 'ابحث في المنتجات…',
      'adm.pr.nameEn': 'الاسم (بالإنجليزية)',
      'adm.pr.nameAr': 'الاسم (بالعربية)',
      'adm.pr.tagEn': 'الوصف المختصر (بالإنجليزية)',
      'adm.pr.tagAr': 'الوصف المختصر (بالعربية)',
      'adm.pr.descEn': 'الوصف (بالإنجليزية)',
      'adm.pr.descAr': 'الوصف (بالعربية)',
      'adm.pr.price': 'السعر (ر.ع.)',
      'adm.pr.stock': 'المخزون',
      'adm.pr.cat': 'الفئة',
      'adm.pr.featured': 'عرض ضمن «الأكثر مبيعًا»',
      'adm.pr.shape': 'شكل القطعة',
      'adm.pr.img': 'صورة المنتج — رابط أو مسار (اتركه فارغًا لاستخدام الرسم التلقائي)',
      'adm.pr.palette': 'اللون',
      'adm.pr.preview': 'معاينة',
      'adm.pr.save': 'حفظ المنتج',
      'adm.pr.cancel': 'إلغاء',
      'adm.pr.delete': 'حذف',
      'adm.pr.confirm': 'هل تريد حذف هذا المنتج؟ لا يمكن التراجع.',
      'adm.pr.saved': 'تم حفظ المنتج',
      'adm.pr.deleted': 'تم حذف المنتج',
      'adm.pr.empty': 'لا توجد منتجات.',
      'err.pr.form': 'يرجى إدخال الاسم بالإنجليزية وسعر ومخزون صحيحين.',

      'adm.or.t': 'الطلبات',
      'adm.or.d': 'الطلبات الواردة من صفحة إتمام الطلب في المتجر.',
      'adm.or.none': 'لا توجد طلبات بعد. ستظهر هنا الطلبات المقدمة من المتجر.',
      'adm.or.detail': 'تفاصيل الطلب',
      'adm.or.close': 'إغلاق',

      'tbl.order': 'الطلب',
      'tbl.customer': 'العميل',
      'tbl.date': 'التاريخ',
      'tbl.items': 'المنتجات',
      'tbl.total': 'الإجمالي',
      'tbl.status': 'الحالة',
      'tbl.product': 'المنتج',
      'tbl.category': 'الفئة',
      'tbl.price': 'السعر',
      'tbl.stock': 'المخزون',
      'tbl.actions': 'إجراءات',
      'tbl.phone': 'الهاتف',
      'tbl.address': 'العنوان',

      'st.new': 'جديد',
      'st.shipped': 'تم الشحن',
      'st.delivered': 'تم التوصيل',
      'st.cancelled': 'ملغي',

      'shape.draped': 'عباية منسدلة',
      'shape.buttoned': 'عباية أمامية بأزرار',
      'shape.embellished': 'لوحة مطرزة / بالخرز',
      'shape.kimono': 'كم كيمونو واسع',
      'shape.kaftan': 'قفطان',
      'shape.shawl': 'حجاب / شال (مسطّح)',

      'pal.black': 'أسود',
      'pal.charcoal': 'رمادي داكن',
      'pal.sand': 'رملي',
      'pal.taupe': 'بيج رمادي',
      'pal.rust': 'تيراكوتا',
      'pal.burgundy': 'عنابي',
      'pal.olive': 'زيتوني',
      'pal.ivory': 'عاجي'
    }
  };

  var LANG_KEY = 'luvit_lang';

  function getLang() {
    try {
      var l = localStorage.getItem(LANG_KEY);
      return l === 'ar' ? 'ar' : 'en';
    } catch (e) { return 'en'; }
  }

  function t(key, vars) {
    var lang = getLang();
    var str = (DICT[lang] && DICT[lang][key]) || DICT.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace('{' + k + '}', vars[k]);
      });
    }
    return str;
  }

  function applyDir() {
    var lang = getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  /* Fill every [data-i18n], [data-i18n-placeholder], [data-i18n-aria] element */
  function applyI18n(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    root.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = getLang() === 'ar' ? 'English' : 'عربي';
    });
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang === 'ar' ? 'ar' : 'en'); } catch (e) {}
    applyDir();
    applyI18n();
    document.dispatchEvent(new CustomEvent('luvit:lang'));
  }

  function toggleLang() {
    setLang(getLang() === 'ar' ? 'en' : 'ar');
  }

  /* Wire up toggles + first paint */
  function init() {
    applyDir();
    applyI18n();
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleLang);
    });
  }

  global.I18N = { t: t, getLang: getLang, setLang: setLang, toggleLang: toggleLang, applyI18n: applyI18n, init: init };
})(window);
