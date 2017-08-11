var http = require('http');
var url = require('url');
var childProcess = require('child_process');

var config = require('./config'); // 配置项
var getFile = require('./api/getFile'); // 请求文件api
var getDirectory = require('./api/getDirectory'); // 请求目录api
var getStatic = require('./api/getStatic'); // 请求静态资源api


// 创建服务器
var server = http.createServer( function ( request, response ) {

    // 获取路径（ip:端口 之后的内容）
    var requestUrl = url.parse( request.url );
    // console.log( requestUrl );
    // console.log( requestUrl.pathname.substr(0,4) );

    var _pathnameArr = requestUrl.pathname.split('/');
    // console.log( _pathnameArr );

    // 匹配 前4个字符
    if( _pathnameArr[1] === 'api' ){ // 请求接口

        switch ( _pathnameArr[2] ){
            case 'getDirectory': getDirectory( request, response ); break; // 获取目录
            case 'getStatic': getStatic( request, response ); break; // 获取静态资源
            default: response.end('error'); break;
        }

    }else{ // 请求文件
        getFile( request, response );
    }

});
server.listen( config.port );
console.log( 'Server running at http://127.0.0.1:' + config.port );

// 打开浏览器
childProcess.exec('start http://127.0.0.1:' + config.port);
