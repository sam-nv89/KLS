import React from 'react';
import { Download, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import type { LearningResource } from '../types/studio';
import { CATEGORIES } from '../data/resources';
import { WorksheetPreview } from './WorksheetPreview';

interface ResourceCardProps {
  resource: LearningResource;
  onOpenResource: (slug: string) => void;
  onDownloadFree: (resource: LearningResource) => void;
  onAddToCart: (resource: LearningResource) => void;
  isInCart?: boolean;
  isDownloaded?: boolean;
  labels?: {
    downloadFree: string;
    addToCart: string;
    freeLabel: string;
  };
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onOpenResource,
  onDownloadFree,
  onAddToCart,
  isInCart = false,
  isDownloaded = false,
  labels = {
    downloadFree: 'Download Free',
    addToCart: 'Add to Cart',
    freeLabel: 'Free PDF',
  },
}) => {
  const categoryName = CATEGORIES.find((c) => c.id === resource.category)?.name ?? 'Printable';

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpenResource(resource.slug)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B75E8] focus-visible:ring-inset"
        aria-label={`Preview ${resource.title}`}
      >
        <WorksheetPreview
          variant={resource.previewVariant}
          title={resource.title}
          className="border-b border-[#E5E2D9]"
        />
      </button>

      <div className="flex flex-col flex-1 p-5">
        {/* Clean unboxed metadata with typographic separators */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#64748B]">
          <span>{categoryName}</span>
          <span aria-hidden="true">·</span>
          <span>Ages {resource.ageGroup}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-num">{resource.pages} pp</span>
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
          {resource.isFree ? (
            <>
              <span className="text-sm font-semibold text-[#15803D] whitespace-nowrap">
                {labels.freeLabel}
              </span>
              <button
                type="button"
                onClick={() => onDownloadFree(resource)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1B75E8] text-white hover:bg-[#155EC0] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B75E8]"
              >
                {isDownloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{isDownloaded ? 'Downloaded' : labels.downloadFree}</span>
              </button>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="font-mono-num text-base font-bold text-[#0F2A5F]">
                  ${resource.price.toFixed(2)}
                </span>
                {resource.compareAtPrice && (
                  <span className="font-mono-num text-xs text-[#94A3B8] line-through">
                    ${resource.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenResource(resource.slug)}
                  className="p-2 rounded-xl text-[#475569] hover:text-[#0F2A5F] hover:bg-[#F4F2EC] transition-colors cursor-pointer"
                  aria-label={`View details for ${resource.title}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(resource)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isInCart
                      ? 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                      : 'bg-[#0F2A5F] text-white hover:bg-[#1B3B7B]'
                  }`}
                >
                  {isInCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                  <span>{isInCart ? 'In Bag' : labels.addToCart}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
