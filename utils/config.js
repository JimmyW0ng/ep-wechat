const User = require('./user.js');
let token = User.getToken()
let memberType = User.getMemberType()

const CONFIG = {
  apiUrl: 'https://api.qwwlkj.com/',
  testPhone: 13575785566,
  clientId: 'wechat_app',
  clientSecret: '123456',

  memberType: memberType,
  token: token
}

module.exports = CONFIG













