import React from 'react';
import { Tooltip, Space, Divider, Typography } from 'antd';
import { FormattedMessage } from 'dumi';

import styles from './CodeHeader.module.less';

const { Title } = Typography;

export type CodeHeaderProps = {
  /**
   * 代码的标题
   */
  title: string;
  /**
   * 代码的路径
   */
  relativePath: string;
  /**
   * GitHub 的地址，用于拼接最后 GitHub 编辑地址
   */
  githubUrl: string;
};

/**
 * 组件的 header
 */
export const CodeHeader: React.FC<any> = ({
  title,
  relativePath,
  githubUrl,
}) => {
  return (
    <div className={styles.codeHeader}>
      <Title level={4} style={{ margin: 0 }}>
        {title}
      </Title>
      <Space split={<Divider type="vertical" />}></Space>
    </div>
  );
};
