import { defineType, defineField } from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Wall of Love (Reviews)',
  type: 'document',
  fields: [
    // حقل جديد لرفع لقطة الشاشة
    defineField({ 
      name: 'screenshot', 
      title: 'Review Screenshot', 
      type: 'image', 
      options: { hotspot: true },
      validation: Rule => Rule.required().error('يجب رفع لقطة شاشة للرأي')
    }),
    defineField({ name: 'name', title: 'Reviewer Name (Optional text shown below image)', type: 'string' }),
    defineField({ 
      name: 'type', 
      title: 'Platform Type', 
      type: 'string',
      options: {
        // القائمة الجديدة للمنصات
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'Gumroad', value: 'gumroad' },
          { title: 'Reddit', value: 'reddit' },
          { title: 'Telegram', value: 'telegram' },
          { title: 'Gmail / Email', value: 'email' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    // حقل اختياري لتقييم Gumroad
    defineField({ name: 'rating', title: 'Rating (1-5) (Gumroad only)', type: 'number', hidden: ({document}) => document?.type !== 'gumroad' }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'screenshot'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Screenshot Review',
        subtitle: `Platform: ${subtitle}`,
        media: media
      }
    }
  }
})