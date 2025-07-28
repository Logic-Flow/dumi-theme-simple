# 样式测试页面

这个页面用来测试 Ant Design 组件的样式是否正常加载。

```tsx
import { Button, Space, Alert, Card, Input, Select } from 'antd';

export default () => (
  <div>
    <h2>按钮组件测试</h2>
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>

    <h2>输入组件测试</h2>
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input placeholder="请输入内容" />
      <Select
        defaultValue="option1"
        style={{ width: 200 }}
        options={[
          { value: 'option1', label: '选项1' },
          { value: 'option2', label: '选项2' },
        ]}
      />
    </Space>

    <h2>反馈组件测试</h2>
    <Alert
      message="样式加载成功"
      description="如果您能看到这个 Alert 组件有正确的样式，说明按需加载配置生效了。"
      type="success"
      showIcon
    />

    <h2>卡片组件测试</h2>
    <Card title="测试卡片" style={{ width: 300 }}>
      <p>这是一个测试卡片，用来验证 Card 组件的样式是否正常加载。</p>
    </Card>
  </div>
);
```

## 验证方法

如果上述组件都显示了正确的 Ant Design 样式，说明：

1. ✅ `babel-plugin-import` 配置正确
2. ✅ 组件样式按需加载成功
3. ✅ 主题变量正常工作
4. ✅ 样式优化方案生效

如果组件没有样式或显示异常，请检查：

1. 是否正确安装了 `antd` 和 `babel-plugin-import` 依赖
2. 是否在 `.dumirc.ts` 中正确配置了 `extraBabelPlugins`
3. 是否重启了开发服务器
