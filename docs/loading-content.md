---
sidebar_position: 3
---

# Content

SveltePress comes with content management tools out of the box. Routes in SvelteKit
load content from SveltePress in the universal (server or client) load function.

## PlainText, RichText, Markdown

SveltePress comes with three editor components: `PlainText`, `RichText` and `Markdown`.
Choose between them depending on the usecase in the page. For example, a page title might be better
as `PlainText`, while paragraphs of prose might be better as `RichText` or `Markdown`.

Each component uses a similar API. Each component takes a `key` prop,
used for saving and loading content from SveltePress. The `key` must be unique within the page.

`+page.svelte`

```svelte
<script>
  import { PlainText, RichText, Markdown } from "sveltepress";
</script>

<h1>
  <PlainText key="main-title">
    Default placeholder title
  </PlainText>
</h1>

<RichText key="main-page-content">Default placeholder content</RichText>
<Markdown key="main-post" placeholder="# Markdown placeholder" />

<p>This text is static and not editable.</p>
```

## EditableComponent

SveltePress also comes with a Svelte component editor, which allows you to edit the
props of a Svelte component in a page. This component also uses the `key` prop
for saving and loading the content. All editable props are passed in with default values:

`+page.svelte`

```svelte
<script>
  import { EditableComponent } from "sveltepress";
</script>

<EditableComponent component={Button} key="button" title="Default placeholder" let:props>
  <Button {...props} />
</EditableComponent>
```

## Image

SveltePress has built-in support for images, allowing images to be picked or uploaded from the image browser.

`+page.svelte`

```svelte
<script>
  import { Image } from "sveltepress";
</script>

<Image key="featured-image" placeholder="/images/placeholder.png" />
```

## Custom Editors

Editors are vanilla Svelte components with two modes, display mode and edit mode. In display mode,
the component is completely replaced by the content it's rendering. In edit mode, the editor
allows the content to be edited and stores it until the page is saved.

SveltePress can be extended with custom editors. Any component that implements
the editor interface can be used. Read more on [how to build custom editors](/docs/custom-editors).

## Loading Content

Page content (plain text, rich text and component props) is loaded by
SveltePress for each page during navigation. In SvelteKit terms, it's added as a page load dependency in the universal context (load happens on the server or the client).

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
  };
};
```

Content in SveltePress is keyed by the page route, the route params, page version (see [below](#page-versioning)) and optionally by language code (see [multilingual support](/docs/multilingual)). For example, a blog post would be stored and retrieved from:

`/blog/[post-id] : post-id=1 : v1`

On page render, the content replaces each editable section of the page. It's also
available in the page's data prop under the `contents` key, if you need to access it in the `script` context:

`+page.svelte`

```svelte
<script>
  export let data;

  $: console.log(data.contents.title);
</script>
```

## 404 Errors

SveltePress can be configured to throw a `404` error for pages with route params if there's no content saved in the database (except in Admin Mode for creating new pages, see [below](#creating-new-pages)).
For example, blog posts should throw a 404 if the post does not exist. To throw a `404` error, pass the `throws404: true` configuration in the route metadata:

`routes/blog/[post-id]/+page.ts`

```ts
import { Metadata } from "sveltepress";
import type { RouteId } from "./$types";

const metadata = new Metadata("/blog/[post-id]" satisfies RouteId, {
  throws404: true,
});

export const load = async (event) => {
  return {
    metadata: await metadata.load(event),
  };
};
```

## SvelteKit Entries

SveltePress supports the `entries` page option for prerendering:

`routes/blog/[post-id]/+page.ts` or `/blog/[post-id]/+page.server.ts`

```ts
import { pageEntries } from "sveltepress";

export const entries = pageEntries("/blog/[post-id]");
```

## Creating New Pages

For page routes with params, create a new page by navigating to the desired URL while in admin mode, for example: `/blog/new-page-slug`. In admin mode will this not throw a `404` error, instead it will
load an editable template with the default placeholder content. Saving the page will commit it to SveltePress.

## Page Versioning

On top of being keyed by page route and route params, content is also keyed by version.
Versions are automatically incremented on save. Using the Admin Bar on a page to deploy a new version or rollback to a previous one. Pages are created in a draft/unpublished state and only go live once they are published.
