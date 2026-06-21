/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, CreditCard, Award, Image as ImageIcon, Sliders, DollarSign, Plus, Trash2, Edit2, ShieldAlert, CheckCircle, X, ShieldCheck, Activity } from 'lucide-react';
import { UserProfile, Trainer, GalleryItem, MembershipPlan, PaymentRecord, PlanId } from '../types';

interface AdminPanelProps {
  usersList: UserProfile[];
  trainersList: Trainer[];
  galleryList: GalleryItem[];
  plansList: MembershipPlan[];
  paymentsList: PaymentRecord[];
  
  // State setters to notify the parent state store!
  onUpdateUsers: (newUsers: UserProfile[]) => void;
  onUpdateTrainers: (newTrainers: Trainer[]) => void;
  onUpdateGallery: (newGallery: GalleryItem[]) => void;
  onUpdatePlans: (newPlans: MembershipPlan[]) => void;
}

export default function AdminPanel({
  usersList,
  trainersList,
  galleryList,
  plansList,
  paymentsList,
  
  onUpdateUsers,
  onUpdateTrainers,
  onUpdateGallery,
  onUpdatePlans
}: AdminPanelProps) {

  // Nested active navigation state for sub-controls inside Admin Console
  const [adminTab, setAdminTab] = useState<'members' | 'revenue' | 'trainers' | 'gallery' | 'plans'>('members');

  // Input bindings to add new Trainer
  const [newTrainerName, setNewTrainerName] = useState('');
  const [newTrainerSpec, setNewTrainerSpec] = useState('');
  const [newTrainerExp, setNewTrainerExp] = useState(5);
  const [newTrainerImg, setNewTrainerImg] = useState('');
  const [newTrainerBio, setNewTrainerBio] = useState('');
  const [newTrainerInsta, setNewTrainerInsta] = useState('');
  
  // Input bindings to add new Photo Gallery item
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCat, setNewPhotoCat] = useState<'workout' | 'facilities' | 'team' | 'events'>('facilities');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Editing pricing variables
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);

  // Status/feedbacks
  const [adminActionStatus, setAdminActionStatus] = useState<string | null>(null);

  // Aggregated metric calculations
  const totalRegisteredUsers = usersList.length;
  const activeMembersRatio = usersList.filter(u => u.membershipStatus === 'active').length;
  const totalGrossRevenue = paymentsList.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const totalCoachesCount = trainersList.length;

  // Toggle user active status
  const handleToggleUserStatus = (uid: string) => {
    const updated = usersList.map(u => {
      if (u.uid === uid) {
        const nextStatus = u.membershipStatus === 'active' ? 'inactive' : 'active';
        return {
          ...u,
          membershipStatus: nextStatus as 'active' | 'inactive',
          paymentStatus: (nextStatus === 'active' ? 'paid' : 'unpaid') as 'paid' | 'unpaid'
        };
      }
      return u;
    });
    onUpdateUsers(updated);
    setAdminActionStatus('User membership authorization status updated!');
    setTimeout(() => setAdminActionStatus(null), 1500);
  };

  // Add Trainer
  const handleAddTrainerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainerName || !newTrainerSpec || !newTrainerImg || !newTrainerBio) {
      alert('Please fill out all trainer template details!');
      return;
    }

    const tId = `t_${Math.random().toString(36).substr(2, 9)}`;
    const newTrainer: Trainer = {
      id: tId,
      name: newTrainerName.trim(),
      specialization: newTrainerSpec.trim(),
      experienceYears: Number(newTrainerExp),
      rating: 5.0, // Default rating
      image: newTrainerImg.trim() || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200',
      bio: newTrainerBio.trim(),
      socials: {
        instagram: newTrainerInsta ? `@${newTrainerInsta.replace(/[^a-zA-Z0-9_]/g, '')}` : undefined
      }
    };

    onUpdateTrainers([newTrainer, ...trainersList]);
    
    // Reset fields
    setNewTrainerName('');
    setNewTrainerSpec('');
    setNewTrainerExp(5);
    setNewTrainerImg('');
    setNewTrainerBio('');
    setNewTrainerInsta('');

    setAdminActionStatus('New elite coach added directly to standard GHM team!');
    setTimeout(() => setAdminActionStatus(null), 2000);
  };

  // Remove Trainer
  const handleRemoveTrainer = (id: string) => {
    const updated = trainersList.filter(t => t.id !== id);
    onUpdateTrainers(updated);
    setAdminActionStatus('Elite coach deleted from roster.');
    setTimeout(() => setAdminActionStatus(null), 1500);
  };

  // Add Photo representation
  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle || !newPhotoUrl) {
      alert('Photo details missing!');
      return;
    }

    const gId = `g_${Math.random().toString(36).substr(2, 9)}`;
    const newPhoto: GalleryItem = {
      id: gId,
      title: newPhotoTitle.trim(),
      category: newPhotoCat,
      imageUrl: newPhotoUrl.trim() || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600',
      date: new Date().toISOString().split('T')[0]
    };

    onUpdateGallery([newPhoto, ...galleryList]);
    
    // Reset
    setNewPhotoTitle('');
    setNewPhotoUrl('');

    setAdminActionStatus('Photo saved successfully inside gallery mosaic!');
    setTimeout(() => setAdminActionStatus(null), 2000);
  };

  // Delete Photo representation
  const handleRemovePhoto = (id: string) => {
    const updated = galleryList.filter(g => g.id !== id);
    onUpdateGallery(updated);
    setAdminActionStatus('Photo deleted from gallery.');
    setTimeout(() => setAdminActionStatus(null), 1500);
  };

  // Update Plan Pricing
  const handleSavePlanPrice = (planId: string) => {
    const updated = plansList.map(p => {
      if (p.id === planId) {
        return { ...p, price: editingPrice };
      }
      return p;
    });
    onUpdatePlans(updated);
    setEditingPlanId(null);
    setAdminActionStatus('Plan pricing changed. Members checkout rate applied instantly.');
    setTimeout(() => setAdminActionStatus(null), 1500);
  };

  return (
    <div className="w-full bg-[#030303] pt-24 pb-20" id="ghm-admin-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Dashboard Admin Headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-neutral-900 pb-8">
          <div className="space-y-3">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase block">&bull; EXECUTIVE ACCESS BLOCK &bull;</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              GHM CONTROL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">CONSOLE</span>
            </h1>
            <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-lg">
              Authorized admin dashboard. View overall metrics ledger, audit user statuses, inject elite coaches and high-res photos instantly.
            </p>
          </div>

          {/* Core admin sub-tab select slider */}
          <div className="flex bg-neutral-950 p-1 rounded-xl gap-1 border border-neutral-800">
            {([
              { id: 'members', label: 'Members', icon: Users },
              { id: 'revenue', label: 'Revenues', icon: DollarSign },
              { id: 'trainers', label: 'Trainers', icon: Award },
              { id: 'gallery', label: 'Photos', icon: ImageIcon },
              { id: 'plans', label: 'Rates', icon: Sliders }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                id={`admin-btn-${tab.id}`}
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                  adminTab === tab.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/10'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Top Overview metrics metrics box */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">Registered members</span>
              <p className="text-white text-2xl sm:text-3xl font-black tracking-tight font-mono">{totalRegisteredUsers}</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
              <Users className="h-5 w-5 animate-none" />
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">Active VIP cards</span>
              <p className="text-white text-2xl sm:text-3xl font-black tracking-tight font-mono">{activeMembersRatio}</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
              <ShieldCheck className="h-5 w-5 animate-none" />
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">Cleared Receipts</span>
              <p className="text-white text-2xl sm:text-3xl font-black tracking-tight font-mono">${totalGrossRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
              <DollarSign className="h-5 w-5 animate-none" />
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">Elite Coach count</span>
              <p className="text-white text-2xl sm:text-3xl font-black tracking-tight font-mono">{totalCoachesCount}</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-500 shrink-0">
              <Activity className="h-5 w-5 animate-none" />
            </div>
          </div>

        </div>

        {/* Global feedbacks notifications banner */}
        {adminActionStatus && (
          <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-400 font-semibold flex items-center gap-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-amber-400" />
            <span>{adminActionStatus}</span>
          </div>
        )}

        {/* 3. Sub-page sections according to selected sub-tab */}
        
        {/* SUB-PAGE 1: MEMBERS */}
        {adminTab === 'members' && (
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl overflow-hidden shadow-xl" id="admin-members-list-container">
            <div className="p-6 border-b border-neutral-900 bg-neutral-950/40 flex justify-between items-center">
              <span className="text-white font-extrabold text-sm uppercase tracking-wider">Members Directory Record List</span>
              <span className="text-[10px] text-neutral-500 font-mono">Real-time update actions</span>
            </div>

            <div className="overflow-x-auto min-w-full">
              <table className="min-w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Member ID / Profile Photo</th>
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Pakistani CNIC</th>
                    <th className="px-6 py-4">Email / Phone contact</th>
                    <th className="px-6 py-4">Vesting Status</th>
                    <th className="px-6 py-4 text-center">Authorization Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300 font-light">
                  {usersList.map((user) => (
                    <tr key={user.uid} className="hover:bg-neutral-900/25 transition">
                      
                      {/* Member photo and ID code */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-neutral-800 overflow-hidden border border-neutral-800">
                          <img src={user.profileImg} alt={user.firstName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-mono text-white text-xs font-semibold">{user.memberId}</span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 font-semibold text-white">
                        {user.firstName} {user.lastName} {user.isAdmin && <span className="ms-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[8px] tracking-wider uppercase">ADMIN</span>}
                      </td>

                      {/* CNIC */}
                      <td className="px-6 py-4 font-mono">
                        {user.cnic}
                      </td>

                      {/* Email / Contact */}
                      <td className="px-6 py-4 space-y-0.5 font-mono">
                        <p>{user.email}</p>
                        <p className="text-[10px] text-neutral-500">{user.phone}</p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {user.membershipStatus === 'active' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold tracking-wider uppercase text-[9px]">
                            ACTIVE GOLDEN
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 font-bold tracking-wider uppercase text-[9px]">
                            INACTIVE / GUEST
                          </span>
                        )}
                      </td>

                      {/* Handle action button */}
                      <td className="px-6 py-4 text-center">
                        {!user.isAdmin ? (
                          <button
                            id={`toggle-status-btn-${user.uid}`}
                            onClick={() => handleToggleUserStatus(user.uid)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wider font-bold uppercase transition ${
                              user.membershipStatus === 'active'
                                ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                          >
                            {user.membershipStatus === 'active' ? 'Revoke Entry' : 'Authorize Entry'}
                          </button>
                        ) : (
                          <span className="text-neutral-600 italic">System Owner</span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-PAGE 2: REVENUE INVOICES */}
        {adminTab === 'revenue' && (
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl overflow-hidden shadow-xl" id="admin-payments-container">
            <div className="p-6 border-b border-neutral-900 bg-neutral-950/40 flex justify-between items-center">
              <span className="text-white font-extrabold text-sm uppercase tracking-wider">Cleared Receipts Log Ledger</span>
              <span className="text-[10px] text-neutral-500 font-mono">Verified bank merchant logs</span>
            </div>

            {paymentsList.length > 0 ? (
              <div className="overflow-x-auto min-w-full">
                <table className="min-w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-950 border-b border-neutral-900 text-neutral-400 font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Invoice ID / Date</th>
                      <th className="px-6 py-4">Payee ID Code</th>
                      <th className="px-6 py-4">Payee Name</th>
                      <th className="px-6 py-4">Subscribed Plan</th>
                      <th className="px-6 py-4">Gateway Source</th>
                      <th className="px-6 py-4 text-right">Amount Cleared</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-neutral-300 font-light">
                    {paymentsList.map((pay) => (
                      <tr key={pay.id} className="hover:bg-neutral-900/25 transition">
                        
                        {/* Receipt date / Tx */}
                        <td className="px-6 py-4 space-y-0.5">
                          <p className="font-mono text-white font-bold">{pay.transactionId}</p>
                          <p className="text-[10px] text-neutral-500 font-mono">{new Date(pay.date).toLocaleString()}</p>
                        </td>

                        {/* Payee ID */}
                        <td className="px-6 py-4 font-mono">
                          {pay.memberId}
                        </td>

                        {/* Payee Name */}
                        <td className="px-6 py-4 font-semibold text-white">
                          {pay.memberName}
                        </td>

                        {/* Cohort plan */}
                        <td className="px-6 py-4">
                          {pay.planName}
                        </td>

                        {/* Method */}
                        <td className="px-6 py-4">
                          {pay.paymentMethod}
                        </td>

                        {/* Net Value */}
                        <td className="px-6 py-4 text-right font-mono text-amber-400 font-bold text-sm">
                          ${pay.amountPaid.toFixed(2)}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-16 text-center space-y-2 text-neutral-500">
                <CreditCard className="h-8 w-8 text-neutral-600 mx-auto" />
                <p>No billing transits initialized on this system yet.</p>
              </div>
            )}
          </div>
        )}

        {/* SUB-PAGE 3: TRAINERS INJECTIONS */}
        {adminTab === 'trainers' && (
          <div className="space-y-10" id="admin-trainers-crud">
            
            {/* Form to append new elite trainer */}
            <form onSubmit={handleAddTrainerSubmit} className="bg-[#0a0a0a] p-8 rounded-3xl border border-neutral-900 space-y-6">
              <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block">&bull; APPOINT NEW ELITE COACH &bull;</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Full name input */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Coach Name</label>
                  <input
                    type="text"
                    id="new-trainer-name"
                    value={newTrainerName}
                    onChange={(e) => setNewTrainerName(e.target.value)}
                    placeholder="e.g. Aslam Butt"
                    required
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-medium"
                  />
                </div>

                {/* Trainer specialty selection */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Specialization Specialty</label>
                  <input
                    type="text"
                    id="new-trainer-spec"
                    value={newTrainerSpec}
                    onChange={(e) => setNewTrainerSpec(e.target.value)}
                    placeholder="e.g. Competitive Powerlifting"
                    required
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-medium"
                  />
                </div>

                {/* Experience years */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Years of Active Experience</label>
                  <input
                    type="number"
                    id="new-trainer-exp"
                    value={newTrainerExp}
                    onChange={(e) => setNewTrainerExp(Math.max(1, Number(e.target.value)))}
                    required
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-medium"
                  />
                </div>

              </div>

              {/* Photos source, instagram link, bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Trainer Shot Photo URL</label>
                  <input
                    type="url"
                    id="new-trainer-img"
                    value={newTrainerImg}
                    onChange={(e) => setNewTrainerImg(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-medium font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Instagram Handle username</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-bold text-xs">@</span>
                    <input
                      type="text"
                      id="new-trainer-insta"
                      value={newTrainerInsta}
                      onChange={(e) => setNewTrainerInsta(e.target.value)}
                      placeholder="aslambutt_fit"
                      className="w-full pl-8 pr-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Bio block */}
              <div className="space-y-1.5">
                <label className="text-neutral-400 text-xs font-bold block">Trainer Narrative / Biography Bio</label>
                <textarea
                  id="new-trainer-bio"
                  value={newTrainerBio}
                  onChange={(e) => setNewTrainerBio(e.target.value)}
                  placeholder="Aslam is a certified physiological coach focusing on physical longevity and muscle adaptations..."
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-light"
                />
              </div>

              <button
                type="submit"
                id="add-trainer-btn-submit"
                className="px-6 py-3 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-400 active:scale-95 transition flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" /> Enroll Elite Coach
              </button>

            </form>

            {/* List and delete of existing coaches */}
            <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-6 space-y-6">
              <span className="text-[10px] text-neutral-400 font-extrabold tracking-widest uppercase block">&bull; ACTIVE ELITE RANGES ({trainersList.length}) &bull;</span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainersList.map((t) => (
                  <div key={t.id} className="p-4 bg-neutral-950 rounded-2xl border border-neutral-900 flex justify-between items-center gap-4 hover:border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-850 bg-neutral-900 shrink-0">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm truncate max-w-[150px]">{t.name}</h4>
                        <p className="text-amber-500 text-[10px] uppercase font-semibold tracking-wide truncate max-w-[150px]">{t.specialization}</p>
                      </div>
                    </div>
                    <button
                      id={`remove-trainer-${t.id}`}
                      onClick={() => handleRemoveTrainer(t.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition shrink-0"
                      title="Delist trainer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUB-PAGE 4: GALLERY MANAGEMENTS */}
        {adminTab === 'gallery' && (
          <div className="space-y-10" id="admin-gallery-crud">
            
            {/* Form to append new Photo */}
            <form onSubmit={handleAddPhotoSubmit} className="bg-[#0a0a0a] p-8 rounded-3xl border border-neutral-900 space-y-6">
              <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block">&bull; FILE NEW GHM CAPTION &bull;</span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Photo title input */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Caption Label Title</label>
                  <input
                    type="text"
                    id="new-photo-title"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="e.g. Core Lat Pulldown Zone"
                    required
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-medium"
                  />
                </div>

                {/* Photo category selection */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">Category Stream</label>
                  <select
                    id="new-photo-category"
                    value={newPhotoCat}
                    onChange={(e) => setNewPhotoCat(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-300 outline-none rounded-xl transition font-medium"
                  >
                    <option value="facilities">Club Spaces / Facilities</option>
                    <option value="workout">Iron Workouts</option>
                    <option value="team">Pro Coaching Staff</option>
                    <option value="events">Competitive Events</option>
                  </select>
                </div>

                {/* Photo Url */}
                <div className="space-y-1.5">
                  <label className="text-neutral-400 text-xs font-bold block">High Quality Image URL</label>
                  <input
                    type="url"
                    id="new-photo-url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-850 border-neutral-800 focus:border-amber-500 text-xs text-neutral-200 outline-none rounded-xl transition font-mono"
                  />
                </div>

              </div>

              <button
                type="submit"
                id="add-photo-btn-submit"
                className="px-6 py-3 bg-amber-500 text-black font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-amber-400 active:scale-95 transition flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" /> Save Photo Capture
              </button>
            </form>

            {/* List and deletion of gallery items */}
            <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-6 space-y-6">
              <span className="text-[10px] text-neutral-400 font-extrabold tracking-widest uppercase block">&bull; ACTIVE GALLERY ITEMS ({galleryList.length}) &bull;</span>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {galleryList.map((g) => (
                  <div key={g.id} className="relative aspect-square rounded-xl overflow-hidden group border border-neutral-900 bg-neutral-950">
                    <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
                      <button
                        id={`remove-photo-${g.id}`}
                        onClick={() => handleRemovePhoto(g.id)}
                        className="p-2 bg-rose-500 text-white rounded-xl hover:scale-105 transition"
                        title="Delete photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUB-PAGE 5: PLAN CONFIG RATES */}
        {adminTab === 'plans' && (
          <div className="bg-[#0a0a0a] border border-neutral-900 rounded-3xl p-6 space-y-6 shadow-xl" id="admin-rates-configurator">
            <div className="border-b border-neutral-900 pb-4">
              <span className="text-white font-extrabold text-sm uppercase tracking-wider">Configure GHM Membership pricing templates</span>
              <p className="text-neutral-500 text-[10px] leading-relaxed">Modify rate templates. Price adjustments display instantly at the checkout screen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plansList.map((plan) => (
                <div key={plan.id} className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 flex justify-between items-center gap-6 hover:border-neutral-855">
                  <div className="space-y-1">
                    <span className="text-[9px] text-amber-500 uppercase tracking-widest font-black font-mono">PLAN ID: {plan.id}</span>
                    <h4 className="text-white font-extrabold text-sm uppercase">{plan.name}</h4>
                    <p className="text-[10px] text-neutral-500 leading-normal font-light">{plan.durationMonths} Month Duration Interval</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {editingPlanId === plan.id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-400 font-bold">$</span>
                        <input
                          type="number"
                          id={`editing-rate-input-${plan.id}`}
                          value={editingPrice}
                          onChange={(e) => setEditingPrice(Math.max(1, Number(e.target.value)))}
                          className="w-16 px-2 py-1 bg-neutral-900 border border-amber-500 rounded text-xs text-white outline-none font-mono"
                        />
                        <button
                          id={`save-rate-btn-${plan.id}`}
                          onClick={() => handleSavePlanPrice(plan.id)}
                          className="p-1.5 bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-bold uppercase rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPlanId(null)}
                          className="p-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 rounded"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-white font-mono font-bold text-sm">${plan.price}</span>
                        <button
                          id={`edit-rate-trigger-${plan.id}`}
                          onClick={() => { setEditingPlanId(plan.id); setEditingPrice(plan.price); }}
                          className="p-1 px-2 border border-neutral-800 hover:border-amber-500 text-[10px] text-neutral-400 hover:text-amber-500 font-bold uppercase rounded transition"
                        >
                          Modify
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
