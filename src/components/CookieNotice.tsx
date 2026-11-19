import React, { useState } from 'react';
import type { AppRoute } from '../types/studio';

interface CookieNoticeProps {
  onNavigate: (route: AppRoute) => void;
}

export const CookieNotice: React.FC<CookieNoticeProps> = ({ onNavigate }) => {
  const [consent, setConsent] = useState<string | null>(() => {
    try {
      return localStorage.getItem('kls_cookie_consent');
    } catch {
      return null;
    }
  });

  if (consent) return null;

  const saveConsent = (value: 'essential' | 'all') => {
    try {
      localStorage.setItem('kls_cookie_consent', value);
    } catch {
      // ignore storage errors
    }
    setConsent(value);
  };

  return (
    <div
      role="region"
      aria-label="Cookie preference"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-30 rounded-2xl bg-white border border-[#E5E2D9] shadow-lg p-4 flex flex-col gap-3"
    >
      <p className="text-xs text-[#475569] leading-relaxed">
        We use essential storage for your shopping bag and downloads. Read our{' '}
        <button
          type="button"
          onClick={() => onNavigate({ page: 'cookies' })}
          className="text-[#1B75E8] underline cursor-pointer"
        >
          Cookie Policy
        </button>
        .
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => saveConsent('all')}
          className="px-3.5 py-1.5 rounded-lg bg-[#0F2A5F] text-white text-xs font-semibold hover:bg-[#1B3B7B] transition-colors cursor-pointer"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => saveConsent('essential')}
          className="px-3.5 py-1.5 rounded-lg bg-[#F4F2EC] text-[#475569] text-xs font-semibold hover:text-[#0F2A5F] transition-colors cursor-pointer"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
};
