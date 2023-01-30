// This module implements a locale selection page.
//
// This page accepts an optional target pathname as a query parameter. It
// displays a page that redirects to the pathname in the selected locale.
import { default as LocaleSelectPageBase } from '@ircsignpost/signpost-base/dist/src/locale-select-page';
import type { Lang } from '@ircsignpost/signpost-base/dist/src/locale-select-page';
import Image from 'next/image';

import { SITE_TITLE } from '../lib/constants';
import logo from '../public/ri-czechia-logo.png';

const langs: Lang[] = [
  {
    langShort: 'cs',
    langLong: 'čeština',
  },
  {
    langShort: 'en-us',
    langLong: 'English',
  },
  {
    langShort: 'ru',
    langLong: 'Русский',
  },
  {
    langShort: 'uk',
    langLong: 'Українська',
  },
];

/** The locale selection page.
 *
 * This page has two functionalities:
 * - Allow first time visitors to select their locale.
 * - Redirect recurring visitors to their selected locale.
 *
 * Before this page gets all data to make distinction between those two, it
 * renders a spinner.
 *
 * The page only shows the locale selection dialog to first time visitors.
 */
export default function LocaleSelectPage() {
  return (
    <LocaleSelectPageBase
      siteTitle={SITE_TITLE}
      message={
        'Information and services about rights and procedures for refugees in Czechia.'
      }
      langs={langs}
      image={<Image src={logo} alt="icon" />}
    />
  );
}
