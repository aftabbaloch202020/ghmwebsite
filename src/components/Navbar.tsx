/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Dumbbell, Menu, X, User, LogOut, LayoutDashboard, Sliders } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenAuth: (view: 'login' | 'signup') => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onOpenAuth
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'timings', label: 'Schedules' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'memberships', label: 'Memberships' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#030303]/90 backdrop-blur-md border-b border-neutral-800/60" id="ghm-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-xl shadow-lg border border-amber-300/20">
              <Dumbbell className="h-6 w-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-wider flex items-center gap-1">
                GHM <span className="text-amber-400 font-light text-base tracking-widest border-l border-neutral-800 pl-2">FITNESS</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === link.id
                    ? 'text-amber-400 bg-amber-500/10 border-b-2 border-amber-500 rounded-b-none'
                    : 'text-neutral-300 hover:text-amber-400 hover:bg-neutral-900/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-neutral-900/60 p-1.5 pr-3 rounded-full border border-neutral-800">
                <div className="w-9 h-9 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
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
                <div className="text-left text-xs max-w-[120px]">
                  <p className="font-bold text-white truncate">{currentUser.firstName}</p>
                  <p className="text-[10px] text-amber-500 truncate uppercase tracking-widest">
                    {currentUser.isAdmin ? 'Executive Admin' : currentUser.membershipStatus === 'active' ? 'Active Member' : 'Guest'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 ml-2">
                  {currentUser.isAdmin && (
                    <button
                      id="navbar-admin-btn"
                      onClick={() => handleNavClick('admin')}
                      title="Admin Console"
                      className="p-1.5 hover:bg-amber-500/10 hover:text-amber-400 text-neutral-400 rounded-lg transition"
                    >
                      <Sliders className="h-4 w-4" />
                    </button>
                  )}
                  
                  {!currentUser.isAdmin && (
                    <button
                      id="navbar-dashboard-btn"
                      onClick={() => handleNavClick('dashboard')}
                      title="My Dashboard"
                      className="p-1.5 hover:bg-amber-500/10 hover:text-amber-400 text-neutral-400 rounded-lg transition"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    id="navbar-logout-btn"
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-1.5 hover:bg-rose-500/10 hover:text-rose-400 text-neutral-400 rounded-lg transition"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  id="navbar-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 rounded-lg text-sm font-semibold tracking-wide text-neutral-300 hover:text-amber-400 transition"
                >
                  Client Login
                </button>
                <button
                  id="navbar-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
                >
                  Join GHM Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button
              id="mobile-menu-burger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-400 hover:text-amber-400 transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#030303]/95 border-b border-neutral-800 py-4 px-4 transition-all" id="ghm-mobile-drawer">
          <div className="space-y-1 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mob-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold ${
                  activeTab === link.id
                    ? 'text-amber-400 bg-amber-500/10 font-bold border-l-4 border-amber-500'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 overflow-hidden border border-amber-400/30">
                    <img
                      src={currentUser.profileImg}
                      alt={currentUser.firstName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{currentUser.firstName} {currentUser.lastName}</h4>
                    <p className="text-xs text-amber-500 uppercase tracking-widest">
                      {currentUser.isAdmin ? 'Admin Portal' : 'Club Member'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1">
                  {currentUser.isAdmin ? (
                    <button
                      id="mob-admin-btn"
                      onClick={() => handleNavClick('admin')}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-500 text-sm font-semibold transition"
                    >
                      <Sliders className="h-4 w-4" /> Admin Console
                    </button>
                  ) : (
                    <button
                      id="mob-dash-btn"
                      onClick={() => handleNavClick('dashboard')}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-500 text-sm font-semibold transition"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </button>
                  )}

                  <button
                    id="mob-logout-btn"
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-semibold transition"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <button
                  id="mob-login-btn"
                  onClick={() => {
                    onOpenAuth('login');
                    setIsOpen(false);
                  }}
                  className="py-2.5 rounded-xl text-center text-sm font-bold border border-neutral-800 text-neutral-300 hover:bg-neutral-900 transition"
                >
                  Log In
                </button>
                <button
                  id="mob-join-btn"
                  onClick={() => {
                    onOpenAuth('signup');
                    setIsOpen(false);
                  }}
                  className="py-2.5 rounded-xl text-center text-sm font-bold bg-amber-500 text-black shadow-lg shadow-amber-500/20 transition"
                >
                  Join GHM
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
