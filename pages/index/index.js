//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id: 1,
    showHello: false,
    flag: false,
    zero: 1,
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    },
    item2: {
      index: 22,
      msg: 'th1221is is a template',
      time: '2011116-09-15'
    },
    array: [{
      message: 'fu'
    }, {
      message: 'yo1!'
    }],
    condition: false
  },

  clickMe: function(){
    this.setData({ singer: 'fhhccccc' })
    this.showHello = true
    this.flag = true
    this.condition = !this.condition
  },

  handleLogin: function() {
    wx.navigateTo({ 
      url: '../login/LoginPage'
    })
  },

  handleOrgnization: function () {
    wx.navigateTo({
      url: '../orgnization/OrgnizationPage'
    })
  },

  handleUserCenter: function () {
    wx.navigateTo({
      url: '../userCenter/UserCenterPage'
    })
  },

  hanldeCourse: function () {
    wx.navigateTo({
      url: '../course/CoursePage'
    })
  },

  fetchData: function() {
    wx.request({
      url: 'http://122.225.218.26:9009/security/organ/page', //仅为示例，并非真实的接口地址
      data: {
        page: 1,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
