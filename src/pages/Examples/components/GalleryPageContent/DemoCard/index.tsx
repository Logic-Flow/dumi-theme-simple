import React from 'react';
import { Link, useLocale } from 'dumi';
import cx from 'classnames';
import { Badge } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { DemoCardProps } from '../../../types';
import { ic } from '../../../../../slots/hooks';
import styles from '../../../index.module.less';

const IconFontIcon = createFromIconfontCN({
  scriptUrl:
    'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/iconfont/iconfont.js', // self generate
});

/**
 * DEMO 的卡片预览
 *
 * @param {DemoCardProps} props 相关参数，详见类型定义
 * @returns {React.FC} React.FC
 */
export const DemoCard: React.FC<DemoCardProps> = (props) => {
  const { demo, topicId, exampleId } = props;
  const locale = useLocale();

  const renderCardInternal = () => {
    const img =
      demo.screenshot ||
      'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/screenshot-placeholder-white.png';
    return (
      <>
        <div
          className={cx('demo-card-screenshot', styles.screenshot)}
          style={{
            backgroundImage: `url("${img}")`,
          }}
        />
      </>
    );
  };
  return demo.isExternal ? (
    <a
      className={styles.galleryCardLink}
      href={demo.previewUrl}
      target="_blank"
      rel="noreferrer"
    >
      {demo.isNew ? (
        <Badge.Ribbon text="new" className={styles.customRibbon}>
          {renderCardInternal()}
        </Badge.Ribbon>
      ) : (
        renderCardInternal()
      )}
      <h4>
        {ic(demo.title)}
        {demo.githubUrl && (
          <a
            href={demo.githubUrl}
            style={{ margin: '0 10px', fontSize: '20px' }}
            target="_blank"
            rel="noreferrer"
          >
            <IconFontIcon type="icon-githublogo" />
          </a>
        )}
      </h4>
    </a>
  ) : (
    <Link
      className={styles.galleryCardLink}
      to={`${
        locale.id === 'zh' ? '' : '/en'
      }/examples/${topicId}/${exampleId}/#${demo.id}`}
    >
      {demo.isNew ? (
        <Badge.Ribbon text="new" className={styles.customRibbon}>
          {renderCardInternal()}
        </Badge.Ribbon>
      ) : (
        renderCardInternal()
      )}
      <h4>
        {ic(demo.title)}
        {demo.githubUrl && (
          <a
            href={demo.githubUrl}
            style={{ margin: '0 10px', fontSize: '20px' }}
            target="_blank"
            rel="noreferrer"
          >
            <IconFontIcon type="icon-githublogo" />
          </a>
        )}
      </h4>
    </Link>
  );
};
