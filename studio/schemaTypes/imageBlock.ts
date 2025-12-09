import { defineType, defineField } from "sanity";

export default defineType({
  name: "imageBlock",
  title: "Image Block",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
});
