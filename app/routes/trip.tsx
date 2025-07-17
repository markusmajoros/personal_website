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
      <p>Category: {loaderData.trip.category}</p>
      <p>{loaderData.trip.shortText}</p>
      <div>
        <PortableText value={loaderData.trip.content} />
      </div>
      <img
        src={loaderData.trip.image?.asset?.url}
        alt={loaderData.trip.title}
        style={{ maxWidth: "300px" }}
      />
      <p>Start Date: {loaderData.trip.startDate}</p>
      <p>End Date: {loaderData.trip.endDate}</p>
      <h2>Stations</h2>
      <div>
        {loaderData.trip.stations.map((station) => (
          <div key={station._key}>
            <h3>{station.title}</h3>
            {station.image?.asset?.url && (
              <img
                src={station.image.asset.url}
                alt={station.title}
                style={{ maxWidth: "200px" }}
              />
            )}{" "}
            <p>{station.shortText}</p>
            <div>
              <PortableText value={station.content} />
            </div>
          </div>
        ))}
      </div>
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
    { title: "Reise" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
