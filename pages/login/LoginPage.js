// pages/login/LoginPage.js
const CONFIG = require('../../utils/config.js')
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')
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
      if (!self.beginCountDown) {
        AXIOS.POST('security/api/captcha', {
          mobile: phone,
          clientId: CONFIG.clientId,
          clientSecret: CONFIG.clientSecret
        }, res => {
          self.setData({
            code: res.result || '',
            verifyBtnText: self.data.countDown + "s"
          })

          const interval = setInterval(function () {
            console.log('fuck')
            if (self.data.countDown > 1) {
              self.setData({
                countDown: self.data.countDown-1,
                verifyBtnText: (self.data.countDown-1) + "s"
              })
            } else {
              clearInterval(interval);
              self.setData({
                countDown: 60,
                beginCountDown: false,
                verifyBtnText: '重新发送'
              })
            }
          }, 1000);
        }, res => {
          self.setData({
            beginCountDown: true,
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
      }, res => {
        let result = res.result || {}
        USER.setMemberType(result.memberType)
        USER.setToken(result.token)

        // TODO 跳转到首页去
        wx.switchTab({
          url: '/pages/userCenter/UserCenterPage',
        })
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号或验证码',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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