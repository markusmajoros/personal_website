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
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      type: "array",
      of: [
        { type: "block" },
        { type: "horizontalRule" },
        { type: "media" },
        { type: "youtube" },
      ],
    }),
    defineField({
      name: "stations",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: {
              title: "title",
              media: "image",
              type: "locationType",
            },
            prepare({ title, media, type }) {
              return {
                title: `${type === "route" ? "🚐" : "📍"} ${
                  title || "Unbenannte Station"
                }`,
                media,
              };
            },
          },
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "locationType",
              title: "Kartentyp",
              type: "string",
              initialValue: "marker",
              options: {
                layout: "radio",
                list: [
                  {
                    title: "📍 Einzelner Ort",
                    value: "marker",
                  },
                  {
                    title: "🚐 GPX-Route",
                    value: "route",
                  },
                ],
              },
            }),
            defineField({
              name: "geolocation",
              title: "Standort",
              type: "geopoint",
              hidden: ({ parent }) => parent?.locationType !== "marker",
            }),

            defineField({
              name: "gpxFile",
              title: "GPX-Datei",
              type: "file",
              hidden: ({ parent }) => parent?.locationType !== "route",
              options: {
                accept: ".gpx",
              },
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
                { type: "youtube" },
              ],
            }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
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
