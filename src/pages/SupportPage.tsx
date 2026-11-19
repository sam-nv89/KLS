import React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';
import type { Language } from '../types/studio';

const SUPPORT_COPY: Record<Language, { kicker: string; title: string; body: string; donate: string; notConfigured: string }> = {
  en: { kicker: 'Voluntary support', title: 'Help us keep learning resources free', body: 'Donations help cover the time and costs involved in creating new printable worksheets for families and educators.', donate: 'Donate securely', notConfigured: 'Donations are not set up yet. Add your donation page in WordPress under Appearance → Customize → KLS Donations.' },
  es: { kicker: 'Apoyo voluntario', title: 'Ayúdanos a mantener gratis los recursos educativos', body: 'Las donaciones ayudan a cubrir el tiempo y los gastos de creación de nuevas fichas imprimibles para familias y docentes.', donate: 'Donar de forma segura', notConfigured: 'Aún no se han configurado las donaciones. Añade la página de pago en WordPress: Apariencia → Personalizar → KLS Donations.' },
  ru: { kicker: 'Добровольная поддержка', title: 'Помогите нам сохранять материалы бесплатными', body: 'Пожертвования помогают оплачивать создание новых рабочих листов для семей и педагогов.', donate: 'Перейти к пожертвованию', notConfigured: 'Пожертвования пока не настроены. Добавьте ссылку на страницу оплаты в WordPress: Внешний вид → Настроить → KLS Donations.' },
};

export const SupportPage: React.FC<{ language: Language }> = ({ language }) => {
  const copy = SUPPORT_COPY[language];
  const donationUrl = (window as Window & { klsConfig?: { donationUrl?: string } }).klsConfig?.donationUrl;
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
      <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#92400E]"><Coffee className="w-4 h-4" /><span>{copy.kicker}</span></div>
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">{copy.title}</h1>
      <p className="text-base text-[#475569]">{copy.body}</p>
      {donationUrl ? (
        <a href={donationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F2A5F] text-white text-sm font-semibold hover:bg-[#1B3B7B]">{copy.donate} <ExternalLink className="w-4 h-4" /></a>
      ) : (
        <p className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">{copy.notConfigured}</p>
      )}
    </main>
  );
};
