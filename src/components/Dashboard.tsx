/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dumbbell, CreditCard, Calendar, Award, User, MapPin, Phone, ShieldAlert, Sparkles, AlertCircle, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { UserProfile, MembershipPlan, PaymentRecord } from '../types';

interface DashboardProps {
  currentUser: UserProfile;
  plansList: MembershipPlan[];
  paymentsList: PaymentRecord[];
  onNavigate: (tabId: string) => void;
}

export default function Dashboard({
  currentUser,
  plansList,
  paymentsList,
  onNavigate
}: DashboardProps) {

  const activePlan = plansList.find((p) => p.id === currentUser.membershipPlanId);
  const userPayments = paymentsList.filter((p) => p.uid === currentUser.uid);

  // Generate QR url using public qrserver API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=d4af37&bgcolor=030303&data=MEMBER-ID:${currentUser.memberId}|CNIC:${currentUser.cnic}`;

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-dashboard-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Dashboard Welcome Hero Banner */}
        <div className="bg-neutral-950 p-8 rounded-3xl border border-neutral-900 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Profile Avatar Frame with glowing gold border */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500/50 relative group shadow-lg">
              <img
                src={currentUser.profileImg}
                alt={`${currentUser.firstName}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=f59e0b&color=000&bold=true`;
                }}
              />
            </div>
            <div className="space-y-1">
              <span className="text-amber-500 text-[10px] font-black tracking-widest uppercase">WELCOME CHAMPION</span>
              <h2 className="text-white text-3xl font-black uppercase text-glow-gold">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-neutral-500 text-xs font-light">
                Member ID: <span className="font-mono text-neutral-300">{currentUser.memberId}</span> &bull; Blue Area Club Islamabad 
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.membershipStatus === 'active' ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" /> Account Active
              </div>
            ) : (
              <div className="flex flex-col items-center sm:items-end gap-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs font-bold uppercase">
                  <AlertCircle className="h-4.5 w-4.5" /> No Active Membership
                </div>
                <button
                  id="dashboard-subscribe-now-btn"
                  onClick={() => onNavigate('memberships')}
                  className="px-4 py-1.5 bg-amber-500 text-black rounded-lg text-xs font-extrabold uppercase tracking-wide shadow-md shadow-amber-500/10"
                >
                  Activate Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. Core Dashboard Content layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Left Columns: Member ID Card and profile fields */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* DIGITAL GHM CLUB MEMBER CARD DESIGN */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-white font-extrabold uppercase text-sm tracking-wider flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-amber-500" /> Digital Membership Badge
                </span>
                <span className="text-[10px] text-neutral-500 leading-relaxed font-mono">Present at GHM Concierge Gates</span>
              </div>

              {/* Physical GHM Club Card Mockups */}
              <div className="relative aspect-[16/10] max-w-lg mx-auto bg-neutral-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl gold-glowing-glow" id="ghm-member-card">
                
                {/* Gold Linear Gradient Background Accent */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/4 w-[250px] h-[150px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* Card borders/corner details */}
                <div className="absolute top-5 left-5 right-5 bottom-5 border border-amber-500/15 rounded-2xl pointer-events-none"></div>

                <div className="absolute inset-8 flex flex-col justify-between">
                  
                  {/* Card Header row */}
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-500 p-1.5 rounded-lg">
                        <Dumbbell className="h-4 w-4 text-black stroke-[2.5]" />
                      </div>
                      <span className="text-white text-xs font-black tracking-widest uppercase">
                        GHM <span className="text-amber-400 font-light text-[10px]">FITNESS CLUB</span>
                      </span>
                    </div>
                    <span className="text-amber-500/80 font-mono text-[9px] font-black tracking-widest uppercase">
                      {activePlan ? activePlan.name : 'GUEST STATUS'}
                    </span>
                  </div>

                  {/* Card Central info row */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4.5">
                      
                      {/* Photo base frame */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-amber-500/30 shrink-0 bg-neutral-900">
                        <img
                          src={currentUser.profileImg}
                          alt={currentUser.firstName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Text fields */}
                      <div className="space-y-1 text-left">
                        <h3 className="text-white font-black text-lg uppercase tracking-wide leading-none">{currentUser.firstName} {currentUser.lastName}</h3>
                        <p className="text-[10px] text-neutral-400">ID: <span className="font-mono text-white text-xs">{currentUser.memberId}</span></p>
                        <p className="text-[10px] text-neutral-400">CNIC: <span className="font-mono text-neutral-300">{currentUser.cnic}</span></p>
                        <p className="text-[10px] text-neutral-400">EXPIRY: <span className="font-mono text-amber-500 text-xs">{currentUser.membershipExpiry ? new Date(currentUser.membershipExpiry).toLocaleDateString() : 'NO ACTIVE PLAN'}</span></p>
                      </div>

                    </div>

                    {/* QR Code generator */}
                    <div className="w-20 h-20 bg-neutral-950 p-2 rounded-xl border border-amber-500/20 shrink-0 flex items-center justify-center">
                      <img src={qrCodeUrl} alt="GHM Secure QR Verification" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>

                  </div>

                  {/* Card Footer row */}
                  <div className="flex items-center justify-between border-t border-neutral-900 pt-2.5 text-[8px] font-mono text-neutral-500">
                    <span>SECTOR F-8, Blue Area, Islamabad</span>
                    <span className="text-amber-500 font-bold uppercase tracking-wider">PAKISTAN ELITE CHAMPIONSHIP</span>
                  </div>

                </div>

              </div>
            </div>

            {/* Profile Fields block details */}
            <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-neutral-900 space-y-6">
              <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block">MEMBER METRIC RECORD SHEET</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Details layout column */}
                <div className="space-y-4 font-light text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <User className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Registered Full Name</p>
                      <p className="text-white font-semibold text-sm">{currentUser.firstName} {currentUser.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Identity Card CNIC</p>
                      <p className="text-white font-mono text-sm">{currentUser.cnic}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Contact Registry</p>
                      <p className="text-white font-mono text-sm">{currentUser.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 font-light text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Home Address</p>
                      <p className="text-white text-sm">{currentUser.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase">Membership Interval</p>
                      <p className="text-white font-semibold text-sm">
                        {currentUser.membershipStart ? new Date(currentUser.membershipStart).toLocaleDateString() : 'N/A'} - {currentUser.membershipExpiry ? new Date(currentUser.membershipExpiry).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Columns: Payment receipts history & timings schedule brief */}
          <div className="space-y-10">
            
            {/* GHM BILLING HISTORIES */}
            <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-neutral-900 space-y-6 flex flex-col justify-between h-max">
              <div>
                <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block mb-4">INVOICE & TRANSACTION LOGS</span>

                {userPayments.length > 0 ? (
                  <div className="space-y-3">
                    {userPayments.map((p) => (
                      <div key={p.id} className="p-3 bg-neutral-950 rounded-xl border border-neutral-900 flex flex-col gap-1.5 font-light text-xs" id={`payment-row-${p.id}`}>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white font-bold">{p.planName}</span>
                          <span className="text-amber-400 font-mono font-bold">${p.amountPaid.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                          <span>{new Date(p.date).toLocaleDateString()}</span>
                          <span className="truncate max-w-[110px]" title={p.transactionId}>{p.transactionId}</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-900/60 mt-0.5">
                          <span className="text-neutral-500">Method: {p.paymentMethod}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold tracking-wider uppercase">
                            Receipt Clear
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-neutral-950/60 rounded-2xl border border-dashed border-neutral-800">
                    <FileText className="h-8 w-8 text-neutral-600 mx-auto mb-2" />
                    <p className="text-neutral-500 text-xs">No payment histories cleared inside this account ledger yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* GHM Workout timings indicator */}
            <div className="bg-[#0a0a0a] rounded-3xl p-6 border border-neutral-900 space-y-4">
              <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block">TIMINGS & ACCESS POLICIES</span>
              <div className="space-y-3.5 text-xs text-neutral-400 leading-relaxed font-light">
                <p>
                  Your gold member ID grants 100% cardless access to high-intensity free weight platforms, card decks and luxury recovery vapor baths during club operation hours.
                </p>
                <div className="border hover:border-amber-500/20 p-3 bg-neutral-950 rounded-xl border-neutral-900 flex justify-between items-center">
                  <div>
                    <h5 className="font-extrabold text-white text-xs">Weekday Access Tiers</h5>
                    <p className="text-[10px] text-neutral-500">Daily: 05:00 AM - 11:00 PM</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">OPEN</span>
                </div>
                <div className="border hover:border-amber-500/20 p-3 bg-neutral-950 rounded-xl border-neutral-900 flex justify-between items-center">
                  <div>
                    <h5 className="font-extrabold text-white text-xs">Sunday Recovery Access</h5>
                    <p className="text-[10px] text-neutral-500">Daily: 08:00 AM - 08:00 PM</p>
                  </div>
                  <span className="text-[10px] text-amber-500 font-bold">RECOVERY</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
