var fs = require('fs');
var config = require('./config');

var fileOperate = ( function () {
    return {

        // 清空文件夹（参数：根文件夹名字）根文件夹不删除（若要删除，则该参数不传即可）
        deleteFiles: function ( pathname, rootFileName ) {
            var _self = this;
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
                        _self.deleteFiles( pathname + '/' + val, rootFileName );
                    });

                    if ( pathname != rootFileName ) fs.rmdirSync( pathname );// 删除文件夹
                }
            }
        },

        // 复制文件（参数：目的路径、源文件路径、复制单个文件的函数）
        copyFiles: function ( savePath, originPath, copyFunc ) {
            var _self = this;
            copyFunc = copyFunc ? copyFunc : _self.defaultCopy; // 复制单个文件的函数

            var _arr = originPath.split('/');
            var fileName = _arr[_arr.length-1]; // 正处理的 源文件名

            var stats = fs.statSync( originPath );
            // if( !stats ) return console.log( err );
            if( !stats ) return;
            else{
                if( stats.isFile() ){ // 复制文件
                    if( fileName ){
                        copyFunc( savePath + '/' + fileName, originPath ); // 复制单个文件
                    }

                } else if( stats.isDirectory() ){
                    fs.mkdirSync( savePath + '/' + fileName );// 创建文件夹

                    // 逐个复制
                    var files = fs.readdirSync( originPath );
                    files.forEach( function ( val, index ) {
                        // console.log( val );
                        _self.copyFiles( savePath + '/' + fileName, originPath + '/' + val, copyFunc );
                    });
                }
            }
        },

        // 复制单个文件的默认操作（增强扩展性，可自定义复制文件的函数）
        defaultCopy: function ( savePath, originPath ) {

            var readStream = fs.createReadStream( originPath );
            var writeStream = fs.createWriteStream( savePath );
            readStream.pipe( writeStream ); // 管道写入文件
        },
    }
})();

fileOperate.deleteFiles( config.savePath, config.savePath );
fileOperate.copyFiles( config.savePath, config.originPath );

module.exports = fileOperate;