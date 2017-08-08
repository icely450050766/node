// 设置环境变量 -> 系统变量hh：D:\Git\bin，使能从cmd命令提交github
// http://jingyan.baidu.com/article/d2b1d1029065ba5c7e37d43e.html
var config = require('./config');

var spawn = require('child_process').spawn;//子进程操作模块
var subProcess = spawn( config.bashPath );


// cmd命令行
function bashOperate() {

    // 消息监听，监听子进程的输出。并在主进程中打印出来。
    function onData(data) {
        process.stdout.write(data);//获取当前进程，并在输出中写入某内容。关键是process表示的是当前进程
    }

    // 整个进程的错误监听
    subProcess.on('error', function () {
        console.log("error");
        console.log(arguments);
    });

    // 设置消息监听
    subProcess.stdout.on('data', onData);
    subProcess.stderr.on('data', onData);
    subProcess.stdin.on('end', function () {
        subProcess.stdout.write('stdin End');
    });

    // subProcess.stdin.write('cd / \n');   // 写入数据
    // subProcess.stdin.write('pwd \n');   // 写入数据

    // 提交代码操作
    var _path = config.path.replace(/\\/g, '/'); // 所有反斜杠\替换成正斜杠/
    subProcess.stdin.write('cd ' + _path + ' \n');   // 进入文件目录
    subProcess.stdin.write('ls \n');   // 写入数据

    subProcess.stdin.write('git add -A \n');
    subProcess.stdin.write('git commit -m "提交…" \n');
    subProcess.stdin.write('git push \n');
    subProcess.stdin.end();
}

bashOperate();