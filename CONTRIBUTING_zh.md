# 为 Cool Cline 做贡献

Cool Cline 是一个整合了 Cline、Roo Cline 和 Bao Cline 优秀功能的 VSCode 扩展。感谢他们的贡献者！

[English CONTRIBUTING.md](CONTRIBUTING.md)

我们很高兴你有兴趣为 Cool Cline 做贡献。无论是修复 bug、添加新功能,还是改进文档,每一份贡献都让 Cool Cline 变得更智能!为了保持我们的社区充满活力和友好,所有成员都必须遵守我们的[行为准则](CODE_OF_CONDUCT.md)。

## 报告 Bug 或问题

Bug 报告帮助 Cool Cline 变得更好!在创建新问题之前,请[搜索现有问题](https://github.com/chatterzhao/cool-cline/issues)以避免重复。当你准备报告 bug 时,请前往我们的[问题页面](https://github.com/chatterzhao/cool-cline/issues/new/choose),那里有模板可以帮助你填写相关信息。

<blockquote class='warning-note'>
     🔐 <b>重要提示:</b> 如果你发现安全漏洞,请使用 <a href="https://github.com/chatterzhao/cool-cline/security/advisories/new">Github 安全工具私下报告</a>。
</blockquote>

## 决定做什么

寻找第一个贡献机会?查看标记为["good first issue"](https://github.com/chatterzhao/cool-cline/labels/good%20first%20issue)或["help wanted"](https://github.com/chatterzhao/cool-cline/labels/help%20wanted)的问题。这些是专门为新贡献者准备的,也是我们特别需要帮助的领域!

如果你计划开发更大的功能,请先创建一个 issue,以便我们讨论它是否符合 Cool Cline 的愿景。

## 编写和提交代码

任何人都可以为 Cool Cline 贡献代码,但我们要求你遵循以下准则,以确保你的贡献能够顺利集成:

1.  **保持 Pull Request 专注**

    - 将 PR 限制在单个功能或 bug 修复
    - 将较大的更改拆分成较小的相关 PR
    - 将更改分解为可以独立审查的逻辑提交

2.  **代码质量**

    > macOS 安装 bun: `curl -fsSL https://bun.sh/install | bash`
    >
    > windows 安装 bun: `powershell -c "irm bun.sh/install.ps1 | iex"`

        - 运行 `bun run lint` 确保代码符合我们的风格指南
        - 运行 `bun run format` 用 Prettier 格式化代码
        - 解决提交前的任何 ESLint 警告或错误
        - 遵循 TypeScript 最佳实践并保持类型安全

3.  **测试**

    - 为新功能添加测试
    - 运行 `bun test` 确保所有测试通过
    - 如果你的更改影响了现有测试,请更新它们
    - 在适当的情况下包含单元测试和集成测试

4.  **提交指南**

    - 编写清晰、描述性的提交消息
    - 使用约定式提交格式(例如:"feat:", "fix:", "docs:")
    - 在提交中使用 #issue-number 引用相关问题

5.  **提交前**

    - 在最新的 main 分支上变基你的分支
    - 确保你的分支构建成功
    - 再次检查所有测试是否通过
    - 检查更改中是否有调试代码或控制台日志

6.  **Pull Request 描述**
    - 清晰描述你的更改做了什么
    - 包含测试更改的步骤
    - 列出任何破坏性更改
    - 为 UI 更改添加截图

## 贡献协议

通过提交 pull request,你同意你的贡献将在相同的许可下获得许可([Apache 2.0](LICENSE))。

记住:为 Cool Cline 做贡献不仅仅是编写代码 - 这是成为一个正在塑造 AI 辅助开发未来的社区的一部分。让我们一起创造令人惊叹的东西! 🚀
