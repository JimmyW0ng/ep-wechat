// pages/userCenter/myCourse/MyCoursePage.js
const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')

let selectedChild = USER.getSelectedChild() || {}

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
    statusText: {
      
    }
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab,
      status: self.data.statusENUM[tab]
    })
    self.getListData()
  },

  getListData(loadMore){
    const self = this
    let selectedChild = USER.getSelectedChild() || {}
    let childId = selectedChild.id || ''
    if (!childId){
      wx.showModal({
        title: '提示',
        content: '请选择一个宝贝查看',
      })
    } else {
      let page = loadMore ? self.data.page + 1 : 0
      let size = self.data.size || 10
      let status = self.data.status || 'ALL'
      AXIOS.POST('auth/child/class/page', {
        childId, status, page, size,
        noToken: true,
      }, (res) => {
        const result = res.result || {}
        let content = result.content || []
        if (page > 0) {
          content = self.data.dataSet.concat(content)
        }
        self.setData({
          dataSet: content,
          page: result.number || 0,
          last: result.last
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
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
  onShareAppMessage: function () {

  }
})