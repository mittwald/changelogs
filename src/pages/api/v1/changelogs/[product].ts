import type { APIRoute } from "astro";
import { json } from "../../../../lib/api";
import { getSection, isProductKey } from "../../../../lib/changelogs";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const product = params.product;
  if (!product || !isProductKey(product)) {
    return json({ error: `Unbekanntes Produkt: ${product ?? ""}` }, 404);
  }

  const section = await getSection(product);
  return json({ data: section.entries }, 200, {
    "cache-control": "public, max-age=300",
  });
};
