import React, { useState, useEffect } from 'react';
import { Language, Profile, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import ProductStore from './components/ProductStore';
import { Articles } from './components/Articles';
import { Services } from './components/Services';
import { About } from './components/About';
import BentoFooter from './components/BentoFooter';
import { CosmicBackground } from './components/CosmicBackground';
import StatsSection from './components/StatsSection';
import ScrollProgress from './components/ScrollProgress';
import ROICalculator from './components/ROICalculator';
import ValueScale from './components/ValueScale';
import WallOfLove from './components/WallOfLove';
import CommitmentSwitch from './components/CommitmentSwitch';
import PainMatrix from './components/PainMatrix';
import { client } from './sanity/client';
import { 
  profileQuery, 
  projectsQuery, 
  articlesQuery, 
  statsQuery, 
  reviewsQuery,
  servicesQuery
} from './sanity/queries';
import { PROFILE as DEFAULT_PROFILE } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>(Language.AR);
  
  // مخازن البيانات
  const [profileData, setProfileData] = useState<Profile>(DEFAULT_PROFILE);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [articlesData, setArticlesData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🚀 Starting Data Fetch...");

        // 1. Profile
        const fetchedProfile = await client.fetch(profileQuery);
        if (fetchedProfile) setProfileData({ ...DEFAULT_PROFILE, ...fetchedProfile });

        // 2. Projects
        const fetchedProjects = await client.fetch(projectsQuery);
        setProjectsData(fetchedProjects || []);

        // 3. Articles
        const fetchedArticles = await client.fetch(articlesQuery);
        setArticlesData(fetchedArticles || []);

        // 4. Stats
        const fetchedStats = await client.fetch(statsQuery);
        setStatsData(fetchedStats || []);

        // 5. Reviews
        const fetchedReviews = await client.fetch(reviewsQuery);
        setReviewsData(fetchedReviews || []);

        // 6. Services
        const fetchedServices = await client.fetch(servicesQuery);
        setServicesData(fetchedServices || []);
        
        console.log("✅ Data Fetch Complete");

      } catch (error) {
        console.error("❌ Sanity Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavigate = (target: string) => {
    if (target === '#') {
      window.history.pushState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target.startsWith('#')) {
      const elementId = target.replace('#', '');
      const element = document.getElementById(elementId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <Navbar 
          lang={lang} 
          setLang={setLang} 
          onNavigate={handleNavigate} 
          profile={profileData} 
        />
        
        <main className="relative w-full">
          <Hero lang={lang} profile={profileData} />
          <StatsSection stats={statsData} />
          <PainMatrix lang={lang} config={profileData.painMatrixConfig} />
          <WallOfLove reviews={reviewsData} />
          <ProductStore projects={projectsData} />
          <Articles lang={lang} articles={articlesData} />
          <Services lang={lang} services={servicesData} />
          <About lang={lang} profile={profileData} />
          <ROICalculator config={profileData.roiConfig} />
          <ValueScale />
          <CommitmentSwitch offer={profileData.offerConfig} />
        </main>
        
        <BentoFooter profile={profileData} />
      </div>
      <ScrollProgress />
    </div>
  );
}