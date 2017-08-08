var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var childProcess = require('child_process');

var util = require('util');
var querystring = require('querystring');

var config = require('./config'); // 配置项
var getFile = require('./api/getFile'); // 请求文件api
var getDirectory = require('./api/getDirectory'); // 请求文件api


// 创建服务器
var server = http.createServer( function ( request, response ) {

    // 获取路径（ip:端口 之后的内容）
    var requestUrl = url.parse( request.url );
    // console.log( requestUrl );
    // console.log( requestUrl.pathname.substr(0,4) );

    // 匹配 前4个字符
    if( requestUrl.pathname.substr(0,4) === '/api' ){ // 请求接口
        getDirectory( request, response );

    }else{ // 请求文件
        getFile( request, response );
    }

});
server.listen( config.port );
console.log( 'Server running at http://127.0.0.1:' + config.port );

// 打开浏览器
childProcess.exec('start http://127.0.0.1:' + config.port);
