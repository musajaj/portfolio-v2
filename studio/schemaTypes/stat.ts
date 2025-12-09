import { defineType, defineField } from 'sanity'

export const statType = defineType({
  name: 'stat',
  title: 'Statistics',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label (Arabic)', type: 'string' }),
    defineField({ name: 'value', title: 'Value (Number)', type: 'number' }),
    defineField({ name: 'suffix', title: 'Suffix (e.g. + or %)', type: 'string' }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: '1 for first item, 2 for second...' }),
  ],
})