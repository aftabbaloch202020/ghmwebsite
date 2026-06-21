/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronRight, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  
  const [sentSuccess, setSentSuccess] = useState(false);

  const faqs = [
    { q: 'What are GHM Fitness Club opening hours?', a: 'We operate 05:00 AM - 11:00 PM Monday through Saturday, and 08:00 AM - 08:00 PM on Sundays. Specific holidays schedules are audited and blasted to members via electronic mail folders.' },
    { q: 'Is private personal coaching included in memberships?', a: 'Standard Monthly memberships include an initial physical calibration session. Silver, Gold, and Platinum plans contain pre-allocated recurring 1-on-1 certified coaching sessions. Separate private tutor packages are accessible at the club lobby desk.' },
    { q: 'Where do I find my digital member QR code card?', a: 'Sign up for are plans directly. Once enrolled or paid, navigate to "Client Login". After authenticating your password, the member center dashboard compiles your unique digital QR card instantly, displayable on mobile screens.' },
    { q: 'Are there separate female hours or separate facilities?', a: 'GHM Fitness Club sector F8 Islamabad provides private dedicated changing slots, separate recovery steam chambers, and tailored training areas specifically structured to guarantee secure privacy.' }
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setSentSuccess(true);
    // Reset inputs
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormSubject('');
    setFormMsg('');

    setTimeout(() => {
      setSentSuccess(false);
    }, 4000);
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-contact-page">
      
      {/* 1. Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block">GHM CONCIERGE CHANNELS</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          CONNECT WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">GHM CLUB</span>
        </h1>
        <p className="text-neutral-500 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Submit queries, book physical VIP walkthrough assessments, or request specialized corporate membership schedules.
        </p>
      </div>

      {/* 2. Main details and Contact form split grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Contact Info and map mock */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">Club Headquarters</h2>
              <p className="text-neutral-500 font-light text-sm leading-relaxed">
                Our flagship Islamabad athletic center sits on Blue Area’s main arterial road, featuring multi-floor strength training fields and sub-zero custom sports recovery systems.
              </p>
            </div>

            <div className="space-y-4 text-sm font-light text-neutral-400">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Club Location Coordinates</h4>
                  <p className="mt-0.5">F-8, Blue Area Corporate Block, Islamabad, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Concierge Hotline Numbers</h4>
                  <p className="mt-0.5">+92 (300) 555-0925</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">Digital Support Mailbox</h4>
                  <p className="mt-0.5">concierge@ghmfitness.com</p>
                </div>
              </div>
            </div>

            {/* Google Map Mockup */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 flex flex-col items-center justify-center p-6 text-center text-neutral-500 text-xs font-mono relative">
              {/* High Contrast dark stylized structural blueprint of maps */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
                  alt="GHM Maps Blueprint mockup"
                  className="w-full h-full object-cover filter brightness-15 grayscale blur-[0.5px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 space-y-2">
                <MapPin className="h-8 w-8 text-amber-500 mx-auto animate-bounce" />
                <h5 className="text-white font-bold font-sans">Sector F-8, Islamabad</h5>
                <p className="text-[10px] text-neutral-500 font-sans">Blue Area Corporate Zone, Pakistan</p>
              </div>
            </div>

          </div>

          {/* Right: Message sending form */}
          <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-neutral-900 shadow-xl">
            <h3 className="text-white font-extrabold text-xl uppercase mb-6 flex items-center gap-2">
              <Send className="h-4.5 w-4.5 text-amber-500" /> Concierge Mailbox Form
            </h3>

            {sentSuccess && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2.5" id="contact-success-banner">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" />
                <span>Message submitted! Our concierge department will dial or email you within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-submit-form">
              <div className="space-y-1">
                <label className="text-neutral-400 text-xs font-bold uppercase">Full Name</label>
                <input
                  type="text"
                  id="contact-form-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  required
                  className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-xs text-neutral-100 outline-none rounded-xl transition font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase">Email Address</label>
                  <input
                    type="email"
                    id="contact-form-email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="tariq@example.com"
                    required
                    className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-xs text-neutral-100 outline-none rounded-xl transition font-medium animate-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase">Phone number</label>
                  <input
                    type="tel"
                    id="contact-form-phone"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-xs text-neutral-100 outline-none rounded-xl transition font-medium animate-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 text-xs font-bold uppercase">Subject Description</label>
                <input
                  type="text"
                  id="contact-form-subject"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="e.g. Request Corporate Membership walkthrough plan"
                  className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-xs text-neutral-100 outline-none rounded-xl transition font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-400 text-xs font-bold uppercase">Message / Query narrative</label>
                <textarea
                  id="contact-form-message"
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Write your brief enquiry here..."
                  required
                  rows={4}
                  className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-xs text-neutral-100 outline-none rounded-xl transition font-light"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-black uppercase tracking-wider rounded-xl active:scale-98 transition duration-150 h-10 flex items-center justify-center"
              >
                Send Secure Message
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 3. Club FAQs section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-900 pt-16" id="faq-section">
        <div className="text-center space-y-3 mb-12">
          <HelpCircle className="h-6 w-6 text-amber-500 mx-auto" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">GHM KNOWLEDGE ACCUMULATIONS</h2>
          <p className="text-neutral-500 text-xs font-light max-w-sm mx-auto">Click FAQ items below to uncollapse certified GHM policies.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0a0a0a] rounded-2xl border border-neutral-900 overflow-hidden transition"
              id={`faq-item-${idx}`}
            >
              <button
                id={`faq-trigger-${idx}`}
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex items-center justify-between text-xs sm:text-sm text-neutral-200 font-extrabold uppercase hover:text-amber-500 transition"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`h-4 w-4 text-amber-500 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
              </button>

              {activeFaq === idx && (
                <div className="px-5 pb-5 text-neutral-500 font-light text-xs leading-relaxed border-t border-neutral-900 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
