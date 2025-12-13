import { createClient } from "@sanity/client";

// ⚠️ استبدل هذا بالكود الحقيقي لمشروعك (تأكد منه!)
const PROJECT_ID = "0cijksod"; 

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // يجب أن يكون false ليعمل البروكسي
  
  // 👇 المنطق الجديد: صارم جداً
  apiHost: (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? `https://${PROJECT_ID}.api.sanity.io` // في جهازك: مباشر
    : `${window.location.origin}/sanity-proxy`, // في النت: نفق إجباري (رابط كامل)
});