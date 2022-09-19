import HomePage, {
  HomePageStrings,
} from '@ircsignpost/signpost-base/dist/src/home-page';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import { ServiceMapProps } from '@ircsignpost/signpost-base/dist/src/service-map';
import { ZendeskCategory } from '@ircsignpost/signpost-base/dist/src/zendesk';
// TODO Use real Zendesk API implementation.
import {
  getArticle,
  getCategories,
  getTranslationsFromDynamicContent,
} from '../lib/zendesk-fake';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import {
  ABOUT_US_ARTICLE_ID,
  CATEGORIES_TO_HIDE,
  CATEGORY_ICON_NAMES,
  REVALIDATION_TIMEOUT_SECONDS,
  ZENDESK_AUTH_HEADER,
} from '../lib/constants';
import { LOCALES, Locale, getLocaleFromCode } from '../lib/locale';
import {
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  HOME_PAGE_DYNAMIC_CONTENT_PLACEHOLDERS,
  populateHomePageStrings,
  populateMenuOverlayStrings,
} from '../lib/translations';
import { getZendeskMappedUrl, getZendeskUrl } from '../lib/url';
import { getHeaderLogoProps } from '../lib/logo';
import { getMenuItems } from '../lib/menu';

interface HomeProps {
  currentLocale: Locale;
  strings: HomePageStrings;
  // A list of |MenuOverlayItem|s to be displayed in the header and side menu.
  menuOverlayItems: MenuOverlayItem[];
  serviceMapProps?: ServiceMapProps;
  // The HTML text of the About Us category shown on the home page.
  aboutUsTextHtml: string;
  categories: ZendeskCategory[];
}

const Home: NextPage<HomeProps> = ({
  currentLocale,
  strings,
  menuOverlayItems,
  serviceMapProps,
  aboutUsTextHtml,
  categories,
}) => {
  return (
    <HomePage
      currentLocale={currentLocale}
      locales={LOCALES}
      strings={strings}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      serviceMapProps={serviceMapProps}
      aboutUsTextHtml={aboutUsTextHtml}
      categories={categories}
    />
  );
};

/* Returns a Zendesk locale id for the current locale.
 If there is no mapping for the requested locale, return the deafault id
 for en-us locale. */
const getZendeskLocaleId = (_currentLocale: Locale): number => {
  return 1;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale: Locale = getLocaleFromCode(locale ?? 'en-us');
  let dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(
      HOME_PAGE_DYNAMIC_CONTENT_PLACEHOLDERS
    ),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );

  let categories: ZendeskCategory[] = await getCategories(
    currentLocale,
    getZendeskUrl()
  );
  categories = categories.filter((c) => !CATEGORIES_TO_HIDE.includes(c.id));
  categories.forEach((c) => (c.icon = CATEGORY_ICON_NAMES[c.id]));

  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent)
  );
  const article = await getArticle(
    currentLocale,
    ABOUT_US_ARTICLE_ID,
    getZendeskUrl(),
    getZendeskMappedUrl(),
    ZENDESK_AUTH_HEADER
  );
  const aboutUsTextHtml = article ? article.body : '';

  const strings = populateHomePageStrings(dynamicContent);

  return {
    props: {
      currentLocale,
      strings,
      menuOverlayItems,
      categories,
      aboutUsTextHtml,
      revalidate: REVALIDATION_TIMEOUT_SECONDS,
    },
  };
};

export default Home;
