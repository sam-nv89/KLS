import React, { useState } from 'react';
import type { AppRoute } from '../types/studio';
import type { Language } from '../types/studio';

interface CookieNoticeProps {
  onNavigate: (route: AppRoute) => void;
  language: Language;
}

const COOKIE_COPY: Record<Language, { label: string; body: string; policy: string; accept: string; essential: string }> = {
  en: { label: 'Cookie preference', body: 'We use essential storage for language and site preferences. Read our', policy: 'Cookie Policy', accept: 'Accept', essential: 'Essential Only' },
  es: { label: 'Preferencias de cookies', body: 'Usamos almacenamiento esencial para recordar el idioma y las preferencias del sitio. Consulta nuestra', policy: 'Política de cookies', accept: 'Aceptar', essential: 'Solo esenciales' },
  ru: { label: 'Настройки cookie', body: 'Мы сохраняем выбранный язык и основные настройки сайта. Подробнее — в документе', policy: 'Политика cookie', accept: 'Принять', essential: 'Только необходимые' },
};

export const CookieNotice: React.FC<CookieNoticeProps> = ({ onNavigate, language }) => {
  const copy = COOKIE_COPY[language];
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
      aria-label={copy.label}
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-30 rounded-2xl bg-white border border-[#E5E2D9] shadow-lg p-4 flex flex-col gap-3"
    >
      <p className="text-xs text-[#475569] leading-relaxed">
        {copy.body}{' '}
        <button
          type="button"
          onClick={() => onNavigate({ page: 'cookies' })}
          className="text-[#1B75E8] underline cursor-pointer"
        >
          {copy.policy}
        </button>
        .
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => saveConsent('all')}
          className="px-3.5 py-1.5 rounded-lg bg-[#0F2A5F] text-white text-xs font-semibold hover:bg-[#1B3B7B] transition-colors cursor-pointer"
        >
          {copy.accept}
        </button>
        <button
          type="button"
          onClick={() => saveConsent('essential')}
          className="px-3.5 py-1.5 rounded-lg bg-[#F4F2EC] text-[#475569] text-xs font-semibold hover:text-[#0F2A5F] transition-colors cursor-pointer"
        >
          {copy.essential}
        </button>
      </div>
    </div>
  );
};
