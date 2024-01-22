---
sidebar_position: 4
---

# Metadata

Aside from editing the main content on a page, you can give surface other variables for editing too,
such as title, author, published date, etc. These can then be accessed in Svelte in `PageData.metadata`.

In the univeral loader, define editable metadata with the `Metadata` constructor:

`routes/blog/[slug]/+page.ts`

```ts
import { Metadata } from "sveltepress"
import type { RouteId } from './$types';

const metadata = new Metadata('/blog/[slug]' satisfies RouteId, {
  title: "Default title",
  tagline: "Default tagline",
  tags: ["Data"],
  categories: ["Application"],
  author: "John Doe",
  published_at: new Date()
});

export const load: async (event) => {
  return {
    metadata: await metadata.load(event),
  }
}
```

`routes/blog/[slug]/+page.svelte`

```svelte
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
</svelte:head>
```

In admin mode, this provides a dropdown in the [Admin Bar](/admin-dashboard#admin-bar) with editable fields for each item in the metadata.

The metadata properties are coalesced the same way SvelteKit does with loader data from higher level
layouts. Properties defined in higher level layouts are available in lower levels or can be overwritten.

## Taxonomy

A few metadata keys are preconfigured to be parsed as taxonomy: `categories`, `tags` and `author`.
The taxonomy can be loaded in the root layout and made available to any page below it:

`routes/+layout.ts`

```ts
import { SveltePress } from "sveltepress";

export const load = async (event) => {
  const pb = new SveltePress({
    fetch: event.fetch,
  });

  const { contents, metadata } = await pb.contents.load(event);

  return {
    pb,
    contents,
    metadata,
    taxonomies: await pb.contents.taxonomies("/blog/[slug]"),
  };
};
```

The `taxonomies` key will be populated with the unique values of `categories`, `tags`, and `author`
for the route. These can be used to set up pages like `/categories` for displaying lists of content.
