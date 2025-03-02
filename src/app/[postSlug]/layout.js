import { loadBlogPostWithCache } from "@/helpers/load-blog-post-with-cache";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const post = await loadBlogPostWithCache(postSlug);
  if (!post) {
    return notFound();
  }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

function BlogPostLayout({ children }) {
  return children;
}

export default BlogPostLayout;
