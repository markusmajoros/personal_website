import type { Route } from "./+types/home";
import { Welcome } from "../../welcome/welcome";
import { getPages, getTrip, getTrips } from "~/sanity/client";
import { PortableText } from "@portabletext/react";
import { Link } from "react-router";

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
      {loaderData.trips.map((trip) => (
        <div key={trip._id}>
          <Link to={`/trips/${trip.slug.current}`}>
            <h2>{trip.title}</h2>
          </Link>
          {trip.image?.asset?.url && (
            <img
              src={trip.image.asset.url}
              alt={trip.title}
              style={{ maxWidth: "80%" }}
            />
          )}
          <p>{trip.shortText}</p>
        </div>
      ))}
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control": "max-age: 3600,s-maxage: 7200",
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
