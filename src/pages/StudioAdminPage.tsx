import React from 'react';
import { Megaphone, Download } from 'lucide-react';
import type { AdZoneConfig, AnalyticsEvent, LearningResource } from '../types/studio';

interface StudioAdminPageProps {
  resources: LearningResource[];
  adZones: AdZoneConfig[];
  events: AnalyticsEvent[];
  onToggleAdZone: (id: string) => void;
}

export const StudioAdminPage: React.FC<StudioAdminPageProps> = ({ resources, adZones, events, onToggleAdZone }) => (
  <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <header className="space-y-2"><h1 className="font-display text-3xl font-extrabold text-[#0F2A5F]">Studio Manager</h1><p className="text-sm text-[#475569]">Manage ad placements and review activity for the free resource library.</p></header>
    <section className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-white border border-[#E5E2D9] p-5"><Download className="w-5 h-5 text-[#1B75E8]"/><p className="mt-3 text-xs text-[#64748B]">Free resources</p><p className="mt-1 text-2xl font-bold text-[#0F2A5F]">{resources.length}</p></div><div className="rounded-2xl bg-white border border-[#E5E2D9] p-5"><Megaphone className="w-5 h-5 text-[#D97706]"/><p className="mt-3 text-xs text-[#64748B]">Tracked activity</p><p className="mt-1 text-2xl font-bold text-[#0F2A5F]">{events.length}</p></div></section>
    <section className="space-y-3"><h2 className="font-display text-xl font-bold text-[#0F2A5F]">Ad placements</h2>{adZones.map((zone) => <article key={zone.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-[#E5E2D9] p-5"><div><h3 className="font-semibold text-[#0F2A5F]">{zone.name}</h3><p className="text-xs text-[#64748B]">{zone.placement} · {zone.dimensions}</p></div><button type="button" onClick={() => onToggleAdZone(zone.id)} aria-pressed={zone.enabled} className={`px-4 py-2 rounded-xl text-xs font-semibold ${zone.enabled ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>{zone.enabled ? 'Enabled' : 'Disabled'}</button></article>)}</section>
    <section className="rounded-2xl bg-blue-50 border border-blue-100 p-5 text-sm text-blue-900">Newsletter addresses are saved in WordPress. Donation checkout is configured at <strong>Appearance → Customize → KLS Donations</strong>.</section>
  </main>
);
