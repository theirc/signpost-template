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

### 4. Choose your site's content structure

1. Use [Figma
   guidelines](https://www.figma.com/file/Gkxqy6IGhG1WYtEO6t9oOF/Default-template-%2F-Signpost?node-id=257%3A18748)
   to decide which content structure the site should follow: Beporsed or UFU.
2. Set `USE_CAT_SEC_ART_CONTENT_STRUCTURE` in
   [`lib/constants.ts`](lib/constants.ts) accordingly.
3. If you have chosen U4U:
   1. [Optional] Delete [the category page
      file](pages/categories/[category].tsx). It's not present in this content
      structure.

### 5. Customize your site

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

### 6. Connect the site to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel
Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out [Next.js deployment
documentation](https://nextjs.org/docs/deployment) for more details.

### 7. Setup a domain

1. Set up the target domain after you have set up the site in the previous steps
   by following https://vercel.com/docs/concepts/projects/custom-domains.
2. Remove Host mapping from Zendesk for your brand: https://signpost-global.zendesk.com/admin/account/brand_management/brands.
   - It's needed to allow Zendesk Admin functionalities (e.g., category editing and article preview) to keep working through Zendesk Themes.
3. Verify that editing category name in Zendesk still works for your brand.

### 8. Set up Google Analytics

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

### 9. Generate Zendesk OAuth token for your site

You need to generate a new Zendesk OAuth token for your site for Zendesk logging and API usage tracking purposes. To do that, you need full Admin access. If you don't have it, ask your Product manager (Liam) to generate it for you with following instructions:

1. Add a new OAuth client in Zendesk Admin center: https://signpost-global.zendesk.com/admin/apps-integrations/apis/zendesk-api/oauth_clients
2. Find ID of your new Oauth client: https://signpost-global.zendesk.com/api/v2/oauth/clients.json
   - Copy number from ‘id’ field corresponding to the new client you added
3. Perform the following command in the terminal `curl https://signpost-global.zendesk.com/api/v2/oauth/tokens.json -H "Content-Type: application/json" -d '{"token": {"client_id": <new_oauth_client_id>, "scopes": ["read"]}}' -X POST -v -u <your_email>/token:<api_token>`
   - Substitute <new_oauth_client_id>, <your_email> and <api_token>
   - Get an API token from https://signpost-global.zendesk.com/admin/apps-integrations/apis/zendesk-api/settings/tokens/

### 10. Setup Next.js preview

If you have followed the steps in this README, you've already generated a value for `PREVIEW_TOKEN` environment variable, provided it in Vecel ([here](https://github.com/unitedforukraine/signpost-template#5-customize-your-site)) and added the preview logic to your website ([thanks to the preview logic in the Article component](https://github.com/unitedforukraine/signpost-template/blob/6f3c9b53261d586ea8b4cb4e9c5aa81bc4e862de/pages/articles/%5Barticle%5D.tsx#L182)). That already allows you to access preview mode manually.
See [defenition and manual usage of preview mode](https://docs.google.com/document/d/1IbtY_EvIm0c1C8yeKpEPWwPvWJyHiNehYkRpVJJ65kg/edit?usp=sharing).

To additionaly enable the Next.js preview for the ZD content editor links:

0. _(Optional but recommended)_ For Next.js-based Signpost instances ZD theme is kept alive only for preview mode and category/section edits. So to avoid confusion between the live Next.js website and the ZD theme, replace the ZD theme of your instance with a version of Copenhagen theme where all not required `.hbs` files, styles, translations are removed and the required `.hbs` templates contain something like `<!-- This file needs to exist when importing Zendesk theme. -->` .

1. Edit your ZD theme's source code

   1. Replace the content of `article.hbs` with

      ```
         <div>
            <div id="article-container">
            <p>Redirecting...</p>
         </div>
         <script>
            // The script below implements Next.js preview mode redirects. More details in:
            // https://docs.google.com/document/d/1IbtY_EvIm0c1C8yeKpEPWwPvWJyHiNehYkRpVJJ65kg

            const baseUrl = `{{ settings.preview_base_url }}`;;
            const locale = `{{ help_center.locale }}`;
            const articleId = `{{ article.id }}`;
            const previewToken = `{{ settings.preview_access_token }}`;

            // Example ZD preview URL:
            // https://signpost-u4u.zendesk.com/hc/en-us/articles/4810103030679/preview/eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMDEwMzAzMDY3OSwiZXhwIjoxNjYzOTQ2ODk3fQ.YlBI8yUJaJVe8nI3_o1kRrtk_0eomhe3jGL2JR-G4og
            const isPreviewMode = window.location.href.split('/').includes('preview');

            // URLs are constructed based on the routing from https://github.com/unitedforukraine/signpost-template
            const nextjsPreviewUrl = `${baseUrl}/api/preview?slug=/${locale}/articles/${articleId}&secret=${previewToken}`;
            // Clears preview cookie if it was set, then redirects to the live website in normal mode.
            const nextjsUrl = `${baseUrl}/api/clear-preview-cookies?slug=/${locale}/articles/${articleId}`;
            window.location.replace(isPreviewMode ? nextjsPreviewUrl : nextjsUrl);
         </script>
         </div>
      ```

   2. Addd two parameters to `manifest.json`'s settings array: `preview_access_token` and `preview_base_url` under `preview_access_token_group_label` label
      ```
         "settings": [
            {
               "label": "preview_access_token_group_label",
               "variables": [
               {
                  "identifier": "preview_access_token",
                  "type": "text",
                  "value": "",
                  "label": "preview_access_token_label",
                  "description": "preview_access_token_description"
               },
               {
                  "identifier": "preview_base_url",
                  "type": "text",
                  "value": "",
                  "label": "preview_base_url_label",
                  "description": "preview_base_url_description"
               }
               ]
            }
         ]
      ```

2. Upload the edited theme as [set it as live in Zendesk UI](https://support.zendesk.com/hc/en-us/articles/4408828836250-Changing-the-live-theme-of-your-help-center)

3. Provide the values for `preview_access_token` (the preview access token value that you've generated earlier) and `preview_base_url` (the domain name of your instance, e.g. https://www.unitedforukraine.org/) in the theme's UI: click Customize on the live theme -> click on `preview_access_token_group_label` group -> paste the values -> click Publish

4. (Optional): educate your content writers on [how to access preview mode](https://docs.google.com/document/d/1IbtY_EvIm0c1C8yeKpEPWwPvWJyHiNehYkRpVJJ65kg/edit#) manually and in the ZD UI

## PWA and Offline availability

Next.js supports PWA adding the [next-pwa](https://github.com/shadowwalker/next-pwa) plugin.

To install the plugin, just use:

```
yarn add next-pwa
```

And then you should update your `next.config.js` file to use the plugin. Example:

```
const withLess = require('next-with-less')
const withPWA = require('next-pwa')({ dest: 'public' })

const nextConfig = {
  ...
}

module.exports = withPWA(withLess({
  ...nextConfig,
  lessLoaderOptions: {...},
}))

```

Please refer to the [next-pwa](https://github.com/shadowwalker/next-pwa) site for more information and extra configurations.

## Rollback from Vercel

All the deployments are controled through the Vercel deploy site, so if anything wrong happens with a deploy we can just move to production the last succesfull deploy

We need to go to [Vercel](https://vercel.com/signpost) and select the instance that we need to fix
After doing this we have to go to the `Deployments` tab and find the latest succesfull one.
Once finded we only need to click the three dots on the right of the deploy and click on the `Promote to production` option.
This will trigger a redeploy of the instance with the code of the deploy selected so we can have an instance running with no problems in production while we debug the issue with the latest code pushed.

### Additional data:

- Name branching: all the branches should be descriptive of what the changes are and should contain the number of the task from Jira, for e.g. if I'm pushing some style changes on footer the branch should be named something along "sp-123-footer-styles-modifications"
- How we track feat updates: All the PRs should follow the [Conventional Commit Messages](https://www.conventionalcommits.org/en/v1.0.0/)
  - The most important prefixes you should have in mind are:
    </br>- `fix`: which represents bug fixes.
    </br>- `feat`: which represents a new feature.
- How to ensure that rollback is going to a correct production branch: we only have one production branch per project so this is not an issue.

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
