import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactBlock',
  title: 'contact',
  type: 'object',
  fields: [
    defineField({
      name: 'mail',
      title: 'mail',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'instagram link',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'adress',
      type: 'object',
      fields: [
        {name: 'street', title: 'Gata', type: 'string'},
        {name: 'postalCode', title: 'Postnummer', type: 'string'},
        {name: 'city', title: 'Stad', type: 'string'},
        {name: 'country', title: 'Land', type: 'string'},
        {
          name: 'location',
          title: 'Plats (karta)',
          type: 'geopoint',
        },
      ],
    }),
  ],
})
