# Ant Design 5.x 测试页面

这是一个用来测试 Ant Design 5.x 是否正常工作的简单页面。

## 按钮测试

import { Button, Space, Alert } from 'antd';

<div style={{ padding: '20px' }}>
  <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Alert
      message="Ant Design 5.x 升级成功！"
      description="项目已成功升级到 Ant Design 5.x 版本，享受更好的性能和体验。"
      type="success"
      showIcon
    />
    
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
    
    <div>
      <p>✅ CSS-in-JS 样式系统</p>
      <p>✅ 更小的包体积</p>
      <p>✅ 更好的性能</p>
      <p>✅ Design Token 主题定制</p>
    </div>
  </Space>
</div>

## 升级要点

- **依赖版本**: antd@5.21.7, @ant-design/icons@5.5.1
- **配置更改**: babel-plugin-import 的 style 选项改为 false
- **样式系统**: 不再需要引入 .less 样式文件
- **主题定制**: 使用 ConfigProvider 和 Design Token
