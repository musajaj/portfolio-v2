import { defineType, defineField } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Service Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ 
      name: 'icon', 
      title: 'Icon Name', 
      type: 'string',
      description: 'Select an icon',
      options: {
        list: [
          { title: 'Layout / Design', value: 'layout' },
          { title: 'Brain / AI', value: 'brain' },
          { title: 'Code / Engineering', value: 'code' },
          { title: 'Pen / Content', value: 'pen' },
          { title: 'Database / Notion', value: 'database' },
          { title: 'Zap / Speed', value: 'zap' }
        ]
      }
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
})