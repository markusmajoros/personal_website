import type { Route } from "./+types/home";
import { Welcome } from "../../welcome/welcome";
import { getPages } from "~/sanity/client";
import { PortableText } from "@portabletext/react";

export async function loader() {
  const pages = await getPages();
  return {
    date: new Date(),
    pages,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      {loaderData.pages.map((page) => (
        <div>
          <h2>{page.title}</h2>
          <div>
            <PortableText value={page.content} />
          </div>
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
    { title: "markusmajoros" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
