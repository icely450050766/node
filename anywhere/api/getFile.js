var url = require('url');
var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var config = require('../config'); // 配置项

var getFile = function ( request, response ) {

    // 获取路径（ip:端口 之后的内容）
    var requestUrl = url.parse( request.url );
    // console.log( requestUrl.pathname );
    // console.log( requestUrl.pathname.slice(-1) );

    var _pathname = config.rootDirname + config.basePath + requestUrl.pathname;
    if( requestUrl.pathname == '/' ) _pathname = config.defaultPage; // 根目录，显示默认页面
    _pathname = decodeURI( _pathname ); // 防中文乱码
    // console.log( _pathname );

    // 获取后缀名（文件类型）
    var _contentType = path.extname(_pathname).slice(1); // 截取“.”
    _contentType = config.contentType[ _contentType ] || 'unknown';
    // console.log( _contentType );

    // 设置头部
    response.setHeader( 'Content-Type', _contentType );
    // response.setHeader("Cache-Control", "no-cache");

    // 获取文件信息
    fs.stat( _pathname, function ( err, stats ) {

        if( err ){ // 找不到文件信息，路径不正确
            response.writeHead( 404 );
            response.end('找不到文件，路径不正确！');

        }else {
            if( stats.isDirectory() ){ // 文件夹
                // response.writeHead( 404 );
                // response.end('这是一个文件夹！');
                _pathname = config.defaultPage; // 显示默认页面

            }else if( stats.isFile() ){ // 文件
            }

            // 传送页面内容
            response.writeHead( 200 );
            var readerStream = fs.createReadStream( _pathname );

            // 压缩…
            readerStream.pipe( response ); // 管道传输
        }
    });
};

module.exports = getFile;