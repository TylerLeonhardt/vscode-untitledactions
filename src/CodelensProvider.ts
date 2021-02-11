import * as vscode from 'vscode';

/**
 * CodelensProvider
 */
export class CodelensProvider implements vscode.CodeLensProvider {

    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
        const text = document.getText();
        if (text) {
            return [];
        }

        return [
            new vscode.CodeLens(new vscode.Range(0,0,0,0), {
                title: 'Click here to choose a language mode',
                tooltip: "Choose which language mode you'd like to use for this untitled file",
                command: 'workbench.action.editor.changeLanguageMode',
                arguments: []
            }),
            new vscode.CodeLens(new vscode.Range(0,0,0,0), {
                title: 'Find an extension for this language mode',
                tooltip: 'Find an extension for this language mode',
                command: 'vscode-untitledactions.codelensAction',
                arguments: []
            })
        ];
    }
}
