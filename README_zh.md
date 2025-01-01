# Cool Cline – OpenRouter 上使用排名 \#x

Cool Cline 是一个整合了 [Cline](https://github.com/chatterzhao/cool-cline.git)、[Roo Cline](https://github.com/RooVetGit/Roo-Cline.git) 和 [Bao Cline](https://github.com/jnorthrup/Bao-Cline.git) 优秀功能的 VSCode 扩展。感谢他们的贡献者！

[English README.md](README.md)

两个平台同步发布

- GitHub：[chatterzhao/cool-cline](https://github.com/chatterzhao/cool-cline.git)
- Gitee：[zhaoquan/cool-cline](https://gitee.com/zhaoquan/cool-cline.git)

认识 Cool Cline，一个能够使用你的**命令行界面**和**编辑器**的 AI 助手。

得益于 [Claude 3.5 Sonnet 的主动编码能力](https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf)，Cool Cline 能够逐步处理复杂的软件开发任务。通过允许他创建和编辑文件、探索大型项目、使用浏览器以及执行终端命令（在你授权后）的工具，他能够以超越代码补全或技术支持的方式为你提供帮助。Cool Cline 甚至可以使用模型上下文协议（MCP）来创建新工具并扩展自身能力。虽然传统上自主 AI 脚本在沙盒环境中运行，但这个扩展提供了一个人机交互的图形界面来批准每个文件更改和终端命令，为探索主动式 AI 的潜力提供了一个安全且易用的方式。

1. 输入你的任务并添加图片，将模型转换为功能性应用或通过截图修复错误。

2. Cool Cline 首先通过分析你的文件结构和源代码抽象语法树（ASTs），运行正则表达式搜索，并阅读相关文件来快速了解现有项目。通过谨慎管理添加到上下文的信息，Cool Cline 可以为大型、复杂的项目提供有价值的帮助，而不会使上下文窗口过载。

3. 一旦 Cool Cline 获得了所需的信息，他就能：

    - 创建和编辑文件，并在过程中监控代码检查器/编译器错误，使他能够主动修复诸如缺失导入和语法错误等问题。
    - 直接在你的终端中执行命令并监控其输出，例如，在编辑文件后对开发服务器问题作出反应。
    - 对于 Web 开发任务，Cool Cline 可以在无头浏览器中启动网站，进行点击、输入、滚动，并捕获截图和控制台日志，使他能够修复运行时错误和视觉 bug。

4. 当任务完成时，Cool Cline 会通过类似 `open -a "Google Chrome" index.html` 的终端命令向你展示结果，你只需点击按钮即可运行。

> [!提示]
> 使用 `CMD/CTRL + Shift + P` 快捷键打开命令面板，输入 "Cool Cline: Open In New Tab" 在编辑器中以标签页形式打开扩展。这样你就可以在文件资源管理器旁边使用 Cool Cline，更清楚地看到他如何改变你的工作区。

### 使用任意 API 和模型

Cool Cline 支持 OpenRouter、Anthropic、OpenAI、Google Gemini、AWS Bedrock、Azure 和 GCP Vertex 等 API 提供商。你还可以配置任何兼容 OpenAI 的 API，或通过 LM Studio/Ollama 使用本地模型。如果你使用 OpenRouter，扩展会获取他们的最新模型列表，让你能够在新模型推出时立即使用。

扩展还会跟踪整个任务循环和单个请求的总令牌数和 API 使用成本，让你随时了解支出情况。

### 在终端中运行命令

得益于 [VSCode v1.93 的新 shell 集成更新](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api)，Cool Cline 可以直接在你的终端中执行命令并接收输出。这使他能够执行广泛的任务，从安装包和运行构建脚本到部署应用程序、管理数据库和执行测试，同时适应你的开发环境和工具链以正确完成工作。

对于开发服务器等长时间运行的进程，使用"继续运行"按钮让 Cool Cline 在命令在后台运行时继续执行任务。在 Cool Cline 工作时，他会收到任何新的终端输出通知，使他能够对可能出现的问题做出反应，比如编辑文件时的编译时错误。

### 创建和编辑文件

Cool Cline 可以直接在你的编辑器中创建和编辑文件，向你展示更改的差异视图。你可以直接在差异视图编辑器中编辑或撤销 Cool Cline 的更改，或在聊天中提供反馈，直到你对结果满意为止。Cool Cline 还会监控代码检查器/编译器错误（缺失导入、语法错误等），这样他就能自行修复途中出现的问题。

Cool Cline 所做的所有更改都会记录在你文件的时间线中，提供了一种在需要时轻松跟踪和撤销修改的方法。

### 使用浏览器

借助 Claude 3.5 Sonnet 的新[计算机使用](https://www.anthropic.com/news/3-5-models-and-computer-use)功能，Cool Cline 可以启动浏览器、点击元素、输入文本和滚动，在每个步骤捕获截图和控制台日志。这使得交互式调试、端到端测试，甚至一般的网络使用成为可能！这让他能够自主修复视觉错误和运行时问题，而无需你手把手指导和复制粘贴错误日志。

试着让 Cool Cline "测试应用程序"，看着他运行类似 `bun run dev` 的命令，在浏览器中启动你的本地开发服务器，并执行一系列测试以确认一切正常运行。[在此查看演示。](https://x.com/sdrzn/status/1850880547825823989)

### "添加一个工具..."

感谢[模型上下文协议](https://github.com/modelcontextprotocol)，Cool Cline 可以通过自定义工具扩展他的能力。虽然你可以使用[社区制作的服务器](https://github.com/modelcontextprotocol/servers)，但 Cool Cline 可以创建和安装专门针对你特定工作流程的工具。只需要让 Cool Cline "添加一个工具"，他就会处理所有事情，从创建新的 MCP 服务器到将其安装到扩展中。这些自定义工具随后成为 Cool Cline 工具包的一部分，可以在未来的任务中使用。

- "添加一个获取 Jira 工单的工具"：获取工单验收标准并让 Cool Cline 开始工作

- "添加一个管理 AWS EC2 的工具"：检查服务器指标并扩展或缩减实例

- "添加一个拉取最新 PagerDuty 事件的工具"：获取详情并让 Cool Cline 修复错误

### 添加上下文

**`@url`：** 粘贴 URL 让扩展获取并转换为 markdown，当你想给 Cool Cline 最新文档时很有用

**`@problems`：** 添加工作区错误和警告（'问题'面板）供 Cool Cline 修复

**`@file`：** 添加文件内容，这样你就不用浪费 API 请求来批准读取文件（+ 输入以搜索文件）

**`@folder`：** 一次性添加文件夹中的所有文件，进一步加快你的工作流程

## 贡献

要为项目做出贡献，请从我们的[贡献指南](CONTRIBUTING.md)开始了解基础知识。

<details>
<summary>本地开发说明</summary>

1. 克隆仓库 _(需要 [git-lfs](https://git-lfs.com/))_:

    ```bash
    git clone https://github.com/chatterzhao/cool-cline.git
    ```

2. 在 VSCode 中打开项目：

    ```bash
    code cline
    ```

3. 安装扩展和 webview-gui 所需的依赖：

    ```bash
    bun run install:all
    ```

4. 按 `F5`（或 `运行`->`开始调试`）启动，打开一个加载了扩展的新 VSCode 窗口。（如果你在构建项目时遇到问题，可能需要安装 [esbuild problem matchers 扩展](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers)。）

</details>

## 许可证

[Apache 2.0 © 2024 Cline Bot Inc.](./LICENSE)
