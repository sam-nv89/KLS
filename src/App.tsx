import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type {
  AdZoneConfig,
  AnalyticsEvent,
  AppRoute,
  CategoryId,
  Language,
  LearningResource,
} from './types/studio';
import { INITIAL_RESOURCES } from './data/resources';
import { BLOG_ARTICLES, FAQ_ITEMS, INITIAL_AD_ZONES } from './data/editorial';
import { triggerResourcePdfDownload } from './utils/pdfGenerator';
import { applySeoMetadata } from './utils/seo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdSlot } from './components/AdSlot';
import { CoffeeModal } from './components/CoffeeModal';
import { CookieNotice } from './components/CookieNotice';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { BlogPage } from './pages/BlogPage';
import {
  AboutUsPage,
  ContactUsPage,
  FaqPage,
  LegalPage,
} from './pages/StaticPages';
import { SupportPage } from './pages/SupportPage';
import { StudioAdminPage } from './pages/StudioAdminPage';
import { localizeResource } from './data/localizedResources';
import { localizeArticle } from './data/localizedEditorial';
import { TRANSLATIONS } from './data/translations';

function parsePathToRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return { page: 'home' };
  if (clean === '/free-resources') return { page: 'catalog', preset: 'free' };
  if (clean === '/resources') return { page: 'catalog', preset: 'all' };
  if (clean.startsWith('/resources/')) {
    const slug = clean.replace('/resources/', '');
    return { page: 'resource', slug };
  }
  if (clean === '/blog') return { page: 'blog' };
  if (clean.startsWith('/blog/')) {
    return { page: 'blog', slug: clean.replace('/blog/', '') };
  }
  if (clean === '/about') return { page: 'about' };
  if (clean === '/contact') return { page: 'contact' };
  if (clean === '/faq') return { page: 'faq' };
  if (clean === '/support') return { page: 'support' };
  if (clean === '/privacy') return { page: 'privacy' };
  if (clean === '/cookies') return { page: 'cookies' };
  if (clean === '/terms') return { page: 'terms' };
  if (clean === '/studio-admin') return { page: 'studio-admin' };
  return { page: 'home' };
}

function routeToPath(route: AppRoute): string {
  switch (route.page) {
    case 'home':
      return '/';
    case 'catalog':
      if (route.preset === 'free') return '/free-resources';
      return '/resources';
    case 'resource':
      return `/resources/${route.slug}`;
    case 'blog':
      return route.slug ? `/blog/${route.slug}` : '/blog';
    default:
      return `/${route.page}`;
  }
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parsePathToRoute(window.location.pathname));
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('kls_lang');
      if (saved === 'en' || saved === 'es' || saved === 'ru') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [resources, setResources] = useState<LearningResource[]>(INITIAL_RESOURCES);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [adZones, setAdZones] = useState<AdZoneConfig[]>(INITIAL_AD_ZONES);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const trackEvent = (type: AnalyticsEvent['type'], label: string, value?: number) => {
    setEvents((prev) => [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        type,
        label,
        value,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    try {
      localStorage.setItem('kls_lang', language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parsePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (next: AppRoute) => {
    const nextPath = routeToPath(next);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (next.page === 'resource') {
      trackEvent('resource_view', next.slug);
    } else if (next.page === 'support') {
      trackEvent('support_visit', 'Support Page');
    }
  };

  // Dynamic SEO & Schema.org updates per route
  useEffect(() => {
    const path = routeToPath(route);
    if (route.page === 'resource') {
      const item = resources.find((r) => r.slug === route.slug);
      if (item) {
        const localizedItem = localizeResource(item, language);
        applySeoMetadata({
          title: `${localizedItem.title} – Kids Learning Studio`,
          description: localizedItem.shortDescription,
          canonicalPath: path,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: localizedItem.title,
            description: localizedItem.fullDescription,
            educationalLevel: `Preschool Ages ${item.ageGroup}`,
          },
        });
        return;
      }
    }
    if (route.page === 'blog' && route.slug) {
      const article = BLOG_ARTICLES.find((a) => a.slug === route.slug);
      if (article) {
        const localizedArticle = localizeArticle(article, language);
        applySeoMetadata({
          title: `${localizedArticle.title} – Kids Learning Studio`,
          description: localizedArticle.excerpt,
          canonicalPath: path,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: localizedArticle.title,
            description: localizedArticle.excerpt,
            author: { '@type': 'Person', name: localizedArticle.author },
          },
        });
        return;
      }
    }
    if (route.page === 'faq') {
      applySeoMetadata({
        title: language === 'ru' ? 'Вопросы и ответы – Kids Learning Studio' : language === 'es' ? 'Preguntas frecuentes – Kids Learning Studio' : 'FAQ – Kids Learning Studio',
        description: language === 'ru' ? 'Ответы о бесплатных PDF-материалах, печати дома и в классе.' : language === 'es' ? 'Respuestas sobre fichas PDF gratuitas y su impresión en casa y en clase.' : 'Answers about free printable PDF worksheets and printing at home or in class.',
        canonicalPath: '/faq',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        },
      });
      return;
    }

    const titlesByLanguage: Record<Language, Record<string, string>> = {
      en: {
        home: 'Kids Learning Studio – Printable Worksheets & Activities', catalog: 'Free Printable Worksheets – Kids Learning Studio', blog: 'Parent & Educator Blog – Kids Learning Studio', about: 'About Us – Kids Learning Studio', contact: 'Contact Us – Kids Learning Studio', support: 'Support Kids Learning Studio', privacy: 'Privacy Policy – Kids Learning Studio', cookies: 'Cookie Policy – Kids Learning Studio', terms: 'Terms & Conditions – Kids Learning Studio', 'studio-admin': 'Studio Manager – Kids Learning Studio',
      },
      es: {
        home: 'Kids Learning Studio – Fichas y actividades imprimibles', catalog: 'Fichas imprimibles gratis – Kids Learning Studio', blog: 'Blog para familias y docentes – Kids Learning Studio', about: 'Sobre nosotros – Kids Learning Studio', contact: 'Contacto – Kids Learning Studio', support: 'Apoya a Kids Learning Studio', privacy: 'Política de privacidad – Kids Learning Studio', cookies: 'Política de cookies – Kids Learning Studio', terms: 'Términos y condiciones – Kids Learning Studio', 'studio-admin': 'Administración – Kids Learning Studio',
      },
      ru: {
        home: 'Kids Learning Studio – Рабочие листы и задания', catalog: 'Бесплатные материалы для печати – Kids Learning Studio', blog: 'Блог для родителей и педагогов – Kids Learning Studio', about: 'О проекте – Kids Learning Studio', contact: 'Связаться с нами – Kids Learning Studio', support: 'Поддержать Kids Learning Studio', privacy: 'Политика конфиденциальности – Kids Learning Studio', cookies: 'Политика cookie – Kids Learning Studio', terms: 'Условия использования – Kids Learning Studio', 'studio-admin': 'Управление студией – Kids Learning Studio',
      },
    };

    applySeoMetadata({
      title: titlesByLanguage[language][route.page] ?? titlesByLanguage[language].home,
      description: language === 'ru' ? 'Бесплатные рабочие листы, раскраски, математические игры и задания для детей 2–6 лет.' : language === 'es' ? 'Fichas educativas, dibujos, juegos de matemáticas y actividades imprimibles gratis para niños de 2 a 6 años.' : 'Free printable worksheets, coloring pages, math games, and activity packs for children ages 2–6.',
      canonicalPath: path,
    });
  }, [route, resources, language]);

  const handleDownloadResource = (resource: LearningResource) => {
    const t = TRANSLATIONS[language];
    if (resource.isFree) {
      trackEvent('download_free_click', resource.title);
    }
    // Keep generated worksheet text in its source language. The current PDF
    // writer uses built-in ASCII fonts and cannot safely render localized text.
    const sourceResource = resources.find((item) => item.id === resource.id) ?? resource;
    triggerResourcePdfDownload(sourceResource);
    trackEvent('pdf_downloaded', resource.title);
    setDownloadedIds((prev) => new Set(prev).add(resource.id));
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    showToast(`${t.actions.downloadFree}: ${resource.title}`);
  };

  const cartIds = new Set<string>();
  const purchasedIds = new Set<string>();
  const localizedResources = resources.map((resource) => localizeResource(resource, language));

  const handleSubscribeNewsletter = async (email: string): Promise<boolean> => {
    const t = TRANSLATIONS[language];
    const wp = window as Window & { klsConfig?: { restUrl: string; nonce: string } };
    if (!wp.klsConfig?.restUrl || !wp.klsConfig.nonce) {
      showToast(t.ui.newsletterNotConnected);
      return false;
    }
    try {
      const response = await fetch(`${wp.klsConfig.restUrl}kls/v1/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wp.klsConfig.nonce },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Subscription failed');
      trackEvent('newsletter_subscribed', email);
      showToast(t.ui.newsletterDone);
      return true;
    } catch {
      showToast(t.ui.newsletterFailed);
      return false;
    }
  };

  const headerAdZone = adZones.find((z) => z.id === 'ad-header-banner');

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            language={language}
            resources={localizedResources}
            cartIds={cartIds}
            downloadedIds={downloadedIds}
            adZones={adZones}
            onNavigate={navigate}
            onDownloadFree={handleDownloadResource}
            onAddToCart={handleDownloadResource}
            onSubscribeNewsletter={handleSubscribeNewsletter}
            onOpenCoffee={() => {
              trackEvent('support_visit', 'Coffee Modal');
              setCoffeeOpen(true);
            }}
          />
        );
      case 'catalog':
        return (
          <CatalogPage
            key={`${route.preset ?? 'all'}-${route.category ?? 'all'}-${route.query ?? ''}`}
            language={language}
            resources={localizedResources}
            initialPreset={route.preset}
            initialCategory={route.category as CategoryId | undefined}
            initialQuery={route.query}
            cartIds={cartIds}
            downloadedIds={downloadedIds}
            adZones={adZones}
            onNavigate={navigate}
            onDownloadFree={handleDownloadResource}
            onAddToCart={handleDownloadResource}
          />
        );
      case 'resource': {
        const found = localizedResources.find((r) => r.slug === route.slug);
        if (!found) {
          return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
              <h1 className="font-display text-3xl font-bold text-[#0F2A5F]">{TRANSLATIONS[language].ui.resourceNotFound}</h1>
              <p className="text-sm text-[#475569]">
                {TRANSLATIONS[language].ui.resourceNotFoundHelp}
              </p>
              <button
                type="button"
                onClick={() => navigate({ page: 'catalog', preset: 'all' })}
                className="px-5 py-2.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold cursor-pointer"
              >
                {TRANSLATIONS[language].ui.browseCatalog}
              </button>
            </div>
          );
        }
        return (
          <ResourceDetailPage
            key={found.id}
            resource={found}
            allResources={localizedResources}
            language={language}
            isInCart={cartIds.has(found.id)}
            isPurchased={purchasedIds.has(found.id)}
            isDownloaded={downloadedIds.has(found.id)}
            adZones={adZones}
            onNavigate={navigate}
            onDownloadFree={handleDownloadResource}
            onAddToCart={handleDownloadResource}
            onBuyNow={handleDownloadResource}
            onSubscribeNewsletter={handleSubscribeNewsletter}
            onOpenCoffee={() => {
              trackEvent('support_visit', 'Resource Page Coffee');
              setCoffeeOpen(true);
            }}
          />
        );
      }
      case 'blog':
        return (
          <BlogPage
            slug={route.slug}
            adZones={adZones}
            resources={localizedResources}
            onNavigate={navigate}
            language={language}
          />
        );
      case 'about':
        return <AboutUsPage onNavigate={navigate} language={language} />;
      case 'contact':
        return <ContactUsPage language={language} />;
      case 'faq':
        return <FaqPage language={language} />;
      case 'support':
        return <SupportPage language={language} />;
      case 'privacy':
      case 'cookies':
      case 'terms':
        return <LegalPage type={route.page} language={language} />;
      case 'studio-admin':
        return (
          <StudioAdminPage
            resources={resources}
            adZones={adZones}
            events={events}
            onToggleAdZone={(id) =>
              setAdZones((prev) =>
                prev.map((z) =>
                  z.id === id
                    ? { ...z, enabled: !z.enabled, provider: !z.enabled ? 'Google AdSense' : 'Unassigned' }
                    : z
                )
              )
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF8] text-[#0F2A5F]">
      <Header
        route={route}
        onNavigate={navigate}
        language={language}
        onChangeLanguage={setLanguage}
        onOpenCoffee={() => {
          trackEvent('support_visit', 'Header Coffee');
          setCoffeeOpen(true);
        }}
      />

      {/* Optional Header Ad Zone (disabled by default) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSlot zone={headerAdZone} language={language} />
      </div>

      <main className="flex-1">{renderPage()}</main>

      <Footer
        onNavigate={navigate}
        language={language}
        onOpenCoffee={() => {
          trackEvent('support_visit', 'Footer Coffee');
          setCoffeeOpen(true);
        }}
      />

      <CoffeeModal
        isOpen={coffeeOpen}
        onClose={() => setCoffeeOpen(false)}
        language={language}
      />

      <CookieNotice onNavigate={navigate} language={language} />

      {/* Crisp Non-Blocking Toast Feedback */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0F2A5F] text-white text-xs font-semibold shadow-xl"
        >
          <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
