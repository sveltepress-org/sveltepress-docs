---
sidebar_position: 5
---

# Index Pages

For index pages and taxonomy pages, content can be listed and paginated:

`+page.ts`

```ts
export const load = async (event) => {
  const { pb } = await event.parent();
  const posts = await pb.contents.getList("/blog/[slug]");

  return {
    posts,
  };
};
```

For taxonomy pages like category/tag/author, content can be further filtered by metadata attributes
by passing an options object:

`routes/categories/[slug]/+page.ts`

```ts
export const load = async (event) => {
  const { pb } = await event.parent();
  const posts = await pb.contents.getList("/blog/[slug]", 1, 30, {
    metadata: {
      categories: event.params.slug,
    },
  });

  return {
    posts,
  };
};
```
