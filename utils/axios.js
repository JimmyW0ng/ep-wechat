const app = getApp();
const CONFIG = require('./config.js');
const User = require('./user.js');

const LoginUrl = '/pages/login/LoginPage'
const LoadingDuration = 300

function POST(apiPath, param, success, fail, complete) {
  request(apiPath, 'POST', param, success, fail, complete);
}

function GET(apiPath, success, fail, complete) {
  request(apiPath, 'GET', param, success, fail, complete);
}

function request(apiPath, method, param, success, fail, complete) {
  const url = CONFIG.apiUrl + apiPath;
  const data = param;

  let token = User.getToken() ? (User.getToken() + '') : ''

  wx.showNavigationBarLoading()

  let header = {
    'content-type': 'application/x-www-form-urlencoded', // 默认值
  }

  if (token && (token.trim().length > 0)) {
    header.Authorization = 'Bearer ' + token
  }
  console.log('request: ', url, data)
  wx.request({
    url,
    data,
    header,
    method,
    success: function (res) {
      console.log('response: ', res)
      const result = res.data;
      if (result.error) {
        processRequestError(result)
        if(fail){
          fail()
        }
      } else {
        success(result);
      }
    },
    fail: function (res) {
      const result = res.data;
      processHttpError(result)

      if (typeof fail == "function") {
        fail();
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
      
      if (typeof complete == "function") {
        complete();
      }
    }
  });
}

function processRequestError(result) {
  if (result.error == "ERROR_ACCESS_NEED_AUTH") {
    wx.showModal({
      title: '提示',
      content: result.errorDescription || '',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: LoginUrl
          })
        }
      }
    })
  } else {
    wx.showToast({
      icon: 'none',
      title: result.errorDescription || '',
    })
  }
}

function processHttpError(xhr, errorType, error) {
  //TODO Process HTTP error for 404, 503, 403, 500
  wx.showToast({
    icon: 'none',
    title: '网络出错',
  })
}

const UPLOAD = (filePath, path, callback, error, uploadCallback) => {
  let token = User.getToken() ? (User.getToken() + '') : ''
  let uploadTask = wx.uploadFile({
    url: CONFIG.apiUrl + path,
    filePath,
    name: 'file',
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    },
    success: (res) => {
      if (callback) {
        callback(JSON.parse(res.data))
      }
    },
    fail: (res) => {
      if(error) {
        error(JSON.parse(res.data))
      }
    },
    complete(res) {
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