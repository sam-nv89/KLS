import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, Send } from 'lucide-react';
import type { AppRoute } from '../types/studio';
import type { Language } from '../types/studio';
import { FAQ_ITEMS } from '../data/editorial';
import { HeroBrandShowcase } from '../components/BrandLogo';
import { TRANSLATIONS } from '../data/translations';

const PAGE_TEXT = {
  en: {
    aboutTitle: 'About Kids Learning Studio', aboutIntro: 'We create calm, colorful, screen-free printable activities designed for curious children ages 2 to 6 and the parents and teachers who guide them.',
    aboutPhilosophy: 'Our Library-First Philosophy', aboutPhilosophyText: 'Our worksheets, coloring pages, and early-learning packs are free to download with a single click. Voluntary donations and advertising help keep our studio sustainable.',
    aboutPrinters: 'Built for Real Printers & Little Hands', aboutPrintersText: 'Every sheet is calibrated for crisp home printing on both US Letter and A4 paper, featuring generous spacing, readable typography, and uncluttered illustrations that build confidence step by step.',
    explore: 'Explore Free Resources', contactTeam: 'Contact Our Team', contactTitle: 'Contact Us', contactIntro: 'Questions about a download, school licensing, or printable requests? Write to us anytime.',
    messageReceived: 'Message Received!', thankYou: 'Thank you, {name}. Your message has been sent. We will reply to {email} as soon as possible.', anotherMessage: 'Send another message',
    leaveEmpty: 'Leave this field empty', yourName: 'Your Name', email: 'Email Address', topic: 'Topic', message: 'Message', send: 'Send Message', sending: 'Sending…',
    general: 'General Question', downloadHelp: 'Download Help', classroom: 'Preschool / Classroom License', newTopic: 'Request a New Printable Topic', howHelp: 'How can we help?',
    wpNotConnected: 'The contact form is not connected to WordPress yet. Please try again later.', sendFailed: 'We could not send your message. Please try again later.',
    emailNotice: 'Messages are sent to the site administrator’s email configured in WordPress.',
    faqTitle: 'Frequently Asked Questions', faqIntro: 'Helpful answers on PDF printing, classroom use, newsletter subscriptions, and free downloads.',
    privacy: 'Privacy Policy', cookies: 'Cookie Policy', terms: 'Terms & Conditions', lastUpdated: 'Last updated:',
    faq: [
      ['Downloads', 'Do I need to create an account to download free worksheets?', 'No. All free resources download directly as instant PDFs. An email address is only needed if you choose to subscribe to the newsletter.'],
      ['Printing', 'What paper size do your PDFs support (US Letter vs. A4)?', 'Every pack includes clean margins engineered to print sharply on both US Letter (8.5×11″) and international A4 paper. Select “Fit to Printable Area” in your printer dialog for crisp results.'],
      ['Printing', 'Can I print worksheets in black-and-white to save color ink?', 'Yes! Our layouts use high-contrast lines and plenty of white space, so every activity prints clearly in grayscale.'],
      ['Downloads', 'Can preschool teachers use these printables in their classrooms?', 'Yes. Our resources are for personal family use and for educators in their own classrooms.'],
      ['Support', 'How does “Buy Us a Coffee” support Kids Learning Studio?', 'Voluntary donations help cover illustration, curriculum design, and hosting so we can publish new free resources every week.'],
    ],
  },
  es: {
    aboutTitle: 'Sobre Kids Learning Studio', aboutIntro: 'Creamos actividades imprimibles tranquilas, coloridas y sin pantallas para niños curiosos de 2 a 6 años, y para las familias y docentes que los acompañan.',
    aboutPhilosophy: 'Una biblioteca abierta para aprender', aboutPhilosophyText: 'Nuestras fichas, dibujos para colorear y actividades iniciales se descargan gratis con un clic. Las donaciones voluntarias y la publicidad ayudan a mantener el proyecto.',
    aboutPrinters: 'Pensado para impresoras y manos pequeñas', aboutPrintersText: 'Cada hoja está preparada para imprimirse con nitidez en papel US Letter y A4. El espacio amplio, la tipografía legible y las ilustraciones sencillas ayudan a ganar confianza paso a paso.',
    explore: 'Explorar recursos gratis', contactTeam: 'Contactar con el equipo', contactTitle: 'Contacto', contactIntro: '¿Tienes dudas sobre una descarga, una licencia escolar o una actividad imprimible? Escríbenos cuando quieras.',
    messageReceived: '¡Mensaje recibido!', thankYou: 'Gracias, {name}. Hemos enviado tu mensaje y responderemos a {email} lo antes posible.', anotherMessage: 'Enviar otro mensaje',
    leaveEmpty: 'Deja este campo vacío', yourName: 'Tu nombre', email: 'Correo electrónico', topic: 'Tema', message: 'Mensaje', send: 'Enviar mensaje', sending: 'Enviando…',
    general: 'Pregunta general', downloadHelp: 'Ayuda con descargas', classroom: 'Licencia para preescolar o aula', newTopic: 'Solicitar un nuevo tema imprimible', howHelp: '¿Cómo podemos ayudarte?',
    wpNotConnected: 'El formulario aún no está conectado con WordPress. Inténtalo de nuevo más tarde.', sendFailed: 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.',
    emailNotice: 'Los mensajes se envían al correo del administrador configurado en WordPress.',
    faqTitle: 'Preguntas frecuentes', faqIntro: 'Respuestas útiles sobre impresión de PDFs, uso en clase, suscripciones y descargas gratuitas.',
    privacy: 'Política de privacidad', cookies: 'Política de cookies', terms: 'Términos y condiciones', lastUpdated: 'Última actualización:',
    faq: [
      ['Descargas', '¿Necesito crear una cuenta para descargar fichas gratis?', 'No. Los recursos gratuitos se descargan directamente en PDF. Solo necesitas un correo si quieres suscribirte al boletín.'],
      ['Impresión', '¿Qué tamaños de papel admiten los PDFs: US Letter o A4?', 'Todos los paquetes tienen márgenes adecuados para imprimir con claridad en US Letter (8,5×11″) y A4. Elige “Ajustar al área imprimible” en las opciones de impresión.'],
      ['Impresión', '¿Puedo imprimir en blanco y negro para ahorrar tinta?', '¡Sí! Diseñamos las fichas con líneas de alto contraste y espacio en blanco para que se impriman con claridad en escala de grises.'],
      ['Descargas', '¿Pueden usar estos imprimibles los docentes de preescolar?', 'Sí. Se permite el uso personal en familia y por docentes en sus propias aulas.'],
      ['Apoyo', '¿Cómo ayuda “Invítanos un café” a Kids Learning Studio?', 'Las aportaciones voluntarias ayudan a cubrir la ilustración, el diseño educativo y el alojamiento para publicar recursos nuevos cada semana.'],
    ],
  },
  ru: {
    aboutTitle: 'О Kids Learning Studio', aboutIntro: 'Мы создаём спокойные, яркие и доступные для печати задания без экранов — для любознательных детей от 2 до 6 лет, их родителей и педагогов.',
    aboutPhilosophy: 'Бесплатная библиотека материалов', aboutPhilosophyText: 'Наши рабочие листы, раскраски и развивающие наборы можно скачать бесплатно в один клик. Добровольные пожертвования и реклама помогают поддерживать проект.',
    aboutPrinters: 'Для обычных принтеров и маленьких рук', aboutPrintersText: 'Листы подготовлены для чёткой печати на бумаге A4 и US Letter. Просторная разметка, читаемый шрифт и ясные иллюстрации помогают ребёнку увереннее осваивать новые навыки.',
    explore: 'Открыть бесплатные материалы', contactTeam: 'Написать команде', contactTitle: 'Связаться с нами', contactIntro: 'Есть вопросы о скачивании, использовании материалов в детском саду или пожелания к новым заданиям? Напишите нам.',
    messageReceived: 'Сообщение отправлено!', thankYou: 'Спасибо, {name}! Мы получили ваше сообщение и ответим на адрес {email} как можно скорее.', anotherMessage: 'Отправить ещё одно сообщение',
    leaveEmpty: 'Оставьте это поле пустым', yourName: 'Ваше имя', email: 'Электронная почта', topic: 'Тема', message: 'Сообщение', send: 'Отправить сообщение', sending: 'Отправка…',
    general: 'Общий вопрос', downloadHelp: 'Помощь со скачиванием', classroom: 'Лицензия для детского сада или класса', newTopic: 'Предложить тему нового материала', howHelp: 'Чем мы можем помочь?',
    wpNotConnected: 'Форма пока не подключена к WordPress. Попробуйте отправить сообщение позже.', sendFailed: 'Не удалось отправить сообщение. Попробуйте ещё раз позже.',
    emailNotice: 'Сообщения отправляются на адрес администратора сайта, указанный в настройках WordPress.',
    faqTitle: 'Частые вопросы', faqIntro: 'Ответы о печати PDF, использовании материалов в группе, подписке на рассылку и бесплатных загрузках.',
    privacy: 'Политика конфиденциальности', cookies: 'Политика cookie', terms: 'Условия использования', lastUpdated: 'Обновлено:',
    faq: [
      ['Загрузки', 'Нужно ли регистрироваться, чтобы скачать бесплатные материалы?', 'Нет. Все бесплатные материалы сразу скачиваются в PDF. Адрес электронной почты нужен только для подписки на рассылку.'],
      ['Печать', 'На бумаге какого размера можно печатать PDF: US Letter или A4?', 'В каждом наборе предусмотрены поля для чёткой печати на бумаге US Letter (8,5×11″) и A4. В настройках принтера выберите «Вписать в область печати».'],
      ['Печать', 'Можно ли печатать материалы в чёрно-белом режиме, чтобы экономить цветные чернила?', 'Да. Мы используем контрастные линии и достаточно свободного места, поэтому задания хорошо печатаются в оттенках серого.'],
      ['Загрузки', 'Могут ли воспитатели и учителя использовать материалы в классе?', 'Да. Материалы разрешено использовать дома и педагогам в собственных классах.'],
      ['Поддержка', 'Как пожертвования «На кофе» помогают Kids Learning Studio?', 'Пожертвования помогают оплачивать иллюстрации, разработку заданий и хостинг, чтобы мы могли каждую неделю публиковать новые бесплатные материалы.'],
    ],
  },
} satisfies Record<Language, Record<string, any>>;

export const AboutUsPage: React.FC<{ onNavigate: (r: AppRoute) => void; language: Language }> = ({ onNavigate, language }) => {
  const c = PAGE_TEXT[language];
  return (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
    <div className="space-y-4 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
        {c.aboutTitle}
      </h1>
      <p className="text-lg text-[#475569] leading-relaxed">
        {c.aboutIntro}
      </p>
    </div>

    <HeroBrandShowcase />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-7 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
        <h2 className="font-display text-xl font-bold text-[#0F2A5F]">{c.aboutPhilosophy}</h2>
        <p className="text-sm text-[#475569] leading-relaxed">
          {c.aboutPhilosophyText}
        </p>
      </div>
      <div className="p-7 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
        <h2 className="font-display text-xl font-bold text-[#0F2A5F]">{c.aboutPrinters}</h2>
        <p className="text-sm text-[#475569] leading-relaxed">
          {c.aboutPrintersText}
        </p>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onNavigate({ page: 'catalog', preset: 'free' })}
        className="px-6 py-3 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
      >
        {c.explore}
      </button>
      <button
        type="button"
        onClick={() => onNavigate({ page: 'contact' })}
        className="px-6 py-3 rounded-xl bg-white border border-[#E5E2D9] text-[#0F2A5F] text-sm font-semibold hover:bg-[#F4F2EC] transition-colors cursor-pointer"
      >
        {c.contactTeam}
      </button>
    </div>
  </div>
  );
};

export const ContactUsPage: React.FC<{ language: Language }> = ({ language }) => {
  const c = PAGE_TEXT[language];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Question');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget as HTMLFormElement).get('website') ?? '');
    if (!name.trim() || !email.includes('@') || !message.trim()) return;
    const config = (window as Window & { klsConfig?: { restUrl?: string; nonce?: string } }).klsConfig;
    if (!config?.restUrl) {
      setSendError(c.wpNotConnected);
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const response = await fetch(`${config.restUrl}kls/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config.nonce ? { 'X-WP-Nonce': config.nonce } : {}) },
        body: JSON.stringify({ name, email, topic, message, website }),
      });
      if (!response.ok) throw new Error('Contact request failed');
      setSent(true);
    } catch {
      setSendError(c.sendFailed);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">{c.contactTitle}</h1>
        <p className="text-base text-[#475569]">
          {c.contactIntro}
        </p>
      </div>

      {sent ? (
        <div className="p-8 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
          <div className="flex items-center gap-2 text-[#15803D] font-bold text-lg font-display">
            <CheckCircle2 className="w-6 h-6" />
            <span>{c.messageReceived}</span>
          </div>
          <p className="text-sm text-[#166534]">
            {c.thankYou.replace('{name}', name).replace('{email}', email)}
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setName('');
              setEmail('');
              setMessage('');
            }}
            className="text-xs font-semibold text-[#15803D] underline cursor-pointer"
          >
            {c.anotherMessage}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-[#E5E2D9] space-y-5">
          <div className="absolute -left-[10000px]" aria-hidden="true">
            <label htmlFor="contact-website">{c.leaveEmpty}</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
                {c.yourName}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Samira Patel"
                className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
                {c.email}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
              {c.topic}
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm font-medium text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
            >
              <option value="General Question">{c.general}</option>
              <option value="Download Help">{c.downloadHelp}</option>
              <option value="Preschool / Classroom License">{c.classroom}</option>
              <option value="Request a New Printable Topic">{c.newTopic}</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
              {c.message}
            </label>
            <textarea
              id="contact-msg"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={c.howHelp}
              className="w-full p-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{sending ? c.sending : c.send}</span>
          </button>
          {sendError && <p role="alert" className="text-sm text-red-700">{sendError}</p>}
        </form>
      )}

      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Mail className="w-4 h-4" />
        <span>{c.emailNotice}</span>
      </div>
    </div>
  );
};

export const FaqPage: React.FC<{ language: Language }> = ({ language }) => {
  const c = PAGE_TEXT[language];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
          {c.faqTitle}
        </h1>
        <p className="text-base text-[#475569]">
          {c.faqIntro}
        </p>
      </div>

      <div className="space-y-3">
        {c.faq.map(([category, question, answer], idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={question} className="rounded-2xl bg-white border border-[#E5E2D9] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div>
                  <span className="text-[11px] font-semibold text-[#1B75E8] block">{category}</span>
                  <span className="font-display text-base font-bold text-[#0F2A5F]">{question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm text-[#475569] leading-relaxed border-t border-[#F1EFE9] pt-3">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LEGAL_TEXT = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'Free worksheets can be downloaded without creating an account or submitting personal details. If you voluntarily subscribe to our newsletter or contact us, we process the information you provide to deliver email updates or respond to your inquiry.',
        },
        {
          heading: '2. Children’s Privacy (COPPA / GDPR-K)',
          body: 'Kids Learning Studio is designed for parents, guardians, and preschool educators. We do not knowingly collect personal information directly from children under 13.',
        },
        {
          heading: '3. Analytics & Advertising Readiness',
          body: 'We measure aggregate resource downloads and page views to improve our educational library. If third-party advertising networks (such as Google AdSense) are enabled, standard consent controls apply.',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Essential Functional Storage',
          body: 'We use lightweight browser storage to remember your language preference (EN/ES/RU) and essential site preferences.',
        },
        {
          heading: '2. Advertising & Analytics Cookies',
          body: 'Optional analytics and advertising cookies are governed by your consent selection and can be updated anytime by clearing browser preferences.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Personal & Single-Classroom License',
          body: 'Printable PDFs from Kids Learning Studio are provided for personal family use and single-classroom educator use. Redistribution, reselling, or uploading raw PDF files to public file-sharing repositories is prohibited.',
        },
      ],
    },
  },
  es: {
    privacy: { title: 'Política de privacidad', updated: 'Noviembre de 2026', sections: [
      { heading: '1. Información que recopilamos', body: 'Puedes descargar fichas gratis sin crear una cuenta ni facilitar datos personales. Si te suscribes al boletín o nos escribes, usamos los datos que proporcionas para enviarte novedades o responder a tu consulta.' },
      { heading: '2. Privacidad infantil (COPPA / GDPR-K)', body: 'Kids Learning Studio está dirigido a familias, tutores y docentes de preescolar. No recopilamos conscientemente información personal directamente de menores de 13 años.' },
      { heading: '3. Analítica y publicidad', body: 'Medimos descargas y visitas de forma agregada para mejorar la biblioteca. Si activamos redes publicitarias externas, como Google AdSense, se aplicarán los controles de consentimiento correspondientes.' },
    ] },
    cookies: { title: 'Política de cookies', updated: 'Noviembre de 2026', sections: [
      { heading: '1. Almacenamiento funcional esencial', body: 'Usamos el almacenamiento básico del navegador para recordar el idioma elegido (EN/ES/RU) y las preferencias esenciales del sitio.' },
      { heading: '2. Cookies de publicidad y analítica', body: 'Las cookies opcionales de analítica y publicidad dependen de tu elección de consentimiento. Puedes cambiarla cuando quieras borrando las preferencias del navegador.' },
    ] },
    terms: { title: 'Términos y condiciones', updated: 'Noviembre de 2026', sections: [
      { heading: '1. Licencia personal y para una sola aula', body: 'Los PDFs de Kids Learning Studio se ofrecen para uso familiar y para que cada docente los utilice en su propia aula. No está permitido redistribuirlos, revenderlos ni subir los archivos PDF originales a repositorios públicos.' },
    ] },
  },
  ru: {
    privacy: { title: 'Политика конфиденциальности', updated: 'Ноябрь 2026 года', sections: [
      { heading: '1. Какие данные мы собираем', body: 'Бесплатные материалы можно скачивать без регистрации и передачи личных данных. Если вы подпишетесь на рассылку или напишете нам, мы используем предоставленные сведения, чтобы отправлять письма или отвечать на ваш запрос.' },
      { heading: '2. Конфиденциальность детей (COPPA / GDPR-K)', body: 'Kids Learning Studio создан для родителей, опекунов и педагогов дошкольного образования. Мы сознательно не собираем личные данные непосредственно у детей младше 13 лет.' },
      { heading: '3. Аналитика и реклама', body: 'Мы анализируем общее количество просмотров и загрузок, чтобы улучшать библиотеку. Если будут подключены сторонние рекламные сети, например Google AdSense, будут применяться соответствующие настройки согласия.' },
    ] },
    cookies: { title: 'Политика cookie', updated: 'Ноябрь 2026 года', sections: [
      { heading: '1. Необходимое хранение настроек', body: 'Мы используем локальное хранилище браузера, чтобы запомнить выбранный язык (EN/ES/RU) и основные настройки сайта.' },
      { heading: '2. Рекламные и аналитические cookie', body: 'Необязательные рекламные и аналитические cookie используются с учётом вашего выбора. Изменить его можно, очистив настройки сайта в браузере.' },
    ] },
    terms: { title: 'Условия использования', updated: 'Ноябрь 2026 года', sections: [
      { heading: '1. Личная лицензия и использование в одном классе', body: 'PDF-файлы Kids Learning Studio предназначены для личного семейного использования и занятий педагогов в собственном классе. Запрещено распространять или перепродавать файлы, а также размещать оригиналы PDF в открытых файловых хранилищах.' },
    ] },
  },
} satisfies Record<Language, Record<'privacy' | 'cookies' | 'terms', { title: string; updated: string; sections: { heading: string; body: string }[] }>>;

export const LegalPage: React.FC<{
  type: 'privacy' | 'cookies' | 'terms';
  language: Language;
}> = ({ type, language }) => {
  const docs = LEGAL_TEXT[language][type];
  const c = PAGE_TEXT[language];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-1 pb-4 border-b border-[#E5E2D9]">
        <h1 className="font-display text-3xl font-extrabold text-[#0F2A5F]">{docs.title}</h1>
        <p className="text-xs text-[#64748B]">{c.lastUpdated} {docs.updated}</p>
      </div>
      <div className="space-y-6">
        {docs.sections.map((sec) => (
          <section key={sec.heading} className="space-y-2">
            <h2 className="font-display text-lg font-bold text-[#0F2A5F]">{sec.heading}</h2>
            <p className="text-sm text-[#475569] leading-relaxed">{sec.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
};
