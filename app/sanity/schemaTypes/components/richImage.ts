import { defineField, defineType } from 'sanity';

export const richImageType = defineType({
  name: 'richImage',
  title: 'Medien',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Bild',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Bildunterschrift',
    }),
  ],
})