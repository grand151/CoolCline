# 整和 cline、Roo-Cline、Bao-Cline
vscode 的 cline 扩展有多个 fork 版本，分别是:

两个平台同步提交
- GitHub: [chatterzhao/cool-cline](https://github.com/chatterzhao/cool-cline.git)
- Gitee: [zhaoquan/cool-cline](https://gitee.com/zhaoquan/cool-cline.git)

- [cline/cline](https://github.com/chatterzhao/cool-cline.git)
- [RooVetGit/Roo-Cline](https://github.com/RooVetGit/Roo-Cline.git)
- [jnorthrup/Bao-Cline](https://github.com/jnorthrup/Bao-Cline.git)

想基于这些仓库创建一个新的整合项目，以便功能覆盖更广。以下是具体步骤：

### 1. 创建新的空仓库
在 GitHub 上创建一个新的空仓库。假设你的 GitHub 用户名是 `chatterzhao`，仓库名为 `cool-cline`，那么仓库地址将是 `git@github.com:chatterzhao/cool-cline.git` 或 `https://github.com/chatterzhao/cool-cline.git`。

### 2. 克隆新仓库到本地
```bash
git clone git@github.com:chatterzhao/cool-cline.git
cd cool-cline
```

### 3. 添加所有源仓库作为远程仓库
```bash
# 添加主要开发平台
git remote add github git@github.com:chatterzhao/cool-cline.git
git remote add gitee git@gitee.com:chatterzhao/cool-cline.git

# 添加需要整合的上游仓库
git remote add cline git@github.com:cline/cline.git
git remote add roo git@github.com:RooVetGit/Roo-Cline.git
git remote add bao git@github.com:jnorthrup/Bao-Cline.git
```

### 4. 同步和合并流程
#### 4.1 保持双平台同步
```bash
# 1. 确保本地 develop 分支是最新的
git checkout develop
git pull github develop
git pull gitee develop

# 2. 拉取所有上游仓库的更新
git fetch cline main && git fetch roo main && git fetch bao main && git fetch github develop && git fetch gitee develop

# 3. 查看各仓库的更新
git log github/develop --not develop  # GitHub 的新提交
git log gitee/develop --not develop   # Gitee 的新提交
git log cline/main --not develop      # cline 的新提交
git log roo/main --not develop        # Roo-Cline 的新提交
git log bao/main --not develop        # Bao-Cline 的新提交
```

#### 4.2 创建整合分支
```bash
# 创建整合分支（使用有意义的名称，如 cline 是指整合 cline 的更新，main 是指整合 cline 的 main 分支，develop 是指从本地 develop 分支创建这个新分支）
git checkout -b integration/cline/main develop
```

#### 4.3 查看需要合并的内容
```bash
# 查看需要合并的提交列表
git log integration/cline/main..cline/main --oneline

# 查看改动涉及的文件
git diff --stat integration/cline/main..cline/main
```

#### 4.4 版本管理和记录
在合并过程中，遵循以下最佳实践：

1. 当合并到上游仓库是发布版本的提交时，在 CHANGELOG.md 中记录合并的内容：
   ```markdown
   ## [cool-cline 新版本号]
   - 合并了 cline x.x.x 版本的更新，包括：
     - 具体更新内容 1
     - 具体更新内容 2
   - 注意：有意跳过了某些提交（提交hash），原因说明
   ```

2. 对于不需要合并的提交（如版本号更新），使用 git notes 标记：
   ```bash
   # 标记不需要合并的提交
   git notes add -m "intentionally-skipped: 原因说明" <commit-hash>

   # 查看提交的 note
   git notes show <commit-hash>
   ```

这样做的好处：
- 在 CHANGELOG 中清晰记录了合并历史
- 通过 git notes 标记了不需要合并的提交，方便后续自动化处理
- 保持了版本历史的清晰性

#### 4.5 逐个提交合并策略
```bash
# 1. 找到最早的提交 hash
git log integration/cline/main..cline/main --oneline | tail -n 1

# 2. 合并单个提交
git cherry-pick <commit-hash>

# 3. 解决冲突（如果有的话）
git status  # 查看冲突文件
# 手动解决冲突
git add .   # 添加解决后的文件
git cherry-pick --continue

# 4. 运行测试确保代码正常工作
bun run test  # 或其他测试命令

# 5. 如果测试通过，继续下一个提交
# 如果测试失败，进行修复或 git cherry-pick --abort 重新开始
```

#### 4.6 合并完成后的操作
1. 确保所有功能正常工作，进行全面的测试和调试
2. 将整合分支合并回 develop：
   ```bash
   git checkout develop
   git merge integration/cline/main
   ```
3. 推送到两个平台：
   ```bash
   git push github develop
   git push gitee develop
   ```

### 5. 维护和自动化
1. 及时更新项目文档，说明整合的功能和改进
2. 可以配置 GitHub Actions 来：
   - 自动检查远程仓库的更新
   - 当有新的提交时发送通知
   - 自动运行测试和构建

通过遵循以上步骤，你可以：
- 及时获取其他仓库的新功能
- 保持代码的稳定性
- 有效管理代码合并
- 减少合并冲突带来的风险

记住：合并前要仔细检查变更内容，确保新功能与现有代码兼容。
备用命令：清理不存在的远程分支 `git fetch --prune`

