
import { defineType, defineField } from "sanity";

export default defineType({
  name: "introductionBlock",
  title: "introductionBlock",
  type: "object",
  fields: [
    defineField({
      name: "texts",
      title: "Texts",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "interval",
      title: "Interval (ms)",
      type: "number",
      initialValue: 3000,
    }),
     defineField({
      name: "introImage",
      title: "image URL",
      type: "string",
    }),
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
