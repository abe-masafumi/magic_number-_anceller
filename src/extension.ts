import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('magicNumbers');

    // コマンドを登録
    const disposableCommand = vscode.commands.registerCommand('extension.detectPhpMagicNumbers', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        // 現在のドキュメントでマジックナンバーをチェック
        const document = editor.document;
        checkForMagicNumbers(document);
    });

    context.subscriptions.push(disposableCommand);

    // ドキュメントのイベントリスナーを設定
    vscode.workspace.onDidOpenTextDocument(checkForMagicNumbers);
    vscode.workspace.onDidChangeTextDocument((event) => checkForMagicNumbers(event.document));
    vscode.workspace.onDidCloseTextDocument((document) => diagnosticCollection.delete(document.uri));

    if (vscode.window.activeTextEditor) {
        checkForMagicNumbers(vscode.window.activeTextEditor.document);
    }

    function checkForMagicNumbers(document: vscode.TextDocument) {
        if (document.languageId !== 'php') return;

        const allowedNumbers = vscode.workspace.getConfiguration('magicNumberDetector').get<number[]>('allowedNumbers') || [];
        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();

        const magicNumberRegex = /(?:if|elseif|while|for|switch)\s*\([^)]*?[=!><]=?\s*(-?\d+\.?\d*)/g;
        let match;

        while ((match = magicNumberRegex.exec(text)) !== null) {
            if (allowedNumbers.includes(Number(match[1]))) continue;

            const startPos = document.positionAt(match.index!);
            const endPos = document.positionAt(match.index! + match[0].length);

            const range = new vscode.Range(startPos, endPos);
            const diagnostic = new vscode.Diagnostic(
                range,
                `Magic number detected: ${match[1]}. Consider replacing it with a named constant.`,
                vscode.DiagnosticSeverity.Warning
            );
            diagnostics.push(diagnostic);
        }

        diagnosticCollection.set(document.uri, diagnostics);
    }

    context.subscriptions.push(diagnosticCollection);
}

export function deactivate() {}
