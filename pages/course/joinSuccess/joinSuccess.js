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