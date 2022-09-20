// Fake implementation of the Zendesk interface.
//
// TODO Replace uses of this library with the real implementation.
import type {
  ZendeskArticle,
  ZendeskCategory,
} from '@ircsignpost/signpost-base/dist/src/zendesk';

import { Locale } from './locale';

/**
 * Fetches list of Zendesk categories for the given locale.
 *
 * @param _locale The locale of the categories.
 * @param _zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 *
 * @returns List of ZendeskCategory
 */
export async function getCategories(
  _locale: Locale,
  _zendeskUrl: string
): Promise<ZendeskCategory[]> {
  return [
    {
      id: 123,
      name: 'TODO',
      description: 'Lorem Ipsum',
      locale: 'en-us',
      icon: '',
    },
  ];
}

/**
 * Fetches article for the given locale.
 *
 * @param locale The locale of the article.
 * @param articleId The article id.
 * @param _zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 * @param _zendeskMappedUrl The mapped URL configured in Zendesk that Zendesk
 *                           prepends to links, e.g., https://www.unitedforukraine.org.
 * @param _authHeader Authorization header to access Zendesk API.
 *
 * @returns article
 */
export async function getArticle(
  locale: Locale,
  articleId: number,
  _zendeskUrl: string,
  _zendeskMappedUrl: string,
  _authHeader: HeadersInit,
  _includeDrafts?: boolean
): Promise<ZendeskArticle | undefined> {
  return {
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    edited_at: '2022-09-19',
    id: articleId,
    locale: locale.url,
    section_id: 123,
    title: 'TODO',
  };
}

/**
 * Fetch Zendesk Dynamic content for given locale:.
 * Dynamic Content API: https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/
 *
 * @param _localeId The locale id as definied in Zendesk to generate string translations.
 * @param placeholders an array of Dynamic content IDs.
 * @param _zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 * @param _authHeader Authorization header to access Zendesk API.
 *
 * @returns The "placeholder to string" map for the given dynamic content IDs.
 */
export async function getTranslationsFromDynamicContent(
  _localeId: number,
  placeholders: string[],
  _zendeskUrl: string,
  _authHeader: HeadersInit
): Promise<{ [key: string]: string }> {
  return Object.fromEntries(placeholders.map((key) => [key, 'todo']));
}
