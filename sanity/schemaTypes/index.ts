import {defineType} from 'sanity'

const pageType = defineType({
  name: 'page',
  title: 'Seite',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'string',
    },
    {
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
})

export const schemaTypes = [pageType]
