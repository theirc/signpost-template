import { AlgoliaSearchIndex } from '@ircsignpost/signpost-base/dist/src/search-common';
import { LatLngExpression } from 'leaflet';

export const SITE_TITLE = 'Refugee.info Greece';

export const COUNTRY_ID = 9;

export const MAP_DEFAULT_COORDS: LatLngExpression = [39.1250405, 20.0791107];

// Cache statically generated pages for 1 hour. The timeout was chosen
// arbitrarily. Our website has static, non-urgent resources, so we probably do
// not need to serve content faster.
export const REVALIDATION_TIMEOUT_SECONDS: number = 1 * 60 * 60;

// The "about us" article ID.
export const ABOUT_US_ARTICLE_ID: number = 4985544145943;

// A mapping from category ID to a Material icon for that category.
export const CATEGORY_ICON_NAMES: { [key: string]: string } = {
  '4768127626007': 'description',
  '4768111818263': 'campaign',
  '4768127623703': 'question_mark',
  '4420351005975': 'explore',
};

// A list of category IDs that the site should not display.
export const CATEGORIES_TO_HIDE: number[] = [
  5388415886487, 5451758139293, 5388415940887, 4421271418775, 4420351027479,
];

// A map from a locale code to Zendesk locale id used for dynamic content translations.
// https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/
// Keep in sync with locales configured in /next.config.js.
export const DYNAMIC_CONTENT_LOCALES: { [key: string]: number } = {
  'en-us': 1, // English locale id
  ar: 66,
  fa: 1016,
  fr: 16,
  uk: 1173,
  ur: 1183,
};

export const ZENDESK_AUTH_HEADER = {
  Authorization: 'Bearer ' + process.env.ZENDESK_OAUTH_TOKEN,
};

// TODO: Add your app's google analytics ids as local and server environment variables,
// and then add to this list. You may have two IDs, for example, during the migration
// from Universal Analytics to Google Analytics 4. See README.md for more details.
export const GOOGLE_ANALYTICS_IDS = [
  // Example:
  // process.env.NEXT_PUBLIC_GA4_ID ?? '',
];

// Algolia search app ID, Search API key and search index name:
// https://www.algolia.com/account/api-keys/
export const ALGOLIA_SEARCH_APP_ID = 'BWATZIXLX6';
export const ALGOLIA_SEARCH_API_KEY = '5ce4c0f27492db0d6e42fa948101e69c';

// See README for more info on how to create indexes.
export const ALGOLIA_ARTICLE_INDEX_NAME = 'zendesk_signpost-greece_articles';
export const ALGOLIA_QUERY_INDEX_NAME =
  'zendesk_signpost-greece_articles_query_suggestions';

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
