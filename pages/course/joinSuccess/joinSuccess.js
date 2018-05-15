const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderId) {
      this.setData({
        orderId: options.orderId
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '没有查询到该订单',
        confirmText: '返回首页',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '/pages/orgnization/OrgnizationPage',
            })
          }
        }
      })
    }
  },

  goMyCourse(){
    wx.redirectTo({
      url: '/pages/userCenter/myCourse/MyCoursePage', // TODO
    })
  },

  goOrderPage(){
    let orderId = this.data.orderId || ''
    wx.redirectTo({
      url: '/pages/course/orderPage/orderPage?orderId=' + orderId
    })
  },

  getPayInfo() {
    const self = this
    let orderId = self.data.orderId || ''

    // 登录
    wx.login({
      success: res => {
        const code = res.code
        AXIOS.POST('security/wechat/xcx/member/auth', {
          code
        }, (res2) => {
          self.doWxPay(res2, orderId)
        })
      }
    })
  },

  doWxPay(info, orderId) {
    const self = this
    let sessionToken = info.result || ''
    AXIOS.POST('auth/wechat/pay/unifiedorder', {
      sessionToken, orderId
    }, (res) => {
      let result = res.result || {}
      wx.requestPayment({
        timeStamp: result.timeStamp || '',
        nonceStr: result.nonceStr || '',
        package: result.package,
        signType: result.signType,
        paySign: result.paySign,
        'success': function (res2) {
          wx.showModal({
            title: '提示',
            content: '支付成功',
            success: function (res) {
              if (res.confirm) {
                self.goOrderPage()
              }
            }
          })
        },
        'fail': function (res2) {
          wx.showModal({
            title: '支付失败',
            content: '查看我的报名，关注报名进度',
            success: function (res) {
              if (res.confirm) {
                self.goMyCourse()
              }
            }
          })
        }
      })
    })
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
})