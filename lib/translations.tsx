import { HeaderBannerProps } from '@ircsignpost/signpost-base/dist/src/header-banner';
import { SearchResultsStrings } from '@ircsignpost/signpost-base/dist/src/search-results-page';
import { ErrorProps } from '@ircsignpost/signpost-base/dist/src/error';
import { ShareButtonProps } from '@ircsignpost/signpost-base/dist/src/share-button';
import { CardsListStrings } from '@ircsignpost/signpost-base/dist/src/home-page-cards-list';
import { CookieBannerStrings } from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { HomePageStrings } from '@ircsignpost/signpost-base/dist/src/home-page';
import { CustomMenuOverlayStrings } from './menu';
import { getSocialMediaProps } from './social-media';

/** General strings used on various pages. */
export const COMMON_DYNAMIC_CONTENT_PLACEHOLDERS = [
  // Header strings.
  'default_menu_home_title',
  'default_information_title',
  'default_menu_about_title',
  // Cookie banner strings.
  'default_cookie_banner',
  'default_accept',
  'default_reject',
  // General strings.
  'default_share',
  'default_share_notificaiton_text',
  'default_download',
  'default_last_updated',
  'default_article_reader_title',
];

export const HOME_PAGE_DYNAMIC_CONTENT_PLACEHOLDERS = [
  // Header banner and social media strings.
  /*
   * TODO: create Dynamic content ID for mission statement.
  '<website_name>_mission_statement',
   */
  'default_banner_social_media_title',
  'default_banner_social_media_description',
  'default_banner_facebook_title',
  'default_banner_messenger_title',
  'default_banner_whatsapp_title',
  // Main body strings.
  'default_information_title',
  'default_information_description',
  'default_service_map_title',
  'default_service_map_description',
  'default_service_map_select_region',
  'default_service_map_all_regions',
  'default_service_map_select_city',
  'default_service_map_select_services',
  'default_service_map_all_services',
];

export const CATEGORY_PLACEHOLDERS = ['default_select_topic'];

export const SEARCH_RESULTS_PLACEHOLDERS = ['default_search_results_found'];

export const ERROR_DYNAMIC_CONTENT_PLACEHOLDERS = [
  'default_error_indicator',
  'default_error_page_does_not_exist',
  'default_error_page_under_construction',
  'default_error_translation_missing',
  'default_error_home_button_title',
];

export function createHeaderBannerProps(dynamicContent: {
  [key: string]: string;
}): HeaderBannerProps {
  return {
    // TODO: replace welcomeTitle with website-specific Dynamic content ID.
    welcomeTitle: 'Welcome text.', // dynamicContent['<site_prefix>_mission_statement'],
    socialMediaTitle: dynamicContent['default_banner_social_media_title'],
    socialMediaDescription:
      dynamicContent['default_banner_social_media_description'],
    socialMediaData: getSocialMediaProps(dynamicContent),
  };
}

/** Populate localized categories section strings from Dynamic content. */
export function populateCategoriesSectionStrings(dynamicContent: {
  [key: string]: string;
}): CardsListStrings {
  return {
    title: dynamicContent['default_information_title'],
    description: dynamicContent['default_information_description'],
  };
}

export function populateCookieBannerStrings(dynamicContent: {
  [key: string]: string;
}): CookieBannerStrings {
  return {
    content: dynamicContent['default_cookie_banner'],
    accept: dynamicContent['default_accept'],
    reject: dynamicContent['default_reject'],
  };
}

export function getLastUpdatedLabel(dynamicContent: {
  [key: string]: string;
}): string {
  return dynamicContent['default_last_updated'];
}

export function getShareButtonProps(dynamicContent: {
  [key: string]: string;
}): ShareButtonProps {
  return {
    label: dynamicContent['default_share'],
    notificationText: dynamicContent['default_share_notificaiton_text'],
  };
}

export function generateArticleErrorProps(dynamicContent: {
  [key: string]: string;
}): ErrorProps {
  return {
    title: dynamicContent['default_error_indicator'],
    subtitle: dynamicContent['default_error_page_under_construction'],
    description: dynamicContent['default_error_translation_missing'],
    homeButtonLabel: dynamicContent['default_error_home_button_title'],
  };
}

export function generate404ErrorProps(dynamicContent: {
  [key: string]: string;
}): ErrorProps {
  return {
    title: dynamicContent['default_error_indicator'],
    subtitle: dynamicContent['default_error_page_does_not_exist'],
    homeButtonLabel: dynamicContent['default_error_home_button_title'],
  };
}

export function populateSearchResultsStrings(dynamicContent: {
  [key: string]: string;
}): SearchResultsStrings {
  return {
    lastEditedLabel: dynamicContent['default_last_updated'],
    resultSummaryStringTemplate: (
      firstOnPage: number,
      lastOnPage: number,
      totalCount: number,
      query: string
    ) => {
      return `${totalCount} ${dynamicContent['default_search_results_found']} "${query}"`;
    },
  };
}

export function getSelectTopicLabel(dynamicContent: {
  [key: string]: string;
}): string {
  return dynamicContent['default_select_topic'];
}

// TODO(annkats): add populateServiceMapStrings() once Service map becomes a Shared component.
// TODO(annkats): add populateArticlePageStrings() once Article page becomes a Shared component.

export function populateMenuOverlayStrings(dynamicContent: {
  [key: string]: string;
}): CustomMenuOverlayStrings {
  return {
    home: dynamicContent['default_menu_home_title'],
    information: dynamicContent['default_information_title'],
    about: dynamicContent['default_menu_about_title'],
  };
}

export function populateHomePageStrings(dynamicContent: {
  [key: string]: string;
}): HomePageStrings {
  return {
    cardsListStrings: populateCategoriesSectionStrings(dynamicContent),
    cookieBannerStrings: populateCookieBannerStrings(dynamicContent),
    headerBannerProps: createHeaderBannerProps(dynamicContent),
  };
}
