// pages/userCenter/addBaby/AddBabyPage.js
const CONFIG = require('../../../utils/config.js')
const AXIOS = require('../../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    childBirthday: '',
    today: new Date()
  },

  bindChildTrueName: function(e) {
    this.setData({ childTrueName: e.detail.value })
  },
  bindChildNickName(e){
    this.setData({ childNickName: e.detail.value })
  },
  bindChildIdentity(e){
    this.setData({ childIdentity: e.detail.value })
  },
  bindChildSex(e) {
    this.setData({ childSex: 'women'})
  },
  bindCurrentSchool(e){
    this.setData({ currentSchool: e.detail.value  })
  },
  bindCurrentGrade(e){
    this.setData({ currentGrade: e.detail.value })
  },
  bindSign(e) {
    this.setData({ sign: e.detail.value })
  },

  bindDateChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      childBirthday: e.detail.value
    })
  },

  handleSave (e){
    const self = this
    console.log('saveveveev')

    
    var data = self.data
    AXIOS.POST('auth/child/add', data, res => {

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