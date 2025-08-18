// import { navigate } from 'gatsby';
import React, { useState, useEffect, useMemo } from 'react';
import { useMedia } from 'react-use';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { useSiteData, useLocale, FormattedMessage } from 'dumi';
import {
  GithubOutlined,
  MenuOutlined,
  DownOutlined,
  WechatOutlined,
  LinkOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Alert, Modal, Button, Popover, Dropdown, Select, Space } from 'antd';
import { get, map, size } from 'lodash-es';
import { Search } from './Search';
import { Navs, INav } from './Navs';
import { findVersion, getLangUrl } from './utils';
import { ic } from '../hooks';

import type { IC } from '../../types';

import styles from './index.module.less';

export type HeaderProps = {
  pathPrefix?: string;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 子标题的链接 */
  subTitleHref?: string;
  /** 文档和演示的菜单数据 */
  navs?: INav[];
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 是否显示 Github 图标 */
  showGithubCorner?: boolean;
  /** 是否显示 Github Star */
  showGithubStar?: boolean;
  /** 是否显示切换语言选项 */
  showLanguageSwitcher?: boolean;
  /**
   * 国内镜像相关的信息
   */
  internalSite?: {
    url: string;
    name: object;
  };
  /** 切换语言的回调 */
  onLanguageChange?: (language: string) => void;
  /** 是否二维码 */
  showWxQrcode?: boolean;
  /** 自定义 logo */
  logo?: {
    img?: React.ReactNode;
    link?: string;
  };
  siteUrl?: string;
  /** github 仓库地址 */
  githubUrl?: string;
  /** 默认语言 */
  defaultLanguage?: 'zh' | 'en';
  /** 自定义 Link */
  Link?: React.ComponentType<any>;
  /** 底色是否透明 */
  transparent?: boolean;
  /** 是否首页模式 */
  isHomePage?: boolean;
  /** 项目 root 域名 */
  rootDomain?: string;

  /**
   * 当前版本
   */
  version?: string;
  /** 展示版本切换 */
  versions?: { [key: string]: string };
  /** 展示周边生态 */
  ecosystems?: Array<{
    name: Record<string /** zh, en */, string>;
    url: string;
  }>;
  /** 头部搜索框配置 */
  searchOptions?: {
    docSearchOptions: {
      versionV3: boolean;
      apiKey: string;
      indexName: string;
      appId: string;
    };
  };
  announcement?: {
    title: IC;
    icon: string;
    link: {
      url: string;
      text: IC;
    };
  };
};

function redirectChinaMirror(chinaMirrorOrigin: string) {
  window.location.href = window.location.href.replace(
    window.location.origin,
    chinaMirrorOrigin,
  );
}

const ANNOUNCEMENT_LOCALSTORAGE_ID = 'ANNOUNCEMENT_LOCALSTORAGE_ID';

/**
 * 头部菜单
 */
const HeaderComponent: React.FC<HeaderProps> = ({
  // subTitle = '',
  navs = [],
  showSearch = true,
  showGithubCorner = true,
  showLanguageSwitcher = true,
  logo,
  onLanguageChange,
  // 默认就使用 AntV 的公众号
  showWxQrcode = true,
  siteUrl,
  githubUrl = 'https://github.com/antvis',
  // defaultLanguage,
  transparent,

  // rootDomain = '',
  version,
  versions,
  internalSite,
  ecosystems,
  announcement,
}) => {
  const [bannerVisible, setBannerVisible] = useState(false);

  const showChinaMirror: boolean = !!internalSite;
  const chinaMirrorUrl: string = get(internalSite, 'url');
  const [chinaMirrorHintVisible, updateChinaMirrorHintVisible] =
    useState(false);

  const locale = useLocale();
  const nav = useNavigate();

  const [lang, setLang] = useState(locale.id);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        showChinaMirror &&
        lang === 'zh' &&
        !localStorage.getItem('china-mirror-no-more-hint') &&
        window.location.host.includes('antv.vision')
      ) {
        updateChinaMirrorHintVisible(true);
      }
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  const announcementTitle = useMemo(
    () => get(announcement, ['title', lang]),
    [announcement, lang],
  );
  const announcementLinkTitle = useMemo(
    () => get(announcement, ['link', 'text', lang]),
    [announcement, lang],
  );

  useEffect(() => {
    setBannerVisible(
      !!announcementTitle &&
        localStorage.getItem(ANNOUNCEMENT_LOCALSTORAGE_ID) !== 'true',
    );
  }, [announcementTitle]);

  function onBannerClose() {
    localStorage.setItem(ANNOUNCEMENT_LOCALSTORAGE_ID, 'true');
    setBannerVisible(false);
  }

  const [popupMenuVisible, setPopupMenuVisible] = useState(false);
  const onTogglePopupMenuVisible = () => {
    setPopupMenuVisible(!popupMenuVisible);
  };

  const { img } = {
    img: (
      <img
        src="https://s3-gzpu.didistatic.com/ese-feedback/LogicFlow/logo-horizontal-blue.png"
        alt="logo"
      />
    ),
    ...logo,
  };

  useEffect(() => {
    if (popupMenuVisible) {
      setPopupMenuVisible(false);
    }
  }, [window.location.pathname]);

  // 移动端下弹出菜单时，禁止页面滚动
  useEffect(() => {
    if (popupMenuVisible) {
      document.documentElement!.style.overflow = 'hidden';
    } else {
      document.documentElement!.style.overflow = '';
    }
    return () => {
      document.documentElement!.style.overflow = '';
    };
  }, [popupMenuVisible]);

  const isWide = useMedia('(min-width: 767.99px)', true);

  const menuIcon = !isWide ? (
    <MenuOutlined
      className={styles.menuIcon}
      onClick={onTogglePopupMenuVisible}
    />
  ) : null;

  const menu = (
    <ul
      className={cx(styles.menu, {
        [styles.popup]: !isWide,
        [styles.popupHidden]: !popupMenuVisible,
      })}
    >
      {
        /** 最左侧的菜单，一般是 教程、API、示例，或者其他自定义，有配置文件中的 `navs` 决定 */
        size(navs) ? <Navs navs={navs} path={window.location.pathname} /> : null
      }

      {
        /** 生态产品 */
        size(ecosystems) ? (
          <li>
            <Dropdown
              className={styles.ecoSystems}
              menu={{
                items: map(ecosystems, ({ url, name: ecosystemName }) => ({
                  key: ecosystemName?.[lang],
                  label: (
                    <a target="_blank" rel="noreferrer" href={url}>
                      {ecosystemName?.[lang]} <LinkOutlined />
                    </a>
                  ),
                })),
              }}
            >
              <span>
                {<FormattedMessage id="周边生态" />}
                <DownOutlined style={{ marginLeft: '6px' }} />
              </span>
            </Dropdown>
          </li>
        ) : null
      }

      {showChinaMirror && isWide ? (
        <Popover
          title={null}
          content={
            <div style={{ width: 300 }}>
              <div>
                <span
                  role="img"
                  aria-labelledby="中国"
                  style={{ marginRight: '8px' }}
                >
                  🇨🇳
                </span>
                AntV 系列网站部署在 gh-pages
                上，若访问速度不佳，可以前往国内镜像站点。
              </div>
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Button
                  onClick={() => updateChinaMirrorHintVisible(false)}
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  暂时关闭
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    localStorage.setItem(
                      'china-mirror-no-more-hint',
                      Date.now().toString(),
                    );
                    updateChinaMirrorHintVisible(false);
                  }}
                >
                  不再提醒
                </Button>
              </div>
            </div>
          }
          open={chinaMirrorHintVisible}
          placement="bottomRight"
          align={{
            offset: [-12, -16],
          }}
        >
          <li>
            <a
              href={chinaMirrorUrl}
              onClick={(e) => {
                e.preventDefault();
                redirectChinaMirror(chinaMirrorUrl);
              }}
            >
              {ic(get(internalSite, 'name'))}
              <LinkOutlined style={{ marginLeft: '6px' }} />
            </a>
          </li>
        </Popover>
      ) : null}

      {showChinaMirror && !isWide && (
        <Modal
          open={chinaMirrorHintVisible}
          cancelText="不再提醒"
          okText="立即前往"
          onCancel={() => {
            updateChinaMirrorHintVisible(false);
          }}
          onOk={() => redirectChinaMirror(chinaMirrorUrl)}
          cancelButtonProps={{
            onClick: () => {
              localStorage.setItem(
                'china-mirror-no-more-hint',
                Date.now().toString(),
              );
              updateChinaMirrorHintVisible(false);
            },
          }}
        >
          <div className={styles.modalContent}>
            <span role="img" aria-labelledby="中国">
              🇨🇳
            </span>
            AntV 系列网站部署在 gh-pages 上，若访问速度不佳，可以前往
            <a
              href={chinaMirrorUrl}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = chinaMirrorUrl;
              }}
              className={styles.remindHref}
            >
              {ic(get(internalSite, 'name'))}
              <LinkOutlined style={{ marginLeft: '6px' }} />
            </a>
            <span> 站点。</span>
          </div>
        </Modal>
      )}
    </ul>
  );

  const menuAction = (
    <ul className={cx(styles.menu)}>
      {
        /** 版本列表 */
        versions && (
          <li>
            <Select
              defaultValue={
                versions[findVersion(version, Object.keys(versions))]
              }
              className={styles.versions}
              variant="borderless"
              size="small"
              onChange={(value: string) => {
                window.location.href = value;
              }}
            >
              {Object.keys(versions).map((version: string) => {
                const url = versions[version];
                if (url.startsWith('http')) {
                  return (
                    <Select.Option key={url} value={url}>
                      {version}
                    </Select.Option>
                  );
                }
                return null;
              })}
            </Select>
          </li>
        )
      }

      {
        /** 切换网站语言 */
        showLanguageSwitcher && (
          <li className={cx(styles.navIcon, styles.languageSwitcher)}>
            <Dropdown
              placement="bottomRight"
              menu={{
                items: [
                  {
                    key: 'en',
                    label: (
                      <span>
                        <CheckOutlined
                          style={{
                            visibility: lang === 'en' ? 'visible' : 'hidden',
                            color: '#52c41a',
                          }}
                        />
                        English
                      </span>
                    ),
                  },
                  {
                    key: 'zh',
                    label: (
                      <span>
                        <CheckOutlined
                          style={{
                            visibility: lang === 'zh' ? 'visible' : 'hidden',
                            color: '#52c41a',
                          }}
                        />
                        简体中文
                      </span>
                    ),
                  },
                ],
                onClick: ({ key }) => {
                  if (key === lang) return;

                  setLang(key);
                  if (onLanguageChange) {
                    onLanguageChange(key.toString());
                    return;
                  }
                  const newUrl = getLangUrl(window.location.href, key);
                  nav(newUrl.replace(window.location.origin, ''));
                },
              }}
              className={styles.translation}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <svg
                  className={styles.translation}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                </svg>
              </a>
            </Dropdown>
          </li>
        )
      }

      {
        /** 微信公众号 */
        showWxQrcode && (
          <li className={cx(styles.navIcon, styles.wxQrcode)}>
            <Popover
              content={
                <img
                  width="100%"
                  height="100%"
                  src="https://s3-gzpu.didistatic.com/ese-feedback/LogicFlow/qrcode-white.jpg"
                  alt="wx-qrcode"
                />
              }
              title="微信扫一扫添加"
              overlayClassName="wx-qrcode-popover"
              overlayStyle={{ width: 128, height: 128 }}
              // overlayInnerStyle={{ padding: 2 }}
              styles={{ body: { padding: 2 } }}
            >
              <WechatOutlined />
            </Popover>
          </li>
        )
      }

      {
        /** GitHub icon */
        showGithubCorner && (
          <li className={cx(styles.navIcon, styles.githubCorner)}>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <GithubOutlined />
            </a>
          </li>
        )
      }
    </ul>
  );

  return (
    <header
      className={cx(styles.header, {
        [styles.transparent]: !!transparent,
        // [styles.lightTheme]: isWide,
        [styles.fixed]: popupMenuVisible,
      })}
    >
      {bannerVisible && announcementTitle && (
        <Alert
          className={styles.banner}
          message={
            <div className={styles.topAlert}>
              {announcement.icon && <img src={announcement.icon} />}
              <div>{announcementTitle}</div>
              {announcementLinkTitle && (
                <a href={announcement.link.url}>{announcementLinkTitle}</a>
              )}
            </div>
          }
          type="info"
          banner
          closable
          showIcon={false}
          onClose={onBannerClose}
        />
      )}
      <div className={styles.container}>
        <div className={styles.left}>
          <Space size="large">
            <h1>
              <a href={siteUrl[lang] ? siteUrl[lang] : siteUrl}>{img}</a>
            </h1>
            <nav className={styles.nav}>
              {menu}
              {menuIcon}
            </nav>
          </Space>
        </div>
        <nav className={styles.nav}>
          {showSearch && <Search />}
          {menuAction}
        </nav>
      </div>
    </header>
  );
};

export const Header: React.FC<Partial<HeaderProps>> = React.memo((props) => {
  const { themeConfig } = useSiteData();
  const {
    title,
    siteUrl,
    githubUrl,
    isAntVSite,
    subTitleHref,
    internalSite,
    showSearch,
    showGithubCorner,
    showGithubStars,
    showLanguageSwitcher,
    showWxQrcode,
    defaultLanguage,
    showAntVProductsCard,
    version,
    versions,
    ecosystems,
    navs,
    docSearchOptions,
    announcement,
  } = themeConfig;
  const searchOptions = {
    docSearchOptions,
  };

  const locale = useLocale();
  const path = window.location.pathname;
  const isHomePage =
    path === '/' || path === `/${locale.id}` || path === `/${locale.id}/`;

  const headerProps = {
    subTitle: title,
    subTitleHref,
    githubUrl,
    isAntVSite,
    siteUrl,
    internalSite,
    showSearch,
    showGithubCorner,
    showGithubStars,
    showLanguageSwitcher,
    showWxQrcode,
    defaultLanguage,
    showAntVProductsCard,
    version,
    versions,
    ecosystems,
    navs,
    searchOptions,
    isHomePage,
    transparent: isHomePage && isAntVSite,
    announcement,
  };

  return <HeaderComponent {...Object.assign({}, headerProps, props)} />;
});
