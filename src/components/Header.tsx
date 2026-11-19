import React, { useEffect, useRef, useState } from 'react';
import { Search, Menu, X, Globe, Coffee, ChevronDown, Check } from 'lucide-react';
import type { AppRoute, Language } from '../types/studio';
import { TRANSLATIONS } from '../data/translations';
import { BrandLogoMark } from './BrandLogo';

interface HeaderProps {
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onOpenCoffee: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  route,
  onNavigate,
  language,
  onChangeLanguage,
  onOpenCoffee,
}) => {
  const t = TRANSLATIONS[language];
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!languageMenuOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) setLanguageMenuOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [languageMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate({ page: 'catalog', preset: 'all', query: searchQuery.trim() });
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const isNavActive = (check: string) => {
    if (check === 'categories' && route.page === 'catalog') {
      return true;
    }
    if (check === 'free' && route.page === 'catalog' && route.preset === 'free') return true;
    if (check === 'blog' && route.page === 'blog') return true;
    if (check === 'about' && route.page === 'about') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCFBF8]/95 backdrop-blur-sm border-b border-[#E5E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Brand Mark */}
          <button
            type="button"
            onClick={() => onNavigate({ page: 'home' })}
            className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B75E8] rounded-lg"
            aria-label="Kids Learning Studio Home"
          >
            <BrandLogoMark />
          </button>

          {/* Zone 2: Primary Single-Line Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#475569]" aria-label="Primary Navigation">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalog', preset: 'all' })}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                isNavActive('categories')
                  ? 'text-[#0F2A5F] border-[#1B75E8] font-semibold'
                  : 'border-transparent hover:text-[#0F2A5F]'
              }`}
            >
              {t.nav.categories}
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'catalog', preset: 'free' })}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                isNavActive('free')
                  ? 'text-[#0F2A5F] border-[#1B75E8] font-semibold'
                  : 'border-transparent hover:text-[#0F2A5F]'
              }`}
            >
              {t.nav.freeResources}
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'blog' })}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                isNavActive('blog')
                  ? 'text-[#0F2A5F] border-[#1B75E8] font-semibold'
                  : 'border-transparent hover:text-[#0F2A5F]'
              }`}
            >
              {t.nav.blog}
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'about' })}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                isNavActive('about')
                  ? 'text-[#0F2A5F] border-[#1B75E8] font-semibold'
                  : 'border-transparent hover:text-[#0F2A5F]'
              }`}
            >
              {t.nav.aboutUs}
            </button>
          </nav>

          {/* Zone 3: Search, Language Switcher, Bag & Support */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="w-10 h-10 inline-flex items-center justify-center rounded-xl text-[#475569] hover:text-[#0F2A5F] hover:bg-[#F4F2EC] transition-colors cursor-pointer"
              aria-label={t.ui.searchResources}
              aria-expanded={searchOpen}
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <div className="hidden sm:block relative" ref={languageMenuRef}>
              <button
                type="button"
                aria-label={t.ui.languageLabel}
                aria-haspopup="listbox"
                aria-expanded={languageMenuOpen}
                onClick={() => setLanguageMenuOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setLanguageMenuOpen(false);
                  if (event.key === 'ArrowDown') { event.preventDefault(); setLanguageMenuOpen(true); }
                }}
                className={`group inline-flex h-10 items-center gap-2 rounded-full border bg-white px-3 text-xs font-semibold text-[#0F2A5F] shadow-sm transition-all duration-200 hover:border-[#B9D4FA] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B75E8]/30 ${languageMenuOpen ? 'border-[#9CC5FA] shadow-md shadow-blue-900/10' : 'border-[#E5E2D9]'}`}
              >
                <Globe className="h-4 w-4 text-[#64748B] transition-colors group-hover:text-[#1B75E8]" aria-hidden="true" />
                <span>{language.toUpperCase()}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-[#64748B] transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {languageMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-48 origin-top-right rounded-2xl border border-white/80 bg-white/75 p-1.5 shadow-[0_20px_50px_-18px_rgba(15,42,95,0.38)] ring-1 ring-[#0F2A5F]/[0.06] backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150" role="listbox" aria-label={t.ui.languageLabel}>
                  {([
                    { code: 'en', name: 'English' },
                    { code: 'es', name: 'Español' },
                    { code: 'ru', name: 'Русский' },
                  ] as { code: Language; name: string }[]).map(({ code, name }) => (
                    <button
                      key={code}
                      type="button"
                      role="option"
                      aria-selected={language === code}
                      onClick={() => { onChangeLanguage(code); setLanguageMenuOpen(false); }}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B75E8]/40 ${language === code ? 'text-[#125FC4]' : 'text-[#334155] hover:bg-[#F2F6FD] hover:text-[#125FC4] hover:shadow-[inset_0_0_0_1px_rgba(184,204,232,0.8)]'}`}
                    >
                      <span className={`flex h-7 w-8 items-center justify-center rounded-lg text-[10px] font-bold tracking-wide transition-colors duration-150 ${language === code ? 'text-[#64748B]' : 'bg-[#F1F4F8]/75 text-[#64748B] group-hover:bg-white group-hover:text-[#1B75E8]'}`}>{code.toUpperCase()}</span>
                      <span className="flex-1 text-sm font-medium transition-colors duration-150">{name}</span>
                      {language === code && <Check className="h-4 w-4 text-[#1B75E8]" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              )}
            </div>


            <button
              type="button"
              onClick={onOpenCoffee}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>{t.ui.coffee}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-xl text-[#0F2A5F] hover:bg-[#F4F2EC] transition-colors cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Inline Expandable Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="pb-4 pt-1 flex items-center gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              autoFocus
              className="flex-1 h-11 px-4 rounded-xl bg-white border border-[#E5E2D9] text-sm text-[#0F2A5F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1B75E8]"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.ui.search}
            </button>
          </form>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E2D9] bg-white px-4 py-4 space-y-2">
          <div className="grid grid-cols-1 gap-1">
            {[
              { label: t.nav.categories, route: { page: 'catalog', preset: 'all' } as AppRoute },
              { label: t.nav.freeResources, route: { page: 'catalog', preset: 'free' } as AppRoute },
              { label: t.nav.blog, route: { page: 'blog' } as AppRoute },
              { label: t.nav.aboutUs, route: { page: 'about' } as AppRoute },
              { label: t.ui.faq, route: { page: 'faq' } as AppRoute },
              { label: t.sections.buyCoffeeBtn, route: { page: 'support' } as AppRoute },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#0F2A5F] hover:bg-[#F4F2EC] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between">
            <span className="text-xs font-medium text-[#64748B]">{language === 'ru' ? 'Язык' : language === 'es' ? 'Idioma' : 'Language'}</span>
            <div className="flex items-center gap-1">
              {(['en', 'es', 'ru'] as Language[]).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => onChangeLanguage(lng)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase ${
                    language === lng ? 'bg-[#1B75E8] text-white' : 'bg-[#F4F2EC] text-[#475569]'
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
