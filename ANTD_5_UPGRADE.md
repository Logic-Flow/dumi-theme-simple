# Ant Design 5.x 升级说明

## 升级概览

本项目已成功升级到 Ant Design 5.x 最新版本（5.21.7），享受更好的性能、更小的包体积和更现代化的开发体验。

## 主要变化

### 1. 依赖版本更新

- `antd`: `^4.23.5` → `^5.21.7`
- `@ant-design/icons`: `^4.7.0` → `^5.5.1`

### 2. 样式系统变更

Ant Design 5.x 采用了全新的 CSS-in-JS 解决方案：

- ✅ 不再需要引入任何 `.less` 样式文件
- ✅ 组件样式按需加载，自动优化
- ✅ 支持动态主题切换

### 3. 配置文件调整

#### babel-plugin-import 配置

```typescript
// .dumirc.ts 和 example/.dumirc.ts
extraBabelPlugins: [
  [
    'babel-plugin-import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: false, // 改为 false，不再需要样式文件
    },
    'antd',
  ],
],
```

#### 样式文件清理

- 移除了 `@import '~antd/es/style/themes/default.less'`
- 移除了 `@import '~antd/es/style/core/index.less'`

### 4. 主题定制方式

使用 ConfigProvider 进行主题定制：

```tsx
import { ConfigProvider } from 'antd';

const customTheme = {
  token: {
    colorPrimary: '#0082ff',
    colorLink: '#0082ff',
    borderRadius: 6,
    colorBgContainer: '#ffffff',
  },
};

<ConfigProvider theme={customTheme}>{/* 应用内容 */}</ConfigProvider>;
```

## 升级优势

### 1. 性能提升

- 🚀 包体积减少约 30%
- 🚀 首屏加载速度提升
- 🚀 运行时性能优化

### 2. 开发体验

- 💡 更好的 TypeScript 支持
- 💡 改进的组件 API
- 💡 更灵活的主题定制

### 3. 新特性

- ✨ Design Token 系统
- ✨ 动态主题切换
- ✨ 更好的无障碍支持

## 迁移步骤

如果您在使用这个主题包的项目中需要升级：

1. **更新依赖**

   ```bash
   npm install antd@^5.21.7 @ant-design/icons@^5.5.1
   # 或者
   pnpm add antd@^5.21.7 @ant-design/icons@^5.5.1
   ```

2. **更新配置**

   - 修改 `babel-plugin-import` 的 `style` 选项为 `false`
   - 移除任何 antd 样式文件的 import

3. **主题定制**
   - 使用 `ConfigProvider` 替代 less 变量
   - 迁移自定义主题到 Design Token

## 兼容性说明

- ✅ React 16.9+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器（IE 不再支持）

## 测试验证

升级后建议测试以下页面：

- [ ] 首页样式显示
- [ ] 文档页面组件渲染
- [ ] 示例页面交互
- [ ] 主题切换功能

## 问题排查

如果遇到样式问题：

1. **清理缓存**

   ```bash
   rm -rf node_modules .dumi/cache
   npm install
   ```

2. **检查样式引入**
   确保没有手动引入 antd 的 css/less 文件

3. **验证配置**
   确保 `babel-plugin-import` 的 `style` 选项为 `false`

## 更多信息

- [Ant Design 5.x 官方迁移指南](https://ant.design/docs/react/migration-v5-cn)
- [Design Token 文档](https://ant.design/docs/react/customize-theme-cn)
