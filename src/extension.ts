// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function convertInputToBigInt(input: string): bigint {
    if (input.startsWith('0x')) {
        return BigInt(input);
    } else {
        return BigInt(input);
    }
}

function createByteList(bigIntValue: bigint): number[] {
    const byteList: number[] = [];
    while (bigIntValue > 0n) {
        byteList.unshift(Number(bigIntValue & 0xFFn));
        bigIntValue >>= 8n;
    }
    return byteList;
}

function convertNumberToString(number: number): string {
    const byteArray = new Uint8Array(new BigInt64Array([BigInt(number)]).buffer);
    return String.fromCharCode(...byteArray);
}

function createStringFromU8List(u8List: number[]): string {
    return u8List.map(u8 => String.fromCharCode(u8)).join('');
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "FtS" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('FtS.feltToString', () => {
        vscode.window.showInputBox({ prompt: 'Enter a number:' }).then(input => {
            if (input) {
                const number = convertInputToBigInt(input);
				const bytesList = createByteList(number);
                const resultingString = createStringFromU8List(bytesList);
                vscode.window.showInformationMessage(`Resulting string: ${resultingString}`);
            }
        });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
