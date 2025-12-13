import { createClient } from "@sanity/client";

export const client = createClient({
  // تأكد أن هذا هو الـ ID الصحيح لمشروعك
  projectId: "0cijksod", 
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // نغلق الـ CDN لضمان وصول التحديثات فوراً
});