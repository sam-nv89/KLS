import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import type { AdZoneConfig, AppRoute, BlogArticle, Language, LearningResource } from '../types/studio';
import { BLOG_ARTICLES } from '../data/editorial';
import { AdSlot } from '../components/AdSlot';
import { WorksheetPreview } from '../components/WorksheetPreview';
import { CATEGORIES } from '../data/resources';
import { TRANSLATIONS } from '../data/translations';
import { localizeArticle } from '../data/localizedEditorial';

interface BlogPageProps {
  slug?: string;
  adZones: AdZoneConfig[];
  resources: LearningResource[];
  onNavigate: (route: AppRoute) => void;
  language: Language;
}

export const BlogPage: React.FC<BlogPageProps> = ({ slug, adZones, resources, onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  const insideBlogAd = adZones.find((z) => z.id === 'ad-inside-blog');
  const sidebarAd = adZones.find((z) => z.id === 'ad-sidebar');

  const sourceArticle: BlogArticle | undefined = slug
    ? BLOG_ARTICLES.find((a) => a.slug === slug)
    : undefined;
  const activeArticle = sourceArticle ? localizeArticle(sourceArticle, language) : undefined;
  const formatDate = (date: string) => new Date(date).toLocaleDateString(language === 'ru' ? 'ru-RU' : language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (activeArticle) {
    const relatedResources = resources
      .filter((r) => r.category === activeArticle.relatedCategory)
      .slice(0, 2);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'blog' })}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B75E8] hover:underline mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ru' ? 'Назад к блогу' : language === 'es' ? 'Volver al blog' : 'Back to Learning Blog'}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#64748B]">
                <span>{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(activeArticle.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F] leading-tight text-balance">
                {activeArticle.title}
              </h1>
              <p className="text-sm font-medium text-[#475569]">{language === 'ru' ? 'Автор:' : language === 'es' ? 'Por' : 'By'} {activeArticle.author}</p>
            </div>

            <div className="space-y-5 text-base text-[#334155] leading-relaxed pt-4 border-t border-[#E5E2D9]">
              {activeArticle.content.slice(0, 2).map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <AdSlot zone={insideBlogAd} language={language} />

              {activeArticle.content.slice(2).map((para, i) => (
                <p key={i + 2}>{para}</p>
              ))}
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-white border border-[#E5E2D9] p-5 space-y-4">
              <h2 className="font-display text-base font-bold text-[#0F2A5F]">
                {language === 'ru' ? 'Подходящие материалы для печати' : language === 'es' ? 'Paquetes imprimibles relacionados' : 'Related Printable Packs'}
              </h2>
              <div className="space-y-4">
                {relatedResources.map((res) => (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => onNavigate({ page: 'resource', slug: res.slug })}
                    className="w-full text-left flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F2EC] transition-colors cursor-pointer"
                  >
                    <div className="w-16 shrink-0 rounded-lg overflow-hidden border border-[#E5E2D9]">
                      <WorksheetPreview variant={res.previewVariant} language={language} compact />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F2A5F] truncate">{res.title}</p>
                      <p className="text-xs text-[#64748B]">
                        {res.isFree ? t.actions.freeLabel : `$${res.price.toFixed(2)}`} · {t.ui.ages} {res.ageGroup}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <AdSlot zone={sidebarAd} language={language} />
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
      <div className="max-w-2xl space-y-2 pb-6 border-b border-[#E5E2D9]">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
          {language === 'ru' ? 'Блог для родителей и педагогов' : language === 'es' ? 'Blog para familias y docentes' : 'Parent & Educator Blog'}
        </h1>
        <p className="text-base text-[#475569]">
          {language === 'ru' ? 'Идеи для занятий, развития моторики и материалы для печати для детей от 2 до 6 лет.' : language === 'es' ? 'Ideas para jugar, desarrollar la motricidad y guías imprimibles para niños de 2 a 6 años.' : 'Practical play ideas, fine motor routines, and printable activity guides for ages 2–6.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_ARTICLES.map((source) => {
          const article = localizeArticle(source, language);
          const cat = CATEGORIES.find((c) => c.id === article.relatedCategory);
          return (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-[#E5E2D9] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {cat && (
                <WorksheetPreview
                  variant={cat.previewVariant}
                  language={language}
                  title={article.title}
                  compact
                  className="border-b border-[#E5E2D9]"
                />
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="mt-2 font-display text-lg font-bold text-[#0F2A5F] leading-snug">
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'blog', slug: article.slug })}
                    className="text-left hover:text-[#1B75E8] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </button>
                </h2>
                <p className="mt-2 text-sm text-[#475569] leading-relaxed flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-[#F1EFE9] flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">{formatDate(article.publishedAt)}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'blog', slug: article.slug })}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B75E8] hover:underline cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{language === 'ru' ? 'Читать' : language === 'es' ? 'Leer guía' : 'Read Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
