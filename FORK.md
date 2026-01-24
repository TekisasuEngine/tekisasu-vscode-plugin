# TekisasuEngine Fork Changes

This document summarizes the changes made to fork the godot-vscode-plugin for TekisasuEngine.

## Overview

Complete rebranding of the VSCode extension for the TekisasuEngine fork. This extension has been customized to work specifically with TekisasuEngine, a Godot 4-based game engine.

## Major Changes

### 1. Extension Branding
- **Package name**: `godot-tools` → `tekisasu-tools`
- **Display name**: `godot-tools` → `tekisasu-tools`
- **Author**: `The Godot Engine community` → `Tekisasu`
- **Publisher**: `geequlim` → `Tekisasu`
- **Extension ID**: `geequlim.godot-tools` → `Tekisasu.tekisasu-tools`
- **Copyright**: Original copyright preserved in LICENSE file

### 2. Project File Identifier
- Changed from `project.godot` to `project.tekisasu`
- Updated workspace detection pattern in package.json
- Modified file search patterns in `src/utils/godot_utils.ts`
- Updated debugger configuration descriptions
- Renamed test project file: `test_projects/test-dap-project-godot4/project.godot` → `project.tekisasu`

### 3. LSP Server Configuration
- **Default port**: Changed from `6008` to `6005`
- Setting: `tekisasuTools.lsp.serverPort`

### 4. Editor Path Settings
- **Godot 3 setting**: Deprecated (hidden from UI but code retained for easier rebasing)
  - Setting: `tekisasuTools.editorPath.godot3`
  - Added deprecation message: "This setting is deprecated. Tekisasu only supports Godot 4."
- **Godot 4 setting**: Renamed to TekisasuEngine
  - Old: `tekisasuTools.editorPath.godot4`
  - New: `tekisasuTools.editorPath.tekisasuEngine`
  - Description updated to: "Path to the TekisasuEngine editor executable"
- **Version assumption**: All version checks hardcoded to "4" (Godot 4 only)

### 5. Backward Compatibility
- Added settings migration in `src/utils/settings_updater.ts`
- Converts old `tekisasuTools.editorPath.godot4` to new `tekisasuTools.editorPath.tekisasuEngine`
- Preserves existing user configurations during upgrade

## Files Modified

### Core Package Files
- `package.json` - Name, displayName, author, publisher, activation events, settings
- `package-lock.json` - Regenerated with new package name

### Source Code
- `src/utils/godot_utils.ts` - File search patterns for `project.tekisasu`
- `src/utils/vscode_utils.ts` - Extension ID reference
- `src/utils/settings_updater.ts` - Settings migration and messages
- `src/extension.ts` - TekisasuEngine setting usage, hardcoded Godot 4
- `src/lsp/ClientConnectionManager.ts` - TekisasuEngine setting usage, hardcoded Godot 4
- `src/debugger/godot4/server_controller.ts` - TekisasuEngine setting usage
- `src/debugger/godot4/variables/debugger_variables.test.ts` - Test updates

### CI/CD and Templates
- `.github/workflows/ci.yml` - Artifact names changed to `tekisasu-tools`
- `.github/ISSUE_TEMPLATE/bug_report.yml` - Extension name references
- `.github/ISSUE_TEMPLATE/feature_request.yml` - Extension name references

### Documentation
- `README.md` - TekisasuEngine branding, marketplace links, settings documentation
- `CONTRIBUTING.md` - Example configurations using TekisasuEngine settings
- `CHANGELOG.md` - Historical reference consistency

### Test Projects
- `test_projects/test-dap-project-godot4/project.godot` → `project.tekisasu`

## Key Design Decisions

### Why Keep Godot 3 Code Paths?
The Godot 3 code paths are retained (but the setting is deprecated and hidden) to minimize merge conflicts when rebasing with the upstream godot-vscode-plugin repository. This makes it easier to pull in bug fixes and new features from upstream.

### Why Hardcode to Godot 4?
TekisasuEngine is based on Godot 4 only. Hardcoding the version to "4" in all verification checks simplifies the codebase and removes unnecessary version detection logic for this fork.

### Backward Compatibility
Users upgrading from configurations that used `tekisasuTools.editorPath.godot4` will have their settings automatically migrated to `tekisasuTools.editorPath.tekisasuEngine` thanks to the settings updater.

## Installation

This fork can be installed from:
- Visual Studio Marketplace: `Tekisasu.tekisasu-tools`
- GitHub Releases
- Development builds from CI artifacts

## Relationship to Upstream

This is a fork of [godot-vscode-plugin](https://github.com/godotengine/godot-vscode-plugin) customized for TekisasuEngine. The original copyright and MIT license are preserved.

### Upstream Synchronization
When rebasing with upstream:
1. The deprecated Godot 3 code paths should merge cleanly
2. Pay attention to new references to `project.godot` (need to be changed to `project.tekisasu`)
3. Pay attention to new uses of `editorPath.godot4` (need to be changed to `editorPath.tekisasuEngine`)
4. Watch for new hardcoded port references (should use 6005, not 6008)

## Commits

The fork changes were implemented in the following commits:

1. **bb608eb** - Replace project.godot with project.tekisasu throughout codebase
2. **f24343e** - Change default LSP server port from 6008 to 6005
3. **5f7d7b9** - Hide godot3 setting and rename godot4 to tekisasuEngine
4. **8631a7c** - Hardcode version to '4' in verify_godot_version calls
5. **afbaca7** - Rename godot-tools to tekisasu-tools and update author/publisher to Tekisasu

## Support

For issues specific to this TekisasuEngine fork, please open an issue in the TekisasuEngine/tekisasu-vscode-plugin repository.

For general Godot VSCode plugin issues that may affect upstream, consider reporting them to the upstream repository: https://github.com/godotengine/godot-vscode-plugin
