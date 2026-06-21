/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Award, Compass, HeartPulse, Sparkles, Flame, CheckCircle } from 'lucide-react';

export default function About() {
  const values = [
    { title: 'Zero Compromise Excellence', desc: 'No cut corners. All our apparatus, coaches, amenities, and structures undergo thorough evaluations to sustain elite global club standards.', icon: Award },
    { title: 'Scientific Adaptation Plans', desc: 'We skip programmatic guessing. We deploy state-of-the-art biological, metabolic, and force calculators so members transform scientifically.', icon: HeartPulse },
    { title: 'Immersive Mindset Community', desc: 'True conditioning happens above the neck. Our workspace fosters focus, iron camaraderie, and high athletic integrity.', icon: Compass }
  ];

  const facilities = [
    { title: 'Main High-Volume Rig Space', desc: 'Equipped with custom premium multi-stations, custom steel powerhouses, and extensive free-weight selections.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600' },
    { title: 'Sub-Zero Recovery Suite', desc: 'Featuring fully integrated dry steam saunas, rapid muscle icing blocks, and personal changing compartments.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
    { title: 'Olympic Powerlifting Platform', desc: 'Calibrated deadlift shock platforms, specialized squat cages, Eleiko plates, and force testing sensors.', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600' }
  ];

  const transformationStories = [
    {
      name: 'Raza Jafri',
      duration: '6 Months Protocol',
      gains: '-18kg Body Fat, +6kg Muscle',
      quote: 'GHM is a life transformation center. Under Zayn\'s structured hypertrophic guidance, we changed not only my visual composition but my metabolic blood panel metrics.',
      imgBefore: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      imgAfter: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Kamila Hashwani',
      duration: '12 Weeks Metabolic Shred',
      gains: '-8.5% Body Fat Percentage',
      quote: 'The amenities here are equal to any international seven-star hotel. The clean workout deck environment, separate functional rooms, and Elena Rostova\'s targeted core coaching saved my back.',
      imgBefore: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      imgAfter: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-about-page">
      
      {/* 1. Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block">ESTABLISHED 2020</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">GHM FITNESS</span>
        </h1>
        <p className="text-neutral-500 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Uncompromising focus, luxury amenities, and elite-level certified coaching. GHM was born to fill the void of authentic strength training platforms.
        </p>
      </div>

      {/* 2. Brand Core Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Our Vision: <br />
              <span className="text-amber-500">Uncompromising Athletic Performance</span>
            </h2>
            <p className="text-neutral-400 font-light leading-relaxed">
              Founded under the simple premise that standard commercial gyms lack focus and athletic depth, GHM Fitness Club provides high-performance custom equipment, world-class certified coaches, and custom sports recovery zones configured for people who understand value.
            </p>
            <p className="text-neutral-400 font-light leading-relaxed">
              We aim to foster high sports discipline, structural safety, and rapid physiological progress. Our luxury black-and-gold fitness sanctuaries deliver zero-compromise environments.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border border-neutral-800 bg-neutral-900/40 p-5 rounded-2xl">
                <h3 className="text-amber-400 font-extrabold text-lg">Our Mission</h3>
                <p className="text-neutral-500 text-xs mt-1 leading-relaxed font-light">To engineer elite body transformations through structured biometric science and elite personal layouts.</p>
              </div>
              <div className="border border-neutral-800 bg-neutral-900/40 p-5 rounded-2xl">
                <h3 className="text-amber-400 font-extrabold text-lg">Our Standard</h3>
                <p className="text-neutral-500 text-xs mt-1 leading-relaxed font-light">Maintaining 100% certified international hardware, high clean protocols, and professional physical guidance.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
                alt="GHM Elite Interior Deck"
                className="w-full h-full object-cover filter brightness-85"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay stats badges */}
            <div className="absolute -top-6 -left-6 bg-glass p-5 rounded-2xl border border-neutral-800/80 shadow-2xl hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2.5 rounded-xl">
                  <Flame className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl">100%</h4>
                  <p className="text-neutral-500 text-[10px] tracking-widest uppercase">Iron Focus Environment</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="bg-neutral-950 py-24 border-t border-b border-neutral-900 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">THE GHM FOUNDATIONAL METALS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">Our Core Operational Values</h2>
            <p className="text-neutral-400 font-light max-w-md mx-auto text-sm">
              We govern GHM Fitness Club under strict pillars to guarantee our members experience professional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-8 hover:border-amber-400/20 transition duration-300">
                <div className="bg-amber-500/10 p-3 h-12 w-12 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 mb-6">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-white font-extrabold text-lg mb-2">{v.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gym Facilities & Apparatus Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="facilities">
        <div className="text-center space-y-3 mb-16">
          <span className="text-amber-500 text-xs font-black tracking-widest uppercase">GHM FIVE-STAR SPACES</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">Our Luxury Facilities</h2>
          <p className="text-neutral-400 font-light max-w-md mx-auto text-sm">
            Architecturally styled structures engineered with premium air filtration, customized soundscapes, and state-of-the-art layout layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => (
            <div key={idx} className="group overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-900 hover:border-neutral-800 transition duration-300">
              <div className="h-64 overflow-hidden relative">
                <img src={fac.img} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-white font-extrabold text-xl group-hover:text-amber-400 transition">{fac.title}</h3>
                <p className="text-neutral-500 text-xs mt-2 leading-relaxed font-light">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Transformational Cases before/after */}
      <section className="bg-neutral-950 py-24 border-t border-neutral-900" id="success-stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">PROVABLE METALLIC PHYSICAL EVIDENCE</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">GHM Transformation Success Stories</h2>
            <p className="text-neutral-400 font-light max-w-md mx-auto text-sm">
              Real results under verified metabolic assessments. We do not track only metrics; we build structured athletic health.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {transformationStories.map((story, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-8 hover:border-neutral-800/80 transition duration-300 shadow-xl flex flex-col md:flex-row gap-6">
                
                {/* Before / After Columns */}
                <div className="flex gap-4 shrink-0 justify-center">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-neutral-500 tracking-wider font-bold">START</span>
                    <div className="w-24 h-32 rounded-xl overflow-hidden border border-neutral-800">
                      <img src={story.imgBefore} alt={`${story.name} Before`} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-amber-500 tracking-wider font-bold">AFTER</span>
                    <div className="w-24 h-32 rounded-xl overflow-hidden border border-amber-400/40">
                      <img src={story.imgAfter} alt={`${story.name} After`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>

                {/* Feedback text */}
                <div className="flex-grow space-y-3 text-center md:text-left">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-widest uppercase">{story.duration}</span>
                  <h3 className="text-white font-extrabold text-xl mt-1">{story.name}</h3>
                  <p className="text-amber-400 font-medium text-xs tracking-wider">{story.gains}</p>
                  <p className="text-neutral-500 text-xs font-light italic leading-relaxed pt-1">
                    "{story.quote}"
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
