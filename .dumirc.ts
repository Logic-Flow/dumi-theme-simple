import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    // 主题配置
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 自动引入样式文件
      },
      'antd',
    ],
  ],
  // 样式配置
  styles: [
    // 只引入必要的基础样式
    `
    @import '~antd/es/style/themes/default.less';
    @import '~antd/es/style/core/index.less';
    `,
  ],
});
