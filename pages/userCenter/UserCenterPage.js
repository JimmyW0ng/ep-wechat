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
    tags: [],
    sign: '',
    currentSchool: '',
    currentClass: '',
    commentList: [],
    totalOrder: 0,
    totalHonor: 0,
    activeIndex: 0,
    totalElements: 0
  },

  goBabyDetail(item) {
    let childId = item.detail.id
    wx.navigateTo({
      url: './addBaby/AddBabyPage?id=' + childId
    })
  },

  changeBaby(item) {
    let index = item.detail.activeIndex
    let selectedChild = this.data.children[index] || {}
    this.setData({
      selectedChild
    })
    this.getChildAbstract(selectedChild.id)
    this.getChildComment(selectedChild.id)
    USER.setSelectedChild(selectedChild)
    USER.setSelectedChildIndex(index)
  },

  getChildAbstract(id) {
    const self = this
    AXIOS.POST('auth/child/abstract', {
      childId: id,
    }, res => {
      let result = res.result || {}
      self.setData({
        totalHonor: result.totalHonor || 0,
        totalOrder: result.totalOrder || 0,
        sign: result.sign || '',
        currentSchool: result.currentSchool || '',
        currentClass: result.currentClass || '',
        tags: result.tags || []
      })
    })
  },

  getChildComment(id) {
    const self = this
    AXIOS.POST('auth/child/comment/recent/page', {
      childId: id,
    }, res => {
      let result = res.result || {}
      self.setData({
        commentList: result.content || [],
        totalElements: result.totalElements || 0
      })
    })
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

  loadDetail() {
    const self = this
    AXIOS.POST('auth/member/detail', {}, res => {
      let result = res.result || {}
      let children = result.children || []
      let activeIndex = 0
      let selectedChild = {}

      if (children.length) {
        let tempIndex = USER.getSelectedChildIndex()
        if (tempIndex > -1 && children[tempIndex]) {
          activeIndex = tempIndex
        }

        // 如果有 children的话
        selectedChild = children[activeIndex] || {}
        self.getChildAbstract(selectedChild.id)
        self.getChildComment(selectedChild.id)
        USER.setSelectedChild(selectedChild)
      }

      self.setData({
        activeIndex,
        children,
        selectedChild,
        mbrInfo: result.mbrInfo || {},
      })
    })
  },

  goTeacherComment(e) {
    let orderId = e.currentTarget.dataset.orderid
    if (orderId) {
      wx.navigateTo({
        url: '/pages/course/teacherCommentPage/teacherCommentPage?orderId=' + orderId,
      })
    }
  },

  goOgnList() {
    wx.switchTab({
      url: '/pages/orgnization/OrgnizationPage',
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
    // this.loadDetail()
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