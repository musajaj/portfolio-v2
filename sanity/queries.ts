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
  socials
}`;

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
export const articlesQuery = `*[_type == "article"] | order(order asc)`;
export const statsQuery = `*[_type == "stat"] | order(order asc)`;
// لاحظ إضافة جزء جلب رابط الصورة
export const reviewsQuery = `*[_type == "review"] | order(_createdAt desc) {
  _id,
  name,
  type,
  rating,
  "screenshotUrl": screenshot.asset->url
}`;