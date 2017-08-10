var url = require('url');
var path = require('path');
var fs = require('fs');
var querystring = require('querystring');
var config = require('../config'); // 配置项

var getDirectory = function ( request, response ) {
    var postData = '';

    // 每当接受到请求体的数据，就累加到 postData变量中
    request.on('data', function(chunk){ postData += chunk; });

    request.on('end', function(){
        postData = querystring.parse(postData); // 解析为真正的POST请求格式
        // postData = util.inspect(postData);

        // 请求该目录下的子文件
        var _path = config.basePath + postData.pathname;
        // console.log( _path )
        var files = fs.readdirSync( _path ); // 同步
        var dirArr = new Array( files.length ); // 响应的数据
        for( var i=0; i <dirArr.length; i++ ) dirArr[i] = null; // 初始化为0

        // 依次遍历子文件
        files.forEach( function ( val, index ) {

            // 请求 文件信息
            fs.stat( ( _path + val ), function (err, stats) {
                if( err ){
                    console.log( err );
                    var temp = {
                        code: err.code,
                        msg: err.toString() + '<br/> at Error(native)',
                    };
                    response.end( JSON.stringify(temp) ); // 一定要转，为什么

                }else{
                    var _temp = { "name": val, "isDirectory": stats.isDirectory() };
                    dirArr[index] = _temp; // 按顺序

                    // 返回数据
                    if( dirArr.indexOf(null) == -1 ){
                        var temp = {
                            code: 200,
                            msg: 'success',
                            data: dirArr,
                        };
                        response.end( JSON.stringify(temp) ); // 一定要转，为什么
                        // response.end( JSON.stringify(dirArr) ); // 一定要转，为什么
                    }
                }
            })
        });
    });

};

module.exports = getDirectory;