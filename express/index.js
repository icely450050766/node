var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var logger = require('multer');
var favicon = require('serve-favicon');

var path = require('path');
var app = express();

// 设定express实例的参数
app.set('port', process.env.PORT || 3000); // 端口
app.set('views', path.join(__dirname, 'views')); // 视图存放目录
app.set('view engine', 'jade'); // 网页模板引擎

// http://www.expressjs.com.cn/guide/migrating-4.html#overview
// app.use( favicon() );
// app.use( logger('dev') );
app.use( bodyParser() );
app.use( methodOverride() );
// app.use( app.router );
app.use( express.static(path.join(__dirname, 'public')) ); // 静态文件目录

app.listen( app.get('port') );


