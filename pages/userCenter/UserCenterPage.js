// pages/userCenter/UserCenterPage.js

const CONFIG = require('../../utils/config.js')
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    children: [],
    selectedChild: {},
    mbrInfo: {
      id: '',
      mobile: '',
    },
    activeIndex: 0
  },

  goBabyDetail(item){
    let childId = item.detail.id
    wx.navigateTo({
      url: './addBaby/AddBabyPage?id=' + childId
    })
  },

  changeBaby(item){
    let index = item.detail.activeIndex
    let selectedChild = this.data.children[index] || {}
    this.setData({
      selectedChild
    })
    USER.setSelectedChild(selectedChild)
  },

  goAddBaby() {
    wx.navigateTo({
      url: './addBaby/AddBabyPage'
    })
  },

  goMyCourse() {
    wx.navigateTo({
      url: './myCourse/MyCoursePage'
    })
  },

  goMyHonor() {
    wx.navigateTo({
      url: './myHonor/MyHonorPage'
    })
  },

  loadDetail(){
    const self = this
    AXIOS.POST('auth/member/detail', {}, res => {
      let result = res.result || {}
      let children = result.children || []
      self.setData({
        activeIndex: 0,
        children: children,
        selectedChild: children[0] || {},
        mbrInfo: result.mbrInfo || {},
      })
      USER.setSelectedChild(children[0])
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.loadDetail()
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
    this.loadDetail()
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