import { defineType, defineField } from "sanity";

export const tripType = defineType({
  name: "trip",
  title: "Trip",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Adventure", value: "Adventure" },
          { title: "Relaxation", value: "Relaxation" },
          { title: "Cultural", value: "Cultural" },
          { title: "Nature", value: "Nature" },
        ],
      },
    }),
    defineField({
      name: "shortText",
      type: "text",
    }),
    defineField({
      name: "startDate",
      type: "date",
    }),
    defineField({
      name: "endDate",
      type: "date",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }, { type: "horizontalRule" }, { type: "media" }],
    }),
    defineField({
      name: "stations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "shortText",
              type: "text",
            }),
            defineField({
              name: "content",
              type: "array",
              of: [
                { type: "block" },
                { type: "horizontalRule" },
                { type: "media" },
              ],
            }),
            defineField({
              name: "image",
              type: "image",
            }),
            defineField({
              name: "startDate",
              type: "date",
            }),
            defineField({
              name: "endDate",
              type: "date",
            }),
          ],
        },
      ],
    }),
  ],
});
