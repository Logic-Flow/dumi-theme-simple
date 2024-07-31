import React from 'react';
import { Space, Button } from 'antd';
import cx from 'classnames';
import styles from '../index.module.less';

export interface ConfigNodeProps {
  title: string;
  description: any;
  buttons: any;
}

export const IntroNode: React.FC<ConfigNodeProps> = ({
  title,
  description,
  buttons,
}) => {
  return (
    <div className={styles.demoCard}>
      <div>
        <h1 className={styles['demoCard-title']}>{title}</h1>
      </div>

      <p className={styles['demoCard-slogan']}>{description}</p>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {buttons.map(({ type, style, text, link, icon }) => {
          return (
            <Button
              type={type}
              shape="round"
              key={text}
              href={link}
              className={cx(
                styles.buttonLink,
                styles[type || ''],
                type === 'primary' ? 'primary-button' : 'common-button',
              )}
              style={{
                width: '100px',
                height: '40px',
                fontSize: '16px',
                lineHeight: '38px',
                ...style,
              }}
            >
              {icon !== null && (
                <div
                  className={styles.icon}
                  style={icon ? { backgroundImage: `url(${icon})` } : {}}
                />
              )}
              <span className={styles.button}>{text}</span>
            </Button>
          );
        })}
      </Space>
    </div>
  );
};
