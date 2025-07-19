import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("admin/*", "routes/admin.tsx"),
  route("trips/", "routes/trips.tsx"),
  route("trips/:slug", "routes/trip.tsx"),
  route("trips/:slug/stations/:stationKey", "routes/station.tsx"),
] satisfies RouteConfig;
