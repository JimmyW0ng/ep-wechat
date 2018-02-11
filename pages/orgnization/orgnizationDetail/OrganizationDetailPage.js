// pages/orgnization/orgnizationDetail/OrganizationDetailPage.js
const AXIOS = require('../../../utils/axios')
const WxParse = require('../../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ognBanners: [],
    ognInfo: {},
    ognLogo: {},
    ognCourseList: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOgnData(options.id)
    this.getOgnCourseData(options.id)
  },

  getOgnData(id) {
    const self = this
    AXIOS.POST('security/organ/detail', {
      ognId: id
    }, (res) => {
      const result = res.result || {}
      WxParse.wxParse('ognIntroduce', 'html', result.ognInfo.ognIntroduce, self, 0);

      self.setData({
        mainPicUrl: result.mainPicUrl || [],
        ognInfo: result.ognInfo || {},
        logoUrl: result.logoUrl || {},
      })
    })
  },

  getOgnCourseData(ognId) {
    const self = this
    AXIOS.POST('security/course/page', {ognId}, (res) => {
      const result = res.result || {}
      self.setData({
        ognCourseList: result.content || [],
        last: result.last,
      })
    })
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  goCourseDetailPage: function (e) {
    const dataset = e.currentTarget.dataset
    const item = dataset.item
    wx.navigateTo({
      url: '../../course/courseDetailPage/courseDetailPage?id=' + item.id
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})