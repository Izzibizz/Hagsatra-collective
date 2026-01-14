import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'studiosBlock',
  title: 'Studios',
  type: 'object',
  fields: [
    defineField({
      name: 'imageUrl',
      title: 'planning image URL',
      type: 'string',
    }),
    defineField({
      name: 'h2MobileImageUrl',
      title: 'h2 text image URL for mobile',
      type: 'string',
    }),
    defineField({
      name: 'h2LaptopImageUrl',
      title: 'h2 text image URL for laptop',
      type: 'string',
    }),
     defineField({
      name: 'h2AvailableMobileImageUrl',
      title: 'h2 available text image URL for mobile',
      type: 'string',
    }),
    defineField({
      name: 'h2AvailableLaptopImageUrl',
      title: 'h2 available text image URL for laptop',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'description of studio spaces',
      type: 'string',
    }),
    
    defineField({
      name: 'availability',
      title: 'Are there any studios available right now?',
      type: 'string',
      options: {
        list: [
          {title: 'Yes', value: 'yes'},
          {title: 'No', value: 'no'},
        ],
        layout: 'radio', // valfritt: gör det till radioknappar istället för dropdown
      },
      initialValue: 'no', // valfritt: defaultvärde
    }),
    defineField({
      name: 'availableStudios',
      title: 'Available Studios',
      type: 'array',
      of: [
        {
          name: 'studio',
          title: 'Studio',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'size',
              title: 'Size (kvm)',
              type: 'number',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'price',
              title: 'Price (per month)',
              type: 'number',
            }),
            defineField({
              name: 'availableFrom',
              title: 'Available From',
              type: 'date',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'locationImageUrl',
      title: 'location image URL',
      type: 'string',
    }),
    defineField({
      name: 'bannerImageUrl',
      title: 'banner image URL',
      type: 'string',
    }),
  ],
})
