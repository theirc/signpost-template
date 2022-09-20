import Custom404Page, {
  Custom404Strings,
} from '@ircsignpost/signpost-base/dist/src/404-page';
import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import { ZendeskCategory } from '@ircsignpost/signpost-base/dist/src/zendesk';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import {
  CATEGORIES_TO_HIDE,
  GOOGLE_ANALYTICS_IDS,
  REVALIDATION_TIMEOUT_SECONDS,
  SEARCH_BAR_INDEX,
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
  ERROR_DYNAMIC_CONTENT_PLACEHOLDERS,
  populateCustom404Strings,
  populateMenuOverlayStrings,
} from '../lib/translations';
import { getZendeskUrl } from '../lib/url';
// TODO Use real Zendesk API implementation.
import {
  getCategories,
  getTranslationsFromDynamicContent,
} from '../lib/zendesk-fake';

interface Custom404Props {
  currentLocale: Locale;
  // Page title.
  title: string;
  strings: Custom404Strings;
  // A list of |MenuOverlayItem|s to be displayed in the header and side menu.
  menuOverlayItems: MenuOverlayItem[];
}

export default function Custom404({
  currentLocale,
  title,
  strings,
  menuOverlayItems,
}: Custom404Props) {
  const router = useRouter();

  return (
    <Custom404Page
      currentLocale={currentLocale}
      locales={LOCALES}
      title={title}
      strings={strings}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      searchBarIndex={SEARCH_BAR_INDEX}
      cookieBanner={
        <CookieBanner
          strings={strings.cookieBannerStrings}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale: Locale = getLocaleFromCode(locale ?? 'en-us');

  let dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(
      ERROR_DYNAMIC_CONTENT_PLACEHOLDERS
    ),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );

  const strings: Custom404Strings = populateCustom404Strings(dynamicContent);

  const categories: ZendeskCategory[] = (
    await getCategories(currentLocale, getZendeskUrl())
  ).filter((c) => !CATEGORIES_TO_HIDE.includes(c.id));
  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent),
    categories
  );

  return {
    props: {
      currentLocale,
      strings,
      menuOverlayItems,
      categories,
      title: strings.errorStrings.subtitle?.concat(' - ', SITE_TITLE),
      revalidate: REVALIDATION_TIMEOUT_SECONDS,
    },
  };
};
