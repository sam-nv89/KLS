import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type {
  AdZoneConfig,
  AnalyticsEvent,
  AppRoute,
  CartItem,
  CategoryId,
  DigitalOrder,
  Language,
  LearningResource,
  PromoCode,
} from './types/studio';
import { INITIAL_RESOURCES } from './data/resources';
import { BLOG_ARTICLES, FAQ_ITEMS, INITIAL_AD_ZONES, INITIAL_PROMO_CODES } from './data/editorial';
import { triggerResourcePdfDownload } from './utils/pdfGenerator';
import { applySeoMetadata } from './utils/seo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdSlot } from './components/AdSlot';
import { CartDrawer } from './components/CartDrawer';
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
  MyDownloadsPage,
  SupportPage,
} from './pages/StaticPages';
import { StudioAdminPage } from './pages/StudioAdminPage';

function parsePathToRoute(pathname: string): AppRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return { page: 'home' };
  if (clean === '/free-resources') return { page: 'catalog', preset: 'free' };
  if (clean === '/shop') return { page: 'catalog', preset: 'shop' };
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
  if (clean === '/downloads') return { page: 'downloads' };
  if (clean === '/privacy') return { page: 'privacy' };
  if (clean === '/cookies') return { page: 'cookies' };
  if (clean === '/terms') return { page: 'terms' };
  if (clean === '/refunds') return { page: 'refunds' };
  if (clean === '/studio-admin') return { page: 'studio-admin' };
  return { page: 'home' };
}

function routeToPath(route: AppRoute): string {
  switch (route.page) {
    case 'home':
      return '/';
    case 'catalog':
      if (route.preset === 'free') return '/free-resources';
      if (route.preset === 'shop') return '/shop';
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
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('kls_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<DigitalOrder[]>(() => {
    try {
      const raw = localStorage.getItem('kls_orders');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [adZones, setAdZones] = useState<AdZoneConfig[]>(INITIAL_AD_ZONES);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  const [cartOpen, setCartOpen] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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
      localStorage.setItem('kls_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('kls_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

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
        applySeoMetadata({
          title: `${item.title} – Kids Learning Studio`,
          description: item.shortDescription,
          canonicalPath: path,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': item.isFree ? 'LearningResource' : 'Product',
            name: item.title,
            description: item.fullDescription,
            educationalLevel: `Preschool Ages ${item.ageGroup}`,
            offers: {
              '@type': 'Offer',
              price: item.price.toFixed(2),
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          },
        });
        return;
      }
    }
    if (route.page === 'blog' && route.slug) {
      const article = BLOG_ARTICLES.find((a) => a.slug === route.slug);
      if (article) {
        applySeoMetadata({
          title: `${article.title} – Kids Learning Studio`,
          description: article.excerpt,
          canonicalPath: path,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            author: { '@type': 'Person', name: article.author },
          },
        });
        return;
      }
    }
    if (route.page === 'faq') {
      applySeoMetadata({
        title: 'FAQ – Kids Learning Studio',
        description: 'Answers about free printable PDF worksheets, home and classroom printing, and digital bundles.',
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

    const titles: Record<string, string> = {
      home: 'Kids Learning Studio – Printable Worksheets & Activities',
      catalog: 'Printable Worksheets & Digital Shop – Kids Learning Studio',
      blog: 'Parent & Educator Blog – Kids Learning Studio',
      about: 'About Us – Kids Learning Studio',
      contact: 'Contact Us – Kids Learning Studio',
      support: 'Buy Us a Coffee – Kids Learning Studio',
      downloads: 'My Downloads – Kids Learning Studio',
      privacy: 'Privacy Policy – Kids Learning Studio',
      cookies: 'Cookie Policy – Kids Learning Studio',
      terms: 'Terms & Conditions – Kids Learning Studio',
      refunds: 'Refund Policy – Kids Learning Studio',
      'studio-admin': 'Studio Manager – Kids Learning Studio',
    };

    applySeoMetadata({
      title: titles[route.page] ?? titles.home,
      description:
        'Free and printable educational worksheets, coloring pages, math games, and activity packs for kids ages 2–6.',
      canonicalPath: path,
    });
  }, [route, resources]);

  const cartIds = useMemo(() => new Set(cart.map((c) => c.resourceId)), [cart]);
  const purchasedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const o of orders) {
      for (const item of o.items) {
        ids.add(item.resourceId);
      }
    }
    return ids;
  }, [orders]);

  const handleDownloadResource = (resource: LearningResource) => {
    if (resource.isFree) {
      trackEvent('download_free_click', resource.title);
    }
    triggerResourcePdfDownload(resource);
    trackEvent('pdf_downloaded', resource.title);
    setDownloadedIds((prev) => new Set(prev).add(resource.id));
    setResources((prev) =>
      prev.map((r) => (r.id === resource.id ? { ...r, downloadCount: r.downloadCount + 1 } : r))
    );
    showToast(`Downloaded ${resource.slug}-kids-learning-studio.pdf`);
  };

  const handleAddToCart = (resource: LearningResource) => {
    if (resource.isFree) {
      handleDownloadResource(resource);
      return;
    }
    setCart((prev) => {
      if (prev.some((c) => c.resourceId === resource.id)) return prev;
      return [...prev, { resourceId: resource.id, quantity: 1 }];
    });
    trackEvent('buy_now_click', resource.title, resource.price);
    showToast(`Added "${resource.title}" to your bag`);
  };

  const handleBuyNow = (resource: LearningResource) => {
    handleAddToCart(resource);
    setCartOpen(true);
  };

  const handleRemoveFromCart = (resourceId: string) => {
    setCart((prev) => prev.filter((c) => c.resourceId !== resourceId));
  };

  const handleCheckoutComplete = (order: DigitalOrder) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    trackEvent('purchase_completed', `Order #${order.id}`, order.totalPaid);
  };

  const handleSubscribeNewsletter = (email: string) => {
    trackEvent('newsletter_subscribed', email);
    showToast('Subscribed! Weekly free printables are on the way.');
  };

  const handleDonateComplete = (amount: number, note: string) => {
    trackEvent('donation_completed', note || 'Coffee Supporter', amount);
    showToast(`Thank you for your $${amount.toFixed(2)} coffee support!`);
  };

  const headerAdZone = adZones.find((z) => z.id === 'ad-header-banner');

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return (
          <HomePage
            language={language}
            resources={resources}
            cartIds={cartIds}
            downloadedIds={downloadedIds}
            adZones={adZones}
            onNavigate={navigate}
            onDownloadFree={handleDownloadResource}
            onAddToCart={handleAddToCart}
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
            resources={resources}
            initialPreset={route.preset}
            initialCategory={route.category as CategoryId | undefined}
            initialQuery={route.query}
            cartIds={cartIds}
            downloadedIds={downloadedIds}
            adZones={adZones}
            onNavigate={navigate}
            onDownloadFree={handleDownloadResource}
            onAddToCart={handleAddToCart}
          />
        );
      case 'resource': {
        const found = resources.find((r) => r.slug === route.slug);
        if (!found) {
          return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
              <h1 className="font-display text-3xl font-bold text-[#0F2A5F]">Resource Not Found</h1>
              <p className="text-sm text-[#475569]">
                We couldn’t find that printable pack. Browse all resources in our catalog instead.
              </p>
              <button
                type="button"
                onClick={() => navigate({ page: 'catalog', preset: 'all' })}
                className="px-5 py-2.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          );
        }
        return (
          <ResourceDetailPage
            key={found.id}
            resource={found}
            allResources={resources}
            language={language}
            isInCart={cartIds.has(found.id)}
            isPurchased={purchasedIds.has(found.id)}
            isDownloaded={downloadedIds.has(found.id)}
            adZones={adZones}
            onNavigate={navigate}
            onDownloadFree={handleDownloadResource}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
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
            resources={resources}
            onNavigate={navigate}
          />
        );
      case 'about':
        return <AboutUsPage onNavigate={navigate} />;
      case 'contact':
        return <ContactUsPage />;
      case 'faq':
        return <FaqPage />;
      case 'support':
        return <SupportPage onDonateComplete={handleDonateComplete} />;
      case 'downloads':
        return (
          <MyDownloadsPage
            orders={orders}
            resources={resources}
            onDownloadResource={handleDownloadResource}
            onNavigate={navigate}
          />
        );
      case 'privacy':
      case 'cookies':
      case 'terms':
      case 'refunds':
        return <LegalPage type={route.page} />;
      case 'studio-admin':
        return (
          <StudioAdminPage
            resources={resources}
            adZones={adZones}
            promoCodes={promoCodes}
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
            onUpdateResourcePrice={(id, price) =>
              setResources((prev) => prev.map((r) => (r.id === id ? { ...r, price } : r)))
            }
            onTogglePromoCode={(code) =>
              setPromoCodes((prev) =>
                prev.map((p) => (p.code === code ? { ...p, active: !p.active } : p))
              )
            }
            onAddPromoCode={(promo) => setPromoCodes((prev) => [promo, ...prev])}
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
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenCoffee={() => {
          trackEvent('support_visit', 'Header Coffee');
          setCoffeeOpen(true);
        }}
      />

      {/* Optional Header Ad Zone (disabled by default) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSlot zone={headerAdZone} />
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

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        resources={resources}
        promoCodes={promoCodes}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutComplete={handleCheckoutComplete}
        onDownloadResource={handleDownloadResource}
        onBrowseShop={() => navigate({ page: 'catalog', preset: 'shop' })}
      />

      <CoffeeModal
        isOpen={coffeeOpen}
        onClose={() => setCoffeeOpen(false)}
        onDonateComplete={handleDonateComplete}
      />

      <CookieNotice onNavigate={navigate} />

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
