// A module for handling social media.
import { SocialMediaProps } from '@ircsignpost/signpost-base/dist/src/header-banner';

import facebookImage from '../public/facebook.svg';
import instagramImage from '../public/instagram.svg';
import messengerImage from '../public/messenger.svg';
import telegramImage from '../public/telegram.svg';
import tiktokImage from '../public/tiktok.svg';

export interface SocialMediaLink {
  title: string;
  href: string;
}

// Serializable social media links
export interface SocialMediaLinks {
  facebookLink: SocialMediaLink;
  messengerLink: SocialMediaLink;
  telegramLink: SocialMediaLink;
  tiktokLink: SocialMediaLink;
  instagramLink: SocialMediaLink;
}

/**
 * Provides data for Social Media buttons, e.g. Facebook, Whatsapp, etc.
 */
export function getSocialMediaProps(
  socialMediaLinks: SocialMediaLinks
): SocialMediaProps[] {
  return [
    {
      ...socialMediaLinks.facebookLink,
      image: facebookImage,
    },

    {
      ...socialMediaLinks.messengerLink,
      image: messengerImage,
    },

    {
      ...socialMediaLinks.telegramLink,
      image: telegramImage,
    },
    {
      ...socialMediaLinks.tiktokLink,
      image: tiktokImage,
    },
    {
      ...socialMediaLinks.instagramLink,
      image: instagramImage,
    },
  ];
}
