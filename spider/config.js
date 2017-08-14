var configObj = {
    domainName: 'http://www.ss.pku.edu.cn', // 请求的页面 的域名
    originUrl: '/index.php/newscenter/news/3296', // 请求 入口页面
    spiderLength: 5, // 要爬取的网页数

    pageDir: __dirname + '/pageDir', // 爬取回来的网页 文字存放地方
    imgDir: __dirname + '/imgDir', // 爬取回来的网页 图片存放地方
};

module.exports = configObj;