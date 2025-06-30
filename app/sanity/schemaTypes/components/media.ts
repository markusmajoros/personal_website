import { defineField, defineType } from 'sanity';

export const mediaType = defineType({
  name: 'media',
  title: 'Medien',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: ['image', 'video'],
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Bild',
      hidden: ({parent}) => parent?.type !== 'image',
    }),
    defineField({
      name: 'video',
      type: 'file',
      title: 'Video',
      hidden: ({parent}) => parent?.type !== 'video',
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