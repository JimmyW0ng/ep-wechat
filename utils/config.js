const User = require('./user.js');
let token = User.getToken()
let memberType = User.getMemberType()

const CONFIG = {
  apiUrl: 'http://115.159.210.127:9003/',
  testPhone: 13575785566,
  clientId: 'wechat_app',
  clientSecret: '123456',

  memberType: memberType,
  token: token
}

module.exports = CONFIG













