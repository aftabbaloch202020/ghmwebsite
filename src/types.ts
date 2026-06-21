/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PlanId {
  MONTHLY = 'monthly',
  THREE_MONTHS = 'three_months',
  SIX_MONTHS = 'six_months',
  YEARLY = 'yearly'
}

export interface MembershipPlan {
  id: PlanId | string;
  name: string;
  price: number;
  durationMonths: number;
  features: string[];
  popular?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  cnic: string;
  address: string;
  phone: string;
  profileImg: string; // Base64 or URL
  membershipPlanId: string | null;
  membershipStatus: 'active' | 'inactive' | 'pending';
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  membershipStart: string | null; // ISO string
  membershipExpiry: string | null; // ISO string
  memberId: string; // Generated e.g., GHM-2026-XXXX
  isAdmin?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  image: string;
  bio: string;
  rating: number;
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'workout' | 'facilities' | 'team' | 'events';
  imageUrl: string;
  date: string;
}

export interface PaymentRecord {
  id: string;
  uid: string;
  memberName: string;
  memberId: string;
  planName: string;
  amountPaid: number;
  paymentMethod: string;
  transactionId: string;
  date: string; // ISO string
  status: 'completed' | 'failed' | 'processing';
}

export interface TimingSchedule {
  day: string; // e.g., 'Monday'
  classes: {
    time: string; // e.g., '06:00 AM - 07:00 AM'
    className: string; // e.g., 'Strength Training'
    trainerName: string;
    intensity: 'Low' | 'Medium' | 'High';
  }[];
}
