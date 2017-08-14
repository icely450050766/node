var configObj = {

    savePath: __dirname + '/build', // 增加时间戳处理后，生成的文件路径
    originPath: 'F:/workSpace/gitTest', // 要处理（复制）的源文件路径，绝对位置

    // 正则表达式
    externalResourcesReg: new RegExp(/(href|src)=["'][A-Za-z0-9_=&\/\.\?]+["']/ig), // 外部资源（src、href）
    timeStampReg: new RegExp(/timeStamp=[0-9]*/), // href/src属性值内，匹配时间戳

};

module.exports = configObj;