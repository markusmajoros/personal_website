import { defineField, defineType } from "sanity";

export const horizontalRuleType = defineType({
  name: "horizontalRule",
  title: "Trennlinie",
  type: "object",
  fields: [
    defineField({
      name: "dummy",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Trennlinie",
      };
    },
  },
});
