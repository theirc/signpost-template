# Signpost Template

This repository is the website template for creating new Signpost instances.

This README pertains to working with this repository as a template for new
instances. There's also `README-SITE.md` that describes how to operate a site
created from this template.

## Instructions for setting up a new Signpost instance

### 1. Fork the repository

1. [Fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
2. [Enable GitHub
   workflows](https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow#enabling-a-workflow).

### 2. Swap README

1. Delete this README and rename `README-SITE.md` to `README.md`.
2. Fill out TODOs in `README.md`.

### 3. Run the new site's development set up instructions

### 4. Customize your site

1.  Fill out the environment variables documented in `README-SITE.md`.
    1. Add all variables to [.env.local](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables).
    2. Provide some environment variables (`ZENDESK_URL` and
       `ZENDESK_OAUTH_TOKEN`) as [repository
       secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
2.  Provide [the site's constants](lib/constants.ts). Search for TODOs.
3.  Finish TODOs in [lib/translations.tsx](lib/translations.tsx).
    - **Note:** [Create new Dynamic content on Zendesk](https://signpost-global.zendesk.com/admin/workspaces/agent-workspace/dynamic_content) with your website's name in prefix
4.  Finish TODOs in [lib/social-media.tsx](lib/social-media.tsx).
    - **Note:** you might need to change Social media logo images in [public/](public/) directory
5.  Create Algolia Search indexes for Zendesk Articles and Search queries, and replace indexes in [lib/constants.ts](lib/constants.ts).
    - Follow [Search documentation](README-SITE.md#search) on how to create new index.
6.  Fill out custom CSS variables in [next.config.js](next.config.js).
7.  Provide the site's logo in [lib/logo.ts](lib/logo.ts).
8.  Enable Service map by completing TODO in [lib/constants.ts](lib/constants.ts)
9.  Enable Chat widget by completing TODO in [pages/\_document.tsx](pages/_document.tsx)

### 5. Connect the site to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel
Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out [Next.js deployment
documentation](https://nextjs.org/docs/deployment) for more details.

### 6. Setup a domain

1. Set up the target domain after you have set up the site in the previous steps
   by following https://vercel.com/docs/concepts/projects/custom-domains.
2. Remove Host mapping from Zendesk for your brand: https://signpost-global.zendesk.com/admin/account/brand_management/brands.
   - It's needed to allow Zendesk Admin functionalities (e.g., category editing and article preview) to keep working through Zendesk Themes.
3. Verify that editing category name in Zendesk still works for your brand.

### 7. Set up Google Analytics

**_Create a GA4 Property and find your Measurement ID_**

If you already have a Google Analytics Measurement ID (i.e. G-XXXXXXXXX or
UA-XXXXXXXXX), you can skip this step.

To set up Google Anaytics, you will first need to follow the [online
instructions](https://support.google.com/analytics/answer/9304153) in order to
create a new Google Analytics 4 property and add a data stream. After this,
find your [Measurement
ID](https://support.google.com/analytics/answer/9304153#zippy=%2Cadd-your-tag-using-google-tag-manager%2Cfind-your-g--id-for-any-platform-that-accepts-a-g--id).

**_Set up your app to collect data_**

To start data collection, you will need to add your Google Analytics ID(s) to
your local `.env.local` file and as [environment
variables](https://vercel.com/docs/concepts/projects/environment-variables) in
your vercel project settings, using the `NEXT_PUBLIC_*` notation. For example,
if you had a Universal Analytics ID and a Google Analytics 4 ID, you could have
the corresponding environment variables: `NEXT_PUBLIC_GA_ID` and
`NEXT_PUBLIC_GA4_ID`. You may have two IDs, for example, during the
[migration from Universal Analytics to Google Analytics
4](https://support.google.com/analytics/answer/11583528?hl=en).

Next, ensure that these environment variables are included in the `GOOGLE_ANALYTICS_IDS` variable of the [the site's constants](lib/constants.ts). For example,

```
  export const GOOGLE_ANALYTICS_IDS = [
    process.env.NEXT_PUBLIC_GA_ID ?? '',
    process.env.NEXT_PUBLIC_GA4_ID ?? '',
  ];
```

These Measurement IDs are connected to the site by using the `Analytics` component from `@ircsignpost/signpost-base/dist/src/analytics`
in your app's `pages/_app.tsx` file.
This component needs to be added as close to the top as possible (above
`<Component {...pageProps} />`). Your file should look something like the
following:

```
  ...
  import Analytics from '@ircsignpost/signpost-base/dist/src/analytics';
  import { GOOGLE_ANALYTICS_IDS } from '../lib/constants';
  ...

  function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <Analytics googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}/>
        <Component {...pageProps} />
      </>
    );
  }

  export default MyApp;
```

Now your app should be setup to start collecting data!

**_Tracking Events_**

By default, the `Analytics` component tracks page views for you, but you may want to track other events such as page clicks, or maybe disable/enable analytics depending on a user's response to a cookie banner (consider using `@ircsignpost/signpost-base/dist/src/cookie-banner`). In order to do this, there are a couple lightweight utility functions you can use.

**NOTE:** These functions only work if you have successfully set up and began using the `Analytics` component.

```
// Opts user out of Google Analytics tracking.
export function disableGoogleAnalytics(googleAnalyticsIds: string[]);
```

```
// Re-enables Google Analytics tracking if it was previously disabled.
export function enableGoogleAnalytics(googleAnalyticsIds: string[]);
```

```
// Tracks a click event for the given category and label.
export function trackClickEvent(eventCategory: string, eventLabel: string);
```

### 8. Generate Zendesk OAuth token for your site

You need to generate a new Zendesk OAuth token for your site for Zendesk logging and API usage tracking purposes. To do that, you need full Admin access. If you don't have it, ask your Product manager (Liam) to generate it for you with following instructions:

1. Add a new OAuth client in Zendesk Admin center: https://signpost-global.zendesk.com/admin/apps-integrations/apis/zendesk-api/oauth_clients
2. Find ID of your new Oauth client: https://signpost-global.zendesk.com/api/v2/oauth/clients.json
   - Copy number from ‘id’ field corresponding to the new client you added
3. Perform the following command in the terminal `curl https://signpost-global.zendesk.com/api/v2/oauth/tokens.json -H "Content-Type: application/json" -d '{"token": {"client_id": <new_oauth_client_id>, "scopes": ["read"]}}' -X POST -v -u <your_email>/token:<api_token>`
   - Substitute <new_oauth_client_id>, <your_email> and <api_token>
   - Get an API token from https://signpost-global.zendesk.com/admin/apps-integrations/apis/zendesk-api/settings/tokens/

## Architectural Decisions

### Dual content structure

There are two possible versions of content in a Zendesk instance. They are both
explained at
[Figma](https://www.figma.com/file/Gkxqy6IGhG1WYtEO6t9oOF/Default-template-%2F-Signpost?node-id=258%3A19009).

The components [signpost-base][signpost-base] work with both of them. During
setting up of this template, you'll do steps to configure the site for a
specific version. (TODO:
https://github.com/unitedforukraine/signpost-template/issues/103)

[signpost-base]: https://github.com/unitedforukraine/signpost-base
