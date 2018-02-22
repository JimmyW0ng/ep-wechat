const app = getApp();
const CONFIG = require('./config.js');
const User = require('./user.js');

const LoginUrl = 'pages/login/LoginPage'
const LoadingDuration = 300

// if (!(User.getToken() && User.getUid())) {
// if (true) {
//   wx.navigateTo({
//     url: LoginUrl,
//   })
// }

function POST(apiPath, param, success, fail, complete) {
  request(apiPath, 'POST', param, success, fail, complete);
}

function GET(apiPath, success, fail, complete) {
  request(apiPath, 'GET', param, success, fail, complete);
}

function request(apiPath, method, param, success, complete) {
  // const url = CONFIG.apiUrl + apiPath + `?p=w&uid=${User.getUid()}&wechatAppId=${CONFIG.appId}&token=${User.getToken()}&openId=${User.getOpenId()}`;
  const url = CONFIG.apiUrl + apiPath;
  const data = param;
  wx.showToast({
    // title: "loading",
    icon: "loading",
    duration: 50000
  })
  wx.request({
    url,
    data,
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      'Authorization': 'Bearer ' + CONFIG.token
    },
    method: method,
    success: function (res) {
      const result = res.data;
      if (result.error) {
        processRequestError(result)
      } else {
        success(result);
      }
      // if (result.resultCode === 0) {
      //   if (typeof success == "function") {
      //     success(result);
      //   }
      // } else if (result.resultCode === 1102) {
      //   console.log(getCurrentPages())
      //   wx.navigateTo({
      //     url: LoginUrl,
      //   })
      // } else {
      //   processRequestError(result);
      // }
    },
    fail: function (res) {
      const result = res.data;
      processHttpError(result)

      if (typeof fail == "function") {
        fail();
      }
    },
    complete: function () {
      setTimeout(() => {
        wx.hideToast();
      }, LoadingDuration)
      if (typeof complete == "function") {
        complete();
      }
    }
  });
}

function processRequestError(result) {
  // TODO 优化一下对话框
  if (result.error == "ERROR_ACCESS_NEED_AUTH"){
    wx.showModal({
      title: '登陆信息过期，请重新登陆',
      showCancel: false,
    })
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/login/LoginPage'
      })
    }, 1000)
  } else {
    wx.showModal({
      title: result.error + ' : ' + result.errorDescription,
      showCancel: false,
    })
  }
}

function processHttpError(xhr, errorType, error) {
  //TODO Process HTTP error for 404, 503, 403, 500
  let message = '';
  // if (xhr.status === 404) {
  //   message = '404 网络错误 \n 请检查你的本地网络是否连接';
  // } else if (xhr.status === 500) {
  //   message = 'Oops! 500错误 \n 服务器异常';
  // } else {
  //   message = '网络错误';
  // }
  wx.showModal({
    title: message,
    showCancel: false,
  })
}

const UPLOAD = (filePath, callback, uploadCallback) => {
  let uploadTask = wx.uploadFile({
    url: CONFIG.apiUrl + 'auth/file/child/avatar',
    filePath,
    name: 'file',
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + CONFIG.token
    },
    success: (res) => {
      if (callback) {
        callback(JSON.parse(res.data))
      }
    },
    fail: (res) => {
      // debugger
    },
    complete(res){
// debugger
    }
  })

  // let uploadTask = wx.request({
  //   url: 'https://rc-api-upload.xiaomai5.com/xm/oss/web/token?bucket=res', //oss token
  //   method: "GET",
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success: (res) => {
  //     const signInfo = res.data;
  //     console.log(signInfo)
  //     const uploadTask = wx.uploadFile({
  //       url: 'https://res.xiaomai5.com',
  //       filePath,
  //       name: 'file',
  //       header: {
  //         'content-type': 'multipart/form-data'
  //       },
  //       formData: {
  //         'key': signInfo.dir + name,
  //         OSSAccessKeyId: signInfo.accessid,
  //         signature: signInfo.signature,
  //         policy: signInfo.policy,
  //         expire: signInfo.expire,
  //         success_action_status: '200',
  //         callback: signInfo.callback,
  //       },
  //       success: (res) => {
  //         if (callback) {
  //           callback(JSON.parse(res.data), name)
  //         }
  //       }
  //     })
  //     uploadTask.onProgressUpdate((res) => {
  //       if (uploadCallback) {
  //         uploadCallback(res, name)
  //       }
  //       // console.log('上传进度', res.progress)
  //       // console.log('已经上传的数据长度', res.totalBytesSent)
  //       // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  //     })
  //   }
  // })
}

module.exports = {
  POST: POST,
  GET: GET,
  UPLOAD
}