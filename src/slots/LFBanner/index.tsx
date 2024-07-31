import React from 'react';
// import cx from 'classnames';
import { IC } from '../../types';
// import { News, NewsProps } from './News';
import { LfContainer } from './components';

import styles from './index.module.less';

type LFBannerButtonProps = {
  text: IC;
  link: string;
  style?: React.CSSProperties;
  type?: string;
  shape?: 'round' | 'square';
  icon?: string;
};

type LFBannerProps = {
  className?: string;
  style?: React.CSSProperties;
  title: IC;
  engine?: IC;
  description: IC;
  image?: string;
  imageStyle?: React.CSSProperties;
  buttons?: LFBannerButtonProps[];
  githubUrl: string;
  showGithubStars?: boolean;
  features: any;
  advantages: any;
};

export interface props {
  height: number | string;
}

export const FilterDivider: React.FC<props> = ({ height }) => {
  return <div style={{ height }} className={styles.filterDivider}></div>;
};

/**
 * Index.技术栈的描述区域！
 * 各自配置
 */
export const LFBanner: React.FC<LFBannerProps> = ({
  style,
  title,
  engine,
  description,
  githubUrl,
  showGithubStars = true,
  buttons = [],
  features,
  advantages,
}) => {
  return (
    <section style={style}>
      <div className={styles.content}>
        <LfContainer
          title={title}
          engine={engine}
          description={description}
          githubUrl={githubUrl}
          showGithubStars={showGithubStars}
          buttons={buttons}
          features={features}
          advantages={advantages}
        />
      </div>
    </section>
  );
};
