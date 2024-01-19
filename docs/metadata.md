---
sidebar_position: 4
---

# Metadata

Aside from editing the main content on a page, you can give surface other variables for editing too,
such as title, author, published date, etc. These can then be accessed in Svelte in `PageData.metadata`.

In the univeral loader, define editable metadata with the `Metadata` constructor:

`blog/[slug]/+page.ts`

```ts
import { Metadata } from "sveltepress"
import type { RouteId } from './$types';

const metadata = new Metadata('/blog/[slug]' satisfies RouteId, {
  title: "Default title",
  tagline: "Default tagline",
  published_at: new Date()
});

export const load: async (event) => {
  return {
    metadata: await metadata.load(event),
  }
}
```

`blog/[slug]/+page.svelte`

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
