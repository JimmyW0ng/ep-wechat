const AXIOS = require('../../../utils/axios')
const _ = require('../../../utils/underscore')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [],
    tags: [],
    showModal: false,
    currentId: '',
    tempContent: ''
  },

  getListData(orderId){
    const self = this
    orderId = orderId || self.data.orderId || ''
    AXIOS.POST('auth/child/class/catalog/detail', {
      orderId
    }, (res) => {
      const result = res.result || {}
      self.setData({
        dataSet: result.classCatalogs || [],
        tags: result.tags || []
      })
    })
  },

  openReplayModal(e){
    const self = this
    const commentId = e.currentTarget.dataset.id
    self.setData({
      currentId: commentId,
      tempContent: '',
      showModal: true
    })
  },

  hideReplayModal(){
    this.setData({
      currentId: '',
      tempContent: '',
      showModal: false
    })
  },

  bindInputReplay(e){
    this.setData({
      tempContent: e.detail.value
    })
  },

  doReplay(){
    const self = this
    const commentId = self.data.currentId
    const content = self.data.tempContent
    if (!content.length){
      wx.showToast({
        icon: 'none',
        title: '请输入回复内容',
      })
    } else {
      AXIOS.POST('auth/child/class/catalog/detail/replay', {
        commentId,
        content
      }, (res) => {
        const result = res.result || {}
        wx.showToast({
          title: '回复成功',
        })
        self.setData({
          showModal: false
        })
        self.getListData()
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData(options.orderId)
    this.setData({
      orderId: options.orderId
    })
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