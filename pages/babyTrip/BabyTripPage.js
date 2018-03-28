// pages/babyTrip/BabyTripPage.js
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
    msgNum: 0,
    loading: true,
    isLogin: false
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

    AXIOS.POST('auth/child/class/schedule', {
      page,
      size
    }, (res) => {
      const result = res.result || {}
      let content = result.content || []
      if (page > 0) {
        content = self.data.dataSet.concat(content)
      }
      self.setData({
        loading: false,
        dataSet: content,
        page: result.number || 0,
        last: result.last
      })
    })
  },

  openAddress(e) {
    let dataset = e.currentTarget.dataset
    let name = dataset.name
    let address = dataset.address
    let addressLat = Number(dataset.lat)
    let addressLng = Number(dataset.lng)

    if (addressLat && addressLng) {
      wx.openLocation({
        latitude: addressLat,
        longitude: addressLng,
        // scale: 18, // 缩放比例，范围5~18，默认为18
        name,
        address,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  getMsgCount() {
    const self = this

    AXIOS.POST('auth/member/message/comment/unread/num', {}, (res) => {
      self.setData({
        msgNum: res.result || 0,
      })
    })
  },

  goLogin(){
    wx.navigateTo({
      url: '/pages/login/LoginPage'
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
    let isLogin = USER.isLogined()
    if (isLogin) {
      this.setData({
        isLogin
      })
      this.getListData()
      this.getMsgCount()
    } else {
      this.setData({
        isLogin,
        loading: false
      })
    }
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