import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Mail, Code, Zap } from 'lucide-react'; // استبدلنا Download بـ Mail
import { Language, Profile } from '../types';

interface HeroProps {
  lang: Language;
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ lang, profile }) => {
  const isRTL = lang === Language.AR;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. تأثيرات السكرول (كما هي)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 2. متغيرات الحركة (كما هي)
  const textVariants = {
    hidden: { opacity: 0, x: isRTL ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px) rotate(-2deg)' },
      { transform: 'translateX(5px) rotate(2deg)' },
      { transform: 'translateX(-5px) rotate(-2deg)' },
      { transform: 'translateX(0)' }
    ], { duration: 400, easing: 'ease-in-out' });
    
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 lg:py-0 relative z-10">
       
       {/* الخلفية الضبابية الدائرية */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
       
       <div className="container mx-auto px-6 relative z-10">
         <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
           
           {/* TEXT SECTION */}
           <motion.div 
             variants={textVariants}
             initial="hidden"
             animate="visible"
             className="flex-1 text-center lg:text-start"
           >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-6 backdrop-blur-md">
                <Sparkles size={16} />
                <span>{profile.headline}</span>
            </div>

             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
               {isRTL ? profile.nameAr : profile.name} <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                 {isRTL ? profile.roleAr : profile.role}
               </span>
             </h1>

             <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
               {profile.subHeadline}
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               {/* الزر الأول: استكشف مشاريعي */}
               <a 
                 href="#projects" 
                 className="group flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-500 transition-all active:scale-95 w-full sm:w-auto shadow-lg shadow-blue-600/25 relative overflow-hidden"
               >
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 <span className="relative z-10">{isRTL ? 'استكشف مشاريعي' : 'Explore Work'}</span>
                 {isRTL ? <ArrowLeft size={20} className="relative z-10 transition-transform group-hover:-translate-x-1"/> : <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1"/>}
               </a>
               
               {/* الزر الثاني: تواصل معي (تم تصحيح وظيفته) */}
               <a 
                 href="#contact" 
                 className="group flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 border border-white/10 transition-all active:scale-95 w-full sm:w-auto backdrop-blur-md"
               >
                 <span>{isRTL ? 'تواصل معي' : 'Contact Me'}</span>
                 <Mail size={20} className="transition-transform group-hover:translate-y-1"/>
               </a>
             </div>
           </motion.div>

           {/* IMAGE SECTION */}
           <motion.div 
             variants={imageVariants}
             initial="hidden"
             animate="visible"
             style={{ y, opacity }}
             className="flex-1 relative max-w-xl flex justify-center"
           >
             {/* التعديلات هنا:
                1. rounded-full: لتحويل الشكل لدائرة.
                2. aspect-square: لضمان التساوي الهندسي.
             */}
             <div className="relative aspect-square w-full max-w-[400px] md:max-w-[450px] rounded-full bg-zinc-900 border border-white/10 overflow-hidden z-20 group shadow-2xl shadow-black/50">
               
               {/* اللمعان الخلفي */}
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl" />
               
               {/* الصورة الشخصية */}
               {profile.avatar ? (
                 <img 
                   src={profile.avatar} 
                   alt={profile.name}
                   onClick={handleImageClick}
                   className="w-full h-full object-cover rounded-full cursor-pointer transition-transform duration-700 group-hover:scale-105"
                 />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                    No Image
                 </div>
               )}
               
               {/* الأيقونات العائمة (Code & Zap) كما هي */}
               <motion.div 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-10 right-8 md:top-12 md:right-12 bg-zinc-900/80 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-lg z-30"
               >
                 <Code size={24} className="text-blue-400" />
               </motion.div>

               <motion.div 
                 animate={{ y: [10, -10, 10] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-10 left-8 md:bottom-12 md:left-12 bg-zinc-900/80 border border-white/10 p-3 rounded-2xl backdrop-blur-md shadow-lg z-30"
               >
                 <Zap size={24} className="text-purple-400" />
               </motion.div>
             </div>

           </motion.div>

         </div>
       </div>
    </section>
  );
};