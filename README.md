# Cool Cline

> [简体中文： README_zh.md](README_zh.md)
>
> [English： CHANGELOG.md](CHANGELOG.md)

[`Cool Cline`](https://github.com/coolcline/coolcline.git) is an agentic coding assistant that combines the best features of [Cline](https://github.com/coolcline/coolcline.git), [Roo Cline](https://github.com/RooVetGit/Roo-Cline.git) and [Bao Cline](https://github.com/jnorthrup/Bao-Cline.git). Working seamlessly with your **Command Line Interface** and **Editor**, it brings you the most powerful AI development experience. Thanks to all their `Clines` contributors!

Thanks to [Claude 3.5 Sonnet's agentic coding capabilities](https://www-cdn.anthropic.com/fed9cc193a14b84131812372d8d5857f8f304c52/Model_Card_Claude_3_Addendum.pdf), Cline can handle complex software development tasks step-by-step. With tools that let him create & edit files, explore large projects, use the browser, and execute terminal commands (after you grant permission), he can assist you in ways that go beyond code completion or tech support. Cool Cline can even use the Model Context Protocol (MCP) to create new tools and extend his own capabilities. While autonomous AI scripts traditionally run in sandboxed environments, this extension provides a human-in-the-loop GUI to approve every file change and terminal command, providing a safe and accessible way to explore the potential of agentic AI.

## Key Features

### Intelligent Task Processing

1. Enter your task and add images to convert mockups into functional apps or fix bugs with screenshots.

2. Cool Cline starts by analyzing your file structure & source code ASTs, running regex searches, and reading relevant files to get up to speed in existing projects. By carefully managing what information is added to context, Cool Cline can provide valuable assistance even for large, complex projects without overwhelming the context window.

### Powerful Feature Support

Once Cool Cline has the information he needs, he can:

- Create and edit files + monitor linter/compiler errors along the way, letting him proactively fix issues like missing imports and syntax errors on his own.
- Execute commands directly in your terminal and monitor their output as he works, letting him e.g., react to dev server issues after editing a file.
- For web development tasks, Cool Cline can launch the site in a headless browser, click, type, scroll, and capture screenshots + console logs, allowing him to fix runtime errors and visual bugs.

### Convenient Result Presentation

When a task is completed, Cool Cline will present the result to you with a terminal command like `open -a "Google Chrome" index.html`, which you run with a click of a button.

> [!TIP]
> Use the `CMD/CTRL + Shift + P` shortcut to open the command palette and type "Cool Cline: Open In New Tab" to open the extension as a tab in your editor. This lets you use Cool Cline side-by-side with your file explorer, and see how he changes your workspace more clearly.

---

<img align="right" width="340" src="https://github.com/user-attachments/assets/3cf21e04-7ce9-4d22-a7b9-ba2c595e88a4">

### Use any API and Model

Cool Cline supports API providers like OpenRouter, Anthropic, OpenAI, Google Gemini,DeepSeek, AWS Bedrock, Azure, and GCP Vertex. You can also configure any OpenAI compatible API, or use a local model through LM Studio/Ollama. If you're using OpenRouter, the extension fetches their latest model list, allowing you to use the newest models as soon as they're available.

The extension also keeps track of total tokens and API usage cost for the entire task loop and individual requests, keeping you informed of spend every step of the way.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/81be79a8-1fdb-4028-9129-5fe055e01e76">

### Run Commands in Terminal

Thanks to the new [shell integration updates in VSCode v1.93](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api), Cool Cline can execute commands directly in your terminal and receive the output. This allows him to perform a wide range of tasks, from installing packages and running build scripts to deploying applications, managing databases, and executing tests, all while adapting to your dev environment & toolchain to get the job done right.

For long running processes like dev servers, use the "Proceed While Running" button to let Cool Cline continue in the task while the command runs in the background. As Cool Cline works he’ll be notified of any new terminal output along the way, letting him react to issues that may come up, such as compile-time errors when editing files.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="400" src="https://github.com/user-attachments/assets/c5977833-d9b8-491e-90f9-05f9cd38c588">

### Create and Edit Files

Cool Cline can create and edit files directly in your editor, presenting you a diff view of the changes. You can edit or revert Cool Cline's changes directly in the diff view editor, or provide feedback in chat until you're satisfied with the result. Cool Cline also monitors linter/compiler errors (missing imports, syntax errors, etc.) so he can fix issues that come up along the way on his own.

All changes made by Cool Cline are recorded in your file's Timeline, providing an easy way to track and revert modifications if needed.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/bc2e85ba-dfeb-4fe6-9942-7cfc4703cbe5">

### Use the Browser

With Claude 3.5 Sonnet's new [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use) capability, Cool Cline can launch a browser, click elements, type text, and scroll, capturing screenshots and console logs at each step. This allows for interactive debugging, end-to-end testing, and even general web use! This gives him autonomy to fixing visual bugs and runtime issues without you needing to handhold and copy-pasting error logs yourself.

Try asking Cool Cline to "test the app", and watch as he runs a command like `npm run dev`, launches your locally running dev server in a browser, and performs a series of tests to confirm that everything works. [See a demo here.](https://x.com/sdrzn/status/1850880547825823989)

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/ac0efa14-5c1f-4c26-a42d-9d7c56f5fadd">

### "add a tool that..."

Thanks to the [Model Context Protocol](https://github.com/modelcontextprotocol), Cool Cline can extend his capabilities through custom tools. While you can use [community-made servers](https://github.com/modelcontextprotocol/servers), Cool Cline can instead create and install tools tailored to your specific workflow. Just ask Cool Cline to "add a tool" and he will handle everything, from creating a new MCP server to installing it into the extension. These custom tools then become part of Cool Cline's toolkit, ready to use in future tasks.

- "add a tool that fetches Jira tickets": Retrieve ticket ACs and put Cool Cline to work
- "add a tool that manages AWS EC2s": Check server metrics and scale instances up or down
- "add a tool that pulls the latest PagerDuty incidents": Fetch details and ask Cool Cline to fix bugs

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="360" src="https://github.com/user-attachments/assets/7fdf41e6-281a-4b4b-ac19-020b838b6970">

### Add Context

**`@url`:** Paste in a URL for the extension to fetch and convert to markdown, useful when you want to give Cool Cline the latest docs

**`@problems`:** Add workspace errors and warnings ('Problems' panel) for Cool Cline to fix

**`@file`:** Adds a file's contents so you don't have to waste API requests approving read file (+ type to search files)

**`@folder`:** Adds folder's files all at once to speed up your workflow even more

## Contributing

To contribute to the project, start with our [Contributing Guide](CONTRIBUTING.md) to learn the basics. You can also join our [Discord](https://discord.gg/cline) to chat with other contributors in the `#contributors` channel. If you're looking for full-time work, check out our open positions on our [careers page](https://cline.bot/join-us)!

<details>
<summary>Local Development Instructions</summary>

1. Clone the repository :
    ```bash
    # gitee
    git clone https://gitee.com/coolcline/coolcline.git
    # github
    git clone https://github.com/coolcline/coolcline.git
    ```
2. Open the project in VSCode and prepare branch(suggest follow gitflow workflow):
    ```bash
    # enter project directory
    cd coolcline
    # open project
    code coolcline
    # create and switch to develop branch
    git checkout -b develop origin/develop
    # create feature branch
    git checkout -b feature/your-feature develop
    # create hotfix branch
    git checkout -b hotfix/your-hotfix develop
    ```
3. Install the necessary dependencies for the extension and webview-gui:
    ```bash
    npm run install:all
    ```
4. Launch by pressing `F5` (or `Run`->`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) if you run into issues building the project.)

</details>

## License

[Apache 2.0](./LICENSE)
