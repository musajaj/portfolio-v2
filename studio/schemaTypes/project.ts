import { defineType, defineField } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'shortDesc', title: 'Short Description', type: 'string' }),
    defineField({ name: 'fullDesc', title: 'Full Description', type: 'text' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'downloadCount', title: 'Download Count (e.g. 500+)', type: 'string' }),
    // ⬇️ أضف هذا الحقل الجديد ⬇️
    defineField({ 
      name: 'price', 
      title: 'Price', 
      type: 'string', 
      description: 'اكتب السعر مع العملة (مثلاً: $29) أو اكتب Free',
      initialValue: 'Free'
    }),
    defineField({ name: 'externalLink', title: 'Product Link (Gumroad/Notion)', type: 'url' }),
    defineField({ name: 'featured', title: 'Is Featured? (Border Beam)', type: 'boolean' }),
    defineField({ 
      name: 'features', 
      title: 'Key Features', 
      type: 'array', 
      of: [{ type: 'string' }] 
    }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
  ],
})