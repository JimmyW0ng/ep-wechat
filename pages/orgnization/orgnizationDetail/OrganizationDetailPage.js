// pages/orgnization/orgnizationDetail/OrganizationDetailPage.js
const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ognBanners: [],
    ognInfo: {},
    ognLogo: {},
    ognCourseList: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    mainPicUrl: '',
    totalCommentNum: 0,
    showMoreBtn: false,
    showShortIntro: false,
    introLimit: 100,
    loading: true
  },

  goUserCenter() {
    let ognInfo = this.data.ognInfo || {}
    USER.setLastPage({
      fromPage: 'ognDetail',
      mainPicUrl: this.data.logoUrl,
      ognId: ognInfo.id
    })

    wx.switchTab({
      url: '/pages/userCenter/UserCenterPage',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOgnData(options.id)
    this.getOgnCourseData(options.id)
  },

  getOgnData(id) {
    const self = this
    AXIOS.POST('security/organ/detail', {
      ognId: id,
      noToken: true
    }, (res) => {
      const result = res.result || {}
      let ongInfo = result.ognInfo || {}
      let ognIntroduce = ongInfo.ognIntroduce || ''
      let showMoreBtn = false
      let showShortIntro = false
      let introLimit = this.data.introLimit
      if (ognIntroduce.length > introLimit){
        ongInfo.shortOngIntroduce = ognIntroduce.substr(0, introLimit)
        showMoreBtn = true
        showShortIntro = true
      }
      
      self.setData({
        loading: false,
        mainPicUrl: result.mainPicUrl || '',
        ognInfo: ongInfo || {},
        logoUrl: result.logoUrl || {},
        totalCommentNum: result.totalCommentNum || 0,
        showMoreBtn,
        showShortIntro
      })
    })
  },

  getOgnCourseData(ognId) {
    const self = this
    AXIOS.POST('security/course/page', {
      ognId, 
      noToken: true
    }, (res) => {
      const result = res.result || {}
      self.setData({
        ognCourseList: result.content || [],
        last: result.last,
      })
    })
  },

  openAddress() {
    const ognInfo = this.data.ognInfo || {}
    const ognLat = Number(ognInfo.ognLat)
    const ognLng = Number(ognInfo.ognLng)
    if (ognLat && ognLng) {
      wx.openLocation({
        latitude: Number(ognInfo.ognLat),
        longitude: Number(ognInfo.ognLng),
        // scale: 18, // 缩放比例，范围5~18，默认为18
        name: ognInfo.ognName,
        address: ognInfo.ognAddress,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },

  toggleIntro(){
    this.setData({
      showShortIntro: !this.data.showShortIntro
    })
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  goCourseDetailPage: function (e) {
    const dataset = e.currentTarget.dataset
    const item = dataset.item
    wx.navigateTo({
      url: '../../course/courseDetailPage/courseDetailPage?fromOgnDetail=true&id=' + item.id
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