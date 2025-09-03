import type { Route } from "./+types/home";

export default function About({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <img
        src="/images/markus_cv.jpg"
        loading="lazy"
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "20px auto",
        }}
      ></img>
      <a href="/markus_cv.pdf" download style={{ fontSize: "18px" }}>
        als PDF herunterladen
      </a>
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
  return [{ title: "About" }, { name: "description", content: "" }];
}
