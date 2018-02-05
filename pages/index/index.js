//index.js
//获取应用实例
const app = getApp()
const CONFIG = require("../../utils/config.js");
const AXIOS = require("../../utils/axios.js");

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    stars: [0, 1, 2, 3, 4],
    normalSrc: './img/star_grey_small.png',
    selectedSrc: './img/star_green_small.png',
    halfSrc: './img/star_half_small.png',
    key: 0,//评分
  },

  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },

  //点击左边,整颗星

  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
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

  hanldeCourse: function () {
    wx.navigateTo({
      url: '../course/CoursePage'
    })
  },

  fetchData: function () {
    AXIOS.POST('security/organ/page', {
      page: 1
    }, (res) => {
      console.log(res)
    })
  },

  onLoad: function () {
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
