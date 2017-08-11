var fs = require('fs');
var exec = require('child_process').exec;

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
                readStream.pipe( writeStream ); // 管道写入文件
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

deleteFiles( config.savePath );
copyFiles( config.savePath, config.originPath, 'gitTest' );