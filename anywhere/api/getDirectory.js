var url = require('url');
var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var config = require('../config'); // 配置项

var getDirectory = function ( request, response ) {

    var postData = '';
    var dirArr = []; // 响应的数据

    // 每当接受到请求体的数据，就累加到 postData变量中
    request.on('data', function(chunk){ postData += chunk; });

    request.on('end', function(){
        postData = querystring.parse(postData); // 解析为真正的POST请求格式
        // postData = util.inspect(postData);

        // 请求该目录下的子文件
        var _path = config.rootDirname + config.basePath + postData.pathname;
        console.log( _path )
        var files = fs.readdirSync( _path );
        files.forEach( function ( val, index ) {

            // 请求 文件信息
            fs.stat( ( _path + val ), function (err, stats) {
                if( err ) return console.log( err )
                var _temp = { "name": val, "isDirectory": stats.isDirectory() };
                dirArr.push( _temp );

                // 返回数据
                if( dirArr.length == files.length ){
                    response.end( JSON.stringify(dirArr) ); // 一定要转，为什么
                }
            })
        });
    });

};

module.exports = getDirectory;