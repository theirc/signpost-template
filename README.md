# Signpost Template

This repository is the website template for creating new Signpost instances.

This README pertains to working with this repository as a template for new
instances. There's also `README-SITE.md` that describes how to operate a site
created from this template.

## Instructions for setting up a new Signpost instance

### 1. [Fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

### 2. Swap README

1. Delete this README and rename `README-SITE.md` to `README.md`.
2. Fill out TODOs in `README.md`.

### 3. Run the new site's development set up instructions

### 4. Customize your site

1.  Fill out the environment variables documented in `README-SITE.md` in [.env.local](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables).
2.  Finish TODOs in [lib/translations.tsx](lib/translations.tsx).
    - **Note:** [Create new Dynamic content on Zendesk](https://signpost-global.zendesk.com/admin/workspaces/agent-workspace/dynamic_content) with your website's name in prefix
3.  Finish TODOs in [lib/social-media.tsx](lib/social-media.tsx).
    - **Note:** you might need to change Social media logo images in [public/](public/) directory
4.  Fill out custom CSS variables in [next.config.js](next.config.js).

### 5. Connect the site to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel
Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out [Next.js deployment
documentation](https://nextjs.org/docs/deployment) for more details.
