// pages/userCenter/addBaby/AddBabyPage.js
const CONFIG = require('../../../utils/config.js')
const AXIOS = require('../../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    avatarCode: '',
    childBirthday: '',
    childTrueName: '',
    childNickName: '',
    childSex: '',
    childIdentity: '',
    currentSchool: '',
    currentGrade: '',
    id: '',
    memberId: '',
    sign: '',

    today: new Date()
  },

  loadDetail(childId){
    const self = this
    AXIOS.POST('auth/child/get', {childId}, res => {
      // alert('成功添加了')
      let result = res.result
      self.setData({
        avatar: result.avatar || '',
        childBirthday: result.childBirthday || '',
        childTrueName: result.hildTrueName || '',
        childNickName: result.childNickName || '',
        childSex: result.childSex || '',
        childIdentity: result.childIdentity || '',
        currentSchool: result.currentSchool || '',
        currentGrade: result.currentGrade || '',
        childId: result.id || '',
        memberId: result.memberId || '',
        sign: result.sign || ''
      })
    })
  },

  changeImg(item) {
    const self = this
    let preCode = item.detail.preCode
    let fileUrl = item.detail.fileUrl
    self.setData({
      avatar: fileUrl || '',
      avatarCode: preCode || ''
    })
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
    if(data.childId){
      AXIOS.POST('auth/child/edit', data, res => {
        // alert('成功添加了')
      })
    } else {
      AXIOS.POST('auth/child/add', data, res => {
        // alert('成功添加了')
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.loadDetail(options.id)
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