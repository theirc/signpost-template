import type {
  MenuOverlayItem,
  MenuOverlayStrings,
} from '@ircsignpost/signpost-base/dist/src/menu-overlay';

// TODO Update menu items.
export function getMenuItems(strings: MenuOverlayStrings): MenuOverlayItem[] {
  return [{ key: 'home', label: strings.home, href: '/' }];
}
