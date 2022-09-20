import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import HomePage, {
  HomePageStrings,
} from '@ircsignpost/signpost-base/dist/src/home-page';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import { ServiceMapProps } from '@ircsignpost/signpost-base/dist/src/service-map';
import { ZendeskCategory } from '@ircsignpost/signpost-base/dist/src/zendesk';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import {
  ABOUT_US_ARTICLE_ID,
  CATEGORIES_TO_HIDE,
  CATEGORY_ICON_NAMES,
  GOOGLE_ANALYTICS_IDS,
  REVALIDATION_TIMEOUT_SECONDS,
  SITE_TITLE,
  ZENDESK_AUTH_HEADER,
} from '../lib/constants';
import {
  LOCALES,
  Locale,
  getLocaleFromCode,
  getZendeskLocaleId,
} from '../lib/locale';
import { getHeaderLogoProps } from '../lib/logo';
import { getMenuItems } from '../lib/menu';
import {
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  HOME_PAGE_DYNAMIC_CONTENT_PLACEHOLDERS,
  populateHomePageStrings,
  populateMenuOverlayStrings,
} from '../lib/translations';
import { getZendeskMappedUrl, getZendeskUrl } from '../lib/url';
// TODO Use real Zendesk API implementation.
import {
  getArticle,
  getCategories,
  getTranslationsFromDynamicContent,
} from '../lib/zendesk-fake';

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
      title={SITE_TITLE}
      currentLocale={currentLocale}
      locales={LOCALES}
      strings={strings}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      serviceMapProps={serviceMapProps}
      aboutUsTextHtml={aboutUsTextHtml}
      categories={categories}
      cookieBanner={
        <CookieBanner
          strings={strings.cookieBannerStrings}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
    />
  );
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
    populateMenuOverlayStrings(dynamicContent),
    categories
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
