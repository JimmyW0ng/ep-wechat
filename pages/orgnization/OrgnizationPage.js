// pages/orgnization/OrgnizationPage.js
const AXIOS = require('../../utils/axios')
const USER = require('../../utils/user')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    page: 0,
    size: 5,
    last: false,
    loading: true
  },

  goOrgDetailPage(e) {
    const dataset = e.currentTarget.dataset
    const item = dataset.item
    wx.navigateTo({
      url: './orgnizationDetail/OrganizationDetailPage?scene=' + item.id
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

  getListData(loadMore) {
    const self = this
    let page = loadMore ? self.data.page + 1 : 0
    let size = self.data.size || 10

    let param = {
      page, size
    }

    if (self.data.scene && self.data.scene != 'undefined') {
      param.scene = self.data.scene
    }

    AXIOS.POST('security/organ/scene/page', param, (res) => {
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      scene: USER.getOgnId() || ''
    })
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