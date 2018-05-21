// pages/userCenter/myCourse/MyCoursePage.js
const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    page: 0,
    size: 5,
    last: false,
    selectedTab: 0,
    status: 'ALL', // 'ENTERING', 'OPENING', 'END'
    statusENUM: {
      0: 'ALL',
      1: 'ENTERING',
      2: 'OPENING',
      3: 'END'
    },
    loading: true
  },

  getPayInfo(e) {
    const self = this
    let orderId = e.currentTarget.dataset.orderid || ''

    // 登录
    wx.login({
      success: res => {
        const code = res.code
        AXIOS.POST('security/wechat/xcx/member/auth', {
          code
        }, (res2) => {
          self.doWxPay(res2, orderId)
        })
      }
    })
  },

  doWxPay(info, orderId) {
    const self = this
    let sessionToken = info.result || ''
    AXIOS.POST('auth/wechat/pay/unifiedorder', {
      sessionToken, orderId
    }, (res) => {
      let result = res.result || {}
      wx.requestPayment({
        timeStamp: result.timeStamp || '',
        nonceStr: result.nonceStr || '',
        package: result.package,
        signType: result.signType,
        paySign: result.paySign,
        'success': function (res2) {
          wx.showToast({
            icon: 'none',
            title: '支付成功',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/course/orderPage/orderPage?orderId=' + orderId + '&needback=yes'
            })
          }, 500)
        },
        'fail': function (res2) {
          wx.showToast({
            icon: 'none',
            title: '支付失败',
          })
          setTimeout(() => {
            self.getListData()
          }, 500)
        }
      })
    })
  },

  goOrderPageTrue(e) {
    let orderId = e.currentTarget.dataset.orderid || ''
    wx.navigateTo({
      url: '/pages/course/orderPage/orderPage?hideTitle=false&orderId=' + orderId + '&needback=yes'
    })
  },

  selectTab(e) {
    const self = this
    let tab = e.currentTarget.dataset.tab
    if (tab != self.data.selectedTab) {
      self.setData({
        selectedTab: tab,
        status: self.data.statusENUM[tab]
      })
      self.getListData()
    }
  },

  getListData(loadMore) {
    const self = this
    let selectedChild = USER.getSelectedChild() || {}
    let childId = selectedChild.id || ''
    if (!childId) {
      wx.showModal({
        title: '提示',
        content: '请选择一个学员查看',
      })
    } else {
      let page = loadMore ? self.data.page + 1 : 0
      let size = self.data.size || 10
      let status = self.data.status || 'ALL'
      AXIOS.POST('auth/child/class/page', {
        childId, status, page, size
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
    }
  },

  goCourseDetailPage(e) {
    let courseId = e.currentTarget.dataset.courseid
    wx.navigateTo({
      url: '/pages/course/courseDetailPage/courseDetailPage?setScene=no&scene=' + courseId
    })
  },

  goTeacherComment(e) {
    let orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/course/teacherCommentPage/teacherCommentPage?orderId=' + orderId,
    })
  },

  goEvaluate(e) {
    let orderId = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: '/pages/course/evaluatePage/EvaluatePage?orderId=' + orderId,
    })
  },

  goMyHonor() {
    wx.navigateTo({
      url: '../myHonor/MyHonorPage',
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
    this.getListData()
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
  // onShareAppMessage: function () {

  // }
})