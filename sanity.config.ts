import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './app/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Website',

  projectId: 'hqcxhqqf',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
