import { createClient } from "@sanity/client";

// استبدل هذا بالكود الخاص بك
const PROJECT_ID = "0cijksod"; 

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, 
  // نستخدم الشرطية: إذا كنا في Localhost نستخدم الرابط المباشر، وإذا رفعنا الموقع نستخدم البروكسي
  apiHost: typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? `https://${PROJECT_ID}.api.sanity.io`
    : '/sanity-proxy', // استخدام المسار النسبي مباشرة أكثر أماناً
});