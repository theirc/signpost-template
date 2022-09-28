import {
  Section, // TODO Use real signpost-base/Zendesk API implementation.
  // getSectionsForCategory,
} from '@ircsignpost/signpost-base/dist/src/category-content';
import CategoryPage, {
  CategoryStrings,
} from '@ircsignpost/signpost-base/dist/src/category-page';
import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import { MenuItem } from '@ircsignpost/signpost-base/dist/src/select-menu';
import { GetStaticProps } from 'next';

import {
  CATEGORIES_TO_HIDE,
  CATEGORY_ICON_NAMES,
  GOOGLE_ANALYTICS_IDS,
  REVALIDATION_TIMEOUT_SECONDS,
  SEARCH_BAR_INDEX,
  SITE_TITLE,
  USE_CAT_SEC_ART_CONTENT_STRUCTURE,
  ZENDESK_AUTH_HEADER,
} from '../../lib/constants';
import {
  LOCALES,
  Locale,
  getLocaleFromCode,
  getZendeskLocaleId,
} from '../../lib/locale';
import { getHeaderLogoProps } from '../../lib/logo';
import { getMenuItems } from '../../lib/menu';
import {
  CATEGORY_PLACEHOLDERS,
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  getLastUpdatedLabel,
  populateCategoryStrings,
  populateMenuOverlayStrings,
} from '../../lib/translations';
import { getZendeskUrl } from '../../lib/url';
// TODO Use real Zendesk API implementation.
import {
  getCategories,
  getSectionsForCategory,
  getTranslationsFromDynamicContent,
} from '../../lib/zendesk-fake';

interface CategoryProps {
  currentLocale: Locale;
  pageTitle: string;
  categoryId: number;
  categoryItems: MenuItem[];
  sections: Section[];
  // A list of |MenuOverlayItem|s to be displayed in the header and side menu.
  menuOverlayItems: MenuOverlayItem[];
  strings: CategoryStrings;
}

export default function Category({
  currentLocale,
  pageTitle,
  categoryId,
  categoryItems,
  sections,
  menuOverlayItems,
  strings,
}: CategoryProps) {
  return (
    <CategoryPage
      currentLocale={currentLocale}
      locales={LOCALES}
      pageTitle={pageTitle}
      categoryId={categoryId}
      categoryItems={categoryItems}
      sections={sections}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      searchBarIndex={SEARCH_BAR_INDEX}
      cookieBanner={
        <CookieBanner
          strings={strings.cookieBannerStrings}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
      strings={strings}
    />
  );
}

async function getStaticParams() {
  const categories = await Promise.all(
    Object.values(LOCALES).map(
      async (locale) => await getCategories(locale, getZendeskUrl())
    )
  );

  return categories.flat().map((category) => {
    return {
      category: category.id.toString(),
      locale: category.locale,
    };
  });
}

export async function getStaticPaths() {
  const categoryParams = await getStaticParams();

  return {
    paths: categoryParams.map(({ category, locale }) => {
      return {
        params: { category },
        locale,
      };
    }),
    fallback: 'blocking',
  };
}

function getStringPath(category: string, locale: string): string {
  return `/${locale}/categories/${category}`;
}

export async function getStringPaths(): Promise<string[]> {
  const params = await getStaticParams();
  return params.map((param) => getStringPath(param.category, param.locale));
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // Category page does not exist in this type of content structure.
  if (USE_CAT_SEC_ART_CONTENT_STRUCTURE) {
    return { notFound: true, props: {} };
  }
  if (!locale) {
    throw new Error(
      `Failed to get static props for a category (id: ${params?.category}): missing locale.`
    );
  }

  const currentLocale = getLocaleFromCode(locale);
  const dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(CATEGORY_PLACEHOLDERS),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );
  const strings: CategoryStrings = populateCategoryStrings(dynamicContent);

  const categories = (
    await getCategories(currentLocale, getZendeskUrl())
  ).filter((c) => !CATEGORIES_TO_HIDE.includes(c.id));

  const categoryItems = categories.map((category) => {
    return {
      name: category.name,
      value: category.id,
      iconName: CATEGORY_ICON_NAMES[category.id.toString()] || 'help_outline',
      link: '/categories/' + category.id.toString(),
    };
  });

  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent),
    categories
  );

  // TODO Use real Zendesk API instead of the faked one.
  const sections = await getSectionsForCategory(
    currentLocale,
    Number(params?.category),
    getZendeskUrl(),
    getLastUpdatedLabel(dynamicContent)
  );

  return {
    props: {
      currentLocale,
      pageTitle: SITE_TITLE,
      categoryId: Number(params?.category),
      categoryItems,
      sections,
      menuOverlayItems,
      strings,
    },
    revalidate: REVALIDATION_TIMEOUT_SECONDS,
  };
};
