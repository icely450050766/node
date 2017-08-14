var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio'); // 用来从网页中以 css selector 取数据，和jquery 一样
var request = require('request');

var fileOperate = require('../fileOperate');// 文件操作
var config = require('./config');

// 爬取网页
function spiderPage( url, count ) {
    // console.log( decodeURI(url) )
    http.get( url, function ( res ) {
        var html = ''; // 网页的html
        res.setEncoding('utf-8'); // 防止中文乱码

        res.on( 'data', function ( chunk ) { html += chunk; });
        res.on( 'end', function () {
            // console.log( html );
            var $ = cheerio.load( html ); // jquery

            // 获取、输出 当前爬取到的网页信息
            var temp = {
                title: $('div.article-title a').text().trim(),
                author: $('div.article-info.muted a:nth-child(1)').text().trim(),
                time: $('div.article-info.muted a:nth-child(2)').text().trim(),
            };
            console.log( temp );

            // 保存操作
            savePage( $, temp.title ); // 保存 页面内容
            saveImg( $, temp.title ); // 保存 页面图片


            // 已爬取数量 小于 要爬取的网页数，继续爬取
            if( ++count < config.spiderLength ){
                var _nextUrl = $('.pager.pagenav li.next a').attr('href');
                _nextUrl = _nextUrl.trim().split('-')[0]; // 截掉后面的中文部分
                _nextUrl = config.domainName + _nextUrl; // 加上域名

                spiderPage( _nextUrl, count );
            }
        });
    });
}

// 保存 当前爬取的 页面内容（参数：$dom、保存的文件名）
function savePage( $, title ) {
    var _content = '';
    $('.article-content p').each( function ( index, val ) {
        _content += $(this).text().trim() + '\n';

        // 将新闻文本内容一段一段添加
        // var text = $(this).text().trim() + '\n';
        // fs.appendFile( config.pageDir + '/' + title + '.txt', text, 'utf-8', function (err) {
        //     if (err)  console.log(err);
        // });
    });

    // 写文件（文件不存在，则自动新建）
    fs.writeFile( config.pageDir + '/' + title + '.txt', _content, function ( err ) {
        if (err)  console.log(err);
    })
}

// 保存 当前爬取的 图片（参数：$dom、保存的文件名）
function saveImg( $, title ) {
    var _path = config.imgDir + '/' + title;

    // 判断是否 已存在文件夹
    fs.stat( _path, function (err) {
        if( err ){
            if( err.code == 'ENOENT' ){ // no such file or directory
                fs.mkdirSync( _path ); // 同步 创建文件夹
            }
            else return console.log( err );
        }

        // 依次处理图片
        $('.article-content img').each( function ( index, val ) {
            var _imgTitle = $(this).parent().next().text().trim() || ( '图片' + index );
            var _imgSrc = config.domainName + $(this).attr('src');

            // 采用request模块，向服务器发起一次请求，获取图片资源
            request.head( _imgSrc, function ( err, res, body ) {
               if( err ) console.log( err );
            });
            request( _imgSrc ).pipe( fs.createWriteStream( _path + '/' + _imgTitle + '.jpg' ) );
        });
    });
}


// 清空 存放爬取结果 的相关文件夹，爬取网页
fileOperate.deleteFiles( config.pageDir, config.pageDir );
fileOperate.deleteFiles( config.imgDir, config.imgDir );
spiderPage( config.domainName + config.originUrl, 0 ); // 爬取网页