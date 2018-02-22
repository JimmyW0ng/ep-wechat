// pages/babyTrip/BabyTripPage.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: '../../asset/img/org-cover.jpg', // TODO default course page
    dataSet: [],
    page: 0,
    size: 5,
    last: false
  },

  goMessageList() {
    wx.navigateTo({
      url: '../message/MessagePage'
    })
  },

  toggleData() {
    this.setData({
      dataSet: [1, 2, 3]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
  },

  getListData(loadMore) {
    const self = this
    let page = loadMore ? self.data.page + 1 : 0
    let size = self.data.size || 10
    AXIOS.POST('auth/child/class/schedule', {
      childId: 3, // TODO 这里应该不需要 childId的
      page,
      size
    }, (res) => {
      const result = res.result || {}
      let content = result.content || []
      if (page > 0) {
        content = self.data.dataSet.concat(content)
      }
      self.setData({
        dataSet: content,
        page: result.number || 0,
        last: result.last
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
    this.getListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.last) {
      this.getListData(true)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})