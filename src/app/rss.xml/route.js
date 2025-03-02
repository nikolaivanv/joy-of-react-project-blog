export const dynamic = "force-static";

import { buildRssXml } from "@/helpers/rss-helpers";
import { headers } from "next/headers";

export async function GET(request) {
  const xml = await buildRssXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
