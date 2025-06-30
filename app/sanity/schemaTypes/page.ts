import { defineType, defineField } from 'sanity';

export const pageType = defineType({
    name: 'page',
    title: 'Seite',
    type: 'document',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        type: 'string',
      }),
      defineField({
        name: 'image',
        type: 'image',
      }),
      defineField({
        name: 'content',
        type: 'array',
        of: [{type: 'block'}],
      }),
    ],
  })
  