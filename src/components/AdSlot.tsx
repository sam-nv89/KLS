import React from 'react';
import type { AdZoneConfig, Language } from '../types/studio';

interface AdSlotProps {
  zone?: AdZoneConfig;
  language?: Language;
}

export const AdSlot: React.FC<AdSlotProps> = ({ zone, language = 'en' }) => {
  if (!zone || !zone.enabled) {
    return null;
  }

  const sponsored = language === 'ru' ? 'Рекламное место' : language === 'es' ? 'Espacio patrocinado' : 'Sponsored Placement';
  const label = language === 'ru' ? 'Реклама' : language === 'es' ? 'Publicidad' : 'Advertisement';
  return (
    <aside
      aria-label={`${label}: ${zone.name}`}
      className="my-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F4F2EC]/70 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
    >
      <div>
        <p className="text-xs font-semibold text-[#64748B]">
          {sponsored} · {zone.name}
        </p>
        <p className="text-xs text-[#94A3B8]">
          {zone.placement} ({zone.dimensions})
        </p>
      </div>
      <span className="font-mono-num text-[11px] font-medium text-[#64748B] bg-white px-3 py-1 rounded-lg border border-[#E5E2D9]">
        {zone.provider}
      </span>
    </aside>
  );
};
