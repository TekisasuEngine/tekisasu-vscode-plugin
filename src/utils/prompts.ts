import * as vscode from "vscode";
import { set_configuration } from ".";

export function prompt_for_reload() {
	const message = "Reload VSCode to apply settings";
	vscode.window.showErrorMessage(message, "Reload").then(item => {
		if (item === "Reload") {
			vscode.commands.executeCommand("workbench.action.reloadWindow");
		}
	});
}

export function select_tekisasu_executable(settingName: string) {
	vscode.window.showOpenDialog({
		openLabel: "Select Tekisasu executable",
		filters: process.platform === "win32" ? { "Tekisasu Editor Binary": ["exe", "EXE"] } : undefined
	}).then(async (uris: vscode.Uri[]) => {
		if (!uris) {
			return;
		}
		const path = uris[0].fsPath;
		set_configuration(settingName, path);
		prompt_for_reload();
	});
}

export function prompt_for_tekisasu_executable(message: string, settingName: string) {
	vscode.window.showErrorMessage(message, "Select Tekisasu executable", "Open Settings", "Ignore").then(item => {
		if (item === "Select Tekisasu executable") {
			select_tekisasu_executable(settingName);
		}
		if (item === "Open Settings") {
			vscode.commands.executeCommand("workbench.action.openSettings", settingName);
		}
	});
}
