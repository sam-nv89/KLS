import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, Send } from 'lucide-react';
import type { AppRoute } from '../types/studio';
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
          Our worksheets, coloring pages, and early-learning packs are free to download with a single click. Voluntary donations and advertising help keep our studio sustainable.
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
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget as HTMLFormElement).get('website') ?? '');
    if (!name.trim() || !email.includes('@') || !message.trim()) return;
    const config = (window as Window & { klsConfig?: { restUrl?: string; nonce?: string } }).klsConfig;
    if (!config?.restUrl) {
      setSendError('The contact form is not connected to WordPress yet. Please try again later.');
      return;
    }
    setSending(true);
    setSendError('');
    try {
      const response = await fetch(`${config.restUrl}kls/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config.nonce ? { 'X-WP-Nonce': config.nonce } : {}) },
        body: JSON.stringify({ name, email, topic, message, website }),
      });
      if (!response.ok) throw new Error('Contact request failed');
      setSent(true);
    } catch {
      setSendError('We could not send your message. Please try again later.');
    } finally {
      setSending(false);
    }
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
            Thank you, {name}. Your message has been sent. We will reply to {email} as soon as possible.
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
          <div className="absolute -left-[10000px]" aria-hidden="true">
            <label htmlFor="contact-website">Leave this field empty</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
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
              <option>Download Help</option>
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
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B75E8] text-white text-sm font-semibold hover:bg-[#155EC0] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{sending ? 'Sending…' : 'Send Message'}</span>
          </button>
          {sendError && <p role="alert" className="text-sm text-red-700">{sendError}</p>}
        </form>
      )}

      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <Mail className="w-4 h-4" />
        <span>Messages are sent to the site administrator’s email configured in WordPress.</span>
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
          Helpful answers on PDF printing, classroom use, newsletter subscriptions, and free downloads.
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

export const LegalPage: React.FC<{
      type: 'privacy' | 'cookies' | 'terms';
}> = ({ type }) => {
  const docs = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'November 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'Free worksheets can be downloaded without creating an account or submitting personal details. If you voluntarily subscribe to our newsletter or contact us, we process the information you provide to deliver email updates or respond to your inquiry.',
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
          body: 'We use lightweight browser storage to remember your language preference (EN/ES/RU) and essential site preferences.',
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
          body: 'Printable PDFs from Kids Learning Studio are provided for personal family use and single-classroom educator use. Redistribution, reselling, or uploading raw PDF files to public file-sharing repositories is prohibited.',
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
