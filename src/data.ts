/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MembershipPlan, Trainer, GalleryItem, TimingSchedule, PlanId } from './types';

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: PlanId.MONTHLY,
    name: 'Standard Monthly',
    price: 35,
    durationMonths: 1,
    features: [
      'Access to GHM fitness floors during standard hours',
      'Premium locker room & steam sauna amenities',
      'Complimentary initial 1-on-1 trainer assessment',
      'Standard high-speed Wi-Fi access',
      'Unlimited purified hydration station access'
    ]
  },
  {
    id: PlanId.THREE_MONTHS,
    name: 'Silver 3-Month Elite',
    price: 90,
    durationMonths: 3,
    popular: true,
    features: [
      'Full 24/7 unlimited access to all GHM zones',
      'Access to all premium high-intensity group classes',
      '2 complimentary personal coaching sessions per month',
      'Locker rental and towel service included',
      '10% discount on in-club GHM nutrition & pro-shop products'
    ]
  },
  {
    id: PlanId.SIX_MONTHS,
    name: 'Gold 6-Month Premium',
    price: 160,
    durationMonths: 6,
    features: [
      'Everything in Silver 3-Month Elite',
      'Comprehensive monthly body composition (InBody) analysis',
      '4 guest passes per month for friends and family',
      'Priority bookings for group and specialized fitness classes',
      '15% discount on in-club nutrition & private coaching packages',
      'GHM Custom Elite Shaker Bottle and Club T-shirt on signup'
    ]
  },
  {
    id: PlanId.YEARLY,
    name: 'Platinum Annual VIP',
    price: 280,
    durationMonths: 12,
    features: [
      'All-inclusive VIP access for a full calendar year',
      'Unlimited private 1-on-1 elite trainer coaching sessions (2 per month)',
      'Customized metabolic nutrition and physiological meal planning',
      'Full access to luxury members-only lounge and recovery zone',
      'Unlimited guest entry (one guest per visit allowed)',
      'Free parking slot validation & premium laundry garment service',
      'Dedicated personal concierge and biometric progress tracking'
    ]
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Marcus Sterling',
    specialization: 'Elite Strength & Athletic Conditioning',
    experienceYears: 10,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=400',
    bio: 'Marcus is a former collegiate athlete specializing in explosive power development, speed conditioning, and tactical strength training.',
    socials: {
      instagram: '@marcus_sterling_fit',
      facebook: 'facebook.com/marcusfit',
      twitter: '@marcus_lifts'
    }
  },
  {
    id: 't2',
    name: 'Elena Rostova',
    specialization: 'Functional Movement, Pilates & Core Rehabilitation',
    experienceYears: 8,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400',
    bio: 'Elena focuses on building lean muscle tone, posture correction, and full-body longevity through targeted functional exercise.',
    socials: {
      instagram: '@elena_rostova_active',
      facebook: 'facebook.com/elenarostova'
    }
  },
  {
    id: 't3',
    name: 'Zayn Malik Shah',
    specialization: 'Competitive Powerlifting & Hypertrophy',
    experienceYears: 7,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    bio: 'Zayn is an active competitive powerlifter who helps individuals break personal plates in squats, bench press, and deadlifts safely.',
    socials: {
      instagram: '@zayn_shah_power',
      twitter: '@zaynlifts'
    }
  },
  {
    id: 't4',
    name: 'Sarah Jenkins',
    specialization: 'HIIT Cardio, Metabolic Shred & Group Fitness',
    experienceYears: 6,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Sarah designs high-energy, motivational fat-loss programs that challenge cardiovascular limits while keeping individual progress engaging.',
    socials: {
      instagram: '@coach_sarah_j',
      facebook: 'facebook.com/sarahjenkinsfit'
    }
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Executive Dumbbell Row Deck',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    date: '2026-02-15'
  },
  {
    id: 'g2',
    title: 'Uncompromising Power Racks',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    date: '2026-03-10'
  },
  {
    id: 'g3',
    title: 'Elite Olympic Deadlift Area',
    category: 'workout',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    date: '2026-04-18'
  },
  {
    id: 'g4',
    title: 'Sunrise Vinyasa Yoga Session',
    category: 'workout',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-02'
  },
  {
    id: 'g5',
    title: 'High-Performance Cardio Zone',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    date: '2026-05-12'
  },
  {
    id: 'g6',
    title: 'Annual GHM Powerlifting Cup',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    date: '2026-01-20'
  },
  {
    id: 'g7',
    title: 'Coaches Masterclass Induction',
    category: 'team',
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    date: '2026-02-01'
  },
  {
    id: 'g8',
    title: 'Premium Recovery Sauna',
    category: 'facilities',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    date: '2026-03-24'
  }
];

export const SCHEDULE: TimingSchedule[] = [
  {
    day: 'Monday',
    classes: [
      { time: '06:00 AM - 07:00 AM', className: 'Dawn Strength & Barbell', trainerName: 'Marcus Sterling', intensity: 'High' },
      { time: '09:00 AM - 10:00 AM', className: 'Functional Core Alignment', trainerName: 'Elena Rostova', intensity: 'Medium' },
      { time: '05:30 PM - 06:30 PM', className: 'Metabolic Conditioning (HIIT)', trainerName: 'Sarah Jenkins', intensity: 'High' },
      { time: '07:00 PM - 08:30 PM', className: 'Elite Barbell Powerlifting', trainerName: 'Zayn Malik Shah', intensity: 'High' }
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '07:00 AM - 08:00 AM', className: 'Vinyasa Flow Yoga', trainerName: 'Elena Rostova', intensity: 'Low' },
      { time: '10:00 AM - 11:00 AM', className: 'Athletic Hypertrophy Routine', trainerName: 'Marcus Sterling', intensity: 'High' },
      { time: '06:00 PM - 07:00 PM', className: 'Cardio Fat Melting Shred', trainerName: 'Sarah Jenkins', intensity: 'High' }
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '06:00 AM - 07:00 AM', className: 'Dawn Strength & Barbell', trainerName: 'Marcus Sterling', intensity: 'High' },
      { time: '09:00 AM - 10:00 AM', className: 'Functional Core Alignment', trainerName: 'Elena Rostova', intensity: 'Medium' },
      { time: '05:30 PM - 06:30 PM', className: 'Metabolic Conditioning (HIIT)', trainerName: 'Sarah Jenkins', intensity: 'High' },
      { time: '07:00 PM - 08:30 PM', className: 'Elite Barbell Powerlifting', trainerName: 'Zayn Malik Shah', intensity: 'High' }
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { time: '07:00 AM - 08:00 AM', className: 'Vinyasa Flow Yoga', trainerName: 'Elena Rostova', intensity: 'Low' },
      { time: '10:00 AM - 11:00 AM', className: 'Athletic Hypertrophy Routine', trainerName: 'Marcus Sterling', intensity: 'High' },
      { time: '06:00 PM - 07:00 PM', className: 'Cardio Fat Melting Shred', trainerName: 'Sarah Jenkins', intensity: 'High' }
    ]
  },
  {
    day: 'Friday',
    classes: [
      { time: '06:00 AM - 07:00 AM', className: 'Dawn Strength & Barbell', trainerName: 'Marcus Sterling', intensity: 'High' },
      { time: '09:00 AM - 10:00 AM', className: 'Functional Core Alignment', trainerName: 'Elena Rostova', intensity: 'Medium' },
      { time: '05:00 PM - 06:00 PM', className: 'Tabata Full-Body Blast', trainerName: 'Sarah Jenkins', intensity: 'High' },
      { time: '06:30 PM - 08:00 PM', className: 'Max Effort Powerlifting', trainerName: 'Zayn Malik Shah', intensity: 'High' }
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { time: '08:00 AM - 09:30 AM', className: 'Weekend Warrior Circuit', trainerName: 'Sarah Jenkins & Marcus Sterling', intensity: 'High' },
      { time: '11:00 AM - 12:30 PM', className: 'Rehabilitative Flexibility', trainerName: 'Elena Rostova', intensity: 'Low' },
      { time: '02:00 PM - 03:30 PM', className: 'Community Lift and Learn', trainerName: 'Zayn Malik Shah', intensity: 'Medium' }
    ]
  },
  {
    day: 'Sunday',
    classes: [
      { time: '09:00 AM - 11:00 AM', className: 'Open Floor Practice', trainerName: 'Duty Trainer Available', intensity: 'Low' },
      { time: '04:00 PM - 05:30 PM', className: 'Sunset Restorative Wind-Down', trainerName: 'Elena Rostova', intensity: 'Low' }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Hamza Khan',
    role: 'Member since 2024',
    rating: 5,
    quote: 'Joining GHM Fitness Club was the best lifestyle decision I ever made. The black-and-gold premium aesthetics motivate me the second I walk in. Marcus Sterling completely fixed my squat form, and the digital login/card system makes tracking membership effortless.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    name: 'Ayesha Rahman',
    role: 'Silver Elite Member',
    rating: 5,
    quote: 'The VIP feel here is unmatched. Extremely clean, space-designed, with stellar locker amenities and steam rooms. I regularly attend Elena\'s Functional Core classes which helped me recover from knee rehabilitation fully. Proud to carry the GHM gold card!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    name: 'Zameer Siddiqui',
    role: 'Powerlifter / Platinum Member',
    rating: 5,
    quote: 'GHM is unmatched in strength facilities. They have actual rogue racks, elite deadlift bars, and calibrated plates. Under Zayn\'s instructions, I added 45kg to my total lift in merely six months. Best elite trainers in the country by far.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];
