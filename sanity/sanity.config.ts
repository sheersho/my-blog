import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'My Blog',

  // Replace these with your actual values from sanity.io/manage
  projectId: 'zuqdzxq7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Posts').schemaType('post').child(
              S.documentList().title('Posts').filter('_type == "post"')
                .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
            ),
            S.listItem().title('Authors').schemaType('author').child(
              S.documentList().title('Authors').filter('_type == "author"')
            ),
            S.listItem().title('Categories').schemaType('category').child(
              S.documentList().title('Categories').filter('_type == "category"')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
