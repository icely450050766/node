var fs = require("fs");
var through2 = require('through2'); // pipe中间进行处理

var fileOperate = require('../fileOperate/index'); // 基于 fileOperate文件 运行
var config = require('./config'); // 配置文件

// pipe中间进行处理
var stream = through2( function ( line, _, next ) {
    // console.log( line.toString() )
    var data = line.toString();
    var matchArr = data.match( config.externalResourcesReg ) || []; // 匹配正则
    // console.log( matchArr ); // 若无匹配项，data.match()结果为null，取[]

    // 依次处理 匹配结果。把匹配结果增加时间戳，并替换原字符串
    for( var i=0; i < matchArr.length; i++ ){
        ( function (i) {
            var str = matchArr[i];
            data = data.replace( str, addTimeStamp( str ) ); // 替换字符串
        })(i);
    }
    this.push( data );
    next();
}, function ( done ) {
    done();
});


// 给字符串增加时间戳，返回结果字符串（参数：要增加时间戳的字符串）
function addTimeStamp( str ) {

    var timeStamp = Date.parse( new Date() ); // 当前的时间戳
    console.log( timeStamp );

    var _arr = str.split(/['"]/);
    // console.log( _arr[1] );

    if( _arr[1].search(/\?/) == -1 ){ // 没有“?”
        _arr[1] += '?timeStamp=' + timeStamp;

    }else{ // 已有“?”

        if( _arr[1].search( config.timeStampReg ) == -1 ){ // 没有时间戳
            _arr[1] += '&timeStamp=' + timeStamp;

        }else{ // 已有时间戳
            var temp = _arr[1].match( config.timeStampReg )[0]; // 找到匹配的字符串
            _arr[1] = _arr[1].replace( temp, 'timeStamp=' + timeStamp );
        }
    }

    return _arr.join('\"');
}

// 处理单个文件。给源文件 所有请求外部资源的代码，增加时间戳（参数：目的路径、源文件路径）
function handleFile( savePath, originPath ) {

    // 创建 读写流，管道处理文件
    var readerStream = fs.createReadStream( originPath );
    var writerStream = fs.createWriteStream( savePath );
    readerStream.pipe( stream ).pipe( writerStream );
}

// 调用 fileOperate
fileOperate.deleteFiles( config.savePath, config.savePath );
fileOperate.copyFiles( config.savePath, config.originPath, handleFile );