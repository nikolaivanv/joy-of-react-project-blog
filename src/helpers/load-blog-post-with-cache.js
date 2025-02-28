import React from "react";
import { loadBlogPost } from "./file-helpers";

export const loadBlogPostWithCache = React.cache(
  async (slug) => await loadBlogPost(slug)
);
