import { defineType, defineField } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'link', title: 'Article URL', type: 'url' }),
    defineField({ name: 'date', title: 'Publish Year/Date', type: 'string' }),
    defineField({ name: 'order', title: 'Order ID', type: 'number', description: 'Used to sort articles (1, 2, 3...)' }),
  ],
})