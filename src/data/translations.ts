import type { CategoryId, Language } from '../types/studio';

export interface TranslationSet {
  ui: {
    search: string; searchResources: string; coffee: string; ages: string; pages: string; languageLabel: string;
    preview: string; downloaded: string; emailAddress: string; weeklyPrintables: string;
    supportBody: string; aboutUs: string; contactUs: string; faq: string;
    privacyPolicy: string; cookiePolicy: string; terms: string; all: string;
    newsletterNotConnected: string; newsletterDone: string; newsletterFailed: string;
    resourceNotFound: string; resourceNotFoundHelp: string; browseCatalog: string;
  };
  catalog: {
    freeHeading: string; allHeading: string; freeSub: string; allSub: string;
    allResources: string; freePdfs: string; allCategories: string; searchPlaceholder: string;
    allAges: string; ages2to3: string; ages3to4: string; ages4to5: string; ages5to6: string;
    allThemes: string; foundations: string; animals: string; space: string; seasons: string;
    everydayLife: string; popular: string; newest: string; reset: string; showing: string;
    resourceSingular: string; resourcePlural: string; noResults: string; noResultsHelp: string;
    showAll: string;
  };
  detail: {
    home: string; freePrintablePdf: string; downloadAgain: string; downloadPdf: string;
    directDownload: string; noSignup: string; printReady: string; skills: string;
    included: string; similar: string; browse: string; pagesUnit: string;
    coffeeLine: string; optionalNewsletter: string; optionalPlaceholder: string; join: string; subscribedMsg: string;
  };
  categoryDescriptions: Record<CategoryId, string>;
  nav: {
    categories: string;
    freeResources: string;
    shop: string;
    blog: string;
    aboutUs: string;
    searchPlaceholder: string;
  };
  hero: {
    headline: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
  };
  sections: {
    popularCategories: string;
    popularCategoriesSub: string;
    freeResourcesTitle: string;
    freeResourcesSub: string;
    viewAllFree: string;
    featuredActivities: string;
    featuredActivitiesSub: string;
    viewShop: string;
    whyTitle: string;
    newsletterTitle: string;
    newsletterSub: string;
    newsletterPlaceholder: string;
    subscribeBtn: string;
    subscribedMsg: string;
    supportTitle: string;
    supportCopy: string;
    buyCoffeeBtn: string;
  };
  whyItems: {
    title: string;
    desc: string;
  }[];
  actions: {
    downloadFree: string;
    buyNow: string;
    addToCart: string;
    viewDetails: string;
    freeLabel: string;
  };
  categories: Record<CategoryId, string>;
  footer: {
    tagline: string;
    explore: string;
    categoriesTitle: string;
    companyTitle: string;
    legalTitle: string;
    copyright: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  en: {
    ui: {
      search: 'Search', searchResources: 'Search resources', coffee: 'Coffee', ages: 'Ages', pages: 'Pages', languageLabel: 'Select language',
      preview: 'Preview', downloaded: 'Downloaded', emailAddress: 'Email address', weeklyPrintables: 'Weekly Free Printables',
      supportBody: 'Every voluntary coffee helps us design new free coloring pages, tracing sheets, and math games.',
      aboutUs: 'About Us', contactUs: 'Contact Us', faq: 'FAQ', privacyPolicy: 'Privacy Policy', cookiePolicy: 'Cookie Policy', terms: 'Terms & Conditions', all: 'All',
      newsletterNotConnected: 'Newsletter is not connected to WordPress yet.', newsletterDone: 'Subscribed! Thank you for joining.', newsletterFailed: 'Could not subscribe right now. Please try again later.',
      resourceNotFound: 'Resource Not Found', resourceNotFoundHelp: 'We couldn’t find that printable pack. Browse all resources in our catalog instead.', browseCatalog: 'Browse Catalog',
    },
    catalog: {
      freeHeading: 'Free Printable Resources', allHeading: 'Educational Resource Library',
      freeSub: 'Instant PDF downloads with zero sign-up required. Ready for home printers and preschool classrooms.',
      allSub: 'Browse our complete collection of free printable worksheets and activity packs for ages 2–6.',
      allResources: 'All Resources', freePdfs: 'Free PDFs', allCategories: 'All Categories', searchPlaceholder: 'Search by title, skill, or topic...',
      allAges: 'All Ages (2–6)', ages2to3: 'Ages 2–3', ages3to4: 'Ages 3–4', ages4to5: 'Ages 4–5', ages5to6: 'Ages 5–6',
      allThemes: 'All Themes', foundations: 'Foundations', animals: 'Animals', space: 'Space', seasons: 'Seasons', everydayLife: 'Everyday Life',
      popular: 'Most Popular', newest: 'Newest First', reset: 'Reset filters', showing: 'Showing', resourceSingular: 'printable resource', resourcePlural: 'printable resources',
      noResults: 'No matching worksheets found', noResultsHelp: 'Try clearing one of your filters or browse our complete free library.', showAll: 'Show All Resources',
    },
    detail: {
      home: 'Home', freePrintablePdf: 'Free Printable PDF', downloadAgain: 'Downloaded! Click to Download Again', downloadPdf: 'Download Free PDF',
      directDownload: 'Direct PDF download', noSignup: 'No sign-up required', printReady: 'Ready for home and classroom printing', skills: 'Skills Developed', included: 'What’s Included',
      similar: 'Similar Learning Materials', browse: 'Browse', pagesUnit: 'Pages',
      coffeeLine: 'Love our free resources? Buy us a coffee and help us create more!', optionalNewsletter: 'Optional: Get new free printables in your inbox weekly', optionalPlaceholder: 'Email address (optional)', join: 'Join', subscribedMsg: 'Thank you! You are subscribed to weekly free packs.',
    },
    categoryDescriptions: {
      'coloring-pages': 'Bold outlines of friendly animals, rockets, and seasons.', 'math-numbers': 'Counting objects, number tracing, and gentle early addition.',
      'alphabet-letters': 'A–Z tracing guides, letter recognition, and beginning sounds.', 'shapes-colors': 'Sorting, matching, and naming everyday shapes and hues.',
      'puzzles-matching': 'Shadow matching, visual logic games, and beginner mazes.', 'fine-motor-skills': 'Scissor practice paths, dot-to-dot lines, and pencil control.', 'creative-activities': 'Cut-and-paste crafts, story starters, and rainbow art.',
    },
    nav: {
      categories: 'Categories',
      freeResources: 'Free Resources',
      shop: 'Shop',
      blog: 'Blog',
      aboutUs: 'About Us',
      searchPlaceholder: 'Search worksheets, coloring pages, math...',
    },
    hero: {
      headline: 'Learning is an Adventure!',
      subtitle: 'Fun, creative and educational activities for little learners.',
      primaryCta: 'Explore Free Resources',
      secondaryCta: 'Explore All Activities',
      trustLine: 'Printable PDF worksheets for ages 2–6 · Home & Preschool Ready',
    },
    sections: {
      popularCategories: 'Popular Categories',
      popularCategoriesSub: 'Pick a skill area to browse printable worksheets and hands-on activities.',
      freeResourcesTitle: 'Free Learning Resources',
      freeResourcesSub: 'Instant printable PDFs with no sign-up required. Ready for your home printer.',
      viewAllFree: 'Browse all free resources',
      featuredActivities: 'Featured Activities',
      featuredActivitiesSub: 'Parent favorites and complete preschool activity bundles.',
      viewShop: 'Visit the digital shop',
      whyTitle: 'Why Kids Learning Studio',
      newsletterTitle: 'Get Fresh Printables Every Week',
      newsletterSub: 'Join parents and preschool teachers receiving our newest free activity packs.',
      newsletterPlaceholder: 'Enter your email address',
      subscribeBtn: 'Subscribe',
      subscribedMsg: 'Welcome! Your weekly printable pack link is on its way.',
      supportTitle: 'Support Our Studio',
      supportCopy: 'Enjoying our free resources? Help us create more!',
      buyCoffeeBtn: 'Buy Us a Coffee',
    },
    whyItems: [
      {
        title: 'Fun Learning',
        desc: 'Playful illustrations that invite curiosity without screen fatigue.',
      },
      {
        title: 'Easy to Print',
        desc: 'Clean US Letter & A4 PDFs designed to look crisp in color or black-and-white.',
      },
      {
        title: 'Designed for Little Learners',
        desc: 'Age-appropriate spacing, bold tracing paths, and clear visual cues for ages 2–6.',
      },
      {
        title: 'Learn Through Play',
        desc: 'Hands-on matching, cutting, counting, and coloring that build real confidence.',
      },
    ],
    actions: {
      downloadFree: 'Download Free',
      buyNow: 'Buy Now',
      addToCart: 'Add to Cart',
      viewDetails: 'Preview Pages',
      freeLabel: 'Free PDF',
    },
    categories: {
      'coloring-pages': 'Coloring Pages',
      'math-numbers': 'Math & Numbers',
      'alphabet-letters': 'Alphabet & Letters',
      'shapes-colors': 'Shapes & Colors',
      'puzzles-matching': 'Puzzles & Matching',
      'fine-motor-skills': 'Fine Motor Skills',
      'creative-activities': 'Creative Activities',
    },
    footer: {
      tagline: 'Thoughtfully crafted printable worksheets, coloring books, and playful learning packs for children ages 2–6.',
      explore: 'Explore',
      categoriesTitle: 'Categories',
      companyTitle: 'Studio',
      legalTitle: 'Policies',
      copyright: '© 2026 Kids Learning Studio. All rights reserved.',
    },
  },
  es: {
    ui: {
      search: 'Buscar', searchResources: 'Buscar recursos', coffee: 'Café', ages: 'Edades', pages: 'Páginas', languageLabel: 'Seleccionar idioma',
      preview: 'Vista previa', downloaded: 'Descargado', emailAddress: 'Correo electrónico', weeklyPrintables: 'Imprimibles gratis cada semana',
      supportBody: 'Cada aportación nos ayuda a crear nuevas páginas para colorear, fichas de trazos y juegos de matemáticas.',
      aboutUs: 'Sobre nosotros', contactUs: 'Contacto', faq: 'Preguntas frecuentes', privacyPolicy: 'Privacidad', cookiePolicy: 'Política de cookies', terms: 'Términos y condiciones', all: 'Todo',
      newsletterNotConnected: 'El boletín aún no está conectado con WordPress.', newsletterDone: '¡Suscripción completada! Gracias por unirte.', newsletterFailed: 'No pudimos completar la suscripción. Inténtalo de nuevo más tarde.',
      resourceNotFound: 'No encontramos el recurso', resourceNotFoundHelp: 'No encontramos ese paquete imprimible. Explora el catálogo completo.', browseCatalog: 'Ver el catálogo',
    },
    catalog: {
      freeHeading: 'Recursos imprimibles gratis', allHeading: 'Biblioteca de recursos educativos',
      freeSub: 'Descarga PDFs al instante, sin registrarte. Listos para casa y el aula de preescolar.',
      allSub: 'Explora nuestra colección completa de fichas y actividades imprimibles gratis para niños de 2 a 6 años.',
      allResources: 'Todos los recursos', freePdfs: 'PDF gratis', allCategories: 'Todas las categorías', searchPlaceholder: 'Buscar por título, habilidad o tema...',
      allAges: 'Todas las edades (2–6)', ages2to3: 'De 2 a 3 años', ages3to4: 'De 3 a 4 años', ages4to5: 'De 4 a 5 años', ages5to6: 'De 5 a 6 años',
      allThemes: 'Todos los temas', foundations: 'Aprendizaje básico', animals: 'Animales', space: 'Espacio', seasons: 'Estaciones', everydayLife: 'Vida cotidiana',
      popular: 'Más populares', newest: 'Más recientes', reset: 'Borrar filtros', showing: 'Mostrando', resourceSingular: 'recurso imprimible', resourcePlural: 'recursos imprimibles',
      noResults: 'No encontramos fichas con esos criterios', noResultsHelp: 'Borra algún filtro o explora toda la biblioteca gratuita.', showAll: 'Ver todos los recursos',
    },
    detail: {
      home: 'Inicio', freePrintablePdf: 'PDF imprimible gratis', downloadAgain: '¡Descargado! Pulsa para descargarlo otra vez', downloadPdf: 'Descargar PDF gratis',
      directDownload: 'Descarga directa en PDF', noSignup: 'Sin necesidad de registrarse', printReady: 'Listo para imprimir en casa o en clase', skills: 'Habilidades que se desarrollan', included: 'Qué incluye',
      similar: 'Materiales de aprendizaje similares', browse: 'Ver', pagesUnit: 'páginas',
      coffeeLine: '¿Te gustan los recursos gratis? Invítanos un café y ayúdanos a crear más.', optionalNewsletter: 'Opcional: recibe nuevos imprimibles gratis cada semana', optionalPlaceholder: 'Correo electrónico (opcional)', join: 'Unirme', subscribedMsg: '¡Gracias! Ya recibes los paquetes gratuitos semanales.',
    },
    categoryDescriptions: {
      'coloring-pages': 'Contornos sencillos de animales, cohetes y estaciones.', 'math-numbers': 'Conteo, trazado de números y primeras sumas.',
      'alphabet-letters': 'Trazos de la A a la Z, letras y sonidos iniciales.', 'shapes-colors': 'Clasifica, empareja y nombra formas y colores.',
      'puzzles-matching': 'Sombras, juegos de lógica visual y primeros laberintos.', 'fine-motor-skills': 'Recortes, líneas de puntos y control del lápiz.', 'creative-activities': 'Manualidades, cuentos y actividades con arcoíris.',
    },
    nav: {
      categories: 'Categorías',
      freeResources: 'Recursos Gratis',
      shop: 'Tienda',
      blog: 'Blog',
      aboutUs: 'Nosotros',
      searchPlaceholder: 'Buscar fichas, dibujos para colorear, matemáticas...',
    },
    hero: {
      headline: '¡Aprender es una Aventura!',
      subtitle: 'Actividades divertidas, creativas y educativas para pequeños aprendices.',
      primaryCta: 'Explorar Recursos Gratis',
      secondaryCta: 'Ver Todas las Actividades',
      trustLine: 'Fichas PDF imprimibles de 2 a 6 años · Casa y Preescolar',
    },
    sections: {
      popularCategories: 'Categorías Populares',
      popularCategoriesSub: 'Elige un área para explorar fichas imprimibles y actividades prácticas.',
      freeResourcesTitle: 'Recursos Gratuitos',
      freeResourcesSub: 'Descarga PDFs al instante sin registro obligatorio. Listos para imprimir.',
      viewAllFree: 'Ver todos los recursos gratis',
      featuredActivities: 'Actividades Destacadas',
      featuredActivitiesSub: 'Favoritos de familias y paquetes completos de aprendizaje preescolar.',
      viewShop: 'Visitar la tienda digital',
      whyTitle: 'Por qué Kids Learning Studio',
      newsletterTitle: 'Recibe Nuevas Fichas Cada Semana',
      newsletterSub: 'Únete a familias y docentes que reciben nuestros nuevos packs gratuitos.',
      newsletterPlaceholder: 'Tu correo electrónico',
      subscribeBtn: 'Suscribirse',
      subscribedMsg: '¡Gracias! Tu paquete semanal de fichas está en camino.',
      supportTitle: 'Apoya Nuestro Estudio',
      supportCopy: '¿Disfrutas nuestros recursos gratuitos? ¡Ayúdanos a crear más!',
      buyCoffeeBtn: 'Invítanos un Café',
    },
    whyItems: [
      {
        title: 'Aprendizaje Divertido',
        desc: 'Ilustraciones alegres que despiertan la curiosidad sin pantallas.',
      },
      {
        title: 'Fácil de Imprimir',
        desc: 'PDFs limpios en Carta y A4 optimizados para impresión en color o blanco y negro.',
      },
      {
        title: 'Para Pequeños Aprendices',
        desc: 'Trazos amplios y guías visuales claras para niños de 2 a 6 años.',
      },
      {
        title: 'Aprender Jugando',
        desc: 'Recortar, contar, emparejar y colorear desarrollando confianza real.',
      },
    ],
    actions: {
      downloadFree: 'Descargar Gratis',
      buyNow: 'Comprar Ahora',
      addToCart: 'Añadir al Carrito',
      viewDetails: 'Ver Páginas',
      freeLabel: 'PDF Gratis',
    },
    categories: {
      'coloring-pages': 'Páginas para Colorear',
      'math-numbers': 'Matemáticas y Números',
      'alphabet-letters': 'Alfabeto y Letras',
      'shapes-colors': 'Formas y Colores',
      'puzzles-matching': 'Rompecabezas',
      'fine-motor-skills': 'Motricidad Fina',
      'creative-activities': 'Actividades Creativas',
    },
    footer: {
      tagline: 'Fichas imprimibles, libros para colorear y actividades educativas creadas con cariño para niños de 2 a 6 años.',
      explore: 'Explorar',
      categoriesTitle: 'Categorías',
      companyTitle: 'Estudio',
      legalTitle: 'Políticas',
      copyright: '© 2026 Kids Learning Studio. Todos los derechos reservados.',
    },
  },
  ru: {
    ui: {
      search: 'Поиск', searchResources: 'Искать материалы', coffee: 'Поддержать', ages: 'Возраст', pages: 'Страниц', languageLabel: 'Выбрать язык',
      preview: 'Предпросмотр', downloaded: 'Скачано', emailAddress: 'Электронная почта', weeklyPrintables: 'Новые материалы каждую неделю',
      supportBody: 'Ваши пожертвования помогают создавать новые раскраски, прописи и математические игры.',
      aboutUs: 'О проекте', contactUs: 'Связаться с нами', faq: 'Вопросы и ответы', privacyPolicy: 'Политика конфиденциальности', cookiePolicy: 'Политика cookie', terms: 'Условия использования', all: 'Все',
      newsletterNotConnected: 'Рассылка пока не подключена к WordPress.', newsletterDone: 'Вы подписались! Спасибо.', newsletterFailed: 'Не удалось оформить подписку. Попробуйте позже.',
      resourceNotFound: 'Материал не найден', resourceNotFoundHelp: 'Не удалось найти этот набор. Посмотрите все материалы в каталоге.', browseCatalog: 'Открыть каталог',
    },
    catalog: {
      freeHeading: 'Бесплатные материалы для печати', allHeading: 'Библиотека развивающих материалов',
      freeSub: 'Скачивайте PDF сразу, без регистрации. Материалы готовы для дома и детского сада.',
      allSub: 'Все наши бесплатные рабочие листы и задания для детей от 2 до 6 лет.',
      allResources: 'Все материалы', freePdfs: 'Бесплатные PDF', allCategories: 'Все категории', searchPlaceholder: 'Поиск по названию, навыку или теме...',
      allAges: 'Все возрасты (2–6)', ages2to3: '2–3 года', ages3to4: '3–4 года', ages4to5: '4–5 лет', ages5to6: '5–6 лет',
      allThemes: 'Все темы', foundations: 'Основы', animals: 'Животные', space: 'Космос', seasons: 'Времена года', everydayLife: 'Повседневная жизнь',
      popular: 'Сначала популярные', newest: 'Сначала новые', reset: 'Сбросить фильтры', showing: 'Найдено', resourceSingular: 'материал для печати', resourcePlural: 'материалов для печати',
      noResults: 'По вашему запросу ничего не найдено', noResultsHelp: 'Сбросьте фильтры или просмотрите все бесплатные материалы.', showAll: 'Показать все материалы',
    },
    detail: {
      home: 'Главная', freePrintablePdf: 'Бесплатный PDF для печати', downloadAgain: 'Уже скачано! Нажмите, чтобы скачать ещё раз', downloadPdf: 'Скачать бесплатный PDF',
      directDownload: 'Прямая загрузка PDF', noSignup: 'Без регистрации', printReady: 'Для печати дома и в классе', skills: 'Какие навыки развивает', included: 'Что входит в набор',
      similar: 'Похожие материалы', browse: 'Смотреть', pagesUnit: 'стр.',
      coffeeLine: 'Нравятся бесплатные материалы? Угостите нас кофе и помогите создавать новые!', optionalNewsletter: 'По желанию: получайте новые бесплатные материалы раз в неделю', optionalPlaceholder: 'Электронная почта (необязательно)', join: 'Подписаться', subscribedMsg: 'Спасибо! Вы подписаны на еженедельную рассылку.',
    },
    categoryDescriptions: {
      'coloring-pages': 'Раскраски с животными, ракетами и временами года.', 'math-numbers': 'Счёт предметов, обводка цифр и первые примеры.',
      'alphabet-letters': 'Обводка букв A–Z, знакомство с алфавитом и звуками.', 'shapes-colors': 'Сортировка, подбор пар, изучение фигур и цветов.',
      'puzzles-matching': 'Поиск теней, логические игры и простые лабиринты.', 'fine-motor-skills': 'Вырезание, пунктирные линии и тренировка карандашного захвата.', 'creative-activities': 'Поделки, идеи для историй и яркие творческие задания.',
    },
    nav: {
      categories: 'Категории',
      freeResources: 'Бесплатно',
      shop: 'Магазин',
      blog: 'Блог',
      aboutUs: 'О проекте',
      searchPlaceholder: 'Поиск рабочих листов, раскрасок, математики...',
    },
    hero: {
      headline: 'Обучение — это приключение!',
      subtitle: 'Весёлые, творческие и развивающие задания для маленьких исследователей.',
      primaryCta: 'Бесплатные материалы',
      secondaryCta: 'Все задания',
      trustLine: 'PDF-материалы для детей 2–6 лет · Для дома и детского сада',
    },
    sections: {
      popularCategories: 'Популярные категории',
      popularCategoriesSub: 'Выберите направление, чтобы найти рабочие листы и развивающие задания.',
      freeResourcesTitle: 'Бесплатные материалы',
      freeResourcesSub: 'Мгновенное скачивание PDF без обязательной регистрации.',
      viewAllFree: 'Все бесплатные материалы',
      featuredActivities: 'Популярные подборки',
      featuredActivitiesSub: 'Любимые рабочие тетради родителей и полные тематические наборы.',
      viewShop: 'Перейти в магазин',
      whyTitle: 'Почему Kids Learning Studio',
      newsletterTitle: 'Новые задания каждую неделю',
      newsletterSub: 'Получайте свежие бесплатные PDF-подборки для занятий дома и в группе.',
      newsletterPlaceholder: 'Ваш Email',
      subscribeBtn: 'Подписаться',
      subscribedMsg: 'Спасибо! Подборка новых заданий уже отправлена.',
      supportTitle: 'Поддержать проект',
      supportCopy: 'Нравятся бесплатные материалы? Помогите нам создавать ещё больше!',
      buyCoffeeBtn: 'Угостить кофе',
    },
    whyItems: [
      {
        title: 'Обучение с радостью',
        desc: 'Дружелюбные иллюстрации, которые увлекают ребёнка без экранов.',
      },
      {
        title: 'Удобная печать',
        desc: 'Чёткие PDF в форматах A4 и US Letter для цветного и чёрно-белого принтера.',
      },
      {
        title: 'Создано для малышей',
        desc: 'Крупные элементы, понятные контуры и задания по возрасту от 2 до 6 лет.',
      },
      {
        title: 'Развитие через игру',
        desc: 'Счёт, вырезание, логика и творчество в лёгком игровом формате.',
      },
    ],
    actions: {
      downloadFree: 'Скачать бесплатно',
      buyNow: 'Купить сейчас',
      addToCart: 'В корзину',
      viewDetails: 'Подробнее',
      freeLabel: 'Бесплатно PDF',
    },
    categories: {
      'coloring-pages': 'Раскраски',
      'math-numbers': 'Математика и счёт',
      'alphabet-letters': 'Алфавит и буквы',
      'shapes-colors': 'Фигуры и цвета',
      'puzzles-matching': 'Логика и пары',
      'fine-motor-skills': 'Мелкая моторика',
      'creative-activities': 'Творчество',
    },
    footer: {
      tagline: 'Качественные печатные рабочие листы, раскраски и развивающие наборы для детей 2–6 лет.',
      explore: 'Разделы',
      categoriesTitle: 'Категории',
      companyTitle: 'Студия',
      legalTitle: 'Документы',
      copyright: '© 2026 Kids Learning Studio. Все права защищены.',
    },
  },
};
