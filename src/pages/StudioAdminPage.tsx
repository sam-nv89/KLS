import React, { useState } from 'react';
import { BarChart3, CheckCircle2, DollarSign, Download, LayoutTemplate, Plus, Tag } from 'lucide-react';
import type { AdZoneConfig, AnalyticsEvent, LearningResource, PromoCode } from '../types/studio';

interface StudioAdminPageProps {
  resources: LearningResource[];
  adZones: AdZoneConfig[];
  promoCodes: PromoCode[];
  events: AnalyticsEvent[];
  onToggleAdZone: (id: string) => void;
  onUpdateResourcePrice: (id: string, price: number) => void;
  onTogglePromoCode: (code: string) => void;
  onAddPromoCode: (promo: PromoCode) => void;
}

export const StudioAdminPage: React.FC<StudioAdminPageProps> = ({
  resources,
  adZones,
  promoCodes,
  events,
  onToggleAdZone,
  onUpdateResourcePrice,
  onTogglePromoCode,
  onAddPromoCode,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'ads' | 'shop' | 'wp-blueprint'>('analytics');
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('15');

  const freeDownloads = events.filter((e) => e.type === 'pdf_downloaded').length;
  const purchases = events.filter((e) => e.type === 'purchase_completed').length;
  const donations = events.filter((e) => e.type === 'donation_completed').length;
  const revenue = events
    .filter((e) => e.type === 'purchase_completed' || e.type === 'donation_completed')
    .reduce((sum, e) => sum + (e.value ?? 0), 0);

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newCode.trim().toUpperCase();
    const pct = Math.min(80, Math.max(5, Number(newDiscount) || 15));
    if (!cleaned) return;
    onAddPromoCode({
      code: cleaned,
      discountPercent: pct,
      description: `${pct}% off digital activity packs`,
      active: true,
    });
    setNewCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
        <div className="space-y-1">
          <h1 className="font-display text-3xl font-extrabold text-[#0F2A5F]">
            Studio Manager &amp; WordPress Blueprint
          </h1>
          <p className="text-sm text-[#475569]">
            Manage AdSense zones, dynamic pricing, promo codes, GA4 conversion tracking, and WordPress architecture.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F4F2EC] rounded-xl border border-[#E5E2D9]">
          {[
            { id: 'analytics', label: 'Analytics & Funnel' },
            { id: 'ads', label: 'AdSense Zones (6)' },
            { id: 'shop', label: 'Pricing & Promos' },
            { id: 'wp-blueprint', label: 'WordPress Architecture' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === tab.id ? 'bg-white text-[#0F2A5F] shadow-sm' : 'text-[#64748B] hover:text-[#0F2A5F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9]">
              <p className="text-xs font-medium text-[#64748B]">Free PDF Downloads</p>
              <p className="mt-2 font-mono-num text-2xl font-bold text-[#0F2A5F]">{freeDownloads}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9]">
              <p className="text-xs font-medium text-[#64748B]">Shop Orders</p>
              <p className="mt-2 font-mono-num text-2xl font-bold text-[#1B75E8]">{purchases}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9]">
              <p className="text-xs font-medium text-[#64748B]">Coffee Supporters</p>
              <p className="mt-2 font-mono-num text-2xl font-bold text-[#D97706]">{donations}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E5E2D9]">
              <p className="text-xs font-medium text-[#64748B]">Session Revenue</p>
              <p className="mt-2 font-mono-num text-2xl font-bold text-[#16A34A]">${revenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#E5E2D9] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E2D9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#1B75E8]" />
                <h2 className="font-display text-base font-bold text-[#0F2A5F]">
                  Tracked Conversion Events (GA4 / Pinterest Tag Ready)
                </h2>
              </div>
              <span className="font-mono-num text-xs text-[#64748B]">{events.length} events</span>
            </div>
            <div className="divide-y divide-[#F1EFE9] max-h-80 overflow-y-auto">
              {events.length === 0 ? (
                <p className="p-6 text-sm text-[#64748B]">
                  Interact with worksheets, download a free PDF, subscribe, or place a test order to see live conversion events recorded here.
                </p>
              ) : (
                events.map((ev) => (
                  <div key={ev.id} className="px-6 py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-num font-semibold text-[#1B75E8]">{ev.type}</span>
                      <span className="text-[#0F2A5F] truncate">{ev.label}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 font-mono-num text-[#64748B]">
                      {ev.value !== undefined && <span className="text-[#16A34A] font-semibold">${ev.value.toFixed(2)}</span>}
                      <span>{new Date(ev.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ads' && (
        <div className="space-y-4">
          <p className="text-sm text-[#475569]">
            All six AdSense-ready placements are disabled by default until your site is connected to an ad network. Toggle any slot below to preview its non-overlapping placement across the site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adZones.map((zone) => (
              <div key={zone.id} className="p-5 rounded-2xl bg-white border border-[#E5E2D9] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-[#0F2A5F]">{zone.name}</h3>
                  <p className="text-xs text-[#475569]">{zone.placement}</p>
                  <p className="font-mono-num text-[11px] text-[#64748B]">{zone.dimensions}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleAdZone(zone.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                    zone.enabled
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-[#F4F2EC] text-[#475569] hover:text-[#0F2A5F]'
                  }`}
                >
                  {zone.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-2xl bg-white border border-[#E5E2D9] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5E2D9] flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#1B75E8]" />
              <h2 className="font-display text-base font-bold text-[#0F2A5F]">Live Digital Product Pricing</h2>
            </div>
            <div className="divide-y divide-[#F1EFE9]">
              {resources.filter((r) => !r.isFree).map((item) => (
                <div key={item.id} className="px-6 py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F2A5F] truncate">{item.title}</p>
                    <p className="text-xs text-[#64748B] font-mono-num">{item.pages} pages · {item.fileCount} files</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-[#64748B]">$</span>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={item.price}
                      onChange={(e) => onUpdateResourcePrice(item.id, Math.max(1, Number(e.target.value) || item.price))}
                      aria-label={`Price for ${item.title}`}
                      className="w-20 h-9 px-2.5 rounded-lg bg-[#FCFBF8] border border-[#E5E2D9] font-mono-num text-sm font-semibold text-[#0F2A5F]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#1B75E8]" />
                <h2 className="font-display text-base font-bold text-[#0F2A5F]">Promo Codes</h2>
              </div>
              <div className="space-y-2.5">
                {promoCodes.map((promo) => (
                  <div key={promo.code} className="p-3 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono-num text-sm font-bold text-[#0F2A5F]">{promo.code} ({promo.discountPercent}% off)</p>
                      <p className="text-xs text-[#64748B]">{promo.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onTogglePromoCode(promo.code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        promo.active ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#F4F2EC] text-[#64748B]'
                      }`}
                    >
                      {promo.active ? 'Active' : 'Paused'}
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCreatePromo} className="pt-3 border-t border-[#F1EFE9] flex gap-2">
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="NEWCODE"
                  className="flex-1 h-9 px-3 rounded-lg bg-[#FCFBF8] border border-[#E5E2D9] text-xs font-mono-num uppercase"
                />
                <input
                  type="number"
                  min="5"
                  max="80"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-16 h-9 px-2 rounded-lg bg-[#FCFBF8] border border-[#E5E2D9] text-xs font-mono-num"
                />
                <button
                  type="submit"
                  className="px-3 h-9 rounded-lg bg-[#0F2A5F] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'wp-blueprint' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-display text-lg font-bold text-[#0F2A5F]">
                Installable WordPress Theme Package (.zip)
              </h2>
              <p className="text-sm text-[#475569]">
                Includes <code className="font-mono-num text-xs">style.css</code>, <code className="font-mono-num text-xs">functions.php</code>, <code className="font-mono-num text-xs">index.php</code>, <code className="font-mono-num text-xs">screenshot.png</code>, compiled assets, and Custom Post Type registration. Upload via <strong>Appearance → Themes → Add New → Upload Theme</strong>.
              </p>
            </div>
            <a
              href="/kids-learning-studio-theme.zip"
              download="kids-learning-studio-theme.zip"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Theme (.zip)</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#1B75E8] space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[#0F2A5F]">
                  Recommended: Easy Digital Downloads (EDD)
                </h2>
                <span className="text-xs font-semibold text-[#15803D] inline-flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Recommended for Phase 1
                </span>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                Purpose-built exclusively for selling digital PDFs, bundles, and future memberships without shipping, warehouse, or inventory bloat. Keeps database queries light for 90+ Lighthouse scores.
              </p>
              <ul className="text-xs text-[#475569] space-y-1.5 list-disc pl-4">
                <li>Free core plugin with Stripe &amp; PayPal Express support</li>
                <li>Protected, expiring download links &amp; customer re-download portal</li>
                <li>Native discount codes and bundle/recurring add-on readiness</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
              <h2 className="font-display text-lg font-bold text-[#0F2A5F]">
                Alternative: WooCommerce (Virtual/Downloadable)
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                Best if you plan to ship printed spiral-bound workbooks, crayons, or physical flashcard boxes alongside digital PDFs.
              </p>
              <ul className="text-xs text-[#475569] space-y-1.5 list-disc pl-4">
                <li>Broader regional payment gateway ecosystem</li>
                <li>Heavier script footprint (requires careful asset dequeuing on blog/free pages)</li>
                <li>Requires disabling shipping fields for digital-only checkout speed</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5E2D9] space-y-4">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-[#1B75E8]" />
              <h2 className="font-display text-lg font-bold text-[#0F2A5F]">
                Minimal Gutenberg Block Theme &amp; Plugin Stack
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#475569]">
              <div className="space-y-1.5">
                <p className="font-bold text-[#0F2A5F] text-sm">Theme &amp; Custom Post Types</p>
                <p>GeneratePress / Kadence Block Theme (zero Elementor overhead)</p>
                <p>CPT: <code className="font-mono-num">learning_resource</code></p>
                <p>Taxonomies: <code className="font-mono-num">resource_category</code>, <code className="font-mono-num">age_group</code>, <code className="font-mono-num">theme_topic</code></p>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-[#0F2A5F] text-sm">Core Minimal Plugins</p>
                <p>SEO: Rank Math or Yoast SEO (XML Sitemap, Schema, Canonical)</p>
                <p>Commerce: Easy Digital Downloads</p>
                <p>Speed: LiteSpeed Cache / WP Rocket + WebP/AVIF</p>
                <p>Security &amp; Backup: Wordfence + UpdraftPlus</p>
              </div>
              <div className="space-y-1.5">
                <p className="font-bold text-[#0F2A5F] text-sm">Growth, Ads &amp; Localization</p>
                <p>Analytics: Google Site Kit (GA4 + Search Console)</p>
                <p>Ad Zones: Ad Inserter (6 controlled hooks, disabled by default)</p>
                <p>Multilingual: Polylang / WPML ready (EN → ES / RU)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
