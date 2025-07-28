#!/bin/bash

echo "开始测试打包体积优化..."

# 保存当前时间
start_time=$(date +%s)

# 清理之前的构建
echo "清理之前的构建..."
rm -rf dist

# 构建项目
echo "开始构建..."
npm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "构建成功！"

    # 统计文件大小
    echo "构建产物大小统计："
    find dist -name "*.css" -exec wc -c {} + | tail -1 | awk '{print "CSS文件总大小: " $1/1024 " KB"}'
    find dist -name "*.js" -exec wc -c {} + | tail -1 | awk '{print "JS文件总大小: " $1/1024 " KB"}'

    # 列出最大的几个文件
    echo "最大的CSS文件："
    find dist -name "*.css" -exec ls -lh {} + | sort -k5 -hr | head -5

else
    echo "构建失败！"
    exit 1
fi

end_time=$(date +%s)
echo "构建耗时: $((end_time - start_time)) 秒"
