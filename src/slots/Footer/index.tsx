import {
  GithubOutlined,
  QuestionCircleOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { default as classnames, default as cx } from 'classnames';
import { FormattedMessage, useLocale, useSiteData } from 'dumi';
import { omit } from 'lodash-es';
import { default as RCFooter, FooterProps as RcFooterProps } from 'rc-footer';
import React from 'react';

import 'rc-footer/assets/index.less';
import styles from './index.module.less';

interface FooterProps extends RcFooterProps {
  rootDomain?: string;
  language?: string;
  githubUrl?: string;
  /**
   * 是否为动态 footer
   */
  isDynamicFooter?: boolean;
}

/**
 * 底部菜单
 * @returns
 */
export const Footer: React.FC<FooterProps> = (props) => {
  const {
    columns,
    bottom,
    isDynamicFooter,
    rootDomain = '',
    className,
    ...restProps
  } = props;
  const { themeConfig } = useSiteData();
  const locale = useLocale();
  const lang = locale.id;
  const { footerTheme = 'dark', footer } = themeConfig;
  const { theme = footerTheme } = restProps;

  const getColumns = () => {
    // 如果外部没有传入 columns，则默认展示 LogicFlow footer
    const col1 = {
      title: 'Resources',
      items: [
        {
          title: 'LogicFlow',
          url: 'https://site.logic-flow.cn',
          openExternal: true,
        },
        {
          title: 'LogicFlow Engine',
          url: 'https://github.com/didi/LogicFlow/tree/master/packages/engine',
          openExternal: true,
        },
      ],
    };

    const col2 = {
      title: <FormattedMessage id="社区" />,
      items: [
        {
          icon: <ZhihuOutlined style={{ color: '#0084ff' }} />,
          title: <FormattedMessage id="知乎" />,
          url: 'https://www.zhihu.com/people/logicflow-guan-fang-jun/posts',
          openExternal: true,
        },
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png"
              alt="seeconf"
            />
          ),
          title: '稀土掘金',
          description: <FormattedMessage id="稀土掘金" />,
          url: 'https://juejin.cn/user/2885546018354925',
          openExternal: true,
        },
      ],
    };

    const col3 = {
      title: <FormattedMessage id="帮助" />,
      items: [
        {
          icon: <GithubOutlined />,
          title: 'GitHub',
          url: 'https://github.com/didi/logicflow',
          openExternal: true,
        },
        {
          icon: <QuestionCircleOutlined />,
          title: <FormattedMessage id="StackOverflow" />,
          url: 'http://stackoverflow.com/questions/tagged/logicflow',
          openExternal: true,
        },
      ],
    };

    const more = {
      title: <FormattedMessage id="友情链接" />,
      items: [
        {
          icon: (
            <img
              src="https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/xiaojuLogo.png"
              alt="XIAOJUSURVEY"
            />
          ),
          title: 'XIAOJUSURVEY',
          url: 'https://github.com/didi/xiaoju-survey',
          description: <FormattedMessage id="企业级调研服务提供商" />,
          openExternal: true,
        },
      ],
    };

    return [col1, col2, col3, more];
  };

  return footer ? (
    <RCFooter
      maxColumnsPerRow={5}
      theme={theme}
      columns={columns || getColumns()}
      className={classnames(styles.footer, className, {
        [styles.light]: theme === 'light',
        [styles.withMenu]: isDynamicFooter,
      })}
      bottom={
        bottom || (
          <>
            <div
              className={cx(styles.bottom, {
                [styles.light]: theme === 'light',
              })}
            >
              {theme === 'light' ? (
                footer
              ) : (
                <>
                  <div>
                    <a
                      href="https://weibo.com/antv2017"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WeiboOutlined />
                    </a>
                    <a
                      href="https://zhuanlan.zhihu.com/aiux-antv"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ZhihuOutlined />
                    </a>
                    <a
                      href="https://github.com/antvis"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubOutlined />
                    </a>
                    <a href={`${rootDomain}/${lang}/about`}>
                      {<FormattedMessage id="关于我们" />}
                    </a>
                  </div>
                  <div>
                    © {new Date().getFullYear()} Made with ❤ by{' '}
                    <a href="https://xtech.antfin.com/">AntV</a>
                  </div>
                </>
              )}
            </div>
          </>
        )
      }
      {...omit(restProps, ['githubUrl'])}
    />
  ) : null;
};
