---
sidebar_position: 8
---

# Multilingual Support

SveltePress was built from the ground up with multilingual support. Content can be optionally keyed by language code. To enable localization, pass the language codes you want to support to SveltePress:

`routes/+layout.ts`

```ts
import { SveltePress } from "sveltepress";

export const load = async (event) => {
  const pb = new SveltePress({
    fetch: event.fetch,
    languages: ["en", "es"],
  });

  return {
    pb,
  };
};
```

Then add a `[[lang]]` parameter to the path of the content that you wish to localize:

`routes/[[lang]]/home/+page.svelte`

This will add a language dropdown for those pages in the Admin Bar. To create a new version of the page
in a different language, switch the language, edit the content and click Save.

When loading page content, the available languages for that specific page are returned as an array. This can be used in the page for a language dropdown for example:

```ts
import { SveltePress } from "sveltepress";

export const load = async (event) => {
  const pb = new SveltePress({
    fetch: event.fetch,
    languages: ["en", "es"],
  });

  const { contents, metadata, languages } = await pb.contents.load(event);

  return {
    pb,
    contents,
    metadata,
    languages,
  };
};
```
