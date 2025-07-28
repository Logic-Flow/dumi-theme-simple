import { defineConfig } from 'father';

export default defineConfig({
  plugins: ['father-plugin-dumi-theme'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      },
      'antd'
    ]
  ]
});
