import React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';

export const SupportPage: React.FC = () => {
  const donationUrl = (window as Window & { klsConfig?: { donationUrl?: string } }).klsConfig?.donationUrl;
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
      <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#92400E]"><Coffee className="w-4 h-4" /><span>Voluntary support</span></div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">Help us keep learning resources free</h1>
      <p className="text-base text-[#475569]">Donations help cover the time and costs involved in creating new printable worksheets for families and educators.</p>
      {donationUrl ? (
        <a href={donationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F2A5F] text-white text-sm font-semibold hover:bg-[#1B3B7B]">Donate securely <ExternalLink className="w-4 h-4" /></a>
      ) : (
        <p className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">Donation is not configured yet. Add your payment page URL in WordPress under Appearance → Customize → KLS Donations.</p>
      )}
    </main>
  );
};
