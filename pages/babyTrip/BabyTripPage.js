888// pages/babyTrip/BabyTripPage.js
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    page: 0,
    size: 5,
    last: false,
    child: {
      childNickName: "fff"
    },
    msgNum: 0
  },

  goMessageList() {
    wx.navigateTo({
      url: '../message/MessagePage'
    })
  },

  getListData(loadMore) {
    const self = this
    let page = loadMore ? self.data.page + 1 : 0
    let size = self.data.size || 10
    let child = USER.getSelectedChild() || {}
    let childId = child.id || ''

    if (childId) {
      AXIOS.POST('auth/child/class/schedule', {
        childId,
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
          last: result.last,
          child
        })
      })
    }
  },

  getMsgCount() {
    const self = this
    let child = USER.getSelectedChild() || {}
    let childId = child.id || ''

    if (childId) {
      AXIOS.POST('auth/member/message/comment/unread/num', {
        childId
      }, (res) => {
        self.setData({
          msgNum: res.result || 0,
        })
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
    this.getListData()
    this.getMsgCount()
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