"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Download, ShieldCheck, Tag } from "lucide-react";
import MagneticBuyButton from "./MagneticBuyButton";

const ROTATION_RANGE = 20;

export default function ProductCard({ product }: { product: any }) {
  const ref = useRef<HTMLDivElement>(null);

  // --- منطق الحركة ثلاثية الأبعاد (لا نلمسه للحفاظ على الأنميشن) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale3d(1, 1, 1)`;
  const glareX = useSpring(0, { stiffness: 300, damping: 30 });
  const glareY = useSpring(0, { stiffness: 300, damping: 30 });
  const glareBackground = useMotionTemplate`radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const rY = ((e.clientX - rect.left) / width - 0.5) * ROTATION_RANGE * 2; 
    const rX = ((e.clientY - rect.top) / height - 0.5) * -ROTATION_RANGE * 2;
    x.set(rX);
    y.set(rY);
    glareX.set(((e.clientX - rect.left) / width) * 100);
    glareY.set(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- منطق معالجة النصوص ---
  // قص الوصف ليكون بحد أقصى 250 حرفاً مع إضافة "..."
  const description = product.description?.length > 250 
    ? product.description.substring(0, 250) + "..." 
    : product.description;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className="relative group flex flex-col h-full min-h-[500px] rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl cursor-default overflow-hidden"
    >
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      {/* --- 1. الصورة (قياس موحد 16:9) --- */}
      <div 
        className="relative aspect-video w-full overflow-hidden bg-zinc-800 rounded-t-2xl border-b border-white/5 shrink-0"
        style={{ transform: "translateZ(20px)" }}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* تدرج لوني خفيف فوق الصورة لدمجها */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60"></div>
        
        {product.isRecommended && (
          <div 
            className="absolute top-3 right-3 bg-blue-500/20 border border-blue-500/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-lg z-20"
            style={{ transform: "translateZ(30px)" }}
          >
            <ShieldCheck size={12} />
            <span>موصى به</span>
          </div>
        )}
      </div>

      {/* --- 2. المحتوى --- */}
      <div 
        className="flex flex-col flex-1 p-6 relative z-10"
        style={{ transform: "translateZ(30px)" }} 
      >
        {/* المعلومات العلوية: الفئة + التحميلات */}
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/10">
              <Tag size={12} />
              <span className="font-semibold uppercase tracking-wider">{product.category}</span>
           </div>
           
           <span className="text-zinc-400 text-xs flex items-center gap-1.5 font-mono bg-white/5 px-2 py-1 rounded">
             <Download size={12} /> 
             {product.downloads.toLocaleString()}+
           </span>
        </div>

        {/* عنوان المشروع */}
        <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        {/* الوصف المختصر (الجديد) */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-4">
          {description}
        </p>

        {/* زر الشراء (في الأسفل دائماً) */}
        <div className="mt-auto pt-5 border-t border-white/5 relative z-20"> 
          <MagneticBuyButton 
            link={product.link} 
            price={product.price} 
            label="احصل عليه الآن" 
          />
        </div>
      </div>

      {/* --- Holographic Glare --- */}
      <motion.div
        style={{ background: glareBackground }}
        className="pointer-events-none absolute inset-0 rounded-2xl z-50 mix-blend-overlay opacity-75"
      />
      
      {/* Border Glow on Hover */}
      <div 
        className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/30 transition-colors pointer-events-none" 
        style={{ transform: "translateZ(50px)" }}
      />

    </motion.div>
  );
}