export enum Language {
  EN = 'en',
  AR = 'ar',
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  downloadCount: string;
  externalLink: string;
  featured?: boolean;
  category: string;
  image?: string;
  price?: string;
}

export interface Profile {
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  headline: string;
  subHeadline: string;
  aboutText: string;
  avatar: string;
  tags: string[];
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    instagram: string;
    facebook: string;
    gumroad: string;
    notion: string;
    producthunt: string;
  };
  // الإعدادات الديناميكية
  offerConfig?: {
    isActive: boolean;
    title: string;
    discountCode: string;
    discountPercent: string;
    offerLink: string;
  };
  painMatrixConfig?: {
    successTitle: string;
    successDesc: string;
    ctaText: string;
    ctaLink?: string;
  };
  roiConfig?: {
    ctaText: string;
    ctaLink?: string;
  };
}