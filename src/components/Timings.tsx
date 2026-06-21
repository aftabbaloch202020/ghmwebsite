/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Clock, User, Flame, Calendar, MapPin, BadgeHelp } from 'lucide-react';
import { SCHEDULE } from '../data';

export default function Timings() {
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'>('Monday');

  const daysList: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const activeDaySchedule = SCHEDULE.find(s => s.day === selectedDay);

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-schedules-page">
      
      {/* 1. Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block">GHM ADVISORY GRID</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          WORKOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">SCHEDULES</span>
        </h1>
        <p className="text-neutral-500 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Navigate GHM's weekly pro training slots, cardio hours, and strength regimes guided by on-duty certified coaches.
        </p>
      </div>

      {/* 2. Responsive Day selection selectors slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-neutral-950/85 p-2 rounded-2xl border border-neutral-900 flex flex-wrap gap-1.5 justify-center">
          {daysList.map((day) => (
            <button
              key={day}
              id={`schedule-day-tab-${day}`}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                selectedDay === day
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/15'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
              }`}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Schedules Listing Layout Class schedules */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {activeDaySchedule && activeDaySchedule.classes.length > 0 ? (
          <div className="space-y-6" id="schedule-class-list">
            {activeDaySchedule.classes.map((cls, idx) => (
              <div
                key={idx}
                className="group bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-300 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                
                {/* Time & Title info columns */}
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/10 p-3 h-12 w-12 rounded-xl flex items-center justify-center border border-amber-500/25 text-amber-500 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 font-mono tracking-wider font-bold block">{cls.time}</span>
                    <h3 className="text-white font-extrabold text-base uppercase group-hover:text-amber-400 transition">{cls.className}</h3>
                    
                    {/* Coach on duty details */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                      <User className="h-3.5 w-3.5 text-amber-500" />
                      <span>{cls.trainerName}</span>
                    </div>

                  </div>
                </div>

                {/* Intensity levels ratings */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-between border-t border-neutral-900/80 pt-4 md:border-none md:pt-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block">Intensity Tiers:</span>
                    <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                      cls.intensity === 'High'
                        ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                        : cls.intensity === 'Medium'
                        ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    }`}>
                      {cls.intensity}
                    </span>
                  </div>

                  <span className="text-[10px] text-neutral-500 italic">No bookings needed</span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0a0a0a] rounded-3xl border border-neutral-900 text-neutral-500 text-sm">
            No scheduled classes for this specific day on file.
          </div>
        )}

        {/* 4. Scheduling policies note card */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-950 border border-neutral-900 flex gap-4 text-xs font-light text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          <BadgeHelp className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-white font-bold">Important Workout Area Guidelines</h5>
            <p>
              Class rosters have standardized capacity limits to ensure athlete safety. Doors secure exactly at class starting triggers. Members are encouraged to land inside the workout rigs 10 minutes prior for personalized biometric initialization.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
