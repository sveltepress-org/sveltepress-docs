---
sidebar_position: 4
---

# Metadata

In the univeral loader, define editable metadata with the `Metadata` constructor:

`+page.ts`

```ts
import { Metadata } from "sveltepress"

const metadata = new Metadata({
  title: "Default title",
  tagline: "Default tagline",
  published_at: new Date()
});

export const load: (event) => {
    return {
        metadata: metadata.load(event),
    }
}
```

`+page.svelte`

```svelte
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
</svelte:head>
```

In admin mode, this provides a dropdown in the Admin Bar with editable fields for each item in the metadata.

The metadata properties are coalesced the same way SvelteKit does with loader data from higher level
layouts. Properties defined in higher level layouts are available in lower levels or can be overwritten.
