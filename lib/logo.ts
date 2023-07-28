import type { LogoProps } from '@ircsignpost/signpost-base/dist/src/header';
import type { Locale } from '@ircsignpost/signpost-base/dist/src/locale';

import logoEnUs from '../public/greece-logo-locale-select.png';

export const getHeaderLogoProps = (currentLocale: Locale): LogoProps => {
  let imgSrc: string;
  switch (currentLocale.url) {
    case 'en-us':
    default:
      imgSrc = logoEnUs.src;
      break;
  }
  return {
    src: imgSrc,
  };
};
