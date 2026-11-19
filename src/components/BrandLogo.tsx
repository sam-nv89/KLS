import React, { useState } from 'react';

declare global {
  interface Window {
    __KLS_ASSET_BASE__?: string;
  }
}

const assetBase =
  typeof window !== 'undefined' && window.__KLS_ASSET_BASE__
    ? window.__KLS_ASSET_BASE__.replace(/\/+$/, '')
    : '';

export const BRAND_BANNER_SRC = `${assetBase}/assets/aistudio/fbeea20a-47bd-4212-b240-9c1a75bf70c4_2f1d3942.png`;

interface BrandLogoMarkProps {
  compact?: boolean;
  darkSurface?: boolean;
}

export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({ compact = false, darkSurface = false }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <span className="inline-flex items-center gap-3 shrink-0 whitespace-nowrap select-none">
      {!imgFailed ? (
        <span
          className={`relative overflow-hidden rounded-lg border shrink-0 bg-[#FAF8F3] ${
            darkSurface ? 'border-white/20' : 'border-[#E5E2D9]'
          } ${compact ? 'w-12 h-9' : 'w-14 h-10'}`}
        >
          <img
            src={BRAND_BANNER_SRC}
            alt="Kids Learning Studio emblem"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="max-w-none h-[155%] w-auto pointer-events-none"
            style={{
              marginLeft: '-98%',
              marginTop: '-4%',
            }}
          />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#1B75E8] text-white font-display font-bold text-lg shrink-0">
          K
        </span>
      )}
      <span
        className={`font-display font-bold tracking-tight text-lg whitespace-nowrap shrink-0 ${
          darkSurface ? 'text-white' : 'text-[#0F2A5F]'
        }`}
      >
        Kids Learning Studio
      </span>
    </span>
  );
};

export const HeroBrandShowcase: React.FC = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#FAF8F3] border border-[#E5E2D9] shadow-sm">
      {!imgFailed ? (
        <img
          src={BRAND_BANNER_SRC}
          alt="Kids Learning Studio – Learn, Play, Create educational illustration with children reading math, reading, and creativity books"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-auto block object-cover"
        />
      ) : (
        <div className="aspect-[5/2] w-full flex flex-col items-center justify-center p-8 bg-[#FAF8F3] text-center">
          <p className="font-display text-3xl font-bold text-[#0F2A5F]">Kids Learning Studio</p>
          <p className="text-sm text-[#475569] mt-2">Learn · Play · Create</p>
        </div>
      )}
    </div>
  );
};
