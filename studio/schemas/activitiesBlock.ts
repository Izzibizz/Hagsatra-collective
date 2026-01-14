import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'activitiesBlock',
  title: 'activities',
  type: 'object',
  fields: [
    /* ===== ACTIVITIES ===== */
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'object',
      fields: [
        {
          name: 'h3',
          title: 'Rubrik (H3)',
          type: 'string',
        },
        {
          name: 'titleImageMobile',
          title: 'titleImage for mobile',
          type: 'url',
        },
         {
          name: 'titleImageLaptop',
          title: 'titleImage for laptop',
          type: 'url',
        },
        {
          name: 'body',
          title: 'Text',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'},
              ],
              marks: {
                decorators: [
                  {title: 'Bold', value: 'strong'},
                  {title: 'Italic', value: 'em'},
                ],
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                      },
                      {
                        name: 'blank',
                        type: 'boolean',
                        title: 'Öppna i ny flik',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'url',
                  options: {hotspot: true},
                },
                {
                  name: 'caption',
                  title: 'Bildtext',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),

    /* ===== EXHIBITIONS ===== */
    defineField({
      name: 'exhibitions',
      title: 'Exhibitions',
      type: 'object',
      fields: [
        {
          name: 'h3',
          title: 'Rubrik (H3)',
          type: 'string',
        },
        {
          name: 'body',
          title: 'Text',
          type: 'text',
        },
        {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Image',
                  type: 'url',
                },
                {
                  name: 'caption',
                  title: 'Bildtext',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
