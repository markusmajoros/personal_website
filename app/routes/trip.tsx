import type { Route } from "./+types/home";
import { Welcome } from "../../welcome/welcome";
import { getPages, getTrip } from "~/sanity/client";
import { PortableText } from "@portabletext/react";

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

export default function SingleTrip({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.trip.title}</h1>
      <p>{loaderData.trip.shortText}</p>
      <div>
        <PortableText value={loaderData.trip.content} />
      </div>
      <img src={loaderData.trip.image?.url} alt={loaderData.trip.title} />
      <p>Start Date: {loaderData.trip.startDate}</p>
      <p>End Date: {loaderData.trip.endDate}</p>
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
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
