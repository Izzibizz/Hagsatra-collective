import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'textBlock'},
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'heroBlock'},
        {type: 'bannerBlock'},
        {type: 'introductionBlock'},
        {type: 'welcomingBlock'},
        {type: 'contactBlock'},
        {type: 'aboutBlock'},
        {type: 'studiosBlock'},
      ],
    }),
  ],
})
