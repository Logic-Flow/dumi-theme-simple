import React from 'react';
import styles from './index.module.less';

/**
 * Loading
 */
const Loading = () => (
  <div
    style={{
      position: 'relative',
      height: '100%',
      width: '100%',
    }}
  >
    <div className={styles.loading}>
      <div className="container">
        <div className="loading-text">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
