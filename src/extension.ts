const vscode = require("vscode");
const fs = require("fs");

function activate(context: any) {
  console.log("插件已经被激活");

  // 注册命令
  let commandOfGetFileState = vscode.commands.registerCommand(
    "getFileState",
    (uri: any) => {
      // 文件路径
      const filePath = uri.path.substring(1);
      fs.stat(filePath, (err: any, stats: any) => {
        if (err) {
          vscode.window.showErrorMessage(`获取文件时遇到错误了${err}!!!`);
        }

        if (stats.isDirectory()) {
          vscode.window.showWarningMessage(
            `检测的是文件夹，不是文件，请重新选择！！！`
          );
        }

        if (stats.isFile()) {
          const size = stats.size;
          const createTime = stats.birthtime.toLocaleString();
          const modifyTime = stats.mtime.toLocaleString();

          vscode.window.showInformationMessage(
            `
					文件大小为:${size}字节;
					文件创建时间为:${createTime};
					文件修改时间为:${modifyTime}
				`,
            { modal: true }
          );
        }
      });

      const stats = fs.statSync(filePath);
      console.log("stats", stats);
      console.log("isFile", stats.isFile());
    }
  );

  // 将命令放入其上下文对象中，使其生效
  context.subscriptions.push(commandOfGetFileState);

  // 绑定命令ID到处理函数。
  vscode.commands.registerCommand("vstodo.askQuestion",async ()=>{
    // 再vscode中显示消息
    /* 
      showInformationMessage(message: string, options?: vscode.MessageOptions | undefined, ...items: string[]): Thenable<string | undefined>
      message：要显示的消息。
options：可选的选项对象，用于指定消息的模式（例如，是否应该以模态方式显示消息）和其他选项。
items：可选的数组，其中包含要在消息中显示的按钮标签。如果提供了按钮标签，则消息将以模态方式显示，并且用户可以选择其中一个按钮。如果未提供按钮标签，则消息将以非模态方式显示，并且用户无法关闭它。
    */
  // 获取回答 
  const answer =  await vscode.window.showInformationMessage("how are you","good","bad");
  // 可在调试输出控制台查看输出的内容
  console.log( answer +'day');      
    

  })
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
