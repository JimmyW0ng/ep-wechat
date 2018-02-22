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
    childList: [{
      'avatar': 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png',
      name: 'CC',
      selected: false,
      id: '1'
    }, {
        'avatar': 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png',
      name: 'JACK',
      selected: true,
      id: '2'
    }, {
        'avatar': 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png',
      name: 'FUCKER',
      selected: false,
      id: '3'
    }, {
      'avatar': 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png',
      name: 'FUCKER',
      selected: false,
      id: '4'
    }],

    selectedTab: 0,
    swiperHeight:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseDetail(1 || options.id)

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
    const index = e.currentTarget.dataset.index
    let childList = this.data.childList || []
    childList[index].selected = !childList[index].selected
    this.setData({
      childList
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