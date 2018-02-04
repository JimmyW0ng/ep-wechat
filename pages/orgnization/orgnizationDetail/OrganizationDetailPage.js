// pages/orgnization/orgnizationDetail/OrganizationDetailPage.js
const AXIOS = require('../../../utils/axios')
const WxParse = require('../../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: '../../../asset/img/org-cover.jpg',
    ognBanners: [],
    ognInfo: {},
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
      organId: id
    }, (res) => {
      const result = res.result || {}

      WxParse.wxParse('organIntroduce', 'html', result.ognInfo.organIntroduce, self, 0);

      self.setData({
        ognBanners: result.ognBanners || [],
        ognInfo: result.ognInfo || {},
      })
    })
  },

  getOgnCourseData(id) {
    const self = this
    AXIOS.POST('security/course/page', {
      organId: id
    }, (res) => {
      const result = res.result || {}
      self.setData({
        ognCourseList: result.content || [],
        last: result.last,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})