#!/bin/bash

echo "🔍 Ant Design 样式配置诊断"
echo "=========================="

cd /Users/r0ger1tlearn/WorkSpace/Github/DiDi/dumi-theme-logicflow/example

echo ""
echo "1. 检查依赖安装:"
echo "   antd: $(npm list antd 2>/dev/null | grep antd || echo '❌ 未安装')"
echo "   babel-plugin-import: $(npm list babel-plugin-import 2>/dev/null | grep babel-plugin-import || echo '❌ 未安装')"

echo ""
echo "2. 检查配置文件:"
if [ -f ".dumirc.ts" ]; then
    echo "   ✅ .dumirc.ts 存在"
    if grep -q "babel-plugin-import" .dumirc.ts; then
        echo "   ✅ babel-plugin-import 配置存在"
    else
        echo "   ❌ babel-plugin-import 配置缺失"
    fi
else
    echo "   ❌ .dumirc.ts 不存在"
fi

echo ""
echo "3. 检查测试页面:"
if [ -f "docs/simple-test.md" ]; then
    echo "   ✅ 简单测试页面存在"
else
    echo "   ❌ 简单测试页面缺失"
fi

if [ -f "docs/test-styles.md" ]; then
    echo "   ✅ 详细测试页面存在"
else
    echo "   ❌ 详细测试页面缺失"
fi

echo ""
echo "4. 检查主题包样式:"
if [ -f "../src/slots/_.less" ]; then
    echo "   ✅ 主题包样式文件存在"
    if grep -q "antd/dist/antd.less" ../src/slots/_.less; then
        echo "   ⚠️  主题包仍在使用全量引入"
    else
        echo "   ✅ 主题包已优化样式引入"
    fi
else
    echo "   ❌ 主题包样式文件缺失"
fi

echo ""
echo "5. 服务器状态:"
if lsof -ti:8001 >/dev/null 2>&1; then
    echo "   ✅ 开发服务器正在运行 (端口 8001)"
    echo "   📱 访问地址: http://localhost:8001/simple-test"
else
    echo "   ❌ 开发服务器未运行"
    echo "   💡 请运行: cd example && PORT=8001 npx dumi dev"
fi

echo ""
echo "6. 诊断建议:"
echo "   🔗 测试链接:"
echo "      - 首页: http://localhost:8001"
echo "      - 简单测试: http://localhost:8001/simple-test"
echo "      - 详细测试: http://localhost:8001/test-styles"
echo ""
echo "   📝 验证方法:"
echo "      1. 打开测试页面"
echo "      2. 检查按钮是否有蓝色样式"
echo "      3. 检查其他组件是否显示正常"
echo ""
echo "   🐛 如果样式异常:"
echo "      1. 检查浏览器控制台错误"
echo "      2. 确认服务器无报错"
echo "      3. 重启开发服务器"

echo ""
echo "诊断完成! 🎉"
