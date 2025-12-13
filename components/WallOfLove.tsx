"use client";

import React, { useState } from "react";
import { Star } from "lucide-react"; 

// --- أيقونات العلامات التجارية الأصلية (SVG) ---
const Icons = {
  Whatsapp: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
  ),
  Twitter: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  Gumroad: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22.258 8.95c-.387 4.318-3.327 7.746-8.243 8.35v3.475h-3.457v-3.522c-5.772-.94-8.082-5.18-8.31-9.406h3.69c.123 2.768 1.494 4.887 4.62 5.093v-7.26h3.457v7.243c2.72-.258 4.298-1.92 4.47-5.034.02-.387.03-.84.03-1.353l-14.496.024a13.376 13.376 0 0 1-.093-3.235h18.332v5.625z"/></svg>
  ),
  Telegram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12.017 12.017 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  ),
  Reddit: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
  ),
  Gmail: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
  ),
  // أيقونة Notion Arabs (نفس شعار Notion)
  NotionArabs: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M4.021 2.183 2.583 4.016c-.201.254-.038.508.22.508h2.425l.025.022 4.854 8.728V4.524h-1.2c-.32 0-.349-.273-.257-.508l.56-1.451c.134-.349.374-.382.672-.382h5.952c.309 0 .586.203.403.508l-.478 1.334h-1.488v11.707l-3.29-5.918v5.918h1.344c.292 0 .347.226.257.508l-.562 1.454c-.133.349-.374.382-.672.382H5.32c-.309 0-.586-.203-.403-.508l.481-1.334h1.485l.003-14.57z" /></svg>
  ),
};

const platformConfig: any = {
  twitter: { 
    icon: Icons.Twitter, 
    label: "Twitter / X", 
    colorClass: "text-[#1DA1F2]", 
    bgClass: "bg-[#1DA1F2]/10" 
  },
  whatsapp: { 
    icon: Icons.Whatsapp, 
    label: "WhatsApp", 
    colorClass: "text-[#25D366]", 
    bgClass: "bg-[#25D366]/10" 
  },
  gumroad: { 
    icon: Icons.Gumroad, 
    label: "Gumroad", 
    colorClass: "text-[#FF90E8]", 
    bgClass: "bg-[#FF90E8]/10",
    isGumroad: true 
  },
  reddit: { 
    icon: Icons.Reddit, 
    label: "Reddit", 
    colorClass: "text-[#FF4500]", 
    bgClass: "bg-[#FF4500]/10" 
  },
  telegram: { 
    icon: Icons.Telegram, 
    label: "Telegram", 
    colorClass: "text-[#26A5E4]", 
    bgClass: "bg-[#26A5E4]/10" 
  },
  email: { 
    icon: Icons.Gmail, 
    label: "Email", 
    colorClass: "text-[#EA4335]", 
    bgClass: "bg-[#EA4335]/10" 
  },
  // الإعدادات الجديدة لـ Notion Arabs
  notionarabs: { 
    icon: Icons.NotionArabs, 
    label: "Notion Arabs", 
    colorClass: "text-white", // لون أبيض/فضي أنيق
    bgClass: "bg-white/10" 
  },
};

export default function WallOfLove({ reviews }: { reviews?: any[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const displayReviews = reviews && reviews.length > 0 ? reviews : [];

  if (displayReviews.length === 0) return null;

  const row1 = [...displayReviews, ...displayReviews, ...displayReviews];
  const row2 = [...displayReviews, ...displayReviews, ...displayReviews].reverse();

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-transparent group/wall border-t border-white/5">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          لا تصدق كلامي. <br/> <span className="text-blue-500">صدق نتائجهم.</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">لقطات حقيقية من محادثات مع عملاء سعداء.</p>
      </div>

      <div 
        className="space-y-8"
        onMouseLeave={() => setHoveredId(null)}
      >
        <MarqueeRow reviews={row1} direction="left" hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <MarqueeRow reviews={row2} direction="right" hoveredId={hoveredId} setHoveredId={setHoveredId} />
      </div>

      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes scroll-right { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
        .animate-scroll-left { animation: scroll-left 80s linear infinite; }
        .animate-scroll-right { animation: scroll-right 80s linear infinite; }
      `}</style>
    </section>
  );
}

function MarqueeRow({ reviews, direction, hoveredId, setHoveredId }: any) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>
      
      <div className={`flex w-max ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:[animation-play-state:paused]`}>
        {reviews.map((review: any, idx: number) => {
           const uniqueId = review._id;
           const uniqueKey = `${direction}-${uniqueId}-${idx}`;
           const isBlur = hoveredId !== null && hoveredId !== uniqueId;
           
           return (
             <div 
               key={uniqueKey}
               className={`transition-all duration-500 ease-out px-4 ${isBlur ? 'blur-[3px] opacity-30 scale-95 grayscale' : 'blur-0 opacity-100 scale-100 grayscale-0 hover:scale-105 z-10'}`}
               onMouseEnter={() => setHoveredId(uniqueId)}
             >
               <ReviewCard review={review} />
             </div>
           );
        })}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  const config = platformConfig[review.type] || platformConfig.email;
  const IconComponent = config.icon;

  return (
    <div className="w-[300px] md:w-[380px] rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all shadow-2xl shadow-black/50 relative group">
      
      <div className="px-5 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgClass}`}>
            <IconComponent width={16} height={16} className={config.colorClass} />
            <span className={`text-xs font-bold uppercase tracking-wider ${config.colorClass}`}>
                {config.label}
            </span>
        </div>
        
        {config.isGumroad && (
             <div className="flex text-yellow-400 gap-0.5">
                {[...Array(review.rating || 5)].map((_, i) => <Star key={i} size={14} fill="currentColor"/>)}
             </div>
        )}
      </div>
      
      <div className="relative aspect-[4/3] w-full bg-zinc-950">
        {review.screenshotUrl ? (
            <img 
                src={review.screenshotUrl} 
                alt={`Review from ${review.type}`}
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                No Screenshot
            </div>
        )}
        
        {review.name && (
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-5 pt-12">
                 <p className="text-white font-bold text-sm">{review.name}</p>
             </div>
        )}
      </div>
    </div>
  );
}