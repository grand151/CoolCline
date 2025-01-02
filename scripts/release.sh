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

    # 先自动修复格式错误
    print_message "自动修复格式错误..."
    bun run format:fix # 自动修复格式错误

    # 检查是否有文件被修改
    if [[ -n $(git status -s) ]]; then
        print_warning "代码格式已被自动修复，请检查更改并提交"
        git status
        exit 1
    fi

    # 运行 lint
    if ! bun run lint; then
        print_error "Lint 检查失败"
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
    
    # 切换到 develop 分支
    git checkout develop

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
    print_message "基于 develop 分支创建 release 分支..."
    git checkout -b release || exit 1
    
    # 合并到 main 分支（有冲突解决冲突）
    print_message "将release 分支合并到 main 分支..."
    git checkout main || git checkout -b main
    git merge release || exit 1
    
    # 创建版本标签
    print_message "在 main 分支上创建版本标签 v$version..."
    git tag -a "v$version" -m "Version $version" || exit 1
    
    # 合并回 develop 分支
    print_message "将 main 分支合并回 develop 分支..."
    git checkout develop
    git merge main || exit 1
    
    # 推送所有更改
    print_message "推送更改到远程仓库..."
    # github 平台
    git push github main || exit 1
    git push github develop || exit 1
    git push github --tags || exit 1
    # gitee 平台
    git push gitee main || exit 1
    git push gitee develop || exit 1
    git push gitee --tags || exit 1
    

    # 清理本地和远程分支
    print_message "清理本地和远程的 release 分支..."
    git branch -d release
    git push github --delete release || print_warning "删除远程 release 分支失败，请手动删除"
    git push gitee --delete release || print_warning "删除远程 release 分支失败，请手动删除"
    
    print_message "发布流程完成！"

    # 发布到 VS Code 市场
    print_message "现在你可以准备发布到 VS Code 市场，发布前再次检查 package.json、中英README.md 和 中英CHANGELOG.md 文件是否正确"
    # 安装vsce 和 ovsx（可选）： `bun add -d vsce ovsx`
    # 1. 在 https://dev.azure.com 创建 token
    # 2. 使用命令 `vsce login <publisher-name>`进行登录
    # publisher-name> 就是 package.json 中的 "publisher" 字段的内容
    # 例如："publisher": "coolcline"
    # 3. 使用命令 `vsce package` 打包
    # 4. 使用命令 `vsce publish` 发布
    # 5. 使用命令 `vsce logout` 登出
    # 6. 使用命令 `vsce unpublish <publisher-name>.<extension-name>` 取消发布
    # 7. 使用命令 `vsce clean` 清理

    # 8. 发布到 OpenVSX 市场（可选）
    # 9. 在 https://open-vsx.org 创建 token
    # 10. 使用命令 `ovsx publish` 发布
    # 11. 使用命令 `ovsx logout` 登出
    # 12. 使用命令 `ovsx unpublish <publisher-name>.<extension-name>` 取消发布
    # 13. 使用命令 `ovsx clean` 清理

}

# 执行主函数
main