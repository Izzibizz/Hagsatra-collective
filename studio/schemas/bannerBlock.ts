import { defineType, defineField } from "sanity";

export default defineType({
  name: "bannerBlock",
  title: "Banner",
  type: "object",
  fields: [
    defineField({
      name: "imageUrl",
      title: "Banner image URL",
      type: "string",
    }),
  ],
});
