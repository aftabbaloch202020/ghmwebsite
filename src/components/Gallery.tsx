/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Calendar, Grid } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  galleryList: GalleryItem[];
}

export default function Gallery({ galleryList }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'workout' | 'facilities' | 'team' | 'events'>('all');

  const categories: { id: 'all' | 'workout' | 'facilities' | 'team' | 'events'; label: string }[] = [
    { id: 'all', label: 'All Photos' },
    { id: 'facilities', label: 'Club Spaces' },
    { id: 'workout', label: 'Iron Workouts' },
    { id: 'team', label: 'Pro Staff' },
    { id: 'events', label: 'GHM Events' }
  ];

  const filteredItems = galleryList.filter(item => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-gallery-page">
      
      {/* 1. Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block">VISUAL IRON SANCTUARY</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          GHM CLUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">GALLERY</span>
        </h1>
        <p className="text-neutral-500 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Take a virtual journey through our elite weightlifter rooms, recovery platforms, personal workouts, and competitive events.
        </p>
      </div>

      {/* 2. Categories selection bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-center">
        <div className="bg-neutral-950/85 p-2 rounded-2xl border border-neutral-900 flex flex-wrap gap-1.5 justify-center">
          {categories.map((c) => (
            <button
              key={c.id}
              id={`gallery-filter-${c.id}`}
              onClick={() => setActiveCategory(c.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === c.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/15'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Photos Mosaic Bento-Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                className="group relative h-72 rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950/40 hover:border-amber-500/30 transition-all duration-500 shadow-lg"
              >
                
                {/* Photo */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-75"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to high contrast gym thumbnail placeholder
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600`;
                  }}
                />

                {/* Cover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlying tags and labels */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  
                  {/* Category Pill */}
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-neutral-800 text-[9px] font-bold tracking-widest text-amber-400 uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Title and date */}
                  <div className="space-y-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-white font-black text-base">{item.title}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      <span>{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-neutral-900">
            <p className="text-neutral-500 text-sm">No photos added inside this category yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
