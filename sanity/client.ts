import { createClient } from "@sanity/client";

// ⚠️ هام جداً: تأكد أن هذا هو الكود الصحيح لمشروعك
// (انسخه من sanity.config.ts أو من لوحة تحكم sanity)
const PROJECT_ID = "0cijksod"; // 👈 استبدل هذا بكودك الحقيقي الآن!

// دالة مساعدة لمعرفة هل نحن في وضع التطوير أم النشر
function getApiHost() {
  // إذا كنا نشغله على السيرفر (Build time)
  if (typeof window === 'undefined') {
    return `https://${PROJECT_ID}.api.sanity.io`;
  }

  // إذا كنا في وضع التطوير (Localhost)
  if (window.location.hostname === 'localhost') {
    return `https://${PROJECT_ID}.api.sanity.io`;
  }

  // إذا كنا في الموقع المنشور (Production) -> استخدم البروكسي
  // هذا السطر يضمن بناء رابط كامل وصحيح
  return `${window.location.origin}/sanity-proxy`;
}

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // يجب أن يكون false
  apiHost: getApiHost(), // استخدام الدالة الذكية
});