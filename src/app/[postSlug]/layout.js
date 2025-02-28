import { loadBlogPostWithCache } from "@/helpers/load-blog-post-with-cache";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const post = await loadBlogPostWithCache(postSlug);
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

function BlogPostLayout({ children }) {
  return children;
}

export default BlogPostLayout;
