import React from 'react';
import cx from 'classnames';
import { createFromIconfontCN } from '@ant-design/icons';
import { ic } from '../hooks';
import { IC } from '../../types';
import styles from './FeatureCard.module.less';

const FeatureIcon = createFromIconfontCN({
  scriptUrl:
    'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/iconfont/iconfont.js', // self generate
});

interface FeatureProps {
  icon: string;
  title: IC;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <FeatureIcon
          className="feature-logo"
          type={icon}
          style={{
            fontSize: 36,
          }}
        />
        <p className={styles.title}>{ic(title)}</p>
        <p className={styles.description}>{ic(description)}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
