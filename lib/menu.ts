// Utility menu overlay functions
import type {
  MenuOverlayItem,
  MenuOverlayStrings,
} from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import { ZendeskCategory } from '@ircsignpost/signpost-base/dist/src/zendesk';

import { ABOUT_US_ARTICLE_ID } from './constants';

export interface CustomMenuOverlayStrings extends MenuOverlayStrings {
  information: string;
  about: string;
}

// TODO Update menu items if needed.
export function getMenuItems(
  strings: CustomMenuOverlayStrings,
  categories: ZendeskCategory[]
): MenuOverlayItem[] {
  let items: MenuOverlayItem[] = [];
  items.push({ key: 'home', label: strings.home, href: '/' });
  if (categories.length > 0) {
    items.push({
      key: 'information',
      label: strings.information,
      children: categories.map((category) => {
        return {
          key: category.id.toString(),
          label: category.name,
          href: '/categories/' + category.id.toString(),
        };
      }),
    });
  }
  items.push({
    key: 'about',
    label: strings.about,
    href: `/articles/${ABOUT_US_ARTICLE_ID}`,
  });
  return items;
}
