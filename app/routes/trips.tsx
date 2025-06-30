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
        <Link to={`/trips/${trip.slug.current}`} key={trip._id}>
          <h2>{trip.title}</h2>
          <p>{trip.shortText}</p>
        </Link>
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
  return [{ title: "Meine Reisen" }, { name: "description", content: "" }];
}
