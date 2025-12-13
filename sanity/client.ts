import { createClient } from "@sanity/client"; // 👈 استخدمنا المكتبة الصحيحة

// ⚠️ استبدل هذا الكود بكود مشروعك الحقيقي
const PROJECT_ID = "0cijksod"; 

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // يجب أن يكون false لضمان عمل البروكسي
  
  // 👇 منطق النفق الذكي
  // إذا كان الموقع مرفوعاً (ليس localhost)، نستخدم رابط النفق عبر Netlify
  // وإذا كنت تعمل على جهازك، نستخدم الرابط المباشر
  apiHost: typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? window.location.origin + '/sanity-proxy'
    : `https://${PROJECT_ID}.api.sanity.io`,
});