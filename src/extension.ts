import * as vscode from "vscode";
import simpleGit from "simple-git";
import * as path from "path";
import { MODIFIED_FILES_KEY } from "./constants";
import { getColorForModifiedFiles } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No workspace is opened");
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;
  const git = simpleGit(rootPath);

  let modifiedFiles: Set<string> = new Set(
    context.globalState.get<string[]>(MODIFIED_FILES_KEY, [])
  );

  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  context.subscriptions.push(statusBarItem);

  const getCurrentBranch = async () => {
    const branchInfo = await git.branch();
    return branchInfo.current;
  };

  const updateStatusBar = async () => {
    const branch = await getCurrentBranch();
    const size = modifiedFiles.size;
    const color = getColorForModifiedFiles(size);
    statusBarItem.text = `${color} $(git-branch) Branch: ${branch} / Modified Files: ${size}`;
    statusBarItem.show();
  };

  const handleFileStatusChange = async (filePath: string) => {
    try {
      const status = await git.status();
      const relativePath = path.relative(rootPath, filePath);
      const modifiedFile = status.files.find(
        (file) => file.path === relativePath
      );

      if (modifiedFile) {
        modifiedFiles.add(modifiedFile.path);
      } else {
        modifiedFiles.delete(relativePath);
      }

      context.globalState.update(MODIFIED_FILES_KEY, Array.from(modifiedFiles));
      updateStatusBar();
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${(error as Error).message}`);
    }
  };

  const setupListeners = () => {
    const onSaveListener = vscode.workspace.onDidSaveTextDocument((document) =>
      handleFileStatusChange(document.uri.fsPath)
    );

    const fileSystemWatcher = vscode.workspace.createFileSystemWatcher("**/*");

    const onFileChangeListener = fileSystemWatcher.onDidChange((uri) =>
      handleFileStatusChange(uri.fsPath)
    );

    const onFileDeleteListener = fileSystemWatcher.onDidDelete(async (uri) => {
      const relativePath = path.relative(rootPath, uri.fsPath);
      modifiedFiles.delete(relativePath);
      context.globalState.update(MODIFIED_FILES_KEY, Array.from(modifiedFiles));
      updateStatusBar();
    });

    context.subscriptions.push(
      onSaveListener,
      fileSystemWatcher,
      onFileChangeListener,
      onFileDeleteListener
    );
  };

  setupListeners();
  updateStatusBar();
}

export function deactivate() {}
