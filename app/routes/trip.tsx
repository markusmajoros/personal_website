import type { Route } from "./+types/trip";

import { getTrip } from "~/sanity/client";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router";
import { urlFor } from "~/sanity/sanityImageUrl";

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const trip = await getTrip(params.slug);

  if (!trip) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    date: new Date(),
    trip,
  };
}

function formatDateEu(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

export default function SingleTrip({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="singletrip">
        <h1 style={{ textAlign: "center" }}>{loaderData.trip.title}</h1>
        {loaderData.trip.image?.asset && (
          <img
            src={urlFor(loaderData.trip.image)
              .width(1000)
              .height(630)
              .auto("format")
              .crop("focalpoint")
              .fit("crop")
              .url()}
            alt={loaderData.trip.title}
            style={{ maxWidth: "100%" }}
            loading="lazy"
          />
        )}
        <div className="tripText">
          <div>
            <PortableText value={loaderData.trip.content} />
          </div>
          <p>Kategorie: {loaderData.trip.category}</p>
          <p>Startdatum: {formatDateEu(loaderData.trip.startDate)}</p>
          <p>Enddatum: {formatDateEu(loaderData.trip.endDate)}</p>
        </div>
      </div>
      <h2 style={{ textAlign: "center" }}>Stationen</h2>
      <div className="stationlist">
        {loaderData.trip.stations.map((station) => (
          <div key={station._key}>
            <Link
              to={`/trips/${loaderData.trip.slug.current}/stations/${station._key}`}
            >
              <h3>{station.title}</h3>
            </Link>
            {station.image?.asset && (
              <img
                src={urlFor(station.image)
                  .width(1000)
                  .height(630)
                  .auto("format")
                  .crop("focalpoint")
                  .fit("crop")
                  .url()}
                alt={station.title}
                style={{ maxWidth: "100%" }}
                loading="lazy"
              />
            )}{" "}
            <div className="tripText">
              <p>{station.shortText}</p>
              <p>Von: {formatDateEu(station.startDate)}</p>
              <p>Bis: {formatDateEu(station.endDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control":
      "max-age=3600,s-maxage=7200,stale-while-revalidate=2592000",
  };
}

export function meta({ data }: Route.MetaArgs) {
  const trip = data?.trip;

  return [
    { title: "Reise" },
    {
      name: "description",
      content: `Erfahre mehr über meine Reise nach ${trip?.title}.`,
    },
  ];
}
