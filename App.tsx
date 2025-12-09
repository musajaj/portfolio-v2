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
// استيراد جميع استعلامات Sanity التي أضفناها
import { 
  profileQuery, 
  projectsQuery, 
  articlesQuery, 
  statsQuery, 
  reviewsQuery 
} from './sanity/queries';
import { PROFILE as DEFAULT_PROFILE } from './constants';

export default function App() {
  // الحالة الافتراضية: اللغة العربية
  const [lang, setLang] = useState<Language>(Language.AR);
  
  // مخازن البيانات (State Management)
  const [profileData, setProfileData] = useState<Profile>(DEFAULT_PROFILE);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [articlesData, setArticlesData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  // Fetch Sanity Data (جلب البيانات عند التحميل)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. جلب البروفايل
        const fetchedProfile = await client.fetch(profileQuery);
        console.log("Sanity Profile Data:", fetchedProfile); // للتأكد من وصول الصورة
        if (fetchedProfile) {
          setProfileData({ ...DEFAULT_PROFILE, ...fetchedProfile });
        }

        // 2. جلب المشاريع
        const fetchedProjects = await client.fetch(projectsQuery);
        setProjectsData(fetchedProjects);

        // 3. جلب المقالات
        const fetchedArticles = await client.fetch(articlesQuery);
        setArticlesData(fetchedArticles);

        // 4. جلب الإحصائيات
        const fetchedStats = await client.fetch(statsQuery);
        setStatsData(fetchedStats);

        // 5. جلب المراجعات (جدار الحب)
        const fetchedReviews = await client.fetch(reviewsQuery);
        setReviewsData(fetchedReviews);
        
        // سجل فحص شامل
        console.log("All Data Loaded:", { fetchedProjects, fetchedArticles, fetchedStats, fetchedReviews });

      } catch (error) {
        console.warn("Sanity Fetch Failed (Using Fallback Data):", error);
      }
    };

    fetchData();
  }, []);

  // تحديث اتجاه الصفحة (RTL)
  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // التنقل السلس
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
          
          {/* تمرير بيانات الإحصائيات من Sanity */}
          <StatsSection stats={statsData} />
          
          <PainMatrix lang={lang} />
          
          {/* تمرير بيانات المراجعات من Sanity */}
          <WallOfLove reviews={reviewsData} />
          
          {/* تمرير بيانات المشاريع من Sanity */}
          <ProductStore projects={projectsData} />
          
          {/* تمرير بيانات المقالات من Sanity */}
          <Articles lang={lang} articles={articlesData} />
          
          <Services lang={lang} />
          <About lang={lang} profile={profileData} />
          <ROICalculator />
          <ValueScale />
          <CommitmentSwitch />
        </main>
        
        <BentoFooter profile={profileData} />
      </div>
      <ScrollProgress />
    </div>
  );
}