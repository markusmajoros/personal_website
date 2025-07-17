// sanity.js
import { createClient } from "@sanity/client";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: "hqcxhqqf",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2025-02-06", // use current date (YYYY-MM-DD) to target the latest API version. Note: this should always be hard coded. Setting API version based on a dynamic value (e.g. new Date()) may break your application at a random point in the future.
  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content, accessing drafts or using draft perspectives
});

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPages() {
  const pages = await client.fetch('*[_type == "page"]');
  return pages;
}

export async function getTrips() {
  const trips = await client.fetch(`
    *[_type == "trip"]{
      _id,
      title,
      slug,
      shortText,
      image {
        asset->{url}
      }
    }
  `);
  return trips;
}

export async function getTrip(slug: string) {
  const trip = await client.fetch(
    `*[_type == "trip" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      category,
      shortText,
      startDate,
      endDate,
      image {
        asset->{url}
      },
      content[]{
        ...,
      },
      stations[]{
        _key,
        title,
        shortText,
        content[]{
          ...,
        },
        image {
          asset->{url}
        }
      }
    }`,
    { slug }
  );
  return trip;
}
