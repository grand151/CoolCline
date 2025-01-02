// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import delay from "delay"
import * as vscode from "vscode"
import * as path from "path"
import { ClineProvider } from "./core/webview/ClineProvider"
import { createClineAPI } from "./exports"
import "./utils/path" // necessary to have access to String.prototype.toPosix
import { DIFF_VIEW_URI_SCHEME } from "./integrations/editor/DiffViewProvider"

/*
Built using https://github.com/microsoft/vscode-webview-ui-toolkit

Inspired by
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/default/weather-webview
https://github.com/microsoft/vscode-webview-ui-toolkit-samples/tree/main/frameworks/hello-world-react-cra

*/

let outputChannel: vscode.OutputChannel

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// 从 package.json 读取版本要求
	const packageJson = require("../package.json")
	const minimumVersion = packageJson.engines.vscode.replace("^", "") // 移除 ^ 前缀
	const recommendedVersion = packageJson.vscodeVersions.recommended

	const currentVersion = vscode.version
	console.log(
		`Current VSCode version: ${currentVersion}, Required: ${minimumVersion}, Recommended: ${recommendedVersion}`,
	)

	// 检查最低版本要求
	if (compareVersions(currentVersion, minimumVersion) < 0) {
		vscode.window
			.showErrorMessage(
				`Cool Cline 需要 VS Code ${minimumVersion} 或更高版本。\n` +
					`您当前的版本是 ${currentVersion}，请更新您的 VS Code。`,
				"下载新的 VS Code",
			)
			.then((selection) => {
				if (selection === "下载新的 VS Code") {
					vscode.env.openExternal(vscode.Uri.parse("https://code.visualstudio.com/download"))
				}
			})
		return // 终止插件激活
	}

	// 确保在主线程上执行版本检查
	setTimeout(async () => {
		if (compareVersions(currentVersion, recommendedVersion) < 0) {
			const limitations = [
				"终端集成功能 - 无法在终端中直接执行命令",
				"实时命令输出 - 无法在命令执行时获取实时反馈",
				"自动错误修复 - 无法自动响应服务器错误",
			].join("\n• ")

			const selection = await vscode.window.showWarningMessage(
				`Cool Cline 检测到您使用的编辑器版本（${currentVersion}）低于推荐版本（${recommendedVersion}）。\n\n` +
					`以下功能将受到限制：\n ${limitations}\n\n` +
					`建议更新编辑器以获得完整功能。`,
				"继续使用",
				"下载新的 VS Code",
			)

			if (selection === "下载新的 VS Code") {
				await vscode.env.openExternal(vscode.Uri.parse("https://code.visualstudio.com/download"))
			}
		}
	}, 1000) // 延迟 1 秒执行，确保 VSCode 环境已完全加载

	outputChannel = vscode.window.createOutputChannel("Cline")
	context.subscriptions.push(outputChannel)

	outputChannel.appendLine("Cline extension activated")

	const sidebarProvider = new ClineProvider(context, outputChannel)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ClineProvider.sideBarId, sidebarProvider, {
			webviewOptions: { retainContextWhenHidden: true },
		}),
	)

	context.subscriptions.push(
		vscode.commands.registerCommand("cline.plusButtonClicked", async () => {
			outputChannel.appendLine("Plus button Clicked")
			await sidebarProvider.clearTask()
			await sidebarProvider.postStateToWebview()
			await sidebarProvider.postMessageToWebview({ type: "action", action: "chatButtonClicked" })
		}),
	)

	context.subscriptions.push(
		vscode.commands.registerCommand("cline.mcpButtonClicked", () => {
			sidebarProvider.postMessageToWebview({ type: "action", action: "mcpButtonClicked" })
		}),
	)

	const openClineInNewTab = async () => {
		outputChannel.appendLine("Opening Cline in new tab")
		// (this example uses webviewProvider activation event which is necessary to deserialize cached webview, but since we use retainContextWhenHidden, we don't need to use that event)
		// https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample/src/extension.ts
		const tabProvider = new ClineProvider(context, outputChannel)
		//const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined
		const lastCol = Math.max(...vscode.window.visibleTextEditors.map((editor) => editor.viewColumn || 0))

		// Check if there are any visible text editors, otherwise open a new group to the right
		const hasVisibleEditors = vscode.window.visibleTextEditors.length > 0
		if (!hasVisibleEditors) {
			await vscode.commands.executeCommand("workbench.action.newGroupRight")
		}
		const targetCol = hasVisibleEditors ? Math.max(lastCol + 1, 1) : vscode.ViewColumn.Two

		const panel = vscode.window.createWebviewPanel(ClineProvider.tabPanelId, "Cline", targetCol, {
			enableScripts: true,
			retainContextWhenHidden: true,
			localResourceRoots: [context.extensionUri],
		})
		// TODO: use better svg icon with light and dark variants (see https://stackoverflow.com/questions/58365687/vscode-extension-iconpath)

		panel.iconPath = {
			light: vscode.Uri.file(path.join(context.extensionUri.fsPath, "assets", "icons", "robot_panel_light.png")),
			dark: vscode.Uri.file(path.join(context.extensionUri.fsPath, "assets", "icons", "robot_panel_dark.png")),
		}
		tabProvider.resolveWebviewView(panel)

		// Lock the editor group so clicking on files doesn't open them over the panel
		await delay(100)
		await vscode.commands.executeCommand("workbench.action.lockEditorGroup")
	}

	context.subscriptions.push(vscode.commands.registerCommand("cline.popoutButtonClicked", openClineInNewTab))
	context.subscriptions.push(vscode.commands.registerCommand("cline.openInNewTab", openClineInNewTab))

	context.subscriptions.push(
		vscode.commands.registerCommand("cline.settingsButtonClicked", () => {
			//vscode.window.showInformationMessage(message)
			sidebarProvider.postMessageToWebview({ type: "action", action: "settingsButtonClicked" })
		}),
	)

	context.subscriptions.push(
		vscode.commands.registerCommand("cline.historyButtonClicked", () => {
			sidebarProvider.postMessageToWebview({ type: "action", action: "historyButtonClicked" })
		}),
	)

	/*
	We use the text document content provider API to show the left side for diff view by creating a virtual document for the original content. This makes it readonly so users know to edit the right side if they want to keep their changes.

	- This API allows you to create readonly documents in VSCode from arbitrary sources, and works by claiming an uri-scheme for which your provider then returns text contents. The scheme must be provided when registering a provider and cannot change afterwards.
	- Note how the provider doesn't create uris for virtual documents - its role is to provide contents given such an uri. In return, content providers are wired into the open document logic so that providers are always considered.
	https://code.visualstudio.com/api/extension-guides/virtual-documents
	*/
	const diffContentProvider = new (class implements vscode.TextDocumentContentProvider {
		provideTextDocumentContent(uri: vscode.Uri): string {
			return Buffer.from(uri.query, "base64").toString("utf-8")
		}
	})()
	context.subscriptions.push(
		vscode.workspace.registerTextDocumentContentProvider(DIFF_VIEW_URI_SCHEME, diffContentProvider),
	)

	// URI Handler
	const handleUri = async (uri: vscode.Uri) => {
		const path = uri.path
		const query = new URLSearchParams(uri.query.replace(/\+/g, "%2B"))
		const visibleProvider = ClineProvider.getVisibleInstance()
		if (!visibleProvider) {
			return
		}
		switch (path) {
			case "/openrouter": {
				const code = query.get("code")
				if (code) {
					await visibleProvider.handleOpenRouterCallback(code)
				}
				break
			}
			default:
				break
		}
	}
	context.subscriptions.push(vscode.window.registerUriHandler({ handleUri }))

	return createClineAPI(outputChannel, sidebarProvider)
}

// This method is called when your extension is deactivated
export function deactivate() {
	outputChannel.appendLine("Cline extension deactivated")
}

// 版本比较函数
function compareVersions(v1: string, v2: string): number {
	try {
		const v1Parts = v1.split(".").map(Number)
		const v2Parts = v2.split(".").map(Number)

		for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
			const v1Part = v1Parts[i] || 0
			const v2Part = v2Parts[i] || 0
			if (v1Part > v2Part) return 1
			if (v1Part < v2Part) return -1
		}
		return 0
	} catch (error) {
		console.error("Version comparison error:", error)
		return 0
	}
}
