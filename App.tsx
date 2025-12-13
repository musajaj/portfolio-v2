import React, { useState, useEffect } from 'react';
import { WifiOff, Loader2 } from 'lucide-react'; // استيراد أيقونات الحالة
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

export default function App() {
  const [lang, setLang] = useState<Language>(Language.AR);
  
  // حالة البيانات: نبدأ بـ null (فراغ) وليس بيانات افتراضية
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [articlesData, setArticlesData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  // حالات التحميل والخطأ
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        // محاولة جلب البيانات الحقيقية
        const fetchedProfile = await client.fetch(profileQuery);
        
        // إذا لم تأتِ بيانات البروفايل، نعتبر الاتصال فاشلاً
        if (!fetchedProfile) {
          throw new Error("No Data");
        }

        setProfileData(fetchedProfile);
        
        // جلب باقي البيانات
        const fetchedProjects = await client.fetch(projectsQuery);
        setProjectsData(fetchedProjects || []);

        const fetchedArticles = await client.fetch(articlesQuery);
        setArticlesData(fetchedArticles || []);

        const fetchedStats = await client.fetch(statsQuery);
        setStatsData(fetchedStats || []);

        const fetchedReviews = await client.fetch(reviewsQuery);
        setReviewsData(fetchedReviews || []);

        const fetchedServices = await client.fetch(servicesQuery);
        setServicesData(fetchedServices || []);
        
        setIsLoading(false);

      } catch (err) {
        console.error("❌ Sanity Fetch Error:", err);
        setError(true); // تفعيل وضع الخطأ
        setIsLoading(false);
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

  // 1. شاشة التحميل (تظهر أثناء جلب البيانات)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
        <p className="text-zinc-400 animate-pulse">جاري تهيئة تجربة رقمية استثنائية تليق بطموحك...</p>
      </div>
    );
  }

  // 2. شاشة الخطأ (تظهر إذا فشل الاتصال فقط)
  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="bg-red-500/10 p-6 rounded-full mb-6">
            <WifiOff className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">فشل الاتصال بالسيرفر</h1>
        <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
          لم نتمكن من جلب بياناتك. <br/>
          بما أنك في منطقة محظورة، يرجى <strong>تفعيل الـ VPN</strong> ثم إعادة تحديث الصفحة.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors"
        >
          إعادة المحاولة ↻
        </button>
      </div>
    );
  }

  // 3. التطبيق الكامل (يظهر فقط إذا نجح جلب البيانات)
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
