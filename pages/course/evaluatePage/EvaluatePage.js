// pages/course/evaluatePage/EvaluatePage.js

const AXIOS = require('../../../utils/axios')
const _ = require('../../../utils/underscore')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    score: 0,
    content: '',
    previewImgList: []
  },

  changeScore(item) {
    console.log(item)
    let score = item.detail.score
    this.setData({
      score: score
    })
  },

  changeEvalContent(e){
    this.setData({
      content: e.detail.value
    })
  },

  changeImg(item) {
    const self = this
    let file = item.detail
    let temp = self.data.previewImgList
    temp.push(file)
    self.setData({
      previewImgList: temp
    })
  },

  removeImg(e) {
    const self = this
    let index = e.currentTarget.dataset.index
    let temp = self.data.previewImgList
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      success: function (res) {
        if (res.confirm) {
          temp.splice(index, 1)
          self.setData({
            previewImgList: temp
          })
        } 
      }
    })
  },

  previewImage(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      current: url,
      urls: [url],
    })
  },

  handleSave(){
    let data = this.data
    let previewImgList = data.previewImgList || []
    data.pic = _.pluck(previewImgList, 'preCode')

    if(this.validForm(data)){
      AXIOS.POST("auth/child/class/add/comment", data, res => {
        wx.showModal({
          title: '提示',
          content: '评价成功！',
        })
        setTimeout(() => {
          wx.navigateBack({})
        }, 1000)
      })
    }
  },

  validForm(data){
    let flag = false
    if(!data.score){
      wx.showToast({
        icon: 'none',
        title: '请选择评分',
      })
    } else if(!data.content){
      wx.showToast({
        icon: 'none',
        title: '请填写课程评价',
      })
    } else {
      flag = true
    }
    return flag
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId || ''
    this.setData({
      orderId
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