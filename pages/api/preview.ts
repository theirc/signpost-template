import previewHandler from '@ircsignpost/signpost-base/dist/src/preview';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ZENDESK_AUTH_HEADER } from '../../lib/constants';
import { getLocaleFromCode } from '../../lib/locale';
import { getZendeskMappedUrl, getZendeskUrl } from '../../lib/url';

/**
 * Enables preview mode.
 *
 * Check https://docs.google.com/document/d/1IbtY_EvIm0c1C8yeKpEPWwPvWJyHiNehYkRpVJJ65kg/edit?usp=sharing
 * for explanations.
 * https://<your-site>/api/preview?secret=<token>&slug=<path> is the preview mode URL.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  previewHandler(
    req,
    res,
    process.env.PREVIEW_TOKEN,
    getLocaleFromCode,
    getZendeskUrl(),
    getZendeskMappedUrl(),
    ZENDESK_AUTH_HEADER
  );
}
