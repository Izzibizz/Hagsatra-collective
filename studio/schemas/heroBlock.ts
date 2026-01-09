import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "imageUrlMobile",
      title: "Background image URL - mobile version",
      type: "string",
    }),
        defineField({
      name: "imageUrlLaptop",
      title: "Background image URL - Laptop version",
      type: "string",
    }),
        defineField({
      name: "symbol",
      title: "image URL - symbol",
      type: "string",
    })

  ],
});
