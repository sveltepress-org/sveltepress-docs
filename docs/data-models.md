---
sidebar_position: 6
---

# Data Models

Beyond content, SveltePress functions as a platform for any type of data.

## Creating New Data Models

The Admin Dashboard allows new data models to be created alongside the default `contents` and `users`
tables.

## Auth Contexts

PocketBase has two auth contexts, current user and admin. Specific permissions can be set
for each data model. By default, `admin` has full access to all data a user has no access.
SveltePress surfaces both in the server context but only the current user in the universal context.

### Server (+page.server.ts)

Running queries on the server in admin context:

`+page.server.ts`

```ts
export const load = async ({ locals }) => {
  const { admin } = locals;

  const metadata = await admin.collection("metadata").getFullList();
};
```

Using the current user context:

`+page.server.ts`

```ts
export const load = async ({ locals }) => {
  const { pb } = locals;

  const posts = await pb.collection("posts").getFullList();
};
```

With the correct API rules on the `posts` data model,
it's possible to make this query return only posts belonging to the current user.
The API rule for List/Search could look like this:

`@request.auth.id = author_id`

### Universal (+page.ts)

Only the current user context is available in SvelteKit's universal context:

`+page.ts`

```ts
export const load = async ({ parent }) => {
  const { pb } = await parent();

  const posts = await pb.collection("posts").getFullList();
};
```

Svelte/Vite prevent compilation if there's a mismatch of contexts.

## Authentication vs Authorization

While SveltePress handles the authentication layer, the PocketBase instance behind SveltePress
handles authorization. Each collection's API Rules page lets you define rules for every action:

- List/Search
- View
- Create
- Update
- Delete

See the PocketBase documentation for more info on authorization: https://pocketbase.io/docs/api-rules-and-filters/
