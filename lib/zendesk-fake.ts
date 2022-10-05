// Fake implementation of the Zendesk interface.
//
// TODO Replace uses of this library with the real implementation.
import { Section } from '@ircsignpost/signpost-base/dist/src/topic-with-articles';
import type {
  CategoryWithSections,
  ZendeskArticle,
  ZendeskCategory,
  ZendeskSection,
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
      name: 'TODO 1',
      description: 'Lorem Ipsum',
      locale: 'en-us',
      icon: '',
    },
    {
      id: 321,
      name: 'TODO 2',
      description: 'Lorem Ipsum',
      locale: 'en-us',
      icon: '',
    },
  ];
}

/**
 * Gets categories with their associated sections.
 *
 * @async
 * @param locale The locale of the fetched data.
 * @param zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 * @param [categoryFilter] If provided, filters out specified categories.
 * @returns Categories with their associated sections.
 */
export async function getCategoriesWithSections(
  locale: Locale,
  zendeskUrl: string,
  categoryFilter?: (category: ZendeskCategory) => boolean
): Promise<CategoryWithSections[]> {
  let categories: ZendeskCategory[] = await getCategories(locale, zendeskUrl);
  if (categoryFilter) categories = categories.filter(categoryFilter);

  const categoriesAndSections: CategoryWithSections[] = [];
  for (const category of categories) {
    const sections: ZendeskSection[] = [
      {
        name: category.name + '-TODO-1111',
        description: 'Lorem Ipsum',
        id: category.id + 1111,
        locale: 'en-us',
        category_id: category.id,
        icon: '',
      },
      {
        name: category.name + '-TODO-2222',
        description: 'Lorem Ipsum',
        id: category.id + 2222,
        locale: 'en-us',
        category_id: category.id,
        icon: '',
      },
    ];
    categoriesAndSections.push({ category, sections });
  }
  return categoriesAndSections;
}

export async function getSectionsForCategory(
  locale: Locale,
  _categoryId: number,
  _zendeskUrl: string,
  lastUpdatedLabel: string
): Promise<Section[]> {
  return Promise.resolve([
    {
      id: 11111100,
      name: 'TODO',
      articles: [
        {
          id: 11111101,
          title: 'Lorem Ipsum',
          lastEdit: {
            value: '2022-08-22T16:28:15Z',
            label: lastUpdatedLabel,
            locale: locale,
          },
        },
        {
          id: 11111102,
          title: 'Lorem Ipsum',
          lastEdit: {
            value: '2022-08-22T16:28:15Z',
            label: lastUpdatedLabel,
            locale: locale,
          },
        },
      ],
    },
    {
      id: 22222200,
      name: 'TODO',
      articles: [
        {
          id: 22222201,
          title: 'Lorem Ipsum',
          lastEdit: {
            value: '2022-08-22T16:28:15Z',
            label: lastUpdatedLabel,
            locale: locale,
          },
        },
        {
          id: 22222202,
          title: 'Lorem Ipsum',
          lastEdit: {
            value: '2022-08-22T16:28:15Z',
            label: lastUpdatedLabel,
            locale: locale,
          },
        },
      ],
    },
    {
      id: 33333300,
      name: 'TODO',
      articles: [
        {
          id: 33333301,
          title: 'Lorem ipsum',
          lastEdit: {
            value: '2022-08-22T16:28:15Z',
            label: lastUpdatedLabel,
            locale: locale,
          },
        },
        {
          id: 33333302,
          title: 'Lorem Ipsum',
          lastEdit: {
            value: '2022-08-22T16:28:15Z',
            label: lastUpdatedLabel,
            locale: locale,
          },
        },
      ],
    },
  ]);
}

/**
 * Fetches list of Zendesk sections for the given locale.
 *
 * @param _locale The locale of the section.
 * @param _zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 *
 * @returns List of ZendeskSection
 */
export async function getSections(
  _locale: Locale,
  _zendeskUrl: string
): Promise<ZendeskSection[]> {
  return [
    {
      name: 'TODO',
      description: 'Lorem Ipsum',
      id: 2222,
      locale: 'en-us',
      category_id: 123,
      icon: '',
    },
    {
      name: 'TODO',
      description: 'Lorem Ipsum',
      id: 1111,
      locale: 'en-us',
      category_id: 321,
      icon: '',
    },
    {
      name: 'TODO',
      description: 'Lorem Ipsum',
      id: 2222,
      locale: 'en-us',
      category_id: 321,
      icon: '',
    },
  ];
}

/**
 * Fetches section for the given locale.
 *
 * @param locale The locale of the section.
 * @param sectionId Section id to fetch.
 * @param zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 *
 * @returns ZendeskSection
 */
export async function getSection(
  locale: Locale,
  sectionId: number,
  _zendeskUrl: string
): Promise<ZendeskSection | undefined> {
  return {
    name: 'TODO',
    description: 'Lorem Ipsum',
    id: sectionId,
    locale: locale.url,
    category_id: 321,
    icon: '',
  };
}

export async function getArticlesForSection(
  locale: Locale,
  sectionId: number,
  _zendeskUrl: string
): Promise<ZendeskArticle[]> {
  return Promise.resolve([
    {
      locale: locale.url,
      section_id: sectionId,
      id: 11111101,
      title: 'Lorem Ipsum',
      body: 'TODO',
      edited_at: '2022-09-19',
    },
    {
      locale: locale.url,
      section_id: sectionId,
      id: 11111102,
      title: 'Lorem Ipsum',
      body: 'TODO',
      edited_at: '2022-09-19',
    },
    {
      locale: locale.url,
      section_id: sectionId,
      id: 22222201,
      title: 'Lorem Ipsum',
      body: 'TODO',
      edited_at: '2022-09-19',
    },
    {
      locale: locale.url,
      section_id: sectionId,
      id: 22222202,
      title: 'Lorem Ipsum',
      body: 'TODO',
      edited_at: '2022-09-19',
    },
  ]);
}

// An example article content which contains custom elements.
// More about Zendesk content editor custom elements:
// https://docs.google.com/document/d/1RyKzdU5ytXyswHtMoefjpvC7DtEMcJ1ZwJtMRsP5r4E
const exampleArticleContent = `
  {meta name="description" content="This article is an example article"}
  <h2>Lorem ipsum dolor sit amet</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut enim elit. Etiam sit amet tristique nulla, sed pulvinar justo. Mauris vestibulum purus auctor, rhoncus diam vel, euismod nisl. Curabitur sagittis nisi in odio feugiat, feugiat tempus sapien tristique. Praesent sed convallis lorem. Suspendisse semper vel ex at vehicula. Aenean ultricies, urna non ultricies cursus, nisl est viverra enim, sed malesuada tortor sapien eget lectus. Curabitur in velit tincidunt urna blandit viverra a vel mauris.<p>
  <p>In volutpat, justo nec lacinia tristique, justo nibh aliquam eros, ac consequat mi est ut erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer tortor nunc, tempor non nibh sed, tincidunt viverra orci. Maecenas blandit, eros non consectetur maximus, dui nulla iaculis augue, sit amet maximus metus arcu vel risus. Duis faucibus, nibh rutrum iaculis cursus, justo tortor placerat erat, in efficitur leo turpis ac dui. Pellentesque dolor lectus, interdum nec faucibus non, aliquet ut sem. Proin eleifend, nibh in ornare hendrerit, enim nibh elementum urna, sed interdum leo quam ac odio. Quisque tincidunt nisi orci, a facilisis velit laoreet eu. Donec consequat ullamcorper mauris, sed tristique massa lobortis eu. Duis vulputate condimentum arcu et congue. Pellentesque feugiat lorem non rutrum finibus.</p>
  <br/>
  [link-button href="https://www.lipsum.com/"] Lorem ipsum [/link-button]`;

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
    body: exampleArticleContent,
    edited_at: '2022-09-19',
    id: articleId,
    locale: locale.url,
    section_id: 123,
    title: 'TODO',
  };
}

/**
 * Fetches all articles for the given locale.
 *
 * @param locale The locale of articles.
 * @param zendeskUrl The canonical Zendesk URL, e.g., https://signpost-u4u.zendesk.com.
 *
 * @returns List of ZendeskArticle
 */
export async function getArticles(
  locale: Locale,
  zendeskUrl: string
): Promise<ZendeskArticle[]> {
  const sections = await getSectionsForCategory(
    locale,
    123,
    zendeskUrl,
    'Last updated: '
  );
  const articles: ZendeskArticle[] = [];
  sections.forEach((section) => {
    section.articles.forEach((article) => {
      articles.push({
        id: article.id,
        section_id: section.id,
        locale: locale.url,
        edited_at: article.lastEdit.value,
        title: article.title,
        body: exampleArticleContent,
      });
    });
  });
  return articles;
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
  // Use the `key` as a value, because some components use that value as a
  // React key.
  return Object.fromEntries(placeholders.map((key) => [key, `todo-${key}`]));
}
