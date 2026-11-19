export type Language = 'en' | 'es' | 'ru';

export interface KlsSiteContent {
  home?: Partial<Record<Language, Partial<Record<'hero_title' | 'hero_subtitle' | 'hero_cta_primary' | 'hero_cta_secondary' | 'popular_title' | 'popular_subtitle' | 'free_title' | 'free_subtitle' | 'featured_title' | 'featured_subtitle', string>>>>;
  homePrimaryUrl?: string;
  homeSecondaryUrl?: string;
  social?: { pinterest?: string; telegram?: string };
}

export type CategoryId =
  | 'coloring-pages'
  | 'math-numbers'
  | 'alphabet-letters'
  | 'shapes-colors'
  | 'puzzles-matching'
  | 'fine-motor-skills'
  | 'creative-activities';

export type AgeGroup = '2-3' | '3-4' | '4-5' | '5-6' | '2-6';

export type ResourceTheme =
  | 'Animals'
  | 'Space'
  | 'Seasons'
  | 'Foundations'
  | 'Everyday Life';

export type PreviewVariant =
  | 'coloring-dino'
  | 'coloring-space'
  | 'math-counting'
  | 'math-addition'
  | 'alphabet-tracing'
  | 'alphabet-phonics'
  | 'shapes-geometry'
  | 'shapes-colors'
  | 'puzzles-shadow'
  | 'puzzles-maze'
  | 'motor-scissors'
  | 'motor-lines'
  | 'creative-craft'
  | 'bundle-mega';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  shortDesc: string;
  accentColor: string;
  softBg: string;
  previewVariant: PreviewVariant;
}

export interface SamplePage {
  title: string;
  caption: string;
}

export interface LearningResource {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CategoryId;
  ageGroup: AgeGroup;
  theme: ResourceTheme;
  isFree: boolean;
  price: number;
  compareAtPrice?: number;
  isBundle?: boolean;
  pages: number;
  fileCount: number;
  fileFormat: string;
  fileSize: string;
  skills: string[];
  whatsIncluded: string[];
  samplePages: SamplePage[];
  downloadCount: number;
  createdAt: string;
  featured: boolean;
  previewVariant: PreviewVariant;
  downloadUrl?: string;
  thumbnailUrl?: string;
  wordpressUrl?: string;
  /** Optional editorial translations supplied by WordPress for this resource. */
  translations?: Partial<Record<Language, Partial<Pick<LearningResource, 'title' | 'shortDescription' | 'fullDescription' | 'skills' | 'whatsIncluded' | 'samplePages'>>>>;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: string;
  relatedCategory: CategoryId;
  content: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Printing' | 'Downloads' | 'Support';
}

export interface AdZoneConfig {
  id: string;
  name: string;
  placement: string;
  dimensions: string;
  enabled: boolean;
  provider: 'Google AdSense' | 'Unassigned';
}

export interface AnalyticsEvent {
  id: string;
  type:
    | 'resource_view'
    | 'download_free_click'
    | 'pdf_downloaded'
    | 'newsletter_subscribed'
    | 'support_visit'
    | 'donation_completed';
  label: string;
  value?: number;
  timestamp: string;
}

export type AppRoute =
  | { page: 'home' }
  | { page: 'catalog'; preset?: 'all' | 'free'; category?: CategoryId; query?: string }
  | { page: 'resource'; slug: string }
  | { page: 'blog'; slug?: string }
  | { page: 'about' }
  | { page: 'contact' }
  | { page: 'faq' }
  | { page: 'support' }
  | { page: 'privacy' }
  | { page: 'cookies' }
  | { page: 'terms' }
  | { page: 'studio-admin' };
