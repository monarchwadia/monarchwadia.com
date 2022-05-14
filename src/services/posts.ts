import { join, basename, dirname } from "path";
import type { Post } from "src/types";

export const getPosts = () => {
  const modules = import.meta.globEager("../posts/*.md");
  
  const posts: Post[] = Object.entries(modules)
    .map(([filepath, module]): Post => {
      const slug = join('/', filepath).replace(/(.*)(\.[^.]+$)/, "$1");
      const id = slug.split('/')[2];
      const { metadata } = module;
      const { html } = module.default.render();

      return {
        id,
        slug,
        html,
        ...metadata,
      };
    })
    .sort((a, b) => a.publishedOn < b.publishedOn ? 1 : -1)

  return posts;
}

export const getPostbyId = (id: string) => {
  const posts = getPosts();
  const post = posts.find(p => p.id === id);
  return post;
}