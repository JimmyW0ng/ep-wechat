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
    childList: [],

    selectedChild: '',
    selectedClassIndex: '',
    selectedClass: {},

    selectedTab: 0,
    swiperHeight: '',

    courseId: '',
    courseCommentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseDetail(options.id)
    this.setData({
      courseId: options.id
    })

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

  getChildList() {
    const self = this
    const selectedClassId = '' + self.data.selectedClass.id
    AXIOS.POST('auth/order/init', { courseId: self.data.course.id}, (res) => {
      const result = res.result || []
      result.map((item) => {
        if (item.joinedClasses) {
          item.joinedClasses = item.joinedClasses.split(',')
        }
      })
      result.map((item, index) => {
        item.joined = !!(item.joinedClasses && item.joinedClasses.indexOf(selectedClassId) > -1)
      })
      self.setData({ childList: result })
    })
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab
    })
  },

  changeSwiper(e) {
    let current = e.detail.current
    this.setData({
      selectedTab: current
    });
  },

  chooseClass(e) {
    const index = e.currentTarget.dataset.index
    const selectedClass = this.data.classes[index]
    const selectedClassId = '' + selectedClass.id
    let childList = this.data.childList
    childList.map((item, index) => {
      item.joined = !!(item.joinedClasses && item.joinedClasses.indexOf(selectedClassId) > -1)
    })
    this.setData({
      selectedClassIndex: index,
      selectedClass: selectedClass,
      childList: childList
    })
  },

  chooseChild(e) {
    if (!e.currentTarget.dataset.joined) {
      this.setData({
        selectedChildId: e.currentTarget.dataset.id
      })
    }
  },

  showPopup() {
    this.getChildList()
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
        selectedClass: result.classes[0],
        comments: result.comments || [],
        course: result.course || {},
        successOrders: result.successOrders,
        team: result.team || [],
      })
    })
  },

  getCourseComments(){
    const self = this
    AXIOS.POST('security/course/comment/page', {
      courseId: self.data.courseId,
      noToken: true
    }, (res) => {
      const result = res.result || {}
      // TODO 需要分页？？？？？
      self.setData({
        courseCommentList: result.content || []
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
    let selectedClass = self.data.selectedClass || {}
    let selectedClassId = selectedClass.id || ''
    let selectedChildId = self.data.selectedChildId

    if (!selectedChildId) {
      wx.showToast({
        icon: 'none',
        title: '请选择宝贝',
      })
    } else {
      AXIOS.POST('auth/order/new', {
        childId: selectedChildId,
        classId: selectedClassId // TODO这里没有展示班级的地方吧
      }, (res) => {
        wx.showToast({
          icon: 'success',
          title: '报名成功！',
          duration: 3000
        })
        setTimeout(() => {
          self.closePopup()
        }, 1000)
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