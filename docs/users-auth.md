---
sidebar_position: 5
---

# Users and Auth

SveltePress comes with some useful features for handling users and auth.
PocketBase does the heavy lifting on the backend for both.

## User

In the server context, the user is available in `locals`:

`+page.server.ts` / `+layout.server.ts`

```ts
export const load = async ({ locals }) => {
  const { user } = locals;
};
```

In the universal context, the user is passed down from the root layout:

`routes/+layout.ts`

```ts
export const load = async (event) => {
  const pb = new PocketBase("/admin");

  return {
    pb,
    user: pb.authStore.model,
  };
};
```

To access it in other pages or layouts, use the `await parent()` call:

`+page.ts` / `+layout.ts`

```ts
export const load = async ({ parent }) => {
  const { user } = await parent();
};
```

## Sign In

`routes/signin/+page.server.ts`

```ts
export const actions = {
  default: async ({ locals, cookies }) => {
    const { pb } = locals;

    try {
      await pb
        .collection("users")
        .authWithPassword(form.data.email, form.data.password);
    } catch (e) {
      throw error(500);
    }

    pb.authStore.save(cookies);

    throw redirect("/dashboard");
  },
};
```

## Sign Out

`routes/signout/+page.server.ts`

```ts
export const load = async ({ locals, cookies }) => {
  const { pb } = locals;

  pb.authStore.clear(cookies);

  throw redirect("/");
};
```

## Protecting Pages

Using a route layout to protect pages, the `user` object will exist only when there is an active session:

`routes/(authed)/+layout.ts`

```ts
export const load = async ({ parent }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect("/signin");
  }
};
```

## Refreshing Auth Tokens

Following the recommended practice for short lived auth tokens created at sign in
and then refreshed periodically during app usage, SveltePress comes with a `setRefreshTokenInterval`
helper function that can instantiated in the root layout:

`routes/+layout.svelte`

```svelte
<script>
  import { onMount } from "svelte";
  import { setRefreshTokenInterval } from "sveltepress";

  onMount(() => {
    const interval = setRefreshTokenInterval();
    return () => clearInterval(interval);
  });
</script>
```

The default refreshes every hour and can be configured:

```ts
const interval = setRefreshTokenInterval(1000 * 60 * 60);
```
