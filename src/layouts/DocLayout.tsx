import React, { useEffect } from 'react';
import { useOutlet, useLocation, useSiteData } from 'dumi';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import { Index } from './entry';
import { Manual } from './entry/Manual';
// 用户手动添加自己的
import '../slots/global';
import '../slots/_.less';

/**
 * DocLayout 是 dumi2 的内置 layout 入口，在这里使用页面路径进行区分成自己不同的 Layout。
 */
export default () => {
  const { themeConfig, loading } = useSiteData();
  const { navs } = themeConfig;

  // 打印控制台文案
  useEffect(() => {
    console.log(
      '%cLogicFlow 让流程图绘制更方便快捷',
      'color:#5B7102; font-size: 20px;',
    );
    console.log('%c打造新一代流程图绘制和执行的解决方案', 'color:#5B7102;');
    console.log('--------------------------');
    console.log(
      '%c添加我们的官方微信号 %c“logic-flow”%c，申请加入 LogicFlow 用户群讨论问题，也欢迎加入我们共建项目！',
      'color: red',
      'color: pink',
      'color: red',
    );
  }, []);

  const outlet = useOutlet();
  const { pathname, hash } = useLocation();
  if (themeConfig.useSpeedInsights) {
    injectSpeedInsights();
    inject();
  }

  // 监听 hash 变更，跳转到锚点位置
  // 同时监听页面 loading 状态，因为路由按需加载时需要等待页面渲染完毕才能找到锚点位置
  useEffect(() => {
    const id = hash.replace('#', '');

    if (id) {
      const elm = document.getElementById(decodeURIComponent(id));
      if (elm) document.documentElement.scrollTo(0, elm.offsetTop - 80);
    }
  }, [loading, hash]);

  const path = pathname;
  // 统一去掉中英文前缀
  let p = path.replace('/zh/', '/').replace('/en/', '/');
  // 首页
  if (p === '/' || p === '/zh' || p === '/en' || p === '/en/') return <Index />;

  // 匹配 navs 中的 docs 路由
  const docsRoutes = navs
    .filter((nav) => nav.slug && nav.slug.startsWith('docs/'))
    .map(
      (nav) => nav.slug && nav.slug.split('/').find((item) => item !== 'docs'),
    );

  if (
    docsRoutes.some(
      (route) => p.startsWith(`/${route}`) || p.startsWith(`/docs/${route}`),
    )
  ) {
    return <Manual>{outlet}</Manual>;
  }

  return outlet;
};
