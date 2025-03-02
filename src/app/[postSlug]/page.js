import React from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
const DivisionGroupsDemo = dynamic(
  () => import("@/components/DivisionGroupsDemo"),
  { loading: Spinner }
);

const CircularColorsDemo = dynamic(
  () => import("@/components/CircularColorsDemo"),
  { loading: Spinner }
);

import BlogHero from "@/components/BlogHero";
import { loadBlogPostWithCache } from "@/helpers/load-blog-post-with-cache";

import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";
import { notFound } from "next/navigation";

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const post = await loadBlogPostWithCache(postSlug);
  if (!post) {
    return notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={post.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
