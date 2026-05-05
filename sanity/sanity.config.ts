import { buildLegacyTheme, defineConfig } from 'sanity'
import { DocumentIcon, TagIcon, UserIcon } from '@sanity/icons'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const studioTheme = buildLegacyTheme({
  '--font-family-base': 'Inter, system-ui, sans-serif',
  '--font-family-monospace': 'IBM Plex Mono, monospace',
  '--black': '#0b1020',
  '--white': '#ffffff',
  '--brand-primary': '#2e88ff',
  '--component-bg': '#ffffff',
  '--component-text-color': '#242b3d',
  '--default-button-color': '#eef2f7',
  '--default-button-primary-color': '#2e88ff',
  '--default-button-success-color': '#0f9d58',
  '--default-button-warning-color': '#f59e0b',
  '--default-button-danger-color': '#ef4444',
  '--focus-color': '#54a6ff',
  '--gray-base': '#647089',
  '--gray': '#8a98ad',
  '--main-navigation-color': '#0b1020',
  '--main-navigation-color--inverted': '#ffffff',
  '--state-info-color': '#2e88ff',
  '--state-success-color': '#0f9d58',
  '--state-warning-color': '#f59e0b',
  '--state-danger-color': '#ef4444',
})

export default defineConfig({
  name: 'default',
  title: 'My Blog Studio',
  theme: studioTheme,

  // Replace these with your actual values from sanity.io/manage
  projectId: 'zuqdzxq7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Library')
          .items([
            S.listItem().title('Posts').icon(DocumentIcon).schemaType('post').child(
              S.documentList().title('Posts').filter('_type == "post"')
                .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
            ),
            S.listItem().title('Authors').icon(UserIcon).schemaType('author').child(
              S.documentList().title('Authors').filter('_type == "author"')
            ),
            S.listItem().title('Categories').icon(TagIcon).schemaType('category').child(
              S.documentList().title('Categories').filter('_type == "category"')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
