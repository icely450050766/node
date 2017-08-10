var url = require('url');
var path = require('path');
var fs = require('fs');
var config = require('../config'); // 配置项
var getFile = require('./getFile'); // 请求文件api

var getStatic = function ( request, response ) {
    var requestUrl = url.parse( request.url );
    var _pathname = config.staticPath + requestUrl.pathname.substring(14);// 截掉“/api/getStatic”
    getFile( request, response, _pathname )
};

module.exports = getStatic;