var nodemailer = require('nodemailer');

var from = '450050766@qq.com'; // 发送者
var to = '450050766@qq.com, 707577045@qq.com'; // 接受者，多个以 逗号 隔开

// 进入QQ个人邮箱, 设置-账户-开启服务POP3/SMTP服务,并生成授权码（验证手机号）
var transporter = nodemailer.createTransport({
    service: 'qq',
    auth:{
        user: from,
        pass: 'tbtsngffbgllbghc' // 授权码
    }
});

var mailOption = {
    from: from,
    to: to,
    subject: 'node发送email测试', // 标题
    // text: 'hello world', // 文本（text、html任选其一，html优先级更高）
    html: '<h2>nodemailer使用<a href="https://www.baidu.com">百度</a></h2>',
    attachments: [ // 附件
        {
            filename: 'package.json',
            path: '././package.json'
        }
    ]
};

transporter.sendMail( mailOption, function ( err, info ) {
    if( err ) console.log( err );
    else console.log('发送成功！')
});
