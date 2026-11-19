import React from 'react';
import { Download, Check } from 'lucide-react';
import type { CategoryId, Language, LearningResource } from '../types/studio';
import { CATEGORIES } from '../data/resources';
import { WorksheetPreview } from './WorksheetPreview';

interface ResourceCardProps {
  resource: LearningResource;
  onOpenResource: (slug: string) => void;
  onDownloadFree: (resource: LearningResource) => void;
  onAddToCart?: (resource: LearningResource) => void;
  isInCart?: boolean;
  isDownloaded?: boolean;
  language?: Language;
  labels?: {
    downloadFree: string;
    addToCart: string;
    freeLabel: string;
    ages: string;
    pageShort: string;
    preview: string;
    downloaded: string;
    categoryNames: Record<CategoryId, string>;
  };
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onOpenResource,
  onDownloadFree,
  onAddToCart: _onAddToCart,
  isInCart: _isInCart = false,
  isDownloaded = false,
  language = 'en',
  labels = {
    downloadFree: 'Download Free',
    addToCart: 'Add to Cart',
    freeLabel: 'Free PDF',
    ages: 'Ages',
    pageShort: 'pp',
    preview: 'Preview',
    downloaded: 'Downloaded',
    categoryNames: {
      'coloring-pages': 'Coloring Pages', 'math-numbers': 'Math & Numbers', 'alphabet-letters': 'Alphabet & Letters',
      'shapes-colors': 'Shapes & Colors', 'puzzles-matching': 'Puzzles & Matching', 'fine-motor-skills': 'Fine Motor Skills', 'creative-activities': 'Creative Activities',
    },
  },
}) => {
  const categoryName = labels.categoryNames[resource.category] ?? CATEGORIES.find((c) => c.id === resource.category)?.name ?? 'Printable';

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpenResource(resource.slug)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B75E8] focus-visible:ring-inset"
        aria-label={`${labels.preview}: ${resource.title}`}
      >
        {resource.thumbnailUrl ? (
          <div className="w-full aspect-[4/3] overflow-hidden border-b border-[#E5E2D9] bg-[#F4F2EC]">
            <img src={resource.thumbnailUrl} alt={resource.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ) : (
          <WorksheetPreview
            variant={resource.previewVariant}
            language={language}
            title={resource.title}
            className="border-b border-[#E5E2D9]"
          />
        )}
      </button>

      <div className="flex flex-col flex-1 p-5">
        {/* Clean unboxed metadata with typographic separators */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#64748B]">
          <span>{categoryName}</span>
          <span aria-hidden="true">·</span>
          <span>{labels.ages} {resource.ageGroup}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-num">{resource.pages} {labels.pageShort}</span>
        </div>

        <h3 className="mt-2 font-display text-lg font-bold text-[#0F2A5F] leading-snug">
          <button
            type="button"
            onClick={() => onOpenResource(resource.slug)}
            className="text-left hover:text-[#1B75E8] transition-colors focus:outline-none focus-visible:underline"
          >
            {resource.title}
          </button>
        </h3>

        <p className="mt-2 text-sm text-[#475569] leading-relaxed line-clamp-2 flex-1">
          {resource.shortDescription}
        </p>

        <div className="mt-5 pt-4 border-t border-[#F1EFE9] flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[#15803D] whitespace-nowrap">
                {labels.freeLabel}
              </span>
              <button
                type="button"
                onClick={() => onDownloadFree(resource)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1B75E8] text-white hover:bg-[#155EC0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B75E8]"
              >
                {isDownloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{isDownloaded ? labels.downloaded : labels.downloadFree}</span>
              </button>
        </div>
      </div>
    </article>
  );
};
