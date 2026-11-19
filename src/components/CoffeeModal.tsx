import React from 'react';
import { Coffee, X } from 'lucide-react';
import type { Language } from '../types/studio';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const MODAL_COPY: Record<Language, { label: string; close: string; title: string; body: string; donate: string; notConfigured: string }> = {
  en: { label: 'Support Kids Learning Studio', close: 'Close', title: 'Support our free resources', body: 'Your voluntary donation helps us create and publish more free printable activities.', donate: 'Continue to donation', notConfigured: 'Donations are not set up yet. Add your donation page in WordPress under Appearance → Customize → KLS Donations.' },
  es: { label: 'Apoya a Kids Learning Studio', close: 'Cerrar', title: 'Apoya nuestros recursos gratuitos', body: 'Tu donación voluntaria nos ayuda a crear y publicar más actividades imprimibles gratuitas.', donate: 'Continuar para donar', notConfigured: 'Aún no se han configurado las donaciones. Añade la página de pago en WordPress: Apariencia → Personalizar → KLS Donations.' },
  ru: { label: 'Поддержать Kids Learning Studio', close: 'Закрыть', title: 'Поддержите бесплатные материалы', body: 'Ваше пожертвование поможет нам создавать и публиковать новые бесплатные задания для печати.', donate: 'Перейти к пожертвованию', notConfigured: 'Пожертвования пока не настроены. Добавьте ссылку на страницу оплаты в WordPress: Внешний вид → Настроить → KLS Donations.' },
};

export const CoffeeModal: React.FC<CoffeeModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const copy = MODAL_COPY[language];
  const donationUrl = (window as Window & { klsConfig?: { donationUrl?: string } }).klsConfig?.donationUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={copy.label}>
      <button type="button" aria-label={copy.close} className="fixed inset-0 bg-[#0F2A5F]/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#FCFBF8] border border-[#E5E2D9] shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2"><Coffee className="w-5 h-5 text-[#D97706]" /><h2 className="font-display text-base font-bold text-[#0F2A5F]">{copy.title}</h2></div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-[#64748B] hover:bg-[#F4F2EC] cursor-pointer" aria-label={copy.close}><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-[#475569] leading-relaxed">{copy.body}</p>
          {donationUrl ? (
            <a href={donationUrl} target="_blank" rel="noreferrer" className="w-full h-11 rounded-xl bg-[#0F2A5F] text-white text-sm font-semibold hover:bg-[#1B3B7B] inline-flex items-center justify-center">{copy.donate}</a>
          ) : (
            <p className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">{copy.notConfigured}</p>
          )}
        </div>
      </div>
    </div>
  );
};
