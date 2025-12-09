import React from 'react';
import { products as defaultProducts } from '../lib/data';
import ProductCard from './ProductCard';
import { Project } from '../types';

export default function ProductStore({ projects }: { projects?: Project[] }) {
  
  const displayProducts = projects && projects.length > 0 
    ? projects.map(p => ({
        id: p.slug,
        title: p.title,
        category: p.category,
        image: p.image,
        downloads: parseInt(p.downloadCount) || 0,
        rating: 5,
        isRecommended: p.featured,
        price: p.price || 'Free',
        link: p.externalLink,
        // ⬇️ التعديل الجديد: تمرير الوصف المختصر
        description: p.shortDesc || "No description available."
      }))
    : defaultProducts.map(p => ({
        ...p,
        description: "وصف تجريبي للمشروع يوضح أهم المميزات والخصائص..." // وصف افتراضي للبيانات القديمة
    }));

  return (
    <section id="projects" className="py-24 px-4 relative z-10 bg-zinc-950/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            أنظمة رقمية <span className="text-blue-500">مُهندسة للنجاح.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            اختر الأداة التي تناسب طموحك. جميع القوالب مصممة بعناية وتشمل تحديثات مجانية مدى الحياة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => (
            <div key={product.id} className="h-full">
               {/* نمرر المنتج كاملاً مع الوصف الجديد */}
               <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}