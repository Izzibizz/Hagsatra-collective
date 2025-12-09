import { defineType, defineField } from "sanity";

export default defineType({
  name: "videoBlock",
  title: "Video Block",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Video URL",
      type: "url",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
});
