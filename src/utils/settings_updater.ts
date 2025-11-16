import * as vscode from "vscode";

const OLD_SETTINGS_CONVERSIONS = [
	["tekisasu_tools.editor_path", "tekisasuTools.editorPath.tekisasu3"],
	["tekisasu_tools.editor_path", "tekisasuTools.editorPath.tekisasu4"],
	["tekisasu_tools.gdscript_lsp_server_protocol", "tekisasuTools.lsp.serverProtocol"],
	["tekisasu_tools.gdscript_lsp_server_host", "tekisasuTools.lsp.serverHost"],
	["tekisasu_tools.gdscript_lsp_server_port", "tekisasuTools.lsp.serverPort"],
	["tekisasu_tools.reconnect_automatically", "tekisasuTools.lsp.autoReconnect.enabled"],
	["tekisasu_tools.reconnect_cooldown", "tekisasuTools.lsp.autoReconnect.cooldown"],
	["tekisasu_tools.reconnect_attempts", "tekisasuTools.lsp.autoReconnect.attempts"],
	["tekisasu_tools.scenePreview.previewRelatedScenes", "tekisasuTools.scenePreview.previewRelatedScenes"]
];

export function updateOldStyleSettings() {
	const configuration = vscode.workspace.getConfiguration();
	let settings_changed = false;
	for (const [old_style_key, new_style_key] of OLD_SETTINGS_CONVERSIONS) {
		const value = configuration.get(old_style_key);
		if (value === undefined) {
			continue;
		}
		configuration.update(new_style_key, value, true);
		settings_changed = true;
	}
	if (settings_changed) {
		// Only show this message if things have actually changed, to prevent users who
		// are just reinstalling the extension from receiveing it.
		vscode.window.showInformationMessage(
			`Settings from tekisasu-tools version <2.0.0 have been updated to the new format.
			Please view the changelog for version 2.0.0 for more information.`,
			"Okay"
		);
	}
}

/**
 * Stores the current version of the extension to `context.globalState`,
 * which persists across restarts & updates.
 */
export function updateStoredVersion(context: vscode.ExtensionContext) {
	const syncedVersion: string = vscode.extensions.getExtension(context.extension.id)
		.packageJSON.version;
	context.globalState.update("previousVersion", syncedVersion);
}

/**
 * Checks if settings should try and be converted from the <2.0.0 style.
 *
 * Returns `true` if the extension has no value saved for `localVersion`
 * in `context.globalState`, meaning it was either just installed,
 *  or updated from a version <2.0.0. Otherwise, returns `false`.
 */
export function shouldUpdateSettings(context: vscode.ExtensionContext): boolean {
	const localVersion: string | undefined = context.globalState.get("previousVersion");
	return localVersion === undefined;
}

export function attemptSettingsUpdate(context: vscode.ExtensionContext) {
	if (shouldUpdateSettings(context)) {
		updateOldStyleSettings();
	}
	updateStoredVersion(context);
}
