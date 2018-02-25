//index.js
//获取应用实例
const app = getApp()
const CONFIG = require("../../utils/config.js");
const AXIOS = require("../../utils/axios.js");

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  
  clickMe: function () {
    this.setData({ singer: 'fhhccccc' })
    this.showHello = true
    this.flag = true
    this.condition = !this.condition
  },

  handleLogin: function () {
    wx.navigateTo({
      url: '../login/LoginPage'
    })
  },

  handleLogout: function(){
    wx.clearStorageSync()
  },

  hanldeCourse: function () {
    wx.navigateTo({
      url: '../course/CoursePage'
    })
  },

  fetchData: function () {
    AXIOS.POST('security/organ/page', {
      page: 1
    }, (res) => {
      let result = res.result || {}
      wx.setStorageSync('wx_ognList', result.content || [])
    })
  },

  onLoad: function () {
    console.log(wx.getStorageSync('wx_ognList'))
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
