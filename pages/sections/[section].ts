import { getSection } from '@ircsignpost/signpost-base/dist/src/zendesk';
import { GetServerSideProps } from 'next';

import { getLocaleFromCode } from '../../lib/locale';
import { getZendeskUrl } from '../../lib/url';

export default function Section() {}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  if (!locale) {
    throw new Error(
      `Failed to get props for a section (id: ${params?.section}): missing locale.`
    );
  }

  if (!params?.section) return { notFound: true, props: {} };

  const currentLocale = getLocaleFromCode(locale);
  const section = await getSection(
    currentLocale,
    Number(params.section),
    getZendeskUrl()
  );

  if (!section) return { notFound: true, props: {} };

  return {
    redirect: {
      destination: `/${locale}/categories/${section.category_id}`,
    },
    props: {},
  };
};
