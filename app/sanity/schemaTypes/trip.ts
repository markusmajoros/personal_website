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
          { title: "Adventure", value: "adventure" },
          { title: "Relaxation", value: "relaxation" },
          { title: "Cultural", value: "cultural" },
          { title: "Nature", value: "nature" },
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
      of: [{ type: "block" }],
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
              of: [{ type: "block" }],
            }),
            defineField({
              name: "image",
              type: "image",
            }),
          ],
        },
      ],
    }),
  ],
});
