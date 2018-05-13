const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    childNickName: '',
    className: '',
    courseName: '',
    courseId: '',
    id: '',
    pirzeFormat: '',
    prize: '',
    payStatus: '',
    payStatusFormat: '',
    payTypeFormat: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.orderId = 631;

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
            wx.switchTab({
              url: '/pages/orgnization/OrgnizationPage',
            })
          } 
        }
      })
    }
  },

  getOrderDetail(){
    const self = this;
    let orderId = this.data.orderId || ''
    AXIOS.POST('auth/child/class/pay/info', {
      orderId
    }, (res) => {
      self.setData(res.result || {})
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
    this.getOrderDetail()
  },

  goMyCourse() {
    wx.redirectTo({
      url: '/pages/userCenter/myCourse/MyCoursePage', // TODO
    })
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