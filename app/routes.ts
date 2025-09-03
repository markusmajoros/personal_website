import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("admin/*", "routes/admin.tsx"),

  layout("routes/siteLayout.tsx", [
    index("routes/home.tsx"),
    route("trips/", "routes/trips.tsx"),
    route("trips/:slug", "routes/trip.tsx"),
    route("trips/:slug/stations/:stationKey", "routes/station.tsx"),
    route("imprint/", "routes/imprint.tsx"),
    route("privacy-policy/", "routes/privacyPolicy.tsx"),
    route("about/", "routes/about.tsx"),
  ]),
] satisfies RouteConfig;
