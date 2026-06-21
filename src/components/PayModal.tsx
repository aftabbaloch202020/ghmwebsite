/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, ShieldCheck, X, Sparkles, Loader, Calendar, Info } from 'lucide-react';
import { MembershipPlan, UserProfile } from '../types';

interface PayModalProps {
  plan: MembershipPlan;
  currentUser: UserProfile;
  onPaymentSuccess: (plan: MembershipPlan, transactionId: string, paymentMethod: string) => void;
  onClose: () => void;
}

export default function PayModal({
  plan,
  currentUser,
  onPaymentSuccess,
  onClose
}: PayModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(`${currentUser.firstName} ${currentUser.lastName}`.toUpperCase());
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  const discountCode = '';
  const taxAmount = parseFloat((plan.price * 0.05).toFixed(2)); // 5% Club tax
  const totalAmount = parseFloat((plan.price + taxAmount).toFixed(2));

  // Auto spacing for credit card inputs
  const handleCardNumberChange = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(v);
    }
  };

  const handleExpiryChange = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      setExpiry(`${v.substring(0, 2)}/${v.substring(2, 4)}`);
    } else {
      setExpiry(v);
    }
  };

  // Submit payment
  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate inputs
    if (cardNumber.replace(/\s/g, '').length < 16) {
      setFormError('Card number must contain exactly 16 numeric digits.');
      return;
    }
    if (expiry.length < 5) {
      setFormError('Expiry date must fit MM/YY format guidelines.');
      return;
    }
    if (cvv.length < 3) {
      setFormError('CVV security code must contain at least 3 digits.');
      return;
    }

    setLoading(true);

    // Simulate luxury merchant gateway latency
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      const randomTx = `tx_ghm_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Complete checkout process
      setTimeout(() => {
        onPaymentSuccess(plan, randomTx, 'Visa Credit Card');
      }, 1500);

    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="payment-modal-backdrop">
      
      <div className="relative w-full max-w-xl bg-[#0a0a0a] rounded-3xl border border-neutral-805 border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] md:max-h-none overflow-y-auto no-scrollbar">
        
        {/* Close */}
        <button
          onClick={onClose}
          id="pay-close-btn"
          disabled={loading || success}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900/40 rounded-full transition z-10"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Content Body */}
        <div className="p-8">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <span className="text-amber-500 text-[10px] font-black tracking-widest uppercase">GHM DIGITAL PORTAL</span>
            <h2 className="text-white text-2xl font-black uppercase">SECURE DIGITAL CHECKOUT</h2>
            <p className="text-neutral-500 text-xs font-light">Complete the transfer to instantly activate your GHM membership pass.</p>
          </div>

          {success ? (
            // Payment processed animation
            <div className="py-12 text-center space-y-5" id="payment-success-render">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                <ShieldCheck className="h-8 w-8 text-emerald-400 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-extrabold text-xl uppercase">PAYMENT TRANSFERRED SUCCESSFULLY</h4>
                <p className="text-neutral-500 text-xs leading-relaxed max-w-sm mx-auto font-light">
                  Transaction approved. Your GHM Membership is actively running. Re-compiling your Digital ID badge ...
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-amber-500 text-xs font-semibold animate-pulse">
                <Loader className="animate-spin h-4 w-4" /> Generating GHM QR Code Card...
              </div>
            </div>
          ) : (
            // Billing Form details
            <form onSubmit={handlePaySubmit} className="space-y-6" id="payment-billing-form">
              
              {/* Receipt Breakdowns */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 space-y-3.5">
                <span className="text-[10px] text-amber-500 font-extrabold tracking-widest uppercase block">INVOICE BREAKDOWN</span>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Selected Cohort Tiers</span>
                  <span className="text-white font-bold">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Agreement Term Length</span>
                  <span className="text-white font-mono">{plan.durationMonths} Month{plan.durationMonths > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Base Membership Pricing</span>
                  <span className="text-white font-mono font-bold">${plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400 font-medium">Luxury Club Tax (5%)</span>
                  <span className="text-white font-mono font-semibold">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-neutral-900 text-sm font-black">
                  <span className="text-amber-500 uppercase">Grand Total Cost</span>
                  <span className="text-white text-lg font-mono">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure Card Form Inputs */}
              <div className="space-y-4">
                <span className="text-[10px] text-neutral-400 font-extrabold tracking-widest uppercase block mb-1">CREDIT/DEBIT ATTACHMENTS</span>

                {formError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 flex items-start gap-2.5">
                    <Info className="h-4.5 w-4.5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Cardholder Name */}
                <div className="space-y-1">
                  <label className="text-neutral-500 text-[10px] font-bold uppercase tracking-wide block">Cardholder Full Name</label>
                  <input
                    type="text"
                    id="billing-cardholder-name"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    placeholder="RAZA KHAN"
                    required
                    disabled={loading}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-100 placeholder-neutral-600 outline-none transition font-medium"
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-1">
                  <label className="text-neutral-500 text-[10px] font-bold uppercase tracking-wide block">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 animate-none" />
                    <input
                      type="text"
                      id="billing-card-number"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      required
                      disabled={loading}
                      className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-100 placeholder-neutral-600 font-mono outline-none transition font-medium animate-none"
                    />
                  </div>
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px] font-bold uppercase tracking-wide block">Expiry Date</label>
                    <input
                      type="text"
                      id="billing-expiry"
                      value={expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-100 placeholder-neutral-600 font-mono outline-none transition font-medium animate-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px] font-bold uppercase tracking-wide block">CVV Code</label>
                    <input
                      type="password"
                      id="billing-cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="•••"
                      maxLength={4}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-100 placeholder-neutral-600 font-mono outline-none transition font-medium animate-none"
                    />
                  </div>
                </div>
              </div>

              {/* Execute Checkout Button */}
              <button
                type="submit"
                id="billing-submit-pay-btn"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 transition active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 text-black" />
                    <span>Processing Luxury Gateway Transfer ...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5 text-black" />
                    <span>Authorize & Pay ${totalAmount.toFixed(2)}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-neutral-600 text-center font-light leading-relaxed">
                By clicking pay, you authorize GHM Fitness Club merchant channels to securely clear the fees structured above. Access keys deploy instantly.
              </p>

            </form>
          )}

        </div>
      </div>

    </div>
  );
}
