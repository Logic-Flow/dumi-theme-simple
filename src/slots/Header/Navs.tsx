import React from 'react';
import cx from 'classnames';
import { map, size } from 'lodash-es';
import { Link, useLocale } from 'dumi';
import { Dropdown } from 'antd';
import { DownOutlined, LinkOutlined } from '@ant-design/icons';
import { getNavCategory } from './utils';
import styles from './index.module.less';

type dropdownItem = {
  name: {
    [key: string]: string;
  };
  url: string;
  target?: '_blank';
};

export type INav = {
  slug?: string;
  order: number;
  title: {
    [key: string]: string;
  };
  target?: '_blank';
  notPage?: boolean,
  dropdownItems?: dropdownItem[]
}

export type NavProps = {
  navs: INav[];
  path: string;
}

/**
 * Header 中的导航菜单
 */
export const Navs: React.FC<NavProps> = ({ navs, path }) => {
  const locale = useLocale();
  return (
    <>
      {navs.map((nav: INav) => {
        const title = nav.title[locale.id];
        let href = '';
        let className = '';
        if (nav.slug) {
          href = nav.slug.startsWith('http')
            ? nav.slug
            : `/${nav.slug}`;

          // 去除 docs 防止新页面 404 和 本页重新刷新。
          href = href.replace(/^\/docs(?=\/)/, '');

          if (locale.id === 'en' && !href.startsWith('http')) {
            href = `/en${href}`;
          }

          className = cx('header-menu-item-active', {
            [styles.activeItem]: getNavCategory(path) === getNavCategory(href),
          });
        }

        return (
          size(nav.dropdownItems) ?
            (
              <li key={title} className={className}>
                <Dropdown
                  className={styles.ecoSystems}
                  placement="bottom"
                  menu={{
                    items: map(nav.dropdownItems, ({ name, url, target }) => {
                      const displayName = name[locale.id];
                      return {
                        key: url,
                        label: (
                          target === '_blank' || url.startsWith('http') ? (
                            <a href={url} target="_blank" rel="noreferrer">
                              {displayName}
                              <LinkOutlined />
                            </a>
                          ) : (
                            <Link to={url}>{displayName}</Link>
                          )
                        ),
                      };
                    }),
                  }}
                >
                  <span>
                    {title}
                    <DownOutlined style={{ marginLeft: '6px' }} />
                  </span>
                </Dropdown>
              </li>
            )
            :
            (<li key={title} className={className}>
                {nav.target === '_blank' || href.startsWith('http') ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    {title}
                    <LinkOutlined />
                  </a>
                ) : (
                  <Link to={href}>{title}</Link>
                )}
              </li>
            )
        );
      })}
    </>
  );
};
