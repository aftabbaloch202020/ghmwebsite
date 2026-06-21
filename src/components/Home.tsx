/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play, TrendingUp, Users, Award, Calendar, ChevronRight, Activity, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';

interface HomeProps {
  onNavigate: (tabId: string) => void;
  onOpenAuth: (view: 'login' | 'signup') => void;
}

export default function Home({ onNavigate, onOpenAuth }: HomeProps) {
  const stats = [
    { value: '4,500+', label: 'Elite Members Checked In', icon: Users },
    { value: '25+', label: 'Elite Certified Master Coaches', icon: ShieldCheck },
    { value: '6+', label: 'Years of Luxury Operation', icon: Calendar },
    { value: '18+', label: 'National Athletic Trophies', icon: Award }
  ];

  const highlights = [
    {
      icon: Activity,
      title: 'Biometric Training Ground',
      desc: 'Our layouts utilize integrated metabolic assessment devices along with luxury electronic heart and stress trackers to tailor your workouts precisely.'
    },
    {
      icon: Zap,
      title: 'Performance Power Racks',
      desc: 'Full lines of competition-certified Rogue, Eleiko, and Hammer Strength racks, Barbells, and calibrated steel plates.'
    },
    {
      icon: Sparkles,
      title: 'Luxury Amenities Lounge',
      desc: 'Recover in pure style. Post-workout thermal saunas, dry steam suites, cryo cold showers, list lounges, and raw juice bars.'
    }
  ];

  const services = [
    {
      title: 'Elite Powerlifting',
      desc: 'Full coaching on Squat/Bench/Deadlift biomechanics, loading protocols, and competitive preparations.',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'High-Velocity Cardia',
      desc: 'Stamina building through interactive tactical assault bikes, standard treadmills, and rowing zones.',
      img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Holistic Body Shred',
      desc: 'Structured caloric burn and muscle toning classes leveraging core resistance and mobility rigs.',
      img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="w-full bg-[#030303]" id="ghm-home-page">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20" id="hero-section">
        
        {/* Dark Premium Gym Background Image with Golden Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600"
            alt="GHM Training Arena"
            className="w-full h-full object-cover scale-105 filter brightness-35 blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]/40"></div>
          {/* Subtle Golden Ambient Light */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20 flex flex-col items-center">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <TrendingUp className="h-4.5 w-4.5 text-amber-500" /> Executive Fitness Club
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tightest leading-tight uppercase max-w-5xl"
          >
            Shape Your Body <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-glow-gold">
              Build Your Heritage
            </span>
          </motion.h1>

          {/* Text Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-neutral-300 text-base sm:text-lg lg:text-xl font-light max-w-2xl mt-6 leading-relaxed"
          >
            Pakistan's high-performance sanctuary. State of the art bio-intelligence machines, world-class certified coaching, and custom strength architectures designed for the elite. 
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
          >
            <button
              id="hero-join-now-btn"
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 group"
            >
              Start Your Evolution
              <ChevronRight className="h-5 w-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-view-plans-btn"
              onClick={() => onNavigate('memberships')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold tracking-wider text-white border border-neutral-700 bg-neutral-900/40 hover:bg-neutral-900 hover:border-amber-400/40 transition-all flex items-center justify-center gap-2"
            >
              View Membership Plans
            </button>
          </motion.div>

        </div>

        {/* Decorative Down Arrow / Line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] text-amber-500 text-center tracking-widest uppercase font-mono">SCROLL TO UNLOCK</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-amber-400 to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* 2. Core Statistics Banner */}
      <section className="relative py-12 bg-neutral-950/90 border-t border-b border-neutral-900" id="stats-banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center flex flex-col items-center gap-2 p-4">
                <div className="bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 text-amber-400 mb-1">
                  <stat.icon className="h-5 w-5" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stat.value}</h3>
                <p className="text-neutral-500 text-xs tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why GHM Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="why-choose-ghm">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Graphic/Image representation with glassmorphism stack */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800"
                alt="Elite powerlifter training"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            </div>

            {/* Float glass card */}
            <div className="absolute -bottom-6 -right-6 md:right-8 bg-glass p-6 rounded-2xl border border-neutral-800 shadow-2xl max-w-sm gold-glowing-glow hidden sm:block">
              <span className="text-[10px] text-amber-500 font-bold tracking-widest uppercase block mb-1">GHM EXECUTIVE MANDATE</span>
              <p className="text-white font-extrabold text-lg">"We do not build average, we engineer elite physiques."</p>
              <p className="text-neutral-400 text-xs mt-2 italic">- Zayn Khan Shah, Head Coach</p>
            </div>
          </div>

          {/* Right: Copy Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-3">
              <span className="text-amber-500 text-xs font-black tracking-widest uppercase">DISCIPLINE IS THE ENTRY STANDARD</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Why Elite Athletes <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Choose GHM Fitness</span>
              </h2>
              <p className="text-neutral-400 font-light text-base leading-relaxed">
                We are not a casual health Club. GHM Fitness Club represents Pakistan's premier athletic sanctuary, bringing custom structural analysis, premium certified coaching regimens, and isolated sports rehabilitation methodologies under one luxury roof.
              </p>
            </div>

            {/* List entries */}
            <div className="space-y-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-neutral-900/40 border border-transparent hover:border-neutral-800/60 transition duration-300">
                  <div className="bg-amber-500/10 p-3 h-12 w-12 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-neutral-500 text-sm mt-1 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Featured Services / Disciplines Section */}
      <section className="py-24 bg-neutral-950 border-t border-b border-neutral-900" id="featured-disciplines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-16">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">GHM SPECIALIZED PILLARS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">Our Core Physical Disciplines</h2>
            <p className="text-neutral-400 font-light text-sm max-w-md mx-auto">
              Our training facilities are divided into isolated athletic departments to focus on specific body adaptations.
            </p>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl bg-[#0a0a0a] border border-neutral-800 hover:border-amber-500/30 transition duration-300 shadow-xl flex flex-col h-full">
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3 mb-6">
                    <h3 className="text-white font-extrabold text-xl group-hover:text-amber-400 transition">{svc.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed font-light">{svc.desc}</p>
                  </div>
                  <button
                    onClick={() => onNavigate('timings')}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-widest hover:text-amber-300 transition"
                  >
                    View Class Class &rsaquo;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Membership */}
          <div className="bg-glass-gold border border-amber-500/20 rounded-3xl p-8 sm:p-12 text-center mt-16 max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">Ready to Start Your Premium Fitness Adventure?</h3>
            <p className="text-neutral-300 font-light text-sm max-w-xl mx-auto">
              Choose from standard monthly templates to full VIP personal coaching programs. Secure your entry today and download your digital membership card instantly.
            </p>
            <div className="pt-2">
              <button
                id="feat-join-btn"
                onClick={() => onNavigate('memberships')}
                className="px-8 py-3.5 rounded-xl text-sm font-bold tracking-widest text-black bg-amber-500 hover:bg-amber-400 hover:scale-105 transition duration-300 uppercase shadow-lg shadow-amber-500/10"
              >
                Explore Active Memberships
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Members Real Testimonials Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">THE GHM BROTHERHOOD</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">Verified Member Stories</h2>
          </div>
          <p className="text-neutral-500 text-sm max-w-sm font-light">
            Read real stories and transformation assessments from verified corporate, amateur, and competitive powerlifters at GHM.
          </p>
        </div>

        {/* Grid Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-800 transition duration-300 shadow-xl">
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex text-amber-500 items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-sm">&#9733;</span>
                  ))}
                </div>
                <p className="text-neutral-300 text-sm font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Bio block */}
              <div className="flex items-center gap-4.5 pt-6 border-t border-neutral-900 mt-6 shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500/20">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm">{t.name}</h4>
                  <p className="text-amber-500 text-xs font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
