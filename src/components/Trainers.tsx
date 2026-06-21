/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Instagram, Facebook, Twitter, Star, Search, Filter } from 'lucide-react';
import { Trainer } from '../types';

interface TrainersProps {
  trainersList: Trainer[];
}

export default function Trainers({ trainersList }: TrainersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Dynamically extract all unique specializations for filter dropdown options
  const specialties = ['all', ...Array.from(new Set(trainersList.map(t => t.specialization)))];

  const filteredTrainers = trainersList.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || t.specialization === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-trainers-page">
      
      {/* 1. Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block">GHM ADVISORY DECK</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          ELITE MASTER <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">COACHES</span>
        </h1>
        <p className="text-neutral-500 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Learn from fully certified biomechanics tutors, world champion weightlifters, and sports physiology specialists dedicated to your development.
        </p>
      </div>

      {/* 2. Live Search & Specialty Filtering */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-neutral-950/60 p-5 rounded-2xl border border-neutral-900 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search bar input with icon */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              id="trainer-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by coach name or bio keyword..."
              className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-sm text-neutral-100 placeholder-neutral-500 outline-none transition"
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <Filter className="h-4 w-4 text-amber-500" />
            <select
              id="trainer-specialty-select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full sm:w-64 px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-sm text-neutral-300 outline-none transition"
            >
              <option value="all">All Gym Specialties</option>
              {specialties.filter(s => s !== 'all').map((specialty, idx) => (
                <option key={idx} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* 3. Trainers Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTrainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                id={`trainer-card-${trainer.id}`}
                className="group flex flex-col bg-[#0a0a0a] border border-neutral-900 rounded-3xl overflow-hidden hover:border-amber-500/30 transition duration-300 shadow-xl h-full"
              >
                
                {/* Trainer Photo */}
                <div className="h-80 overflow-hidden relative bg-neutral-950">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${trainer.name}&background=111&color=f59e0b&bold=true&size=512`;
                    }}
                  />
                  {/* Performance stars */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-800 text-amber-400 text-xs font-bold flex items-center gap-1">
                    <Star className="h-3 w-3 stroke-[2.5] fill-amber-400" />
                    {trainer.rating.toFixed(1)}
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 bg-amber-500 text-black px-3 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase">
                    {trainer.experienceYears}+ Years Pro
                  </div>
                </div>

                {/* Trainer details body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  
                  <div className="space-y-2 mb-6">
                    <h3 className="text-white font-extrabold text-lg group-hover:text-amber-400 transition">{trainer.name}</h3>
                    <p className="text-amber-400 text-xs font-semibold tracking-wide uppercase uppercase">
                      {trainer.specialization}
                    </p>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light line-clamp-3 pt-1">
                      {trainer.bio}
                    </p>
                  </div>

                  {/* Social media connections */}
                  <div className="flex items-center gap-2.5 border-t border-neutral-900 pt-4 shrink-0">
                    {trainer.socials.instagram && (
                      <a
                        href={`https://instagram.com/${trainer.socials.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 px-2 border border-neutral-800 rounded-lg text-neutral-400 hover:text-amber-400 hover:border-amber-400/20 text-xs flex items-center gap-1 transition"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        <span className="text-[10px] lowercase font-mono">{trainer.socials.instagram}</span>
                      </a>
                    )}
                    {!trainer.socials.instagram && (
                      <span className="text-[10px] text-neutral-600 font-light">GHM On-duty Coach Access Only</span>
                    )}
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-neutral-900">
            <p className="text-neutral-500 text-sm">No certified coaches fit your specific search parameters.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedSpecialty('all'); }}
              className="text-amber-500 text-xs font-bold mt-2 hover:underline tracking-widest uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
