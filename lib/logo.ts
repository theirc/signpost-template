import type { LogoProps } from '@ircsignpost/signpost-base/dist/src/header';
import type { Locale } from '@ircsignpost/signpost-base/dist/src/locale';
import logoEnUs from '../public/todo-logo-en-us.png';

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
    width: 110,
    height: 22,
  };
};
