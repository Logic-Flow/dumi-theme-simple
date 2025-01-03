import { useSiteData } from 'dumi';
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  title?: string;
  titleSuffix?: string;
}

export const SEO: React.FC<SEOProps> = ({
  description,
  lang = '',
  meta = [],
  title,
  titleSuffix,
}) => {
  const { themeConfig } = useSiteData();
  const { title: defaultTitle, description: defaultDescription } = themeConfig;

  const metaDescription = description || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${titleSuffix || defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content:
            'https://s3-gzpu.didistatic.com/ese-feedback/LogicFlow/2.0HeadImg.png',
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content:
            'https://s3-gzpu.didistatic.com/ese-feedback/LogicFlow/2.0HeadImg.png',
        },
      ].concat(meta)}
    />
  );
};

// SEO.defaultProps = {
//   lang: `zh`,
//   meta: [],
//   description: ``,
// };
