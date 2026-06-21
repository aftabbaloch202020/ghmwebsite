/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dumbbell, Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
  onOpenAuth: (view: 'login' | 'signup') => void;
}

export default function Footer({ onNavigate, onOpenAuth }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030303] border-t border-neutral-900 pt-16 pb-8 text-neutral-400" id="ghm-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-xl border border-amber-300/10">
                <Dumbbell className="h-5 w-5 text-black stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-wider flex items-center">
                GHM <span className="text-amber-400 font-light text-sm tracking-widest pl-2 ml-2 border-l border-neutral-800">FITNESS CLUB</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              GHM is a luxury international fitness brand specializing in high-performance conditioning, professional powerlifting coaching, and premium body transformations. Designed for individuals who demand athletic excellence and premium aesthetics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-amber-400 hover:border-amber-400/40 transition">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-amber-400 hover:border-amber-400/40 transition">
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-amber-400 hover:border-amber-400/40 transition">
                <Twitter className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold tracking-wider uppercase text-sm mb-6 border-b border-amber-400/20 pb-2 w-max">
              Quick Navigation
            </h4>
            <ul className="space-y-3.5 text-sm font-medium">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Club' },
                { id: 'timings', label: 'Class Schedules' },
                { id: 'trainers', label: 'Our Pro Team' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'memberships', label: 'Membership Plans' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-300 text-left"
                  >
                    &rsaquo; {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-extrabold tracking-wider uppercase text-sm mb-6 border-b border-amber-400/20 pb-2 w-max">
              Our Disciplines
            </h4>
            <ul className="space-y-3.5 text-sm text-neutral-400 font-light">
              <li>&bull; Elite Strength Engineering</li>
              <li>&bull; Olympic Weightlifting & Powerlifting</li>
              <li>&bull; High-Intensity Metabolic Shred</li>
              <li>&bull; Functional Mobility & Core Rehab</li>
              <li>&bull; 1-on-1 Customized Private Coaching</li>
              <li>&bull; Luxury Recovery Sauna & Ice Recovery</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5">
            <h4 className="text-white font-extrabold tracking-wider uppercase text-sm border-b border-amber-400/20 pb-2 w-max">
              Luxury Club HQ
            </h4>
            <div className="space-y-3.5 text-sm font-light">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Sector F-8, Blue Area Corporate Block, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span>+92 (300) 555-0925</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span>concierge@ghmfitness.com</span>
              </div>
              <div className="flex items-start gap-3 pt-1">
                <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Open Daily</p>
                  <p className="text-xs text-neutral-500">Mon - Sat: 05:00 AM - 11:00 PM</p>
                  <p className="text-xs text-neutral-500">Sunday: 08:00 AM - 08:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light">
          <div>
            &copy; {currentYear} <span className="text-white font-semibold">GHM Fitness Club (Pvt) Ltd.</span> All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition">Contact Us</button>
            <span className="text-neutral-800">|</span>
            <button onClick={() => onOpenAuth('login')} className="hover:text-amber-400 transition">Client Login</button>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-600 flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500/80" /> Admin Credentials: admin@ghm.com / admin123
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
