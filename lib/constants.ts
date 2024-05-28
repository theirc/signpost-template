import { AlgoliaSearchIndex } from '@ircsignpost/signpost-base/dist/src/search-common';

export const SITE_TITLE = 'Anoura';

// Cache statically generated pages for 1 hour. The timeout was chosen
// arbitrarily. Our website has static, non-urgent resources, so we probably do
// not need to serve content faster.
export const REVALIDATION_TIMEOUT_SECONDS: number = 1 * 60 * 60;

// The "about us" article ID.
//
// TODO
export const ABOUT_US_ARTICLE_ID: number = 14695806352157;

// The information hierary of the website.
// Set to true for the category -> section -> article hierarchy, similar to that of United for Ukraine.
// Set to false for the "information" -> category -> article hierarchy, similar to that of Beporsed.
//
// TODO
export const USE_CAT_SEC_ART_CONTENT_STRUCTURE = false;

// A mapping from category ID to a Material icon for that category.
export const CATEGORY_ICON_NAMES: { [key: string]: string } = {
  '17609148236829': 'apps',
  '17609120768797': 'gavel',
  '15018270761501': 'info',
  '15018294354845': 'help',
  '18904321744413': 'woman',
  '18899875123229': 'mood',
};

// A mapping from section ID to a Material icon for that section.
export const SECTION_ICON_NAMES: { [key: string]: string } = {
  /* TODO */
  '123': 'home_work', // Placeholder
};

// A list of category IDs that the site should not display.
export const CATEGORIES_TO_HIDE: number[] = [
  /* TODO */
];

// A map from a locale code to Zendesk locale id used for dynamic content translations.
// https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/
// Keep in sync with locales configured in /next.config.js.
export const DYNAMIC_CONTENT_LOCALES: { [key: string]: number } = {
  'en-us': 1,
  fr: 16,
};

export const ZENDESK_AUTH_HEADER = {
  Authorization: 'Bearer ' + process.env.ZENDESK_OAUTH_TOKEN,
};

// TODO: Add your app's google analytics ids as local and server environment variables,
// and then add to this list. You may have two IDs, for example, during the migration
// from Universal Analytics to Google Analytics 4. See README.md for more details.
export const GOOGLE_ANALYTICS_IDS = [
  process.env.NEXT_PUBLIC_GA_ID ?? '',
  process.env.NEXT_PUBLIC_GA4_ID ?? '',
];

// Algolia search app ID, Search API key and search index name:
// https://www.algolia.com/account/api-keys/
export const ALGOLIA_SEARCH_APP_ID = 'BWATZIXLX6';
export const ALGOLIA_SEARCH_API_KEY = '0d9093280e7b2bc2b6ca12ed4180fd0a';
export const ALGOLIA_SEARCH_API_KEY_WRITE =
  process.env.ALGOLIA_SEARCH_API_KEY_WRITE ?? '';

// TODO: create Algolia indexes for Articles and Queries and replace the names here.
// See README for more info on how to create indexes.
export const ALGOLIA_ARTICLE_INDEX_NAME = 'TODO'; // TODO: replace article index name, e.g. 'zendesk_signpost-afghanistan_articles'.
export const ALGOLIA_QUERY_INDEX_NAME = 'TODO'; // TODO: replace query index name, e.g. 'zendesk_signpost-afghanistan_articles_query_suggestions'.

export const SEARCH_BAR_INDEX: AlgoliaSearchIndex = {
  appId: ALGOLIA_SEARCH_APP_ID,
  publicApiKey: ALGOLIA_SEARCH_API_KEY,
  indexName: ALGOLIA_QUERY_INDEX_NAME,
};

export const SEARCH_RESULTS_PAGE_INDEX: AlgoliaSearchIndex = {
  appId: ALGOLIA_SEARCH_APP_ID,
  publicApiKey: ALGOLIA_SEARCH_API_KEY,
  indexName: ALGOLIA_ARTICLE_INDEX_NAME,
};

export const DIRECTUS_AUTH_TOKEN = process.env.DIRECTUS_TOKEN ?? '';
export const DIRECTUS_COUNTRY_ID = 28;
export const DIRECTUS_INSTANCE = 'https://directus-irc.azurewebsites.net/';
