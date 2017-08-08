var configObj = {
    port: 9001, // 服务器监听端口
    basePath: '/build', // 基础路径（要请求的 文件资源的存放位置）

    rootDirname: __dirname, // anywhere的 根文件路径（api下的接口要用到）
    defaultPage: __dirname + '/index.html', // 默认显示的页面

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

module  && ( module.exports = configObj );
