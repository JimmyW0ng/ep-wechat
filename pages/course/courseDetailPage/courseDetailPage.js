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

    popupStatus: false,
    dateList: ['1个月期', '1个月期', '1个月期', '1个月期'],
    selectedDate: 0,
    childList: [],
    selectedChild: '',
    selectedTab: 0,
    swiperHeight:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseDetail(1 || options.id)
    this.getChildList()

    var self = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth;
        var calc = clientHeight - 170; // TODO 这里有点操蛋
        self.setData({
          swiperHeight: calc
        });
      }
    });
  },

  getChildList(){
    const self = this
    AXIOS.POST('auth/child/list', {}, (res) => {
      const result = res.result || []
      self.setData({childList: result})
    })
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab
    })
  },

  changeSwiper(e){
    let current = e.detail.current
    this.setData({
      selectedTab:current
    });
  },

  chooseDate(e){
    const index = e.currentTarget.dataset.index
    this.setData({
      selectedDate: index
    })
  },

  chooseChild(e){
    const id = e.currentTarget.dataset.id
    this.setData({
      selectedChildId: id
    })
  },

  showPopup() {
    this.setData({
      popupStatus: true
    })
  },

  closePopup() {
    this.setData({
      popupStatus: false
    })
  },

  getCourseDetail(id) {
    const self = this
    AXIOS.POST('security/course/detail', {
      courseId: id,
      noToken: true
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

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  // TODO 报名成功后的操作
  handleJoin() {
    const self = this
    // TODO 这里已经报名过这个课程的小孩是否要过滤一下
    if (!self.data.selectedChildId){
      wx.showToast({
        icon: 'none',
        title: '请选择宝贝',
      })
    } else {
      AXIOS.POST('auth/order/new', {
        childId: self.data.selectedChildId,
        classId: self.data.course.id // TODO这里没有展示班级的地方吧
      }, (res) => {
        debugger
        wx.showToast({
          icon: 'success',
          title: '报名成功！',
        })
        self.closePopup()
      })
    }
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