import { defineType, defineField } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Personal Profile',
  type: 'document',
  fields: [
    // ⬇️ قسم العرض الخاص ⬇️
    defineField({
      name: 'offerConfig',
      title: 'Special Offer Settings (Commitment Switch)',
      type: 'object',
      fields: [
        defineField({ 
          name: 'isActive', 
          title: 'Is Offer Active?', 
          type: 'boolean', 
          initialValue: true,
          description: 'Toggle this off to hide the discount card.'
        }),
        defineField({ 
          name: 'title', 
          title: 'Offer Title', 
          type: 'string', 
          initialValue: 'تم تفعيل عرض الطالب المميز!' 
        }),
        defineField({ 
          name: 'discountCode', 
          title: 'Discount Code', 
          type: 'string',
          initialValue: 'STUDENT50'
        }),
        defineField({ 
          name: 'discountPercent', 
          title: 'Discount Percentage', 
          type: 'string',
          initialValue: '50%'
        }),
        defineField({ 
          name: 'offerLink', 
          title: 'Offer Link', 
          type: 'url',
          description: 'Link to Gumroad or Checkout page'
        }),
      ]
    }),
    defineField({ name: 'name', title: 'Name (English)', type: 'string' }),
    defineField({ name: 'nameAr', title: 'Name (Arabic)', type: 'string' }),
    defineField({ name: 'role', title: 'Role (English)', type: 'string' }),
    defineField({ name: 'roleAr', title: 'Role (Arabic)', type: 'string' }),
    defineField({ name: 'headline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'subHeadline', title: 'Sub Headline', type: 'text' }),
    defineField({ name: 'aboutText', title: 'About Me Text', type: 'text' }),
    defineField({ name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
    // ... (بعد offerConfig)

    // 1. إعدادات مصفوفة الألم (Pain Matrix)
    defineField({
      name: 'painMatrixConfig',
      title: 'Pain Matrix Settings',
      type: 'object',
      fields: [
        defineField({ name: 'successTitle', title: 'Success Message Title', type: 'string', initialValue: 'لقد قضيت على كل المشاكل! 🎉' }),
        defineField({ name: 'successDesc', title: 'Success Message Description', type: 'text', initialValue: 'أنت جاهز الآن لبدء حياة جديدة.' }),
        defineField({ name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'احصل على النظام الكامل' }),
        defineField({ name: 'ctaLink', title: 'Button Link (Optional)', type: 'url' }),
      ]
    }),

    // 2. إعدادات حاسبة العائد (ROI Calculator)
    defineField({
      name: 'roiConfig',
      title: 'ROI Calculator Settings',
      type: 'object',
      fields: [
        defineField({ name: 'ctaText', title: 'Button Text', type: 'string', initialValue: 'احصل على UniStack الآن' }),
        defineField({ name: 'ctaLink', title: 'Button Link (Optional)', type: 'url' }),
      ]
    }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ 
      name: 'tags', 
      title: 'Skills/Tags', 
      type: 'array', 
      of: [{ type: 'string' }] 
    }),
    defineField({ 
      name: 'socials', 
      title: 'Social Links', 
      type: 'object', 
      fields: [
          { name: 'notionArabs', title: 'Notion Arabs URL', type: 'url' },
          { name: 'facebook', title: 'Facebook URL', type: 'url' },
          { name: 'whatsapp', title: 'WhatsApp URL', type: 'url' },
          { name: 'telegram', title: 'Telegram Handle', type: 'url' }
      ]
    }),
  ],
})
