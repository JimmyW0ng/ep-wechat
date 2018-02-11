// pages/userCenter/UserCenterPage.js

const CONFIG = require('../../utils/config.js')
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    children: [{
      childBirthday: "2015-09-01 00:00:00",
      childNickName: "hahaha",
      childSex: "women",
      childTrueName: "fhc",
      currentSchool: "xuexiao",
      id: 5,
      memberId: 7,
    }],
    mbrInfo: {
      id: '',
      mobile: '',
    }
  },

  deleteChild(e){
    let childId = e.currentTarget.dataset.id
    AXIOS.POST('auth/child/del', {
      childId
    }, res=> {
      console.log(res)
    })
  },

  goBabyDetail(e){
    let childId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './addBaby/AddBabyPage?id=' + childId
    })
  },

  goAddBaby() {
    console.log('fuck')
    wx.navigateTo({
      url: './addBaby/AddBabyPage'
    })
  },

  goMyCourse() {
    console.log('fuck1')

    wx.navigateTo({
      url: './myCourse/MyCoursePage'
    })
  },

  goMyHonor() {
    console.log('fuck2')

    wx.navigateTo({
      url: './myHonor/MyHonorPage'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    AXIOS.POST('auth/member/detail', {}, res => {
      console.log(res)
      let result = res.result
      let mbrInfo = result.mbrInfo
      self.setData({
        children: result.children || [],
        mbrInfo: result.mbrInfo || {},
      })
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