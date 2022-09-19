const withLess = require('next-with-less');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Keep in sync with locales configured in /lib/locale.ts.
  i18n: {
    locales: ['default', 'en-us' /* TODO */],
    defaultLocale: 'default',
    localeDetection: false,
  },
  async redirects() {
    return [
      // Redirect legacy Zendesk paths with slugs. For example, redirect
      // /articles/123456-Article-Title to /articles/123456.
      {
        source: '/:resource/:id(\\d{1,}):rest(-.*)',
        destination: '/:resource/:id',
        permanent: true,
      },
    ];
  },
};

module.exports = withLess({
  ...nextConfig,
  lessLoaderOptions: {
    lessOptions: {
      // See full list of Ant styles here:
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      modifyVars: {
        'primary-color': '#51258F',
        'info-color': '#FF9083',
        'alert-info-bg-color': '#FF9083',
        // Override Ant typography.
        'heading-1-size': '3.75rem',
        'heading-2-size': '1.875rem',
        'typography-title-font-weight': '400',
        // Set height and border radius for 'default' type elements, e.g. buttons, inputs, etc.
        'height-base': '48px',
        'height-sm': '32px',
        'border-radius-base': '10px',
        'border-color-base': '#333',
        // Set header styles.
        'layout-header-height': 'auto',
        'layout-header-min-height': '4.375rem',
        'layout-header-padding': '0',
        'header-background-color': '#2F7DBF',
        'header-text-color': 'white',
        'header-banner-background-color': 'linear-gradient(#2F7DBF, #3FA7FF)',
        'header-banner-text-color': 'white',
        // Set search styles.
        'search-icon-color': 'black',
        'search-icon-bg-color': '#FF9083',
        // Set card styles.
        'card-padding-base': '16px',
        'home-page-card-icon-color': '#999999',
        // Set cookie banner styles.
        'cookie-banner-text': '#000',
        'cookie-banner-back': '#ff9083',
      },
    },
  },
});
