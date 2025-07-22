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
      <h1>{loaderData.trip.title}</h1>
      <p>Kategorie: {loaderData.trip.category}</p>
      <p>{loaderData.trip.shortText}</p>
      {loaderData.trip.image?.asset && (
        <img
          src={urlFor(loaderData.trip.image).width(1000).auto("format").url()}
          alt={loaderData.trip.title}
          style={{ maxWidth: "80%" }}
        />
      )}
      <div>
        <PortableText value={loaderData.trip.content} />
      </div>
      <p>Startdatum: {formatDateEu(loaderData.trip.startDate)}</p>
      <p>Enddatum: {formatDateEu(loaderData.trip.endDate)}</p>
      <h2>Stationen</h2>
      <div>
        {loaderData.trip.stations.map((station, idx) => (
          <div key={station._key}>
            <Link
              to={`/trips/${loaderData.trip.slug.current}/stations/${station._key}`}
            >
              <h3>{station.title}</h3>
            </Link>
            {station.image?.asset && (
              <img
                src={urlFor(station.image).width(600).auto("format").url()}
                alt={station.title}
                style={{ maxWidth: "60%" }}
              />
            )}{" "}
            <p>{station.shortText}</p>
            <p>Von: {formatDateEu(station.startDate)}</p>
            <p>Bis: {formatDateEu(station.endDate)}</p>
            {idx < loaderData.trip.stations.length - 1 && <hr />}
          </div>
        ))}
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

  return [
    { title: "Reise" },
    {
      name: "description",
      content: `Erfahre mehr über meine Reise nach ${trip?.title}.`,
    },
  ];
}
