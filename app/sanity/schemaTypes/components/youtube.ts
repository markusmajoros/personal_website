import { defineType, defineField } from "sanity";

export const youtubeType = defineType({
  name: "youtube",
  title: "YouTube Video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube URL",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Bildunterschrift",
    }),
  ],
});
