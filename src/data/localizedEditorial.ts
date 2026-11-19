import type { BlogArticle, Language } from '../types/studio';

type ArticleCopy = Pick<BlogArticle, 'title' | 'excerpt' | 'category' | 'readTime' | 'author' | 'content'>;
const ARTICLE_COPY: Record<Exclude<Language, 'en'>, Record<string, ArticleCopy>> = {
  ru: {
    'blog-scissor-skills': {
      title: 'Как 10 минут с ножницами в день помогают подготовить руку к письму',
      excerpt: 'До того как ребёнок начнёт писать буквы, вырезание укрепляет мышцы пальцев, необходимые для уверенного захвата карандаша.',
      category: 'Мелкая моторика', readTime: '4 мин. чтения', author: 'Клэр Беннетт, педагог дошкольного образования',
      content: [
        'Многие родители считают, что подготовка к письму начинается с прописей. На самом деле мышцы ладони и большого пальца активно развиваются во время игровых движений и сжатий. Безопасные детские ножницы — простой инструмент, который найдётся почти в каждом доме.',
        'Когда трёхлетний ребёнок разрезает широкую пунктирную линию ножницами с тупыми концами, большой, указательный и средний пальцы учатся двигаться независимо от остальных. Это разделение движений пальцев помогает сформировать удобный захват карандаша.',
        'Начните с плотной бумаги и коротких прямых полосок для надрезания, а не со сложных фигур. Плотная бумага не мнётся и помогает ребёнку сразу добиться успеха.',
        'Когда прямые разрезы станут уверенными, добавьте плавные волны и простые геометрические фигуры. Десять спокойных минут за таким занятием полезнее и приятнее, чем долгие упражнения через силу.',
      ],
    },
    'blog-screen-free-morning': {
      title: 'Спокойное утро без экранов: идеи для детей 3–5 лет',
      excerpt: 'Простое занятие на 15 минут: два распечатанных листа, три карандаша и почти никакой подготовки.',
      category: 'Занятия дома', readTime: '5 мин. чтения', author: 'Дэвид Моралес, автор дошкольных программ',
      content: [
        'Утро с маленькими детьми проходит быстро. Вместо сложных сенсорных игр, на уборку которых уйдёт много времени, подготовьте тихое занятие за завтраком: один рабочий лист, несколько цветных карандашей и добрый вопрос.',
        'Чередуйте разные навыки, чтобы сохранять интерес и не превращать игру в урок. В понедельник предложите найти тени лесных животных, во вторник — посчитать фрукты, а в среду — раскрасить динозавра.',
        'Не перегружайте выбор: двух или трёх листов в тонкой папке достаточно. Ребёнок сможет сам решить, с чего начать, а уборка займёт всего полминуты.',
      ],
    },
    'blog-playful-math': {
      title: 'Весёлый счёт с макаронами, пуговицами и рамками на десять',
      excerpt: 'Соедините распечатанные листы для счёта с обычными домашними предметами, чтобы числа стали понятны на ощупь.',
      category: 'Математика и счёт', readTime: '4 мин. чтения', author: 'Клэр Беннетт, педагог дошкольного образования',
      content: [
        'Маленьким детям легче понять числа, когда они могут пересчитать предметы руками. Распечатанный лист с числами и кубики, сухая фасоль или помпоны помогают перейти от простого повторения счёта к пониманию количества.',
        'Предложите ребёнку положить по одному помпону в каждую звёздочку или ячейку рамки на десять. Когда все ячейки заполнены, спросите: «Сколько получилось всего?» Так ребёнку проще представить числа 5 и 10, а позже — освоить сложение.',
      ],
    },
  },
  es: {
    'blog-scissor-skills': {
      title: 'Cómo 10 minutos diarios con tijeras preparan la mano para escribir',
      excerpt: 'Antes de escribir letras, recortar papel fortalece los músculos de los dedos que se necesitan para sujetar bien el lápiz.',
      category: 'Motricidad fina', readTime: '4 min de lectura', author: 'Claire Bennett, educadora infantil',
      content: [
        'Muchas familias creen que la preparación para escribir empieza con fichas del alfabeto. En realidad, los pequeños músculos de la mano y el pulgar se fortalecen con movimientos táctiles y juegos de apretar. Las tijeras infantiles seguras son una herramienta sencilla que suele estar en casa.',
        'Cuando un niño de tres años abre y cierra unas tijeras de punta roma siguiendo una línea de puntos ancha, aprende a mover el pulgar, el índice y el corazón por separado. Esa coordinación ayuda a desarrollar un agarre cómodo del lápiz.',
        'Empieza con cartulina fina y tiras cortas para hacer cortes, en vez de figuras complejas. El papel grueso no se dobla tanto y ofrece pequeños logros inmediatos.',
        'Cuando los cortes rectos sean fáciles, añade curvas suaves y formas geométricas sencillas. Diez minutos tranquilos de práctica funcionan mejor que largas sesiones forzadas de letras.',
      ],
    },
    'blog-screen-free-morning': {
      title: 'Una mañana tranquila sin pantallas para niños de 3 a 5 años',
      excerpt: 'Una invitación sencilla a jugar durante 15 minutos: dos hojas impresas, tres crayones y casi nada de preparación.',
      category: 'Aprender en casa', readTime: '5 min de lectura', author: 'David Morales, diseñador de currículo preescolar',
      content: [
        'Las mañanas con niños pequeños pasan deprisa. En lugar de preparar actividades sensoriales que tardan mucho en recogerse, prueba una invitación tranquila en la mesa: una ficha impresa, unos crayones y una consigna amable.',
        'Alternar habilidades mantiene la curiosidad sin que parezca una clase. El lunes, un juego de sombras del bosque; el martes, una tira para contar frutas; el miércoles, un dibujo de dinosaurio para colorear.',
        'Ofrece pocas opciones. Dos o tres actividades en una carpeta fina dan autonomía a los niños y permiten recogerlo todo en medio minuto.',
      ],
    },
    'blog-playful-math': {
      title: 'Juegos de conteo con pasta, botones y marcos de diez',
      excerpt: 'Combina fichas de conteo con objetos cotidianos para que los números se puedan tocar y explorar.',
      category: 'Matemáticas y números', readTime: '4 min de lectura', author: 'Claire Bennett, educadora infantil',
      content: [
        'Los niños pequeños comprenden mejor los números cuando pueden tocar cada objeto mientras cuentan. Una ficha impresa junto con bloques, alubias secas o pompones ayuda a pasar de recitar números a relacionar cada número con una cantidad.',
        'Invita a tu hijo a colocar un pompón en cada estrella o casilla de un marco de diez. Al llegar a la última, pregunta: «¿Cuántos hay en total?». Ver cómo se llena la fila facilita entender el 5 y el 10, y prepara para sumar.',
      ],
    },
  },
};

export function localizeArticle(article: BlogArticle, language: Language): BlogArticle {
  if (language === 'en') return article;
  return { ...article, ...ARTICLE_COPY[language][article.id] };
}
