/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, Star, HelpCircle } from 'lucide-react';
import { MembershipPlan, UserProfile } from '../types';

interface MembershipProps {
  plansList: MembershipPlan[];
  currentUser: UserProfile | null;
  onJoinPlan: (plan: MembershipPlan) => void;
  onOpenAuth: (view: 'login' | 'signup') => void;
}

export default function Membership({
  plansList,
  currentUser,
  onJoinPlan,
  onOpenAuth
}: MembershipProps) {

  const handleSubscribe = (plan: MembershipPlan) => {
    if (!currentUser) {
      // Prompt sign up first if guest clicks
      onOpenAuth('signup');
    } else {
      onJoinPlan(plan);
    }
  };

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-memberships-page">
      
      {/* 1. Header Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <span className="text-amber-500 text-xs font-black tracking-widest uppercase mb-3 block">GHM EXCLUSIVE COHORTS</span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          MEMBERSHIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">SELECTIONS</span>
        </h1>
        <p className="text-neutral-500 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Select are curated duration tiers to unleash your potential. Real-time checkout updates user profile state, granting custom member-id badges instantly.
        </p>
      </div>

      {/* 2. Interactive Columns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active subscription banner if user has logged in and has an active plan */}
        {currentUser && currentUser.membershipPlanId && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-3xl text-center max-w-xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] text-amber-500 uppercase tracking-widest font-black block">CURRENT STATUS</span>
              <p className="text-white font-extrabold text-base">You are registered in the <span className="text-amber-400">{plansList.find(p => p.id === currentUser.membershipPlanId)?.name || 'GHM Plan'}</span></p>
              <p className="text-neutral-500 text-xs font-light">Your membership remains valid until {currentUser.membershipExpiry ? new Date(currentUser.membershipExpiry).toLocaleDateString() : 'N/A'}</p>
            </div>
            <button
              id="goto-dashboard-billing"
              onClick={() => handleSubscribe(plansList[0])} // This will trigger checkout modal to update or extend
              className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-amber-400 hover:text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition"
            >
              Extend or Upgrade
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plansList.map((plan) => {
            const isUserCurrentPlan = currentUser?.membershipPlanId === plan.id && currentUser?.membershipStatus === 'active';

            return (
              <div
                key={plan.id}
                id={`membership-plan-${plan.id}`}
                className={`group relative rounded-3xl bg-[#0a0a0a] border flex flex-col justify-between p-8 transition-all duration-300 shadow-xl h-full ${
                  plan.popular
                    ? 'border-amber-500/50 scale-102 gold-glowing-glow'
                    : 'border-neutral-900 hover:border-neutral-800'
                }`}
              >
                
                {/* Popular Pill Label */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 rounded-full text-[9px] font-black tracking-widest uppercase flex items-center gap-1">
                    <Star className="h-3 w-3 fill-black text-black stroke-[2.5]" /> Most Recommended
                  </div>
                )}

                {/* Plan Header */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-neutral-400 font-extrabold text-xs uppercase tracking-widest">{plan.name}</h3>
                    <p className="text-xs text-neutral-500 font-light mt-0.5">{plan.durationMonths} Month{plan.durationMonths > 1 ? 's' : ''} Commitment</p>
                  </div>

                  {/* Pricing Box */}
                  <div className="flex items-baseline gap-1 py-1 border-b border-neutral-900 pb-4">
                    <span className="text-amber-400 font-sans text-xl font-bold">$</span>
                    <span className="text-white text-5xl font-black tracking-tight font-mono">{plan.price}</span>
                    <span className="text-neutral-500 text-xs font-light">/ term</span>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-3 pt-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="text-neutral-400 text-xs font-light leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Action Button */}
                <div className="pt-8">
                  <button
                    id={`subscribe-btn-${plan.id}`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={isUserCurrentPlan}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isUserCurrentPlan
                        ? 'bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-default'
                        : plan.popular
                        ? 'bg-amber-500 text-black hover:bg-amber-400 font-extrabold shadow-lg shadow-amber-500/10'
                        : 'bg-neutral-900 border border-neutral-800 text-white hover:border-amber-500/30'
                    }`}
                  >
                    {isUserCurrentPlan ? 'Active Selection' : currentUser ? 'Instant Upgrade' : 'Begin Journey'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Club Policy Disclaimers */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-neutral-900 flex gap-4">
          <HelpCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-neutral-500 font-light leading-relaxed">
            <h4 className="text-white font-bold font-sans">GHM Verification policy</h4>
            <p>
              On-demand signup creates standard user identities instantly. To unlock GHM biometric keypads or secure custom scheduling times, members undergo a physical check at the club concierge where the generated CNIC and Member ID QR Code is processed. Membership cancellations are calculated pro-rata within the first three calendar dates.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
