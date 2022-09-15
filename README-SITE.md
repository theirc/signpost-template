# TODO: Add your site's name

TODO: Briefly describe your site

## Development environment setup

This section explains how to set up your development environment, so that you can build, test, and preview the site locally.

1. Install Node.js dependencies

   ```sh
   yarn install
   ```

2. Install Git hooks

   ```sh
   yarn prepare
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Linting & formatting

We use ESLint and [Prettier][prettier] to lint and format the directory respectively.

To check for lint and formatting errors, run

```
yarn lint
yarn prettier --check .
```

To automatically fix issues, run

```
yarn lint --fix
yarn prettier --write .
```
