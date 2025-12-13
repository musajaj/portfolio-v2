// 1. استعلام البروفايل (مع الإعدادات الجديدة)
export const profileQuery = `*[_type == "profile"] | order(_updatedAt desc)[0]{
  name,
  nameAr,
  role,
  roleAr,
  headline,
  subHeadline,
  aboutText,
  "avatar": profileImage.asset->url,
  tags,
  email,
  socials,
  offerConfig,       
  painMatrixConfig,  
  roiConfig          
}`;

// 2. استعلام المشاريع (مع السعر)
export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  title,
  "slug": slug.current,
  shortDesc,
  fullDesc,
  features,
  downloadCount,
  externalLink,
  featured,
  category,
  price,             
  "image": mainImage.asset->url
}`;

// 3. استعلام المقالات
export const articlesQuery = `*[_type == "article"] | order(order asc)`;

// 4. استعلام الإحصائيات
export const statsQuery = `*[_type == "stat"] | order(order asc)`;

// 5. استعلام المراجعات (مع الصور)
export const reviewsQuery = `*[_type == "review"] | order(_createdAt desc) {
  _id,
  name,
  type,
  rating,
  text,
  date,
  handle,
  "screenshotUrl": screenshot.asset->url
}`;

// 6. استعلام الخدمات (الجديد)
export const servicesQuery = `*[_type == "service"] | order(order asc)`;