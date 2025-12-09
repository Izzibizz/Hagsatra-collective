
import { defineType, defineField } from "sanity";

export default defineType({
  name: "textBlock",
  title: "Text Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
    }),
  ],
});
