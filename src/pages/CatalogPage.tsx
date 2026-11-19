import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type {
  AdZoneConfig,
  AgeGroup,
  AppRoute,
  CategoryId,
  Language,
  LearningResource,
  ResourceTheme,
} from '../types/studio';
import { CATEGORIES } from '../data/resources';
import { TRANSLATIONS } from '../data/translations';
import { ResourceCard } from '../components/ResourceCard';
import { AdSlot } from '../components/AdSlot';

interface CatalogPageProps {
  language: Language;
  resources: LearningResource[];
  initialPreset?: 'all' | 'free';
  initialCategory?: CategoryId;
  initialQuery?: string;
  cartIds: Set<string>;
  downloadedIds: Set<string>;
  adZones: AdZoneConfig[];
  onNavigate: (route: AppRoute) => void;
  onDownloadFree: (resource: LearningResource) => void;
  onAddToCart: (resource: LearningResource) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  language,
  resources,
  initialPreset = 'all',
  initialCategory,
  initialQuery = '',
  cartIds,
  downloadedIds,
  adZones,
  onNavigate,
  onDownloadFree,
  onAddToCart,
}) => {
  const t = TRANSLATIONS[language];
  const [priceFilter, setPriceFilter] = useState<'all' | 'free'>(initialPreset === 'free' ? 'free' : 'all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(initialCategory ?? 'all');
  const [selectedAge, setSelectedAge] = useState<AgeGroup | 'all'>('all');
  const [selectedTheme, setSelectedTheme] = useState<ResourceTheme | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');

  const betweenAdZone = adZones.find((z) => z.id === 'ad-between-blocks');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resources
      .filter((r) => {
        if (priceFilter === 'free' && !r.isFree) return false;
        if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
        if (selectedAge !== 'all' && r.ageGroup !== selectedAge && r.ageGroup !== '2-6') return false;
        if (selectedTheme !== 'all' && r.theme !== selectedTheme) return false;
        if (q) {
          const hay = `${r.title} ${r.shortDescription} ${r.skills.join(' ')} ${r.theme}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.createdAt.localeCompare(a.createdAt);
        }
        return b.downloadCount - a.downloadCount;
      });
  }, [resources, priceFilter, selectedCategory, selectedAge, selectedTheme, searchQuery, sortBy]);

  const resetFilters = () => {
    setPriceFilter('all');
    setSelectedCategory('all');
    setSelectedAge('all');
    setSelectedTheme('all');
    setSearchQuery('');
  };

  const pageHeading = priceFilter === 'free' ? t.catalog.freeHeading : t.catalog.allHeading;

  const pageSubtitle =
    priceFilter === 'free'
      ? t.catalog.freeSub
      : t.catalog.allSub;

  const firstRow = filtered.slice(0, 6);
  const restRows = filtered.slice(6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      {/* Page Title & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E2D9]">
        <div className="space-y-2 max-w-2xl">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
            {pageHeading}
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            {pageSubtitle}
          </p>
        </div>

        {/* Segmented Filter Tabs */}
        <div className="inline-flex items-center p-1 bg-[#F4F2EC] rounded-xl border border-[#E5E2D9] shrink-0 self-start">
          {[
            { id: 'all', label: t.catalog.allResources },
            { id: 'free', label: t.catalog.freePdfs },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPriceFilter(tab.id as 'all' | 'free')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                priceFilter === tab.id
                  ? 'bg-white text-[#0F2A5F] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F2A5F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#0F2A5F] border-[#0F2A5F] text-white'
              : 'bg-white border-[#E5E2D9] text-[#475569] hover:border-[#0F2A5F]'
          }`}
        >
          {t.catalog.allCategories}
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0F2A5F] border-[#0F2A5F] text-white'
                : 'bg-white border-[#E5E2D9] text-[#475569] hover:border-[#0F2A5F]'
            }`}
          >
            {t.categories[cat.id]}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 bg-white p-4 rounded-2xl border border-[#E5E2D9]">
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
            aria-label={t.catalog.searchPlaceholder}
            className="w-full h-10 pl-10 pr-3 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm text-[#0F2A5F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B75E8]"
          />
        </div>

        <div className="lg:col-span-2">
          <select
            aria-label={t.ui.ages}
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value as AgeGroup | 'all')}
            className="w-full h-10 px-3 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-xs font-semibold text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8] cursor-pointer"
          >
            <option value="all">{t.catalog.allAges}</option>
            <option value="2-3">{t.catalog.ages2to3}</option>
            <option value="3-4">{t.catalog.ages3to4}</option>
            <option value="4-5">{t.catalog.ages4to5}</option>
            <option value="5-6">{t.catalog.ages5to6}</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            aria-label={t.catalog.allThemes}
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value as ResourceTheme | 'all')}
            className="w-full h-10 px-3 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-xs font-semibold text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8] cursor-pointer"
          >
            <option value="all">{t.catalog.allThemes}</option>
            <option value="Foundations">{t.catalog.foundations}</option>
            <option value="Animals">{t.catalog.animals}</option>
            <option value="Space">{t.catalog.space}</option>
            <option value="Seasons">{t.catalog.seasons}</option>
            <option value="Everyday Life">{t.catalog.everydayLife}</option>
          </select>
        </div>

        <div className="lg:col-span-3 flex items-center gap-2">
          <div className="flex-1 relative">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              aria-label={t.catalog.popular}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'newest')}
              className="w-full h-10 pl-8 pr-3 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-xs font-semibold text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8] cursor-pointer"
            >
              <option value="popular">{t.catalog.popular}</option>
              <option value="newest">{t.catalog.newest}</option>
            </select>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            title={t.catalog.reset}
            className="h-10 px-3 rounded-xl bg-[#F4F2EC] text-[#475569] hover:text-[#0F2A5F] transition-colors cursor-pointer"
            aria-label={t.catalog.reset}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-xs font-medium text-[#64748B]">
        <span>
          {t.catalog.showing} <strong className="font-mono-num text-[#0F2A5F]">{filtered.length}</strong> {filtered.length === 1 ? t.catalog.resourceSingular : t.catalog.resourcePlural}
        </span>
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-white border border-[#E5E2D9] p-12 text-center space-y-4">
          <p className="font-display text-lg font-bold text-[#0F2A5F]">{t.catalog.noResults}</p>
          <p className="text-sm text-[#64748B] max-w-md mx-auto">
            {t.catalog.noResultsHelp}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
          >
            {t.catalog.showAll}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstRow.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                language={language}
                onOpenResource={(slug) => onNavigate({ page: 'resource', slug })}
                onDownloadFree={onDownloadFree}
                onAddToCart={onAddToCart}
                isInCart={cartIds.has(resource.id)}
                isDownloaded={downloadedIds.has(resource.id)}
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

          {restRows.length > 0 && <AdSlot zone={betweenAdZone} language={language} />}

          {restRows.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restRows.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  language={language}
                  onOpenResource={(slug) => onNavigate({ page: 'resource', slug })}
                  onDownloadFree={onDownloadFree}
                  onAddToCart={onAddToCart}
                  isInCart={cartIds.has(resource.id)}
                  isDownloaded={downloadedIds.has(resource.id)}
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
          )}
        </>
      )}
    </div>
  );
};
