import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import { url } from "../lib/path";

export async function GET(context) {
  const me = (await getEntry("profile", "me")).data;
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: `${me.name} — Blog`,
    description:
      "Notes on system design, performance, AI-native engineering and the craft of shipping software.",
    site: new URL(url("/"), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.pubDate,
      categories: [post.data.cat],
      link: url(`/blog/${post.id}`),
    })),
    customData: `<language>en-us</language>`,
  });
}
