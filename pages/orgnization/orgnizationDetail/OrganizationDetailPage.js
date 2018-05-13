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
    this.getOgnData(options.scene)
    this.getOgnCourseData(options.scene)
    if(options.setScene !== 'no'){
      USER.setOgnId(options.scene)
    }
  },

  getOgnData(id) {
    const self = this

    let apiUrl = '/security/organ/scene/detail' // 根据scene来判断
    AXIOS.POST('security/organ/scene/detail', {
      scene: id
    }, (res) => {
      const result = res.result || {}
      let ongInfo = result.ognInfo || {}
      let ognIntroduce = ongInfo.ognIntroduce || ''
      let showMoreBtn = false
      let showShortIntro = false
      let introLimit = this.data.introLimit
      if (ognIntroduce.length > introLimit) {
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
        name: ognInfo.ognName,
        address: ognInfo.ognAddress
      })
    }
  },

  toggleIntro() {
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
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/course/courseDetailPage/courseDetailPage?setScene=no&fromOgnDetail=true&scene=${item.ognId}and${item.id}`
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
  onShareAppMessage: function (res) {
    return {
      title: this.data.ognInfo.ognName || '',
      imageUrl: this.data.mainPicUrl,
      path: `/pages/orgnization/orgnizationDetail/OrganizationDetailPage?setScene=no&scene=${this.data.ognInfo.id}`
    }
  }
})