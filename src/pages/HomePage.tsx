import React, { useState } from 'react';
import { ArrowRight, Printer, Smile, Sparkles, Puzzle, Coffee, Mail, CheckCircle2 } from 'lucide-react';
import type { AdZoneConfig, AppRoute, Language, LearningResource } from '../types/studio';
import { CATEGORIES } from '../data/resources';
import { TRANSLATIONS } from '../data/translations';
import { HeroBrandShowcase } from '../components/BrandLogo';
import { WorksheetPreview } from '../components/WorksheetPreview';
import { ResourceCard } from '../components/ResourceCard';
import { AdSlot } from '../components/AdSlot';

interface HomePageProps {
  language: Language;
  resources: LearningResource[];
  cartIds: Set<string>;
  downloadedIds: Set<string>;
  adZones: AdZoneConfig[];
  onNavigate: (route: AppRoute) => void;
  onDownloadFree: (resource: LearningResource) => void;
  onAddToCart: (resource: LearningResource) => void;
  onSubscribeNewsletter: (email: string) => void;
  onOpenCoffee: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  resources,
  cartIds,
  downloadedIds,
  adZones,
  onNavigate,
  onDownloadFree,
  onAddToCart,
  onSubscribeNewsletter,
  onOpenCoffee,
}) => {
  const t = TRANSLATIONS[language];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const freeResources = resources.filter((r) => r.isFree).slice(0, 6);
  const featuredResources = resources.filter((r) => r.featured).slice(0, 3);
  const homeAdZone = adZones.find((z) => z.id === 'ad-home-content');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    onSubscribeNewsletter(email.trim());
    setSubscribed(true);
    setEmail('');
  };

  const whyIcons = [Smile, Printer, Sparkles, Puzzle];
  const whyAccents = ['#1B75E8', '#16A34A', '#F97316', '#7C3AED'];

  return (
    <div className="space-y-20">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-semibold tracking-wide text-[#1B75E8]">
              {t.hero.trustLine}
            </p>
            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold text-[#0F2A5F] leading-[1.08] text-balance">
              {t.hero.headline}
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'catalog', preset: 'free' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'catalog', preset: 'all' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#E5E2D9] text-[#0F2A5F] text-sm font-semibold hover:bg-[#F4F2EC] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <HeroBrandShowcase />
          </div>
        </div>
      </section>

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F2A5F]">
              {t.sections.popularCategories}
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              {t.sections.popularCategoriesSub}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onNavigate({ page: 'catalog', preset: 'all', category: category.id })}
              className="group text-left bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B75E8]"
            >
              <WorksheetPreview
                variant={category.previewVariant}
                title={t.categories[category.id]}
                compact
                className="border-b border-[#E5E2D9]"
              />
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-[#0F2A5F] group-hover:text-[#1B75E8] transition-colors">
                  {t.categories[category.id]}
                </h3>
                <p className="mt-1 text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {category.shortDesc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Free Learning Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F2A5F]">
              {t.sections.freeResourcesTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              {t.sections.freeResourcesSub}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'catalog', preset: 'free' })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B75E8] hover:text-[#155EC0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.sections.viewAllFree}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onOpenResource={(slug) => onNavigate({ page: 'resource', slug })}
              onDownloadFree={onDownloadFree}
              onAddToCart={onAddToCart}
              isInCart={cartIds.has(resource.id)}
              isDownloaded={downloadedIds.has(resource.id)}
              labels={{
                downloadFree: t.actions.downloadFree,
                addToCart: t.actions.addToCart,
                freeLabel: t.actions.freeLabel,
              }}
            />
          ))}
        </div>
      </section>

      {/* Optional Homepage Ad Zone (disabled by default) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot zone={homeAdZone} />
      </div>

      {/* 4. Featured Activities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F2A5F]">
              {t.sections.featuredActivities}
            </h2>
            <p className="text-sm sm:text-base text-[#475569]">
              {t.sections.featuredActivitiesSub}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'catalog', preset: 'shop' })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B75E8] hover:text-[#155EC0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.sections.viewShop}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onOpenResource={(slug) => onNavigate({ page: 'resource', slug })}
              onDownloadFree={onDownloadFree}
              onAddToCart={onAddToCart}
              isInCart={cartIds.has(resource.id)}
              isDownloaded={downloadedIds.has(resource.id)}
              labels={{
                downloadFree: t.actions.downloadFree,
                addToCart: t.actions.addToCart,
                freeLabel: t.actions.freeLabel,
              }}
            />
          ))}
        </div>
      </section>

      {/* 5. Why Kids Learning Studio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E5E2D9] p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-[#0F2A5F] mb-8">
            {t.sections.whyTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyItems.map((item, idx) => {
              const Icon = whyIcons[idx];
              const accent = whyAccents[idx];
              return (
                <div key={item.title} className="space-y-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15`, color: accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0F2A5F]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Newsletter & Support Our Studio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Newsletter */}
          <div className="lg:col-span-7 rounded-3xl bg-[#EFF6FF] border border-[#DBEAFE] p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1B75E8]">
                <Mail className="w-4 h-4" />
                <span>Weekly Free Printables</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0F2A5F]">
                {t.sections.newsletterTitle}
              </h2>
              <p className="text-sm text-[#475569] max-w-lg">
                {t.sections.newsletterSub}
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#15803D] bg-white px-4 py-3 rounded-xl border border-[#BBF7D0]">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{t.sections.subscribedMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.sections.newsletterPlaceholder}
                  aria-label="Email address"
                  className="flex-1 h-11 px-4 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#0F2A5F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B75E8]"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t.sections.subscribeBtn}
                </button>
              </form>
            )}
          </div>

          {/* Support Our Studio */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FEFCE8] border border-[#FDE68A] p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#92400E]">
                <Coffee className="w-4 h-4" />
                <span>{t.sections.supportTitle}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#0F2A5F]">
                {t.sections.supportCopy}
              </h2>
              <p className="text-sm text-[#475569]">
                Every voluntary coffee helps us design new free coloring pages, tracing sheets, and math games.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenCoffee}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F5B700] text-[#0F2A5F] text-sm font-bold hover:bg-[#FACC15] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Coffee className="w-4 h-4" />
                <span>{t.sections.buyCoffeeBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
