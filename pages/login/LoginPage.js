// pages/login/LoginPage.js
const CONFIG = require('../../utils/config.js')
const AXIOS = require('../../utils/axios')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    captcha: '',
  },

  bindPhoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },

  bindCodeInput(e) {
    this.setData({
      captcha: e.detail.value
    })
  },

  doGetCaptcha() {
    const self = this
    AXIOS.POST('security/api/captcha', {
      mobile: this.data.phone,
      clientId: CONFIG.clientId,
      clientSecret: CONFIG.clientSecret
    }, res => {
      console.log(res)
      self.data.code = res.result
    })
  },

  doLogin() {
    const self = this
    AXIOS.POST('security/api/token', {
      mobile: self.data.phone,
      code: self.data.code,
      captcha: self.data.captcha,
      clientId: CONFIG.clientId,
      clientSecret: CONFIG.clientSecret,
    }, res => {
      console.log(res)
      let result = res.result || {}
      self.memberType = result.memberType
      self.token = result.token
    })
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