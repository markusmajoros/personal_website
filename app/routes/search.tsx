import type { Route } from "./+types/search";
import { useLoaderData, Link } from "react-router";
import { client } from "~/sanity/client";
import { urlFor } from "~/sanity/sanityImageUrl";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  if (!searchTerm) {
    return { results: [], searchTerm: "" };
  }

  // Query for trips where trip-level fields match
  const tripQuery = `*[_type == "trip" && (
    title match "*" + $searchTerm + "*" ||
    shortText match "*" + $searchTerm + "*" ||
    pt::text(content) match "*" + $searchTerm + "*"
  )] {
    _id,
    title,
    _type,
    "slug": slug.current,
    shortText,
    image,
    startDate,
    endDate,
    "resultType": "trip"
  }`;

  // Query for stations within trips
  const stationQuery = `*[_type == "trip"] {
    "tripSlug": slug.current,
    "tripTitle": title,
    "tripImage": image,
    "stations": stations[] {
      "_key": _key,  
      title,
      shortText,
      image,
      startDate,
      endDate,
      "matches": title match "*" + $searchTerm + "*" ||
                 shortText match "*" + $searchTerm + "*" ||
                 pt::text(content) match "*" + $searchTerm + "*"
    }
  }[count(stations[matches == true]) > 0]`;

  // Query for pages
  const pageQuery = `*[_type == "page" && (
    title match "*" + $searchTerm + "*" ||
    pt::text(content) match "*" + $searchTerm + "*"
  )] {
    _id,
    title,
    _type,
    "slug": slug.current,
    image,
    "resultType": "page"
  }`;

  const [tripResults, stationResults, pageResults] = await Promise.all([
    client.fetch(tripQuery, { searchTerm }),
    client.fetch(stationQuery, { searchTerm }),
    client.fetch(pageQuery, { searchTerm }),
  ]);

  // Flatten station results
  const flattenedStations = stationResults.flatMap((trip: any) =>
    trip.stations
      .map((station: any, index: number) => ({
        station,
        index,
        matches: station.matches,
      }))
      .filter((item: any) => item.matches)
      .map((item: any) => ({
        _id: `${trip.tripSlug}-station-${item.index}`,
        title: item.station.title,
        _type: "station",
        tripSlug: trip.tripSlug,
        tripTitle: trip.tripTitle,
        stationKey: item.station._key,
        shortText: item.station.shortText,
        image: item.station.image || trip.tripImage,
        startDate: item.station.startDate,
        endDate: item.station.endDate,
        resultType: "station",
      })),
  );

  // Combine all results
  const results = [...tripResults, ...flattenedStations, ...pageResults];

  return { results, searchTerm };
}

function formatDateEu(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

export default function Search({ loaderData }: Route.ComponentProps) {
  const { results, searchTerm } = useLoaderData();

  const getResultLink = (item: any) => {
    if (item._type === "trip" || item.resultType === "trip") {
      return `/trips/${item.slug}`;
    } else if (item._type === "station" || item.resultType === "station") {
      return `/trips/${item.tripSlug}/stations/${item.stationKey}`;
    } else {
      return `/${item.slug}`;
    }
  };

  const getResultTypeLabel = (item: any) => {
    if (item._type === "trip" || item.resultType === "trip") {
      return "Reise";
    } else if (item._type === "station" || item.resultType === "station") {
      return `Station in ${item.tripTitle}`;
    } else {
      return "Seite";
    }
  };

  return (
    <div>
      <h1>Ergebnisse für "{searchTerm}"</h1>
      {results.length > 0 ? (
        <div className="searchResults">
          {results.map((item) => (
            <Link
              key={item._id}
              to={getResultLink(item)}
              className="searchResultCard"
            >
              <div className="searchCard">
                {item.image?.asset && (
                  <div className="searchCardImage">
                    <img
                      src={urlFor(item.image)
                        .width(400)
                        .height(250)
                        .auto("format")
                        .url()}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="searchCardContent">
                  <div className="searchCardType">
                    {getResultTypeLabel(item)}
                  </div>
                  <h2>{item.title}</h2>
                  {item.startDate && item.endDate && (
                    <div className="searchCardDates">
                      {formatDateEu(item.startDate)} -{" "}
                      {formatDateEu(item.endDate)}
                    </div>
                  )}
                  {item.shortText && (
                    <p className="searchCardText">{item.shortText}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>Leider nichts gefunden.</p>
      )}
    </div>
  );
}

export function headers() {
  return {
    "Cache-Control":
      "max-age=3600,s-maxage=7200,stale-while-revalidate=2592000",
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Suche" },
    { name: "description", content: "Das ist die Suchseite." },
  ];
}
