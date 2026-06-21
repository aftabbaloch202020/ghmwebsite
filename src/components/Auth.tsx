/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Mail, Lock, User, Shield, CreditCard, MapPin, Phone, Upload, X, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthProps {
  initialView: 'login' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
  registeredUsers: UserProfile[];
  onRegisterUser: (user: UserProfile) => void;
  onClose: () => void;
}

const ATHLETIC_AVATARS = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
];

export default function Auth({
  initialView,
  onAuthSuccess,
  registeredUsers,
  onRegisterUser,
  onClose
}: AuthProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login values
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileImg, setProfileImg] = useState(ATHLETIC_AVATARS[0]);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loginEmail || !loginPassword) {
      setError('Please fill in all email and password fields.');
      return;
    }

    // Authenticate user
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );

    if (!foundUser) {
      setError('Member email address not found inside GHM register.');
      return;
    }

    // In local demo authentication, check passwords
    const mockPasswordCheck = loginPassword.trim();
    if (mockPasswordCheck.length < 5) {
      setError('Password entered is too short (Minimum 5 characters).');
      return;
    }

    // Success login!
    setSuccess(`Welcome back, ${foundUser.firstName}! Redirecting....`);
    setTimeout(() => {
      onAuthSuccess(foundUser);
    }, 1000);
  };

  // Convert uploaded image file to base64
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file formats (JPEG / PNG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setProfileImg(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag over target
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Drop event
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  // Input click change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  // Handle Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate entries
    if (!firstName || !lastName || !cnic || !address || !email || !phone || !password) {
      setError('All GHM registration fields must be meticulously filled.');
      return;
    }

    // Check CNIC Format (standard e.g. 13-digit Pakistani CNIC 12345-1234567-1 or 13 digits)
    const cleanCnic = cnic.replace(/[^0-9-]/g, '');
    if (cleanCnic.length < 13) {
      setError('Identity CNIC number must be Pakistani standard formats (13 digits or 5-7-1 structure).');
      return;
    }

    // Check if email already registered
    const emailExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );
    if (emailExists) {
      setError('This email address has already been claimed by another GHM premium member.');
      return;
    }

    // Create unique member ID code GHM-2026-XXXX
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const memberIdCode = `GHM-2026-${randomCode}`;
    const uniqueUid = `user_uid_${Math.random().toString(36).substr(2, 9)}`;

    const newProfile: UserProfile = {
      uid: uniqueUid,
      email: email.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      cnic: cleanCnic,
      address: address.trim(),
      phone: phone.trim(),
      profileImg: profileImg,
      membershipPlanId: null, // Select membership layer on dashboard or packages
      membershipStatus: 'inactive',
      paymentStatus: 'unpaid',
      membershipStart: null,
      membershipExpiry: null,
      memberId: memberIdCode
    };

    onRegisterUser(newProfile);
    setSuccess('Registration successful! Launching your custom dashboard...!');
    setTimeout(() => {
      onAuthSuccess(newProfile);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" id="ghm-auth-backdrop">
      
      {/* Container Box */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="auth-close-btn"
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900/40 rounded-full transition z-10"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* 1. Left branding promotional panel */}
        <div className="w-full md:w-5/12 bg-neutral-950 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-900 md:min-h-[550px]">
          <div className="space-y-4">
            <span className="text-amber-500 text-[10px] font-black tracking-widest uppercase">GHM EXECUTIVE PASS</span>
            <h2 className="text-white text-2xl font-black uppercase leading-tight">
              YOUR EVOLUTION <br />
              BEGINS NOW
            </h2>
            <p className="text-neutral-500 text-xs font-light leading-relaxed">
              Unlock Pakistan's most advanced weightlifter suites, premium dry thermal saunas, and 1-on-1 sports physiology tutors. Registering secures your executive account instantly.
            </p>
          </div>

          <div className="space-y-4 pt-10">
            <div className="flex items-center gap-2.5 text-xs text-neutral-400 font-bold uppercase">
              <Sparkles className="h-4 w-4 text-amber-500" /> Exclusive Privileges
            </div>
            <p className="text-neutral-500 text-[11px] font-light leading-relaxed">
              &bull; Personal digital member QR ID <br />
              &bull; Live timings reservation logs <br />
              &bull; Fully custom payment histories <br />
              &bull; Access to pro trainer rosters
            </p>
            
            {/* Demo Creds Reminder */}
            <div className="bg-amber-500/5 p-2 px-3 border border-amber-500/20 rounded-xl text-[10px] text-amber-500/90 leading-relaxed font-mono">
              <span className="font-bold flex items-center gap-1">
                <ShieldAlert className="h-3 w-3 inline shrink-0" /> DEMO ADMINISTRATIVE LOGIN:
              </span>
              Email: <span className="text-white">admin@ghm.com</span><br />
              Pass: <span className="text-white">admin123</span>
            </div>
          </div>
        </div>

        {/* 2. Right form panel */}
        <div className="w-full md:w-7/12 p-8 overflow-y-auto max-h-[75vh] md:max-h-[600px] no-scrollbar">
          
          {/* Tabs */}
          <div className="flex bg-neutral-900 p-1 rounded-xl gap-1 mb-6">
            <button
              id="auth-tab-login"
              onClick={() => { setView('login'); setError(null); }}
              className={`flex-1 py-2 text-center text-xs font-bold tracking-wider uppercase rounded-lg transition ${
                view === 'login' ? 'bg-[#030303] text-amber-400 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Client Login
            </button>
            <button
              id="auth-tab-signup"
              onClick={() => { setView('signup'); setError(null); }}
              className={`flex-1 py-2 text-center text-xs font-bold tracking-wider uppercase rounded-lg transition ${
                view === 'signup' ? 'bg-[#030303] text-amber-400 shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Join GHM Club
            </button>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 flex items-start gap-2.5" id="auth-error">
              <AlertCircle className="h-4.5 w-4.5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400" id="auth-success">
              {success}
            </div>
          )}

          {/* Login Form */}
          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-form">
              <div className="space-y-1.5">
                <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-neutral-500" />
                  <input
                    type="email"
                    id="login-email-input"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. member@ghm.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-amber-500/60 rounded-xl text-sm text-neutral-200 placeholder-neutral-600 outline-none transition font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400 text-xs font-bold uppercase tracking-wider block">Security Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-neutral-500" />
                  <input
                    type="password"
                    id="login-password-input"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-amber-500/60 rounded-xl text-sm text-neutral-200 placeholder-neutral-600 outline-none transition font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="login-submit-btn"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/10 active:scale-98 transition duration-150"
              >
                Authenticate & Enter
              </button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleRegisterSubmit} className="space-y-4" id="signup-form">
              
              {/* Names row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase block">First Name</label>
                  <input
                    type="text"
                    id="signup-first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Raza"
                    required
                    className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 outline-none transition font-medium animate-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase block">Last Name</label>
                  <input
                    type="text"
                    id="signup-last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Khan"
                    required
                    className="w-full px-4.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 outline-none transition font-medium animate-none"
                  />
                </div>
              </div>

              {/* CNIC and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase block flex items-center justify-between">
                    <span>CNIC / Identity Card</span>
                    <span className="text-[9px] text-neutral-500 font-light lowercase">13 digits</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="text"
                      id="signup-cnic"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      placeholder="e.g. 37405-1234567-1"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 placeholder-neutral-600 outline-none transition font-medium animate-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="tel"
                      id="signup-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +92 300 5550925"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 placeholder-neutral-600 outline-none transition font-medium animate-none"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-neutral-400 text-xs font-bold uppercase block">Residential Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 animate-none" />
                  <input
                    type="text"
                    id="signup-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Sector F-8/4, Blue Area, Islamabad"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 placeholder-neutral-600 outline-none transition font-medium"
                  />
                </div>
              </div>

              {/* Email and Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="email"
                      id="signup-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="raza@example.com"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 placeholder-neutral-600 outline-none transition font-medium animate-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-400 text-xs font-bold uppercase block">Security Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="password"
                      id="signup-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs text-neutral-200 placeholder-neutral-600 outline-none transition font-medium animate-none"
                    />
                  </div>
                </div>
              </div>

              {/* Profile image selection and manual upload (Drag/Drop + Dialog trigger) */}
              <div className="space-y-2 pt-2">
                <label className="text-neutral-400 text-xs font-bold uppercase block">Profile Image Identification</label>
                
                {/* Athletic Avatar preset quick select */}
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-[10px] text-neutral-500 font-medium whitespace-nowrap">Presets:</span>
                  <div className="flex gap-2">
                    {ATHLETIC_AVATARS.map((avatar, idx) => (
                      <button
                        key={idx}
                        id={`preset-avatar-${idx}`}
                        type="button"
                        onClick={() => setProfileImg(avatar)}
                        className={`w-10 h-10 rounded-full overflow-hidden border transition ${
                          profileImg === avatar ? 'border-amber-500 scale-105 shadow-md shadow-amber-500/10' : 'border-neutral-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={avatar} alt="Quick avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Drag and Drop File Selector Area */}
                <div
                  id="auth-drag-drop-zone"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                    dragActive
                      ? 'border-amber-500 bg-amber-500/5'
                      : 'border-neutral-800 bg-neutral-950/40 hover:bg-neutral-900/40 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="bg-amber-500/10 p-2.5 rounded-full text-amber-500 shrink-0 border border-amber-500/15">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-300 font-semibold">
                      Drag & drop your face photo, or <span className="text-amber-500">browse local files</span>
                    </p>
                    <p className="text-[9px] text-neutral-500 mt-0.5">JPEG or PNG files. Squared shape recommended.</p>
                  </div>
                  
                  {/* Active profile review mini */}
                  <div className="flex items-center gap-3 border border-neutral-800 bg-neutral-900 p-1.5 px-3 rounded-full mt-1.5">
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-amber-500/30">
                      <img src={profileImg} alt="Uploaded" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[9px] text-neutral-400 font-mono font-medium max-w-[120px] truncate">Current identity selected</span>
                  </div>
                </div>
              </div>

              {/* Submit signup button */}
              <button
                type="submit"
                id="signup-submit-btn"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/10 active:scale-98 transition duration-150 mt-4 h-12"
              >
                Enroll Membership Pass
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
