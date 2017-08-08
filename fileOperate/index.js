// 设置环境变量 -> 系统变量Path：D:\Git\bin，使能从cmd命令提交github
// http://jingyan.baidu.com/article/d2b1d1029065ba5c7e37d43e.html

var fs = require('fs');
var exec = require('child_process').exec;
var cmd = require('node-cmd');

var spawn = require('child_process').spawn;//子进程操作模块
var subProcess = spawn("D:/Git/bin/bash");

var config = require('./config');

// 清空文件夹
function deleteFiles( pathname ) {

    var stats = fs.statSync( pathname );

    // if( !stats ) return console.log( err );
    if( !stats ) return;
    else{
        // console.log( pathname );
        if( stats.isFile() ) fs.unlinkSync( pathname ); // 删除文件
        else if( stats.isDirectory() ){

            // 逐个删除
            var files = fs.readdirSync( pathname );
            files.forEach( function ( val, index ) {
                // console.log( val );
                deleteFiles(pathname + '/' + val);
            });

            if ( pathname != config.savePath ) fs.rmdirSync( pathname );// 删除文件夹
        }
    }
}

// 复制文件（参数：目的路径、源文件路径、源文件名）
function copyFiles( savePath, originPath, fileName ) {
    var stats = fs.statSync( originPath );

    // if( !stats ) return console.log( err );
    if( !stats ) return;
    else{
        if( stats.isFile() ){ // 复制文件
            if( fileName ){
                var readStream = fs.createReadStream( originPath );
                var writeStream = fs.createWriteStream( savePath + '/' + fileName );
                readStream.pipe( writeStream );
            }

        } else if( stats.isDirectory() ){
            fs.mkdirSync( savePath + '/' + fileName );// 创建文件夹

            // 逐个复制
            var files = fs.readdirSync( originPath );
            files.forEach( function ( val, index ) {
                // console.log( val );
                copyFiles( savePath + '/' + fileName, originPath + '/' + val, val );
            });
        }
    }
}

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

    var _path = config.savePath.replace(/\\/g, '/'); // 所有反斜杠\替换成正斜杠/
    subProcess.stdin.write('cd ' + _path + '/gitTest \n');   // 写入数据
    subProcess.stdin.write('ls');   // 写入数据
    subProcess.stdin.end();

}

deleteFiles( config.savePath );
copyFiles( config.savePath, config.originPath, 'gitTest' );
bashOperate();