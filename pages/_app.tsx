import 'antd/dist/antd.less';
import '../styles/globals.css';
import '@ircsignpost/signpost-base/styles/category-content.less';
import '@ircsignpost/signpost-base/styles/footer-page.less';
import '@ircsignpost/signpost-base/styles/header.less';
import '@ircsignpost/signpost-base/styles/header-banner.less';
import '@ircsignpost/signpost-base/styles/layout.less';
import '@ircsignpost/signpost-base/styles/home-page.less';
import '@ircsignpost/signpost-base/styles/home-page-card.less';
import '@ircsignpost/signpost-base/styles/home-page-cards-list.less';
import '@ircsignpost/signpost-base/styles/locale-select-page.less';
import '@ircsignpost/signpost-base/styles/preview-banner.less';
import '@ircsignpost/signpost-base/styles/responsive.less';
import '@ircsignpost/signpost-base/styles/search-bar.less';
import '@ircsignpost/signpost-base/styles/search-results-page.less';
import '@ircsignpost/signpost-base/styles/select-menu.less';
import '@ircsignpost/signpost-base/styles/service-map.less';
import '@ircsignpost/signpost-base/styles/map.less';
import '@ircsignpost/signpost-base/styles/cookie-banner.less';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
