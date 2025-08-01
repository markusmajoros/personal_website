import type { Route } from "./+types/trips";
import { getTrips } from "~/sanity/client";
import { Link } from "react-router";
import { urlFor } from "~/sanity/sanityImageUrl";

export async function loader() {
  const trips = await getTrips();
  return {
    date: new Date(),
    trips,
  };
}

export default function SingleTrip({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Meine Reisen</h1>
      <p>Hier findest du eine Übersicht meiner Reisen.</p>
      {loaderData.trips.map((trip, idx) => (
        <div key={trip._id}>
          <Link to={`/trips/${trip.slug.current}`}>
            <h2>{trip.title}</h2>
          </Link>
          <p>{trip.shortText}</p>
          {trip.image?.asset && (
            <img
              src={urlFor(trip.image).width(1000).auto("format").url()}
              alt={trip.title}
              style={{ maxWidth: "80%" }}
            />
          )}
          {idx < loaderData.trips.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600,s-maxage=7200",
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meine Reisen" },
    {
      name: "description",
      content:
        "Eine Übersicht über meine Reisen durch verschiedene Länder und Regionen.",
    },
  ];
}
