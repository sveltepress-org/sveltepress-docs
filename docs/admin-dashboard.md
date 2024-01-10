---
sidebar_position: 2
---

# Admin Dashboard

SveltePress adds an admin dashboard directly within your SvelteKit app. You can
access it from the `/admin` URL. Sign in with the admin credentials you created
during provisioning.

## Customizing the Admin Path

By default, the dashboard is accessible within your app from the `/admin` URL.
It's possible to customize this in the middleware options:

`hooks.server.ts`

```ts
import { SveltePressMiddleware } from "sveltepress/server";

export const handle = SveltePressMiddleware(
  {
    adminPath: "/admin",
  },
  ({ event, resolve }) => resolve(event)
);
```

If the path is changed from the default `/admin`, also update the PocketBase client in the root layout loader:

`routes/+layout.ts`

```ts
import { PocketBase } from "sveltepress";

export const load = async (event) => {
  const pb = new PocketBase("/admin");

  return {
    pb,
    user: pb.authStore.model,
  };
};
```

## Admin Bar

Once signed in, an Admin Bar will appear on top of pages for editing, if enabled.
The Admin Bar is a Svelte component itself. To enable the Admin Bar, add it to the root layout:

`routes/+layout.svelte`

```svelte
<script lang="ts">
  import { AdminBar } from "sveltepress";
</script>

<AdminBar />

<slot />
```
