// pages/course/courseDetailPage/courseDetailPage.js
const AXIOS = require('../../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: [],
    comments: [],
    course: {},
    successOrders: 1,
    team: [],

    selectedTab: 2,
    popupStatus: true,
    dateList: ['1个月期', '1个月期', '1个月期', '1个月期']
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseDetail(options.id)
  },

  showPopup(){
    this.setData({
      popupStatus: true
    })
  },

  closePopup(){
    this.setData({
      popupStatus: false
    })
  },

  getCourseDetail(id) {
    const self = this
    id=1
    AXIOS.POST('security/course/detail', {
      courseId: id
    }, (res) => {
      const result = res.result || {}
      self.setData({
        classes: result.classes || [],
        comments: result.comments || [],
        course: result.course || {},
        successOrders: result.successOrders,
        team: result.team || [],
      })
    })
  },

  selectTab(e){
    const self = this
    var tab = e.currentTarget.dataset.tab
    console.log(tab)
    self.setData({
      selectedTab: tab
    })
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  handleJoin() {
    console.log('join now')
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