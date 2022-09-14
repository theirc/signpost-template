import { SocialMediaProps } from '@ircsignpost/signpost-base/dist/src/header-banner';

import facebookImage from '../public/facebook.svg';
import messengerImage from '../public/messenger.svg';
import whatsappImage from '../public/whatsapp.svg';

/**
 * Provides data for Social Media buttons, e.g. Facebook, Whatsapp, etc.
 *
 * TODO: Ask your Product manager to get Social media links.
 * You might need to add new Social media buttons or remove Facebook/Whatsapp/Messenger.
 * If so, import social media icons (or remove unused ones) under public/ dir.
 */
export function getSocialMediaProps(dynamicContent: {
  [key: string]: string;
}): SocialMediaProps[] {
  return [
    {
      title: dynamicContent['default_banner_facebook_title'],
      // TODO: create Dynamic content with link to Facebook page
      href: '', // dynamicContent['<site_prefix>_facebook_link']
      image: facebookImage,
    },
    {
      title: dynamicContent['default_banner_whatsapp_title'],
      // TODO: create Dynamic content with link to Whatsapp page
      href: '', // dynamicContent['<site_prefix>_whatsapp_link']
      image: whatsappImage,
    },
    {
      title: dynamicContent['default_banner_messenger_title'],
      // TODO: create Dynamic content with link to Messenger page
      href: '', // dynamicContent['<site_prefix>_messenger_link']
      image: messengerImage,
    },
  ];
}
