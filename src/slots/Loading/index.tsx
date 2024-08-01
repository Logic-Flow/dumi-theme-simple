import React from 'react';
import styles from './index.module.less';

/**
 * Loading
 */
const Loading = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <div className={styles.loading}>
        <div className="container">
          <div className="loading-icon">
            <img
              src="	https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/logo-horizontal-blue.png"
              alt="LogicFlow"
            />
          </div>
          <div className="loading-text">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
