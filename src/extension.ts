// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, languages, commands, Disposable, workspace, window, TextEditor, DecorationOptions, Range, Position } from 'vscode';
import { CodelensProvider } from './CodelensProvider';

const decorationType = window.createTextEditorDecorationType({
	after: {
		color: 'darkgray',
		fontStyle: 'italic',
		contentText: '\tOnce you start typing these buttons will go away...'
	}
});

export function activate(context: ExtensionContext) {
	const codelensProvider = new CodelensProvider();

	context.subscriptions.push(languages.registerCodeLensProvider("*", codelensProvider));

	context.subscriptions.push(commands.registerTextEditorCommand("vscode-untitledactions.codelensAction", async (textEditor, textEditorEdit) => {
		await commands.executeCommand('workbench.extensions.action.showExtensionsForLanguage', textEditor.document.languageId);
	}));

	workspace.onDidChangeTextDocument(event => {
		const openEditor = window.visibleTextEditors.filter(
			editor => editor.document.uri === event.document.uri
		)[0];
		decorate(openEditor);
	});

	workspace.onDidOpenTextDocument(document => {
		const openEditor = window.visibleTextEditors.filter(
			editor => editor.document.uri === document.uri
		)[0];
		decorate(openEditor);
	});

	window.visibleTextEditors.forEach(e => decorate(e));
}

function decorate(editor: TextEditor) {
	let sourceCode = editor.document.getText();

	let decorationsArray: DecorationOptions[] = [];

	if (!sourceCode) {
		decorationsArray.push({
			range: new Range(0,0,0,0)
		});
	}

	editor.setDecorations(decorationType, decorationsArray);
}

// this method is called when your extension is deactivated
export function deactivate() { }
