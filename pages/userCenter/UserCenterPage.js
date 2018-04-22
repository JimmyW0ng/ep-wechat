// pages/userCenter/UserCenterPage.js

const CONFIG = require('../../utils/config.js')
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')
const LoginUrl = '/pages/login/LoginPage'
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
    totalElements: 0,
    isLogined: false,
    showBackBtn: false,
    backInfo: {},

    // 选择宝贝
    popupStatus: false,
    selectedChildId: '',
    loading: true
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

  chooseChild(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    this.setData({
      popupStatus: false,
      selectedChildId: id
    })
    this.changeBaby(index)
  },

  goBabyDetail(e) {
    let childId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './addBaby/AddBabyPage?id=' + childId
    })
  },

  changeBaby(index) {
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

  goTargetPage(e) {
    if (this.data.isLogined) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: LoginUrl
            })
          }
        }
      })
    }
  },

  goTargetPage2(e) {
    if (this.data.isLogined) {
      if (this.data.selectedChild && this.data.selectedChild.id) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先添加宝贝',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: './addBaby/AddBabyPage'
              })
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: LoginUrl
            })
          }
        }
      })
    }
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
        loading: false
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

  doLogout() {
    const self = this
    wx.showModal({
      title: '提示',
      content: '确定要登出账户吗',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync() // 清空缓存
          self.resetData()
          wx.navigateTo({
            url: LoginUrl,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  resetData() {
    this.setData({
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
      totalElements: 0,
      isLogined: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.loadDetail()

    console.log('fu',options)

    var scene = decodeURIComponent(options.scene)
    console.log('scene', scene)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.loadDetail()
  },

  goBack() {
    let backInfo = this.data.backInfo || {}
    let fromPage = backInfo.fromPage || ''

    if (fromPage == 'courseDetail') {
      wx.navigateTo({
        url: '/pages/course/courseDetailPage/courseDetailPage?id=' + backInfo.courseId,
      })
    } else if (fromPage == 'ognDetail') {
      wx.navigateTo({
        url: '/pages/orgnization/orgnizationDetail/OrganizationDetailPage?id=' + backInfo.ognId,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadDetail()
    let lastPage = USER.getLastPage()
    if (lastPage.mainPicUrl) {
      this.setData({
        showBackBtn: true,
        backInfo: lastPage
      })
    } else {
      this.setData({
        showBackBtn: false,
        backInfo: {}
      })
    }
    this.setData({
      isLogined: USER.isLogined()
    })
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