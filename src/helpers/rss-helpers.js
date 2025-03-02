import { getBlogPostList } from "./file-helpers";
import RSS from "rss";

async function buildRssXml() {
  const posts = await getBlogPostList();
  const feed = new RSS({
    title: "Bits & Bytes",
    description: "A wonderful blog about JavaScript",
    lastBuildDate: new Date(),
  });
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      link: post.slug,
    });
  });

  return feed.xml();
}

export { buildRssXml };
