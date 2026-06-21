/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserProfile, Trainer, GalleryItem, MembershipPlan, PaymentRecord, PlanId } from './types';
import { INITIAL_PLANS, INITIAL_TRAINERS, INITIAL_GALLERY } from './data';

// Import modular subviews
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Timings from './components/Timings';
import Trainers from './components/Trainers';
import Gallery from './components/Gallery';
import Membership from './components/Membership';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Contact from './components/Contact';
import Auth from './components/Auth';
import PayModal from './components/PayModal';

export default function App() {
  // Navigation active state ID (tab)
  const [activeTab, setActiveTab] = useState<string>('home');

  // Auth overlays state ('login' | 'signup' | null)
  const [authOverlayView, setAuthOverlayView] = useState<'login' | 'signup' | null>(null);

  // Active package for checkout payment modal (or null)
  const [activePayPlan, setActivePayPlan] = useState<MembershipPlan | null>(null);

  // Dedicated core states backed by clean LocalStorage persistence!
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  // 1. Initialize lists from LocalStorage or seed defaults during first boot load
  useEffect(() => {
    // A. Users list seed
    const storedUsers = localStorage.getItem('ghm_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Seed pre-defined Admin account and one premium Active Member account!
      const seededUsers: UserProfile[] = [
        {
          uid: 'admin_uid',
          email: 'admin@ghm.com',
          firstName: 'Executive',
          lastName: 'Admin',
          cnic: '37405-0000000-1',
          address: 'GHM Corporate Suites, Islamabad',
          phone: '+92 300 5550920',
          profileImg: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
          membershipPlanId: null,
          membershipStatus: 'active',
          paymentStatus: 'paid',
          membershipStart: null,
          membershipExpiry: null,
          memberId: 'GHM-ADMIN-001',
          isAdmin: true
        },
        {
          uid: 'member_uid_1',
          email: 'member@ghm.com',
          firstName: 'Tariq',
          lastName: 'Anwar',
          cnic: '37405-1234567-3',
          address: 'Sector F-10/2, Islamabad',
          phone: '+92 300 1234567',
          profileImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
          membershipPlanId: 'three_months',
          membershipStatus: 'active',
          paymentStatus: 'paid',
          membershipStart: new Date().toISOString(),
          // Seeding +3 months expiry
          membershipExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          memberId: 'GHM-2026-9021',
          isAdmin: false
        }
      ];
      setUsers(seededUsers);
      localStorage.setItem('ghm_users', JSON.stringify(seededUsers));
    }

    // B. Trainers list seed
    const storedTrainers = localStorage.getItem('ghm_trainers');
    if (storedTrainers) {
      setTrainers(JSON.parse(storedTrainers));
    } else {
      setTrainers(INITIAL_TRAINERS);
      localStorage.setItem('ghm_trainers', JSON.stringify(INITIAL_TRAINERS));
    }

    // C. Gallery items seed
    const storedGallery = localStorage.getItem('ghm_gallery');
    if (storedGallery) {
      setGallery(JSON.parse(storedGallery));
    } else {
      setGallery(INITIAL_GALLERY);
      localStorage.setItem('ghm_gallery', JSON.stringify(INITIAL_GALLERY));
    }

    // D. Membership plans seed
    const storedPlans = localStorage.getItem('ghm_plans');
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    } else {
      setPlans(INITIAL_PLANS);
      localStorage.setItem('ghm_plans', JSON.stringify(INITIAL_PLANS));
    }

    // E. Cleared payment invoices list seed
    const storedPayments = localStorage.getItem('ghm_payments');
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    } else {
      const seededPayments: PaymentRecord[] = [
        {
          id: 'pay_init_1',
          uid: 'member_uid_1',
          memberName: 'Tariq Anwar',
          memberId: 'GHM-2026-9021',
          planName: 'Silver 3-Month Elite',
          amountPaid: 94.50, // includes 5% tax
          paymentMethod: 'Visa Credit Card',
          transactionId: 'TX_GHM_SEED902',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        }
      ];
      setPayments(seededPayments);
      localStorage.setItem('ghm_payments', JSON.stringify(seededPayments));
    }

    // F. Load current active sessions profile
    const storedActiveUser = localStorage.getItem('ghm_active_user');
    if (storedActiveUser) {
      setActiveUser(JSON.parse(storedActiveUser));
    }
  }, []);

  // 2. Synchronize memory state shifts with LocalStorage structures
  const syncUsers = (updatedUsers: UserProfile[]) => {
    setUsers(updatedUsers);
    localStorage.setItem('ghm_users', JSON.stringify(updatedUsers));
    
    // Update activeUser cache too if their details changed
    if (activeUser) {
      const updatedActive = updatedUsers.find(u => u.uid === activeUser.uid);
      if (updatedActive) {
        setActiveUser(updatedActive);
        localStorage.setItem('ghm_active_user', JSON.stringify(updatedActive));
      }
    }
  };

  const syncTrainers = (updatedTrainers: Trainer[]) => {
    setTrainers(updatedTrainers);
    localStorage.setItem('ghm_trainers', JSON.stringify(updatedTrainers));
  };

  const syncGallery = (updatedGallery: GalleryItem[]) => {
    setGallery(updatedGallery);
    localStorage.setItem('ghm_gallery', JSON.stringify(updatedGallery));
  };

  const syncPlans = (updatedPlans: MembershipPlan[]) => {
    setPlans(updatedPlans);
    localStorage.setItem('ghm_plans', JSON.stringify(updatedPlans));
  };

  const syncPayments = (updatedPayments: PaymentRecord[]) => {
    setPayments(updatedPayments);
    localStorage.setItem('ghm_payments', JSON.stringify(updatedPayments));
  };

  // 3. Authenticate success callbacks
  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setActiveUser(authenticatedUser);
    localStorage.setItem('ghm_active_user', JSON.stringify(authenticatedUser));
    setAuthOverlayView(null);

    // Swap views for comfortable landing immediately
    if (authenticatedUser.isAdmin) {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
  };

  // 4. Logout trigger
  const handleLogout = () => {
    setActiveUser(null);
    localStorage.removeItem('ghm_active_user');
    setActiveTab('home');
  };

  // 5. New user enrollment submissions
  const handleRegisterUser = (newUserProfile: UserProfile) => {
    const updatedUsersList = [...users, newUserProfile];
    syncUsers(updatedUsersList);
  };

  // 6. Buying plan selector callback
  const handleSelectPlanToPay = (plan: MembershipPlan) => {
    if (!activeUser) {
      // Trigger register/signup overlay prompt
      setAuthOverlayView('signup');
      return;
    }
    setActivePayPlan(plan);
  };

  // 7. Payment gateway checkout complete callback
  const handlePaymentSuccess = (
    plan: MembershipPlan,
    transactionId: string,
    paymentMethod: string
  ) => {
    if (!activeUser) return;

    // Calculate active duration and expiry times
    const startIso = new Date().toISOString();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + plan.durationMonths);
    const expiryIso = expiryDate.toISOString();

    // A. Sync user subscription profiles
    const updatedUsers = users.map((u) => {
      if (u.uid === activeUser.uid) {
        return {
          ...u,
          membershipPlanId: plan.id,
          membershipStatus: 'active' as const,
          paymentStatus: 'paid' as const,
          membershipStart: startIso,
          membershipExpiry: expiryIso
        };
      }
      return u;
    });
    
    // Save updated roster
    syncUsers(updatedUsers);

    // B. Save cleared payment invoice receipt logs
    const taxValue = parseFloat((plan.price * 0.05).toFixed(2));
    const grossPaid = parseFloat((plan.price + taxValue).toFixed(2));

    const newInvoice: PaymentRecord = {
      id: `invoice_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      uid: activeUser.uid,
      memberName: `${activeUser.firstName} ${activeUser.lastName}`,
      memberId: activeUser.memberId,
      planName: plan.name,
      amountPaid: grossPaid,
      paymentMethod: paymentMethod,
      transactionId: transactionId,
      date: startIso,
      status: 'completed'
    };

    const updatedPaymentsList = [newInvoice, ...payments];
    syncPayments(updatedPaymentsList);

    // C. Reset payment modal, swap landing area to dashboard in immediate visual feedback!
    setActivePayPlan(null);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      
      {/* Dynamic Header Navbar across views */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={activeUser}
        onLogout={handleLogout}
        onOpenAuth={setAuthOverlayView}
      />

      {/* Main Body Subviews renderer */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home onNavigate={setActiveTab} onOpenAuth={setAuthOverlayView} />
        )}
        {activeTab === 'about' && (
          <About />
        )}
        {activeTab === 'timings' && (
          <Timings />
        )}
        {activeTab === 'trainers' && (
          <Trainers trainersList={trainers} />
        )}
        {activeTab === 'gallery' && (
          <Gallery galleryList={gallery} />
        )}
        {activeTab === 'memberships' && (
          <Membership
            plansList={plans}
            currentUser={activeUser}
            onJoinPlan={handleSelectPlanToPay}
            onOpenAuth={setAuthOverlayView}
          />
        )}
        {activeTab === 'contact' && (
          <Contact />
        )}
        
        {/* Dynamic Authenticated Areas */}
        {activeTab === 'dashboard' && activeUser && !activeUser.isAdmin && (
          <Dashboard
            currentUser={activeUser}
            plansList={plans}
            paymentsList={payments}
            onNavigate={setActiveTab}
          />
        )}
        
        {activeTab === 'admin' && activeUser && activeUser.isAdmin && (
          <AdminPanel
            usersList={users}
            trainersList={trainers}
            galleryList={gallery}
            plansList={plans}
            paymentsList={payments}
            onUpdateUsers={syncUsers}
            onUpdateTrainers={syncTrainers}
            onUpdateGallery={syncGallery}
            onUpdatePlans={syncPlans}
          />
        )}
      </main>

      {/* Luxury Footer Navigation */}
      <Footer onNavigate={setActiveTab} onOpenAuth={setAuthOverlayView} />

      {/* Overplaying Auth Forms Layer Overlay */}
      {authOverlayView && (
        <Auth
          initialView={authOverlayView}
          onAuthSuccess={handleAuthSuccess}
          registeredUsers={users}
          onRegisterUser={handleRegisterUser}
          onClose={() => setAuthOverlayView(null)}
        />
      )}

      {/* Overplaying Payment Merchant Modal Overlay */}
      {activePayPlan && activeUser && (
        <PayModal
          plan={activePayPlan}
          currentUser={activeUser}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setActivePayPlan(null)}
        />
      )}

    </div>
  );
}
