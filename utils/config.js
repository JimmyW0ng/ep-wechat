const User = require('./user.js');
let token = User.getToken()
let memberType = User.getMemberType()

const CONFIG = {
  apiDocUrl: 'http://193.112.62.41:9003/swagger-ui.html',
  apiUrl: 'http://193.112.62.41:9003/',
  
  mySqlUrl: 'jdbc:mysql://122.225.218.26:9002/ep?useUnicode=true&characterEncoding=utf-8&useSSL=false',

  testPhone: 13575785566,
  clientId: 'wechat_app',
  clientSecret: '123456',

  memberType: memberType,
  token: token
}

module.exports = CONFIG