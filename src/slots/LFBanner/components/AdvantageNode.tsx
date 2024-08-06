import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

import styles from '../index.module.less';

const AdvantageIcon = createFromIconfontCN({
  scriptUrl:
    'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/iconfont/iconfont.js', // self generate
});
export interface AdvantageNodeProps {
  icon: string;
  advantageStyle: any;
  iconStyle: any;
  title: string;
}

export const AdvantageNode: React.FC<AdvantageNodeProps> = ({
  icon,
  advantageStyle = {},
  iconStyle = {},
  title,
}) => {
  return (
    <div style={advantageStyle} className={styles.advantageCard}>
      {icon && (
        <AdvantageIcon
          className={styles.AdvantageIcon}
          type={icon}
          style={{
            fontSize: 36,
            ...iconStyle,
          }}
        />
      )}
      {title && <div>{title}</div>}
    </div>
  );
};
