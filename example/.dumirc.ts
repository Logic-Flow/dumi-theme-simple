import { defineConfig } from 'dumi';
import { repository, version } from './package.json';

export default defineConfig({
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  title: 'LogicFlow 主题包', // 网站header标题
  favicons: [
    'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/favicon.png',
  ], // 网站 favicon
  metas: [
    // 自定义 meta 标签
    { name: 'keywords', content: 'logicflow-theme-simple' },
    { name: 'description', content: '基于 dumi2 的 LogicFlow 官网主题包' },
  ],
  themeConfig: {
    title: 'LogicFlow',
    description: '基于 dumi2 的 LogicFlow 官网主题包',
    defaultLanguage: 'zh', // 默认语言
    footer: 'Copyright © 2024 | Powered by LogicFlow Team', // footer文案
    footerTheme: 'light',
    siteUrl: '/', // 官网地址
    githubUrl: repository.url, // GitHub 地址
    useSpeedInsights: false, // 是否使用vercel的speed-insights监控页面加载速度，开启依赖服务通过vercel部署
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: true,
    showSpecTab: true, // 是否在 demo 页展示API文档
    showLFBanner: true, // Banner是否以 Demo 的形式展示
    themeSwitcher: 'g2',
    es5: false,
    version,
    versions: {
      // 历史版本以及切换下拉菜单
      '0.3.x': 'https://g.antv.vision/',
      '0.2.x': 'https://g2.antv.vision/',
    },
    internalSite: {
      url: 'https://antv.antgroup.com',
      name: {
        zh: '国内镜像',
        en: 'China Mirror',
      },
    },
    docsearchOptions: {
      // 头部搜索框配置
      versionV3: true,
      apiKey: '90c9a5dbf6e5ea7058cc32bcde8e94b2',
      indexName: 's2-antv-vision',
      appId: 'D73DOU8RXD',
    },
    /**
     *  tips: 文档列表类型的路由导航(nav) 请以 docs/* 格式命名
     */
    navs: [
      // 头部的菜单列表
      {
        slug: 'docs/manual/concepts/grammar-of-graphics',
        title: {
          zh: '教程',
          en: 'Tutorials',
        },
        order: 2,
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
      {
        title: {
          zh: '相关资源',
          en: 'Related resource',
        },
        dropdownItems: [
          {
            name: {
              zh: 'Dumi 2.x',
              en: 'Dumi 2.x',
            },
            url: 'https://github.com/umijs/dumi',
          },
        ],
        order: 0,
      },
    ],
    ecosystems: [
      // 头部的菜单中的「周边生态」
      {
        name: {
          zh: 'G2 官网',
          en: 'G2 website',
        },
        url: 'https://g2.antv.vision',
      },
      {
        name: {
          zh: 'G6 官网',
          en: 'G6 website',
        },
        url: 'https://g6.antv.vision',
      },
    ],
    docs: [
      {
        slug: 'manual/concepts',
        title: {
          zh: '可视化基础概念',
          en: 'Visualization Concepts',
        },
        order: 2,
      },
      {
        slug: 'manual/concepts/geometry',
        title: {
          zh: '几何图形',
          en: 'Geometry',
        },
        order: 2,
      },
      {
        slug: 'api/advanced',
        title: {
          zh: '高级进阶功能',
          en: 'Advanced Chart Features',
        },
        order: 1,
      },
      {
        slug: 'api/shape',
        title: {
          zh: '绘图属性速查',
          en: 'Quick Reference for Plotting Properties',
        },
        order: 2,
      },
    ],
    tutorials: [
      {
        slug: 'manual/about',
        title: {
          zh: '关于',
          en: 'About',
        },
        order: 1,
      },
    ],
    examples: [
      {
        id: 'case',
        title: {
          zh: '场景案例',
          en: 'Show Case',
        },
        icon: 'case',
      },
    ],
    playground: {
      devDependencies: {
        typescript: 'latest',
      },
      htmlCodeTemplate: `<!DOCTYPE html>
        <html>
          <head>
            <meta charset='UTF-8'>
            <title>{{title}}</title>
          </head>
          <body>
            <div id='container' />
            <script src='https://gw.alipayobjects.com/os/lib/antv/g2/${version}/dist/g2.min.js'></script>
            <script src='https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.11.1/dist/data-set.js'></script>
            <script>
            <!-- 浏览器引入，请使用全局命名空间 G2，如 new Chart() 改为 new G2.Chart，即可运行。 -->
            {{code}}
            </script>
          </body>
        </html>`,
    },
    announcement: {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
      title: {
        zh: '语雀公益计划：大学生认证教育邮箱，即可免费获得语雀会员。语雀，支付宝匠心打造的在线文档平台',
        en: '语雀公益计划：大学生认证教育邮箱，即可免费获得语雀会员。语雀，支付宝匠心打造的在线文档平台',
      },
      link: {
        text: {
          zh: '更多内容',
          en: 'more',
        },
        url: 'https://www.yuque.com/yuque/blog/welfare-edu?source=antv',
      },
    },
    /** 首页技术栈介绍 */
    detail: {
      engine: {
        zh: 'LogicFlow',
        en: 'LogicFlow',
      },
      title: {
        zh: 'LogicFlow·主题包',
        en: 'LogicFlow·Theme Pack',
      },
      description: {
        zh: '低成本实现，让逻辑管理更简单、更高效.',
        en: 'Low-cost implementation, so that logic management is simpler and more efficient.',
      },
      image:
        'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*wo_LToatmbwAAAAAAAAAAABkARQnAQ',
      buttons: [
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/tutorial/get-started`,
          type: 'primary',
          style: {
            margin: 20,
          },
        },
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples`,
          style: {
            margin: 20,
          },
        },
      ],
      advantages: [
        {
          icon: 'icon-liuchengtu',
          advantageStyle: {
            background: '#fdfcdf',
            color: '#FFCA40',
          },
          iconStyle: {
            fontSize: '42px',
            color: '#FFCA40',
            strokeWidth: 10,
            stroke: '#FFCA40',
          },
          position: {
            x: 0,
            y: 650,
          },
          // title: {
          //   zh: '可视化模型',
          //   en: 'The Visualization model',
          // },
        },
        {
          icon: 'icon-leftfont-07',
          advantageStyle: {
            background: '#B5AdF9',
            borderRadius: 20,
          },
          iconStyle: {
            fontSize: '36px',
            color: '#F8F6FF',
            strokeWidth: 10,
            stroke: '#F8F6FF',
          },
          position: {
            x: 1890,
            y: 430,
          },
        },
        {
          icon: 'icon-chajian1',
          advantageStyle: {
            background: '#fff',
          },
          iconStyle: {
            fontSize: '36px',
            color: '#333',
            strokeWidth: 10,
            stroke: '#333',
          },
          position: {
            x: 1720,
            y: 180,
          },
        },
      ],
    },
    news: [],
    /** 新闻公告，优先选择配置的，如果没有配置则使用远程的！ */
    // news: [
    //   {
    //     type: {
    //       zh: '论坛',
    //       en: 'Forum',
    //     },
    //     title: {
    //       zh: 'AntV 芒种日 图新物：GraphInsight 发布',
    //       en: 'AntV Seeds Day Graph New: GraphInsight Released',
    //     },
    //     date: '2022.06.06',
    //     link: 'https://github.com/antvis/GraphInsight',
    //   },
    //   {
    //     type: {
    //       zh: '论坛',
    //       en: 'Forum',
    //     },
    //     title: {
    //       zh: 'SEE Conf 2022 支付宝体验科技大会',
    //       en: 'SEE Conf 2022 Alipay Experience Technology Conference',
    //     },
    //     date: '2022.01.08',
    //     link: 'https://seeconf.antfin.com/',
    //   },
    // ],
    /** 首页特性介绍 */
    features: {
      style: {
        paddingTop: 50,
      },
      // title: {
      //   zh: '我们的优势',
      //   en: 'Our advantage',
      // },
      cards: [
        {
          icon: 'icon-liuchengtu',
          title: {
            zh: '可视化模型',
            en: 'The Visualization model',
          },
          description: {
            zh: '通过 LogicFlow 提供的直观可视化界面，用户可以轻松创建、编辑和管理复杂的逻辑流程图。',
            en: 'With the intuitive visual interface provided by LogicFlow, users can easily create, edit, and manage complex logical flowcharts.',
          },
        },
        {
          icon: 'icon-leftfont-07',
          title: {
            zh: '高可定制性',
            en: 'High customizability',
          },
          description: {
            zh: '用户可以根据自己的需要定制节点、连接器和样式，创建符合特定用例的定制逻辑流程图。',
            en: 'Users can customize nodes, connectors, and styles to suit their needs, creating custom logical flowcharts that match specific use cases.',
          },
        },
        {
          icon: 'icon-chajian1',
          title: {
            zh: '自执行引擎',
            en: 'Self-executing engine',
          },
          description: {
            zh: '执行引擎支持浏览器端执行流程图逻辑，为无代码执行提供新思路。',
            en: 'The execution engine supports browser-side flow chart logic, providing new ideas for code-free execution.',
          },
        },
      ],
    },
    /** 首页案例 */
    cases: [
      {
        logo: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*-dLnTIexOxwAAAAAAAAAAABkARQnAQ',
        title: {
          zh: '场景示例 Gallery',
          en: 'Boutique Gallery',
        },
        description: {
          zh: '真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，让用户达到开箱即用的效果。',
          en: 'Real data visualization cases, we summarize them into story-based design templates, allowing users to achieve out-of-the-box effects.',
        },
        // link: `/examples/gallery`,
        image:
          'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/examples.png',
      },
    ],
    companyGallery: {
      name: '企业用户展示墙',
      img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/companylist.png',
    },
    /** 首页合作公司 */
    companies: [
      // {
      //   name: '滴滴',
      //   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/DiDiLogo.svg',
      // },
      // {
      //   name: '中国科学院',
      //   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/CAOS%20Logo.svg',
      // },
      // {
      //   name: '京东',
      //   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/JDLogo.svg',
      // },
      // {
      //   name: '华为数字能源',
      //   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/HWLogo.svg',
      // },
      // {
      //   name: 'Moka',
      //   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/MokaLogo.svg',
      // },
      // {
      //   name: '美团',
      //   img: 'https://cdn.jsdelivr.net/gh/Logic-Flow/static@latest/docs/homepage/MTLogo.svg',
      // },
    ],
    // example代码编辑器设置
    editor: {
      size: 0.4, // 代码区占比
      playgroundSize: 0.38, // 文档中的代码区占比
    },
  },
  analytics: {
    // google analytics 的 key (GA 4)
    // ga_v2: 'G-abcdefg',
    // 若你在使用 GA v1 旧版本，请使用 `ga` 来配置
    ga: 'ga_old_key',
    // 百度统计的 key
    // baidu: 'baidu_tongji_key',
  },
  // tnpm 安装的目录会导致 webpack 缓存快照 OOM，暂时禁用
  // 只有主题包开发需要用，其他技术栈使用的时候，不需要！
  chainWebpack(memo) {
    memo.delete('cache');
    return memo;
  },
  plugins: [],
  links: [],
  scripts: [],
  mfsu: false,
});
