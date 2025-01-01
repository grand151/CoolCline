#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}==>${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}警告:${NC} $1"
}

print_error() {
    echo -e "${RED}错误:${NC} $1"
}

# 检查是否有未提交的更改
check_uncommitted_changes() {
    if [[ -n $(git status -s) ]]; then
        print_error "有未提交的更改，请先提交或存储这些更改"
        git status
        exit 1
    fi
}

# 检查当前分支是否是 develop
check_develop_branch() {
    current_branch=$(git symbolic-ref --short HEAD)
    if [[ "$current_branch" != "develop" ]]; then
        print_error "当前不在 develop 分支上"
        exit 1
    fi
}

# 获取版本号
get_version() {
    version=$(node -p "require('./package.json').version")
    if [[ -z "$version" ]]; then
        print_error "无法获取版本号"
        exit 1
    fi
    echo $version
}

# 检查代码质量和测试
check_code_quality() {
    print_message "运行代码质量检查..."
    
    # 运行 lint
    if ! bun run lint; then
        print_error "Lint 检查失败"
        exit 1
    fi
    
    # 运行 format 检查
    if ! bun run format --check; then
        print_error "代码格式检查失败"
        exit 1
    fi
    
    # 运行测试
    print_message "运行测试..."
    if ! bun test; then
        print_error "测试失败"
        exit 1
    fi
}

# 主函数
main() {
    print_message "开始发布流程..."
    
    # 检查工作目录状态
    check_uncommitted_changes
    check_develop_branch
    
    # 运行代码质量和测试检查
    check_code_quality
    
    # 获取版本号
    version=$(get_version)
    print_message "当前版本: v$version"
    
    # 确认是否继续
    read -p "是否继续发布 v$version? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_message "发布已取消"
        exit 0
    fi
    
    # 创建并切换到 release 分支
    print_message "创建 release 分支..."
    git checkout -b release || exit 1
    
    # 合并到 main 分支
    print_message "合并到 main 分支..."
    git checkout main || git checkout -b main
    git merge release || exit 1
    
    # 创建版本标签
    print_message "创建版本标签 v$version..."
    git tag -a "v$version" -m "Version $version" || exit 1
    
    # 合并回 develop 分支
    print_message "合并回 develop 分支..."
    git checkout develop
    git merge release || exit 1
    
    # 推送所有更改
    print_message "推送更改到远程仓库..."
    git push origin main || exit 1
    git push origin develop || exit 1
    git push origin release || exit 1
    git push --tags || exit 1
    
    # 清理本地和远程分支
    print_message "清理本地和远程分支..."
    git branch -d release
    git push origin --delete release || print_warning "删除远程 release 分支失败，请手动删除"
    
    print_message "发布流程完成！"
    print_message "现在你可以："
    echo "1. 在 GitHub 上创建一个新的发布（release）"
    echo "2. 发布到 VS Code 市场"
}

# 执行主函数
main