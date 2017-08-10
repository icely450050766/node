var configObj = {
    port: 9001, // 服务器监听端口
    basePath: 'F:/workSpace', // 基础路径（要请求的 文件资源的存放的 绝对位置）

    staticPath: __dirname + '/static', // 静态资源路径
    defaultPage: __dirname + '/static/index.html', // 默认显示的页面

    // 头部参数 Content-Type
    contentType: {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    },
};

module.exports = configObj;
