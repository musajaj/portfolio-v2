import { defineType, defineField } from 'sanity'

export const profileType = defineType({
  name: 'profile',
  title: 'Personal Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name (English)', type: 'string' }),
    defineField({ name: 'nameAr', title: 'Name (Arabic)', type: 'string' }),
    defineField({ name: 'role', title: 'Role (English)', type: 'string' }),
    defineField({ name: 'roleAr', title: 'Role (Arabic)', type: 'string' }),
    defineField({ name: 'headline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'subHeadline', title: 'Sub Headline', type: 'text' }),
    defineField({ name: 'aboutText', title: 'About Me Text', type: 'text' }),
    defineField({ name: 'profileImage', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
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
          { name: 'telegram', title: 'Telegram Handle', type: 'string' }
      ]
    }),
  ],
})