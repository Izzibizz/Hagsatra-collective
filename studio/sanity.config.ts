import {defineConfig} from 'sanity'
import {documentInternationalization} from '@sanity/document-internationalization'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Hagsätra Collective',

  projectId: '20j0pl7m',
  dataset: 'production',

  plugins: [
    documentInternationalization({
      supportedLanguages: [
        {id: 'sv', title: 'Svenska'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['page'],
      languageField: 'language',
      weakReferences: true,
    }),
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
