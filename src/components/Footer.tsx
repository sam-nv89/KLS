import React from 'react';
import { Coffee, Download, Mail, Settings } from 'lucide-react';
import type { AppRoute, Language } from '../types/studio';
import { CATEGORIES } from '../data/resources';
import { TRANSLATIONS } from '../data/translations';
import { BrandLogoMark } from './BrandLogo';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  language: Language;
  onOpenCoffee: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language, onOpenCoffee }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#0F2A5F] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="cursor-pointer focus:outline-none"
            >
              <BrandLogoMark darkSurface />
            </button>
            <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenCoffee}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5B700] text-[#0F2A5F] hover:bg-[#FACC15] transition-colors cursor-pointer"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>{t.sections.buyCoffeeBtn}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>hello@kidslearningstudio.org</span>
              </button>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold text-white">{t.footer.explore}</h4>
            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'catalog', preset: 'free' })} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.freeResources}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'catalog', preset: 'shop' })} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.shop}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'downloads' })} className="hover:text-white transition-colors cursor-pointer">
                  My Downloads
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'blog' })} className="hover:text-white transition-colors cursor-pointer">
                  {t.nav.blog}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-white">{t.footer.categoriesTitle}</h4>
            <ul className="grid grid-cols-1 gap-2 text-sm text-[#CBD5E1]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'catalog', preset: 'all', category: cat.id })}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {t.categories[cat.id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio & Legal */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-white">{t.footer.companyTitle} &amp; {t.footer.legalTitle}</h4>
            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'about' })} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'contact' })} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'faq' })} className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'privacy' })} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'cookies' })} className="hover:text-white transition-colors cursor-pointer">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'terms' })} className="hover:text-white transition-colors cursor-pointer">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate({ page: 'refunds' })} className="hover:text-white transition-colors cursor-pointer">
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#pinterest" onClick={(e) => { e.preventDefault(); onNavigate({ page: 'catalog', preset: 'free' }); }} className="hover:text-white transition-colors">
              Pinterest
            </a>
            <a href="#instagram" onClick={(e) => { e.preventDefault(); onNavigate({ page: 'catalog', preset: 'all' }); }} className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#youtube" onClick={(e) => { e.preventDefault(); onNavigate({ page: 'blog' }); }} className="hover:text-white transition-colors">
              YouTube
            </a>
            <a
              href="/kids-learning-studio-theme.zip"
              download="kids-learning-studio-theme.zip"
              className="inline-flex items-center gap-1 text-[#F5B700] hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>WP Theme (.zip)</span>
            </a>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'studio-admin' })}
              className="inline-flex items-center gap-1 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Studio Manager &amp; WP Blueprint</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
