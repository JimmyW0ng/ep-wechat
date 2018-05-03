// pages/userCenter/myHonor/MyHonorPage.js
const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')
const LoginUrl = '/pages/login/LoginPage'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    page: 0,
    size: 6,
    last: false,
    showModal: false,
    selectedItem: {},
    loading: true
  },

  toggleData() {
    this.setData({
      dataSet: []
    })
  },

  openModal(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      showModal: true,
      selectedItem: this.data.dataSet[index] || {}
    })
  },

  closeModal(){
    this.setData({
      showModal: false,
      selectedItem: {}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      AXIOS.POST('auth/child/honor/recent/page', {
        childId, page, size
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