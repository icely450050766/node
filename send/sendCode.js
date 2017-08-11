// https://dayu.aliyun.com/center/user/account?spm=a3142.8065905.1999205497.33.65ec22f0bptiBD
// 707577045@qq.com  uDqoBNX9wg8J

TopClient = require( './topClient' ).TopClient;

// APP证书
var client = new TopClient({
    'appkey' : '24580707' ,
    'appsecret' : '0c44664866bb396ac14e2cd23e6d676c' ,
    'REST_URL' : 'http://gw.api.taobao.com/router/rest'
});

// 验证码发送
client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
    'extend' : '' ,
    'sms_type' : 'normal' ,
    'sms_free_sign_name' : 'Momo测试' , // 短信签名（签名名称）
    'sms_param' : { number:'123456'} ,
    'rec_num' : '15625042002' ,
    'sms_template_code' : "SMS_84605073" // 短信模板
}, function(error, response) {
    if (!error) console.log(response);
    else console.log(error);
});