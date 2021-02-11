// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, languages, commands, Disposable, workspace, window } from 'vscode';
import { CodelensProvider } from './CodelensProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: ExtensionContext) {
	const codelensProvider = new CodelensProvider();

	context.subscriptions.push(languages.registerCodeLensProvider("*", codelensProvider));

	context.subscriptions.push(commands.registerTextEditorCommand("vscode-untitledactions.codelensAction", async (textEditor, textEditorEdit) => {
		await commands.executeCommand('workbench.extensions.action.showExtensionsForLanguage', textEditor.document.languageId);
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
