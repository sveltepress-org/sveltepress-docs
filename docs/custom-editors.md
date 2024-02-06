---
sidebar_position: 7
---

# Custom Editors

Custom editors are Svelte components that take a `key` prop for picking the content
from the page data. They should also provide a `placeholder` prop, or use a `<slot />` for
fallback placeholder content.

## Display mode

When not editing (on a normal page load for example), the editor should transparently display the
content provided by the page. This should be done in a reactive way, as page navigation will update
the value of the content key.

## Editing node

When the page switches to edit mode, the editor should make the content editable. The editing state
is available in the `$editing` boolean store:

`+page.ts`

```svelte
<script lang="ts">
  import { editing } from "sveltepress";
</script>
```
