//原理：
//子进程并不是bash进程，进程只是一个空间，用来运行某个软件。其中bash就是其中一个软件。
//spawn函数返回的，就是这个软件的上下文。可以向该上下文发生命令。执行程序。
var spawn = require('child_process').spawn;//子进程操作模块
var subProcess = spawn("D:/Git/bin/bash");//使用子程序去运行某个软件。在这里就是运行bash软件。并获取其上下文。
// var subProcess = spawn("bash");//使用子程序去运行某个软件。在这里就是运行bash软件。并获取其上下文。

//消息监听，监听子进程的输出。并在主进程中打印出来。
function onData(data) {
    process.stdout.write(data);//获取当前进程，并在输出中写入某内容。关键是process表示的是当前进程
}

//整个进程的错误监听
subProcess.on('error', function () {
    console.log("error");
    console.log(arguments);
});

//设置消息监听
subProcess.stdout.on('data', onData);
subProcess.stderr.on('data', onData);
subProcess.stdin.on('end', function () {
    subProcess.stdout.write('stdin End');
});

//向子进程发送命令
subProcess.stdin.write('cd / \n');   // 写入数据
subProcess.stdin.write('pwd \n');   // 写入数据
subProcess.stdin.write('ls');   // 写入数据
subProcess.stdin.end();




