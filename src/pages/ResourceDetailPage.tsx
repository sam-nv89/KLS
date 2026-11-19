import React, { useState } from 'react';
import {
  ChevronRight,
  Download,
  ShoppingBag,
  Check,
  FileText,
  Printer,
  Coffee,
  CheckCircle2,
  Mail,
} from 'lucide-react';
import type { AdZoneConfig, AppRoute, Language, LearningResource } from '../types/studio';
import { TRANSLATIONS } from '../data/translations';
import { WorksheetPreview } from '../components/WorksheetPreview';
import { ResourceCard } from '../components/ResourceCard';
import { AdSlot } from '../components/AdSlot';

interface ResourceDetailPageProps {
  resource: LearningResource;
  allResources: LearningResource[];
  language: Language;
  isInCart: boolean;
  isPurchased: boolean;
  isDownloaded: boolean;
  adZones: AdZoneConfig[];
  onNavigate: (route: AppRoute) => void;
  onDownloadFree: (resource: LearningResource) => void;
  onAddToCart: (resource: LearningResource) => void;
  onBuyNow: (resource: LearningResource) => void;
  onSubscribeNewsletter: (email: string) => Promise<boolean>;
  onOpenCoffee: () => void;
}

export const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({
  resource,
  allResources,
  language,
  isInCart,
  isPurchased,
  isDownloaded,
  adZones,
  onNavigate,
  onDownloadFree,
  onAddToCart,
  onBuyNow,
  onSubscribeNewsletter,
  onOpenCoffee,
}) => {
  const t = TRANSLATIONS[language];
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [optInEmail, setOptInEmail] = useState('');
  const [optInDone, setOptInDone] = useState(false);

  const categoryName = t.categories[resource.category];
  const related = allResources
    .filter((r) => r.id !== resource.id && (r.category === resource.category || r.ageGroup === resource.ageGroup))
    .slice(0, 3);
  const belowAdZone = adZones.find((z) => z.id === 'ad-below-resource');

  const handleOptionalSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!optInEmail.includes('@')) return;
    if (await onSubscribeNewsletter(optInEmail.trim())) {
      setOptInDone(true);
      setOptInEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-14">
      {/* Breadcrumbs */}
      <nav aria-label={t.detail.home} className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B]">
        <button type="button" onClick={() => onNavigate({ page: 'home' })} className="hover:text-[#0F2A5F] cursor-pointer">
          {t.detail.home}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          type="button"
          onClick={() => onNavigate({ page: 'catalog', preset: 'all', category: resource.category })}
          className="hover:text-[#0F2A5F] cursor-pointer"
        >
          {categoryName}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0F2A5F] font-semibold">{resource.title}</span>
      </nav>

      {/* Main Resource Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Large Interactive Multi-Page PDF Previewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-[#E5E2D9] bg-white shadow-sm">
            <WorksheetPreview
              variant={resource.previewVariant}
              language={language}
              title={resource.title}
              pageIndex={activePageIndex}
            />
          </div>

          {/* Sample Page Switcher */}
          <div className="grid grid-cols-3 gap-3">
            {resource.samplePages.map((sample, idx) => (
              <button
                key={sample.title}
                type="button"
                onClick={() => setActivePageIndex(idx)}
                className={`text-left p-3 rounded-2xl border transition-colors cursor-pointer ${
                  activePageIndex === idx
                    ? 'bg-white border-[#1B75E8] shadow-sm'
                    : 'bg-[#F4F2EC]/60 border-[#E5E2D9] hover:bg-white'
                }`}
              >
                <p className="text-xs font-bold text-[#0F2A5F] truncate">{sample.title}</p>
                <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">{sample.caption}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Resource Details & Action Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#64748B]">
              <span>{categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{t.ui.ages} {resource.ageGroup}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">{resource.pages} {t.detail.pagesUnit}</span>
              <span aria-hidden="true">·</span>
              <span>{resource.fileFormat}</span>
            </div>

            <h1 className="font-display text-3xl font-extrabold text-[#0F2A5F] leading-tight text-balance">
              {resource.title}
            </h1>

            <p className="text-base text-[#475569] leading-relaxed">
              {resource.fullDescription}
            </p>
          </div>

          {/* Action Box */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] space-y-4">
            {resource.isFree ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#15803D]">{t.detail.freePrintablePdf}</span>
                  <span className="font-mono-num text-xs text-[#64748B]">{resource.fileSize}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onDownloadFree(resource)}
                  className="w-full h-12 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isDownloaded ? <Check className="w-4.5 h-4.5" /> : <Download className="w-4.5 h-4.5" />}
                  <span>{isDownloaded ? t.detail.downloadAgain : t.detail.downloadPdf}</span>
                </button>
                <p className="text-xs text-[#64748B] flex items-center gap-1.5">
                  <Printer className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.detail.directDownload} · {t.detail.noSignup} · {t.detail.printReady}</span>
                </p>
              </>
            ) : isPurchased ? (
              <>
                <div className="flex items-center gap-2 text-[#15803D] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Purchased · Ready for Unlimited Re-download</span>
                </div>
                <button
                  type="button"
                  onClick={() => onDownloadFree(resource)}
                  className="w-full h-12 rounded-xl bg-[#16A34A] text-white text-sm font-semibold hover:bg-[#15803D] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4.5 h-4.5" />
                  <span>Download Full PDF ({resource.pages} Pages)</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono-num text-2xl font-extrabold text-[#0F2A5F]">
                      ${resource.price.toFixed(2)}
                    </span>
                    {resource.compareAtPrice && (
                      <span className="font-mono-num text-sm text-[#94A3B8] line-through">
                        ${resource.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="font-mono-num text-xs text-[#64748B]">
                    {resource.fileCount} PDF file{resource.fileCount > 1 ? 's' : ''} · {resource.fileSize}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onBuyNow(resource)}
                    className="h-12 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
                  >
                    {t.actions.buyNow}
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(resource)}
                    className={`h-12 rounded-xl text-sm font-semibold border transition-colors inline-flex items-center justify-center gap-2 cursor-pointer ${
                      isInCart
                        ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#15803D]'
                        : 'bg-[#FCFBF8] border-[#E5E2D9] text-[#0F2A5F] hover:bg-[#F4F2EC]'
                    }`}
                  >
                    {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{isInCart ? 'Added to Bag' : t.actions.addToCart}</span>
                  </button>
                </div>
                <p className="text-xs text-[#64748B] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>Instant digital download link after checkout + email backup</span>
                </p>
              </>
            )}
          </div>

          {/* Skills Developed */}
          <div className="space-y-2.5">
            <h2 className="font-display text-sm font-bold text-[#0F2A5F]">{t.detail.skills}</h2>
            <p className="text-sm text-[#475569]">
              {resource.skills.join(' · ')}
            </p>
          </div>

          {/* What's Included */}
          <div className="space-y-2.5">
            <h2 className="font-display text-sm font-bold text-[#0F2A5F]">{t.detail.included}</h2>
            <ul className="space-y-2 text-sm text-[#475569]">
              {resource.whatsIncluded.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subtle Coffee Link & Optional Newsletter for Free Pages */}
          {resource.isFree && (
            <div className="space-y-4 pt-2 border-t border-[#E5E2D9]">
              <button
                type="button"
                onClick={onOpenCoffee}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#92400E] hover:underline cursor-pointer"
              >
                <Coffee className="w-4 h-4" />
                <span>{t.detail.coffeeLine}</span>
              </button>

              {!optInDone ? (
                <form onSubmit={handleOptionalSubscribe} className="p-4 rounded-2xl bg-[#F4F2EC] space-y-2.5">
                  <label htmlFor="optional-sub" className="text-xs font-semibold text-[#0F2A5F] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1B75E8]" />
                    <span>{t.detail.optionalNewsletter}</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="optional-sub"
                      type="email"
                      value={optInEmail}
                      onChange={(e) => setOptInEmail(e.target.value)}
                      placeholder={t.detail.optionalPlaceholder}
                      className="flex-1 h-9 px-3 rounded-lg bg-white border border-[#E5E2D9] text-xs text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 h-9 rounded-lg bg-[#0F2A5F] text-white text-xs font-semibold hover:bg-[#1B3B7B] transition-colors cursor-pointer"
                    >
                      {t.detail.join}
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-xs font-semibold text-[#15803D]">
                  {t.detail.subscribedMsg}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ad Zone Below Resource Content (disabled by default) */}
      <AdSlot zone={belowAdZone} language={language} />

      {/* Related Materials */}
      {related.length > 0 && (
        <section className="pt-8 border-t border-[#E5E2D9] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-[#0F2A5F]">{t.detail.similar}</h2>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalog', preset: 'all', category: resource.category })}
              className="text-sm font-semibold text-[#1B75E8] hover:underline cursor-pointer"
            >
              {t.detail.browse} {categoryName}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <ResourceCard
                key={item.id}
                resource={item}
                language={language}
                onOpenResource={(slug) => onNavigate({ page: 'resource', slug })}
                onDownloadFree={onDownloadFree}
                onAddToCart={onAddToCart}
                labels={{
                  downloadFree: t.actions.downloadFree,
                  addToCart: t.actions.addToCart,
                  freeLabel: t.actions.freeLabel,
                  ages: t.ui.ages,
                  pageShort: language === 'ru' ? 'стр.' : language === 'es' ? 'pág.' : 'pp',
                  preview: t.ui.preview,
                  downloaded: t.ui.downloaded,
                  categoryNames: t.categories,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
