import { defineType, defineField } from "sanity";

export default defineType({
  name: "welcomingBlock",
  title: "welcomingBlock",
  type: "object",
  fields: [
    defineField({
      name: "flickerImages",
      title: "flickerImages",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
    }),
      defineField({
      name: "h1",
      title: "h1",
      type: "string",
    }),
]})