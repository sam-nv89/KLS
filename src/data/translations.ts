import type { CategoryId, Language } from '../types/studio';

export interface TranslationSet {
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
