# Ant Design 样式优化说明

## 问题描述

原项目通过 `@import '~antd/dist/antd.less'` 全量引入 Ant Design 样式，导致打包体积过大。

## 解决方案

### 方案一：按需引入样式（已实施）

1. **创建统一的变量文件** (`src/styles/variables.less`)

   - 引入 Ant Design 的主题变量
   - 定义项目自定义变量
   - 包含通用的 mixins

2. **修改样式引入方式**

   - 移除 `_.less` 中的全量引入 `@import '~antd/dist/antd.less'`
   - 只引入核心样式 `@import '~antd/es/style/core/index.less'`
   - 通过 babel-plugin-import 实现组件样式按需加载
   - **注意**: `antd@4.23.5` 不存在 `components.less` 文件，只需引入 `core/index.less`

3. **统一样式文件引用**
   - 所有模块样式文件统一引用 `variables.less`
   - 避免重复引入主题文件

### 方案二：配置按需加载（已配置）

通过 `.dumirc.ts` 配置 `babel-plugin-import`：

```typescript
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
```

### 优化效果

- **减少冗余样式**：避免多次引入相同的样式文件
- **按需加载**：只加载实际使用的组件样式
- **体积优化**：预计可减少 60-80% 的样式文件体积
- **维护性提升**：统一的变量管理，便于主题定制

## 使用的 Ant Design 组件

项目中实际使用的组件包括：

- Layout 组件：Layout
- 导航组件：Menu, Dropdown, Anchor
- 数据录入：Input, Select, Radio, Switch, Button
- 数据展示：Card, Badge, Tag, Tooltip, Popover, Collapse, Alert
- 反馈组件：Modal, Result
- 布局组件：Row, Col, Space, Divider, Affix, BackTop
- 其他：Typography, PageHeader

## 验证方法

运行以下脚本检查打包体积：

```bash
chmod +x scripts/check-bundle-size.sh
./scripts/check-bundle-size.sh
```

## 注意事项

1. 如果添加新的 Ant Design 组件，确保相应的样式能够正确按需加载
2. 自定义主题变量请在 `src/styles/variables.less` 中统一管理
3. 避免在组件文件中直接引入 `antd/dist/antd.less` 或完整的主题文件
4. **重要**: 使用主题包的项目（如 example 目录）也需要配置按需加载：
   - 安装依赖：`npm install antd babel-plugin-import`
   - 在 `.dumirc.ts` 中配置 `extraBabelPlugins`
   - 确保 `babel-plugin-import` 的 `style: true` 选项启用

## 故障排除

### 问题：Ant Design 组件没有样式

**原因**: 使用主题包的项目没有配置按需样式加载

**解决方案**:

1. 确保项目安装了 `antd` 和 `babel-plugin-import` 依赖
2. 在项目的 `.dumirc.ts` 或构建配置中添加：
   ```typescript
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
   ```
3. 重启开发服务器

## 进一步优化建议

1. **CSS Tree Shaking**：配置 PurgeCSS 移除未使用的样式
2. **样式压缩**：确保生产环境启用 CSS 压缩
3. **CDN 加载**：考虑将 Ant Design 样式通过 CDN 加载（适用于多项目共享场景）
4. **自定义组件库**：对于频繁使用的组件，可以考虑创建轻量级的自定义组件
