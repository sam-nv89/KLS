export type Language = 'en' | 'es' | 'ru';

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
}

export interface CartItem {
  resourceId: string;
  quantity: number;
}

export interface DigitalOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  items: {
    resourceId: string;
    title: string;
    price: number;
  }[];
  promoCode?: string;
  discountAmount: number;
  totalPaid: number;
  createdAt: string;
  downloadToken: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  description: string;
  active: boolean;
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
  category: 'Printing' | 'Downloads' | 'Shop & Licenses' | 'Support';
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
    | 'buy_now_click'
    | 'purchase_completed'
    | 'newsletter_subscribed'
    | 'support_visit'
    | 'donation_completed';
  label: string;
  value?: number;
  timestamp: string;
}

export type AppRoute =
  | { page: 'home' }
  | { page: 'catalog'; preset?: 'all' | 'free' | 'shop'; category?: CategoryId; query?: string }
  | { page: 'resource'; slug: string }
  | { page: 'blog'; slug?: string }
  | { page: 'about' }
  | { page: 'contact' }
  | { page: 'faq' }
  | { page: 'support' }
  | { page: 'downloads' }
  | { page: 'privacy' }
  | { page: 'cookies' }
  | { page: 'terms' }
  | { page: 'refunds' }
  | { page: 'studio-admin' };
