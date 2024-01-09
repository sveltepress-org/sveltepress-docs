---
sidebar_position: 4
---

# Frontmatter

In the univeral loader, define editable frontmatter with the `Frontmatter` constructor:

`+page.ts`

```ts
import { Frontmatter } from "sveltepress"

const frontmatter = new Frontmatter({
  title: "Default title",
  tagline: "Default tagline",
  published_at: new Date()
});

export const load: (event) => {
    return {
        frontmatter: frontmatter.load(event),
    }
}
```

`+page.svelte`

```svelte
<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>{data.frontmatter.title}</title>
</svelte:head>
```

In admin mode, this provides a dropdown in the Admin Bar with editable fields for each item in the frontmatter.

The frontmatter properties are coalesced the same way SvelteKit does with loader data from higher level
layouts. Properties defined in higher level layouts are available in lower levels or can be overwritten.
