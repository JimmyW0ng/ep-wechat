// pages/login/LoginPage.js
const CONFIG = require('../../utils/config.js')
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')
const app = getApp()
let loginInterval = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    captcha: '',
    verifyBtnText: "获取验证码",
    countDown: 60,
    beginCountDown: false,
    userInfo: {},
    hasUserInfo: false,
    clickSend: false
  },

  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindCaptchaInput(e) {
    this.setData({
      captcha: e.detail.value
    })
  },

  doGetCaptcha() {
    const self = this
    let phone = this.data.phone
  
    if (phone.length == 11) {
      console.log(self.data.clickSend)
      if (!self.data.beginCountDown && !self.data.clickSend) {
        self.setData({
          clickSend: true
        })

        AXIOS.POST('security/api/captcha', {
          mobile: phone,
          clientId: CONFIG.clientId,
          clientSecret: CONFIG.clientSecret,
          scene: 'member_login'
        }, res => {
          self.setData({
            code: res.result || '',
            beginCountDown: true,
            verifyBtnText: self.data.countDown + "s"
          })

          loginInterval = setInterval(function () {
            if (self.data.countDown > 1) {
              self.setData({
                countDown: self.data.countDown - 1,
                verifyBtnText: (self.data.countDown - 1) + "s"
              })
            } else {
              clearInterval(loginInterval);
              self.setData({
                countDown: 60,
                beginCountDown: false,
                verifyBtnText: '重新发送',
                clickSend: false
              })
            }
          }, 1000);
        }, res => {
          self.setData({
            beginCountDown: false,
            clickSend: false
          })
        });
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号',
      })
    }
  },

  doLogin() {
    const self = this
    let phone = this.data.phone
    let code = this.data.code
    let captcha = this.data.captcha

    if (phone.length == 11 && captcha && code) {
      AXIOS.POST('security/api/token', {
        mobile: phone,
        code: code,
        captcha: captcha,
        clientId: CONFIG.clientId,
        clientSecret: CONFIG.clientSecret,
        type: 'WECHAT_APP_MEMBER_CLIENT'
      }, res => {
        let result = res.result || {}
        USER.setMemberType(result.memberType)
        USER.setToken(result.token)

        self.doBack()
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号或验证码',
      })
    }
  },

  doBack() {
    var pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.switchTab({
        url: '/pages/userCenter/UserCenterPage',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.clearStorageSync() // 清空缓存
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    console.log(pages)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(loginInterval);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})