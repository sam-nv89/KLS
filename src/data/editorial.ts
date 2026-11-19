import type { AdZoneConfig, BlogArticle, FaqItem, PromoCode } from '../types/studio';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-scissor-skills',
    slug: 'how-10-minutes-of-scissor-practice-builds-writing-readiness',
    title: 'How 10 Minutes of Daily Scissor Practice Builds Preschool Writing Readiness',
    excerpt:
      'Before children ever hold a pencil for full letters, snipping paper strengthens the exact tripod finger muscles needed for confident handwriting.',
    category: 'Fine Motor & Readiness',
    readTime: '4 min read',
    publishedAt: 'November 10, 2026',
    author: 'Claire Bennett, Early Years Educator',
    relatedCategory: 'fine-motor-skills',
    content: [
      'Many parents assume handwriting readiness begins with alphabet tracing sheets. In reality, the small intrinsic muscles of the palm and thumb develop fastest through playful, tactile squeezing motions—and safe child-sized scissors are one of the simplest tools on your kitchen table.',
      'When a three-year-old opens and closes blunt-tip scissors along a wide dotted strip, their thumb, index, and middle fingers work independently from their ring and pinky fingers. Early childhood educators call this "separation of the two sides of the hand," and it is the foundation of a relaxed pencil grip.',
      'Start with thicker paper (such as light cardstock or index cards) and short one-inch snip strips rather than complex shapes. Thick paper resists flopping, giving little hands instant success and pride.',
      'Once straight snips feel steady, gradually introduce gentle waves and simple geometric shapes. Ten calm minutes alongside a bowl of colorful paper strips is more effective—and far happier—than thirty minutes of forced letter drills.',
    ],
  },
  {
    id: 'blog-screen-free-morning',
    slug: 'creating-a-calm-screen-free-morning-routine-ages-3-5',
    title: 'Creating a Calm, Screen-Free Morning Table for Ages 3–5',
    excerpt:
      'A simple 15-minute invitation to play using two printed sheets, three crayons, and zero setup stress.',
    category: 'Home Learning',
    readTime: '5 min read',
    publishedAt: 'November 2, 2026',
    author: 'David Morales, Preschool Curriculum Designer',
    relatedCategory: 'puzzles-matching',
    content: [
      'Mornings with young children move quickly. Instead of setting up elaborate sensory bins that take twenty minutes to clean up, try a quiet "morning invitation" at the breakfast table: one printed worksheet, a small cup of crayons, and a gentle prompt.',
      'Rotating between different skill types keeps curiosity fresh without feeling like schoolwork. On Monday, try a woodland shadow-matching puzzle; on Tuesday, a fruit counting strip; on Wednesday, a bold dinosaur coloring sheet.',
      'Keep choices small and inviting. Two or three thoughtfully chosen activities printed in a thin folder give preschoolers autonomy ("Which page would you like to start with today?") while keeping cleanup to thirty seconds.',
    ],
  },
  {
    id: 'blog-playful-math',
    slug: 'playful-counting-games-with-everyday-kitchen-objects',
    title: 'Playful Counting Games Using Dry Pasta, Buttons, and Printable Ten-Frames',
    excerpt:
      'Pair printable counting mats with hands-on kitchen objects to turn abstract numerals into something little fingers can touch.',
    category: 'Math & Numbers',
    readTime: '4 min read',
    publishedAt: 'October 24, 2026',
    author: 'Claire Bennett, Early Years Educator',
    relatedCategory: 'math-numbers',
    content: [
      'Young children understand numbers deeply when they can physically touch each item as they count aloud. Pairing a clean printable number mat with wooden blocks, dried beans, or colorful pom-poms bridges the gap between "reciting 1-2-3 like a song" and true one-to-one correspondence.',
      'Invite your child to place one pom-pom inside each star or circle on a ten-frame worksheet. When they reach the final box, ask, "How many altogether?" Seeing the row fill up builds natural mental anchors for 5 and 10 that later make addition effortless.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Downloads',
    question: 'Do I need to create an account to download free worksheets?',
    answer:
      'No. All free resources on Kids Learning Studio download directly as instant PDFs with zero registration wall. We only ask for your email if you voluntarily choose to join our weekly printable newsletter or purchase a paid digital bundle.',
  },
  {
    category: 'Printing',
    question: 'What paper size do your PDFs support (US Letter vs. A4)?',
    answer:
      'Every pack includes clean margins engineered to print sharply on both US Letter (8.5×11") and international A4 paper. Select "Fit to Printable Area" in your printer dialog for crisp results.',
  },
  {
    category: 'Printing',
    question: 'Can I print worksheets in black-and-white to save color ink?',
    answer:
      'Yes! We design our layouts with high-contrast lines and plenty of white space so every math, alphabet, puzzle, and coloring page prints cleanly in standard grayscale/black-and-white mode.',
  },
  {
    category: 'Shop & Licenses',
    question: 'Can preschool teachers use these printables in their classrooms?',
    answer:
      'Yes. Both our free and paid resources include a personal & single-classroom license, meaning parents can print for their family and teachers can print unlimited copies for their own classroom students.',
  },
  {
    category: 'Shop & Licenses',
    question: 'How do I receive paid activity packs and can I re-download them later?',
    answer:
      'Immediately after checkout, your secure download links appear on your confirmation screen and in your "My Downloads" order library, along with an email receipt so you can re-download your files anytime.',
  },
  {
    category: 'Support',
    question: 'How does "Buy Us a Coffee" support Kids Learning Studio?',
    answer:
      'Because most of our library is completely free without mandatory paywalls, voluntary coffees help cover illustration, curriculum design, and hosting costs so we can publish new free resources every week.',
  },
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    code: 'STUDIO20',
    discountPercent: 20,
    description: '20% off any digital activity pack or preschool bundle',
    active: true,
  },
  {
    code: 'TEACHER10',
    discountPercent: 10,
    description: '10% educator appreciation discount',
    active: true,
  },
];

export const INITIAL_AD_ZONES: AdZoneConfig[] = [
  {
    id: 'ad-header-banner',
    name: '1. Header Banner',
    placement: 'Top leaderboard above page container (optional)',
    dimensions: '728×90 / Responsive',
    enabled: false,
    provider: 'Unassigned',
  },
  {
    id: 'ad-home-content',
    name: '2. Homepage Content Banner',
    placement: 'Between Free Learning Resources and Featured Activities',
    dimensions: '970×90 / Responsive',
    enabled: false,
    provider: 'Unassigned',
  },
  {
    id: 'ad-between-blocks',
    name: '3. Between Content Blocks',
    placement: 'Catalog grid mid-section break (never near download buttons)',
    dimensions: 'Responsive In-Feed',
    enabled: false,
    provider: 'Unassigned',
  },
  {
    id: 'ad-sidebar',
    name: '4. Sidebar Advertisement',
    placement: 'Desktop secondary rail on Blog & Catalog views',
    dimensions: '300×250',
    enabled: false,
    provider: 'Unassigned',
  },
  {
    id: 'ad-inside-blog',
    name: '5. Inside Blog Articles',
    placement: 'Mid-article clean break after paragraph 2',
    dimensions: 'Responsive Fluid',
    enabled: false,
    provider: 'Unassigned',
  },
  {
    id: 'ad-below-resource',
    name: '6. Below Resource Content',
    placement: 'Below Download/Details card, above Related Resources',
    dimensions: '728×90 / Responsive',
    enabled: false,
    provider: 'Unassigned',
  },
];
