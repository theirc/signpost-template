import type { NextApiRequest, NextApiResponse } from 'next';

import { LOCALES } from '../../lib/locale';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.DIRECTUS_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    let time = new Date();
    const result = await Promise.allSettled(
      Object.keys(LOCALES).map(async (lang) => {
        const pathToRevalidate = `/`;
        return await res.revalidate(pathToRevalidate);
      })
    );

    return res.status(200).json({
      revalidated: true,
      time,
      status: handleResults(result),
    });
  } catch (err) {
    return res.status(500).send('Error revalidating directus' + err);
  }
}

const isFulfilled = <T>(
  p: PromiseSettledResult<T>
): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';
const isRejected = <T>(
  p: PromiseSettledResult<T>
): p is PromiseRejectedResult => p.status === 'rejected';

function handleResults(results: PromiseSettledResult<void>[]) {
  const errors = results.filter(isRejected);
  const success = results.filter(isFulfilled);

  errors.forEach((error, index) => {
    if (error.reason instanceof Error) {
      // If the reason is an instance of Error, you can access the error message
      console.error(`Promise ${index} rejected:`, error.reason.message);
    } else {
      // If not an instance of Error, you can convert it to a string
      console.error(`Promise ${index} rejected:`, String(error.reason));
    }
  });

  return { errors, success };
}
