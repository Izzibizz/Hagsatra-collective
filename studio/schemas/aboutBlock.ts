import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'aboutBlock',
  title: 'about',
  type: 'object',
  fields: [
    defineField({
      name: 'H2',
      title: 'H2',
      type: 'string',
    }),
    defineField({
      name: 'titleImage',
      title: 'titleImage',
      type: 'url',
    }),
    defineField({
      name: 'IntroText',
      title: 'IntroText',
      type: 'string',
    }),
    defineField({
      name: 'historyText',
      title: 'historyText',
      type: 'string',
    }),
    defineField({
      name: 'members',
      title: 'Medlemmar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Namn',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Roll',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Länk',
              type: 'url',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'ImageUrl',
      title: 'Extra picture - describing us - image URL',
      type: 'url',
    }),
    defineField({
      name: 'thanksTo',
      title: 'Tack till',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Länk',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: 'blank',
                    title: 'Öppna i ny flik',
                    type: 'boolean',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
        defineField({
      name: "bannerImageUrl",
      title: "Banner image URL",
      type: "string",
    }),
  ],
})
