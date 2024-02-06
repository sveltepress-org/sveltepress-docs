---
slug: /
sidebar_position: 1
---

# Getting Started

Creating a new SveltePress app or adding SveltePress to a SvelteKit app only takes a few minutes.
Before starting, you'll need to provision a free SveltePress instance on [sveltepress.org](https://sveltepress.org) or [run SveltePress locally](/docs/run-locally).

## Creating a new app

Get started by creating a new SveltePress app with npm, yarn, etc:

```bash
npm init sveltepress@latest
```

```bash
yarn create sveltepress@latest
```

Configure the connection URL in your environment by adding it to the `.env` file:

`.env`

```bash
SVELTEPRESS_URI="http://<instance-id>.vm.sveltepress.org"
```

For admin features (recommended), add environment variables with the credentials created during provisioning:

```bash
SVELTEPRESS_EMAIL="test@example.com"
SVELTEPRESS_PASSWORD="password"
```

Run the development server:

```bash
cd my-website
npm run start
```

Open your web browser to http://localhost:5137/admin and you'll be see the Admin Dashboard login screen.
Success!

## Adding SveltePress to an existing app

Install the SveltePress library with npm, yarn, etc:

```bash
npm install sveltepress
```

```bash
yarn add sveltepress
```

Create or edit `hooks.server.ts` and add the SveltePress middleware to the handler. This wraps the default handler (which can be omitted but left in this example for clarity):

`hooks.server.ts`

```ts
import { SveltePressMiddleware } from "sveltepress/server";

export const handle = SveltePressMiddleware(({ event, resolve }) =>
  resolve(event)
);
```

Create or edit `routes/+layout.ts` to initiate the SveltePress client:

`routes/+layout.ts`

```ts
import { SveltePress } from "sveltepress";

export const load = async (event) => {
  const pb = new SveltePress({
    fetch: event.fetch,
  });

  return {
    pb,
  };
};
```

Configure the connection URL in your environment by adding it to the `.env` file:

`.env`

```bash
SVELTEPRESS_URI="http://<instance-id>.vm.sveltepress.org"
```

For admin features (recommended), add environment variables with the credentials created during provisioning:

```bash
SVELTEPRESS_EMAIL="test@example.com"
SVELTEPRESS_PASSWORD="password"
```

If using TypeScript, update `app.d.ts` with the server locals:

`app.d.ts`

```ts
import { SveltePress } from "sveltepress";

declare global {
  namespace App {
    interface Locals {
      admin: SveltePress;
      pb: SveltePress;
    }
  }
}
```
