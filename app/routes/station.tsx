import type { Route } from "./+types/station";

import { getTrip, client } from "~/sanity/client";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router";

const portableTextComponents = {
  types: {
    media: ({ value }: any) => {
      if (value.type === "image" && value.image?.asset?.url) {
        const imageUrl = value.image.asset.url;
        return (
          <figure>
            <img
              src={imageUrl}
              alt={value.alt || "Content Image"}
              loading="lazy"
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "20px auto",
              }}
            />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      }

      if (value.type === "video" && value.video?.asset?.url) {
        return (
          <figure>
            <video
              controls
              preload="metadata"
              style={{ maxWidth: "100%", height: "auto", display: "block" }}
            >
              <source
                src={value.video.asset.url}
                type={value.video.asset.mimeType || "video/mp4"}
              />
              Dein Browser unterstützt das Video-Tag nicht.
            </video>
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      }

      // Fallback für unbekannte Medientypen
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            margin: "20px 0",
          }}
        >
          <p>Unbekannter Medientyp: {value.type}</p>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </div>
      );
    },
  },
};

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug || !params.stationKey) {
    throw new Response("Not Found", { status: 404 });
  }

  const trip = await getTrip(params.slug);

  if (!trip) {
    throw new Response("Not Found", { status: 404 });
  }

  const station = trip.stations.find((s: any) => s._key === params.stationKey);

  if (!station) {
    throw new Response("Station Not Found", { status: 404 });
  }

  return {
    date: new Date(),
    trip,
    station,
  };
}

export default function SingleStation({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Station: {loaderData.station.title}</h1>
      <p>
        Gehört zur Reise:{" "}
        <Link to={`/trips/${loaderData.trip.slug.current}`}>
          {loaderData.trip.title}
        </Link>
      </p>
      {loaderData.station.image?.asset?.url && (
        <img
          src={loaderData.station.image.asset.url}
          alt={loaderData.station.title}
          style={{ maxWidth: "90%" }}
        />
      )}
      <p>{loaderData.station.shortText}</p>
      <div>
        <PortableText
          value={loaderData.station.content}
          components={portableTextComponents}
        />
      </div>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600,s-maxage=7200",
  };
}

export function meta({ data }: Route.MetaArgs) {
  const trip = data?.trip;
  const station = data?.station;

  return [
    {
      title: `${station?.title}`,
    },
    {
      name: "description",
      content: station?.shortText
        ? station.shortText
        : `Station aus der Reise "${trip?.title}".`,
    },
  ];
}
