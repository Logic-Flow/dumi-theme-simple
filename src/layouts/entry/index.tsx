import React from 'react';
import { isArray, size, get } from 'lodash-es';
import { useLocale, useSiteData, FormattedMessage } from 'dumi';
import { SEO } from '../../slots/SEO';
import { Header } from '../../slots/Header';
// import { Detail } from '../../slots/Detail';
import { LFBanner } from '../../slots/LFBanner';
import { Features } from '../../slots/Features';
import { Cases } from '../../slots/Cases';
import { CustomSlider } from '../../slots/Swipper';
import { Companies } from '../../slots/Companies';
import { Footer } from '../../slots/Footer';

/**
 * Index 路由下的入口
 * - 获取数据
 * - 组合 slots 下的木偶组件
 */
export const Index = () => {
  const locale = useLocale();
  const { themeConfig } = useSiteData();
  const {
    title,
    siteUrl,
    githubUrl,
    showLFBanner,
    showSearch,
    showGithubCorner,
    showGithubStars,
    showLanguageSwitcher,
    showWxQrcode,
    defaultLanguage,
    versions,
    ecosystems,
    navs,
    detail,
    news,
    companies,
    features,
    cases,
    className,
    style,
    id,
  } = themeConfig;

  const detailProps = {
    githubUrl,
    showGithubStars,
    news,
    features,
    ...detail,
  };

  const featuresProps = {
    title: get(features, ['title']),
    features: isArray(features) ? features : get(features, ['cards'], []),
    className,
    style,
    id,
  };

  const casesProps = {
    cases,
    style,
    className,
  };

  const metaTitle = detailProps.title;

  return (
    <>
      <SEO
        title={`${metaTitle[locale.id]}`}
        titleSuffix="LogicFlow"
        lang={locale.id}
      />
      <Header />
      {showLFBanner ? <LFBanner {...detailProps} /> : null}

      {/* {size(detail) ? <Detail {...detailProps} /> : null} */}
      {size(featuresProps.features) ? <Features {...featuresProps} /> : null}
      {size(cases) ? <Cases {...casesProps} /> : null}
      <CustomSlider />
      {size(companies) ? (
        <Companies
          title={<FormattedMessage id="感谢信赖" />}
          companies={companies}
        />
      ) : null}
      <Footer />
    </>
  );
};
