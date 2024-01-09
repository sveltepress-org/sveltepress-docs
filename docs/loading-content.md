---
sidebar_position: 3
---

# Managing Content

SveltePress comes with content management tools out of the box. Pages in SvelteKit
load content from SveltePress in the `load` context of their lifecycle.

## PlainText, RichText, Markdown

SveltePress comes with three text editors components: `PlainText`, `RichText` and `Markdown`.
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

<Markdown key="main-post">Default placeholder post</Markdown>

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

## Custom Editors

Editors are vanilla Svelte components with two modes, display mode and edit mode. In display mode,
the component is completely replaced by the content it's rendering. In edit mode, the editor
displays the current content and submits it on page save.

SveltePress can be extended with custom editors. Any component that implements
the editor interface can be used. Read more on [how to build custom editors](/docs/custom-editors).

## Loading Content

Page content (plain text, rich text and component props) is loaded automatically by
SveltePress for each page. In SvelteKit terms, it's added as a page load dependency in the universal context (loads happen on the server or the client). For that reason, the content API
has default permissions for public List/Search and View.

Content in SveltePress is keyed by the page route, the route params, page version (see [below](#page-versioning)) and optionally by language code (see [i18n support](/docs/i18n)). For example, a blog post would be stored and retrieved from:

`/blog/[post-id] : post-id=1 : v1 : (en-US)`

On page render, the content replaces each editable section of the page. It's also
available in the page's data prop under the `contents` key, if you need to access it in the `script` context:

`+page.svelte`

```svelte
<script>
  export let data;

  $: console.log(data.contents.title);
</script>
```

SveltePress will throw a 404 for pages with route params if they contain editable sections but have no content stored (except in Admin Mode for creating new pages, see [below](#creating-new-pages)).

## SvelteKit Entries

SveltePress supports the `entries` page option for prerendering:

`/blog/[post-id]/+page.ts` or `/blog/[post-id]/+page.server.ts`

```ts
import { pageEntries } from "sveltepress";

export const entries = pageEntries("/blog/[post-id]");
```

## Creating New Pages

For page routes with params, create a new page by navigating to the new desired URL while in admin mode, for example `/blog/2`. In admin mode will this not throw a 404 error, instead it will
load an editable template with default placeholder content. Saving the page will commit it to SveltePress.

## Page Versioning

On top of being keyed by page route and route params, content is also keyed by version.
Versions are automatically incremented on save.
Using the Admin Bar on a page to deploy a new version or rollback to a previous one.
