import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Coffee, Download, Heart, Mail, Send } from 'lucide-react';
import type { AppRoute, DigitalOrder, LearningResource } from '../types/studio';
import { FAQ_ITEMS } from '../data/editorial';
import { HeroBrandShowcase } from '../components/BrandLogo';

export const AboutUsPage: React.FC<{ onNavigate: (r: AppRoute) => void }> = ({ onNavigate }) => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
    <div className="space-y-4 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
        About Kids Learning Studio
      </h1>
      <p className="text-lg text-[#475569] leading-relaxed">
        We create calm, colorful, screen-free printable activities designed for curious children ages 2 to 6 and the parents and teachers who guide them.
      </p>
    </div>

    <HeroBrandShowcase />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-7 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
        <h2 className="font-display text-xl font-bold text-[#0F2A5F]">Our Library-First Philosophy</h2>
        <p className="text-sm text-[#475569] leading-relaxed">
          Most of our worksheets, coloring pages, and early-learning packs are free to download with a single click—no mandatory accounts or frustrating hoops. Complete multi-week bundles in our shop and voluntary supporter coffees keep our studio sustainable.
        </p>
      </div>
      <div className="p-7 rounded-2xl bg-white border border-[#E5E2D9] space-y-3">
        <h2 className="font-display text-xl font-bold text-[#0F2A5F]">Built for Real Printers &amp; Little Hands</h2>
        <p className="text-sm text-[#475569] leading-relaxed">
          Every sheet is calibrated for crisp home printing on both US Letter and A4 paper, featuring generous spacing, readable typography, and uncluttered illustrations that build confidence step by step.
        </p>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onNavigate({ page: 'catalog', preset: 'free' })}
        className="px-6 py-3 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
      >
        Explore Free Resources
      </button>
      <button
        type="button"
        onClick={() => onNavigate({ page: 'contact' })}
        className="px-6 py-3 rounded-xl bg-white border border-[#E5E2D9] text-[#0F2A5F] text-sm font-semibold hover:bg-[#F4F2EC] transition-colors cursor-pointer"
      >
        Contact Our Team
      </button>
    </div>
  </div>
);

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Question');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) return;
    setSent(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">Contact Us</h1>
        <p className="text-base text-[#475569]">
          Questions about a download, school licensing, or printable requests? Write to us anytime.
        </p>
      </div>

      {sent ? (
        <div className="p-8 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
          <div className="flex items-center gap-2 text-[#15803D] font-bold text-lg font-display">
            <CheckCircle2 className="w-6 h-6" />
            <span>Message Received!</span>
          </div>
          <p className="text-sm text-[#166534]">
            Thank you, {name}. Our studio team will reply to {email} within 1–2 business days.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setName('');
              setEmail('');
              setMessage('');
            }}
            className="text-xs font-semibold text-[#15803D] underline cursor-pointer"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-[#E5E2D9] space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Samira Patel"
                className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
              Topic
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm font-medium text-[#0F2A5F] focus:outline-none focus:border-[#1B75E8]"
            >
              <option>General Question</option>
              <option>Order or Download Help</option>
              <option>Preschool / Classroom License</option>
              <option>Request a New Printable Topic</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
              Message
            </label>
            <textarea
              id="contact-msg"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="w-full p-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}

      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Mail className="w-4 h-4" />
        <span>Direct email: hello@kidslearningstudio.org</span>
      </div>
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#475569]">
          Helpful answers on PDF printing, classroom licensing, digital orders, and free downloads.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.question} className="rounded-2xl bg-white border border-[#E5E2D9] overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div>
                  <span className="text-[11px] font-semibold text-[#1B75E8] block">{item.category}</span>
                  <span className="font-display text-base font-bold text-[#0F2A5F]">{item.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm text-[#475569] leading-relaxed border-t border-[#F1EFE9] pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SupportPage: React.FC<{
  onDonateComplete: (amount: number, note: string) => void;
}> = ({ onDonateComplete }) => {
  const [amount, setAmount] = useState<number>(5);
  const [custom, setCustom] = useState('');
  const [note, setNote] = useState('');
  const [doneAmount, setDoneAmount] = useState<number | null>(null);

  const finalAmount = custom ? Math.max(1, Number(custom) || 5) : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDoneAmount(finalAmount);
    onDonateComplete(finalAmount, note);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#92400E]">
          <Coffee className="w-4 h-4" />
          <span>Voluntary Support</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F2A5F]">
          Love our free resources? Buy us a coffee and help us create more!
        </h1>
        <p className="text-base text-[#475569]">
          Contributions help us keep our core library of printable worksheets 100% free and accessible to families and preschool educators worldwide.
        </p>
      </div>

      {doneAmount !== null ? (
        <div className="p-8 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto" />
          <h2 className="font-display text-2xl font-bold text-[#0F2A5F]">
            Thank you for your ${doneAmount.toFixed(2)} support!
          </h2>
          <p className="text-sm text-[#166534]">
            Your kindness directly funds upcoming free alphabet, math, and seasonal coloring packs.
          </p>
          <button
            type="button"
            onClick={() => setDoneAmount(null)}
            className="mt-2 px-5 py-2.5 rounded-xl bg-[#0F2A5F] text-white text-xs font-semibold cursor-pointer"
          >
            Make Another Contribution
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white border border-[#E5E2D9] space-y-6">
          <div>
            <span className="block text-xs font-semibold text-[#0F2A5F] mb-2.5">Select Support Amount</span>
            <div className="grid grid-cols-4 gap-3">
              {[3, 5, 10, 25].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setAmount(val);
                    setCustom('');
                  }}
                  className={`h-12 rounded-xl font-mono-num text-base font-bold border transition-colors cursor-pointer ${
                    !custom && amount === val
                      ? 'bg-[#F5B700] border-[#D97706] text-[#0F2A5F]'
                      : 'bg-[#FCFBF8] border-[#E5E2D9] text-[#475569]'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="support-custom" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
              Custom Amount (USD)
            </label>
            <input
              id="support-custom"
              type="number"
              min="1"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter any amount"
              className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
            />
          </div>

          <div>
            <label htmlFor="support-note" className="block text-xs font-semibold text-[#0F2A5F] mb-1.5">
              Message (Optional)
            </label>
            <input
              id="support-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Say hello or suggest a printable theme!"
              className="w-full h-11 px-3.5 rounded-xl bg-[#FCFBF8] border border-[#E5E2D9] text-sm focus:outline-none focus:border-[#1B75E8]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#0F2A5F] text-white text-sm font-semibold hover:bg-[#1B3B7B] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[#F5B700]" />
            <span>Proceed to Support · ${finalAmount.toFixed(2)}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export const MyDownloadsPage: React.FC<{
  orders: DigitalOrder[];
  resources: LearningResource[];
  onDownloadResource: (res: LearningResource) => void;
  onNavigate: (r: AppRoute) => void;
}> = ({ orders, resources, onDownloadResource, onNavigate }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
    <div className="space-y-2">
      <h1 className="font-display text-3xl font-extrabold text-[#0F2A5F]">My Downloads &amp; Order History</h1>
      <p className="text-sm text-[#475569]">
        Re-download any of your purchased digital activity packs and preschool bundles anytime.
      </p>
    </div>

    {orders.length === 0 ? (
      <div className="p-10 rounded-3xl bg-white border border-[#E5E2D9] text-center space-y-4">
        <p className="font-display text-lg font-bold text-[#0F2A5F]">No paid orders yet</p>
        <p className="text-sm text-[#64748B] max-w-md mx-auto">
          Free worksheets download directly without needing an order history. Purchased bundles appear here automatically.
        </p>
        <button
          type="button"
          onClick={() => onNavigate({ page: 'catalog', preset: 'shop' })}
          className="px-5 py-2.5 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold cursor-pointer"
        >
          Browse Digital Shop
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-6 rounded-2xl bg-white border border-[#E5E2D9] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F1EFE9] text-xs text-[#64748B]">
              <span>
                Order <strong className="font-mono-num text-[#0F2A5F]">#{order.id}</strong> · {order.customerEmail}
              </span>
              <span className="font-mono-num font-bold text-[#0F2A5F]">
                Paid ${order.totalPaid.toFixed(2)}
              </span>
            </div>
            <div className="space-y-2.5">
              {order.items.map((item) => {
                const res = resources.find((r) => r.id === item.resourceId);
                if (!res) return null;
                return (
                  <div key={item.resourceId} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#0F2A5F]">{res.title}</p>
                      <p className="text-xs text-[#64748B] font-mono-num">
                        {res.pages} Pages · Token {order.downloadToken}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDownloadResource(res)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B75E8] text-white text-xs font-semibold hover:bg-[#155EC0] cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Re-download PDF</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const LegalPage: React.FC<{
  type: 'privacy' | 'cookies' | 'terms' | 'refunds';
}> = ({ type }) => {
  const docs = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'Free worksheets can be downloaded without creating an account or submitting personal details. When you voluntarily subscribe to our newsletter, purchase a digital activity pack, or contact our team, we collect only your name and email address to deliver your PDFs and respond to inquiries.',
        },
        {
          heading: '2. Children’s Privacy (COPPA / GDPR-K)',
          body: 'Kids Learning Studio is designed for parents, guardians, and preschool educators. We do not knowingly collect personal information directly from children under 13.',
        },
        {
          heading: '3. Analytics & Advertising Readiness',
          body: 'We measure aggregate resource downloads and page views to improve our educational library. If third-party advertising networks (such as Google AdSense) are enabled, standard consent controls apply.',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Essential Functional Storage',
          body: 'We use lightweight browser storage to remember your language preference (EN/ES/RU), items in your digital shopping bag, and your previously purchased PDF downloads.',
        },
        {
          heading: '2. Advertising & Analytics Cookies',
          body: 'Optional analytics and advertising cookies are governed by your consent selection and can be updated anytime by clearing browser preferences.',
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Personal & Single-Classroom License',
          body: 'All free and paid printable PDFs from Kids Learning Studio are licensed for personal family printing and single-classroom educator use. Redistribution, reselling, or uploading raw PDF files to public file-sharing repositories is prohibited.',
        },
        {
          heading: '2. Digital Product Delivery',
          body: 'All shop items are digital downloadable PDF files delivered electronically immediately after checkout. No physical items are shipped.',
        },
      ],
    },
    refunds: {
      title: 'Digital Refund Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Digital Downloads',
          body: 'Because digital PDF products are delivered immediately upon purchase, all sales are generally final once files are downloaded.',
        },
        {
          heading: '2. Duplicate Purchases & Technical Issues',
          body: 'If you experience a corrupted file, accidental duplicate order, or printing issue, contact hello@kidslearningstudio.org within 14 days and we will gladly replace the file or issue a full refund.',
        },
      ],
    },
  }[type];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
      <div className="space-y-1 pb-4 border-b border-[#E5E2D9]">
        <h1 className="font-display text-3xl font-extrabold text-[#0F2A5F]">{docs.title}</h1>
        <p className="text-xs text-[#64748B]">Last updated: {docs.updated}</p>
      </div>
      <div className="space-y-6">
        {docs.sections.map((sec) => (
          <section key={sec.heading} className="space-y-2">
            <h2 className="font-display text-lg font-bold text-[#0F2A5F]">{sec.heading}</h2>
            <p className="text-sm text-[#475569] leading-relaxed">{sec.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
};
