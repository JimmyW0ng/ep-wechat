// pages/userCenter/addBaby/AddBabyPage.js
const CONFIG = require('../../../utils/config.js')
const AXIOS = require('../../../utils/axios')
const UTIL = require('../../../utils/util')

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
    currentClass: '',
    childId: '',
    id:'',
    memberId: '',
    sign: '',

    today: new Date()
  },

  loadDetail(childId){
    const self = this
    AXIOS.POST('auth/child/get', {childId}, res => {
      // alert('成功添加了')
      let result = res.result || {}
      let birthDayFormat = UTIL.formatDate('YYYY-MM-DD', new Date(result.childBirthday || '').valueOf())

      self.setData({
        avatar: result.avatar || '',
        childBirthday: birthDayFormat || '',
        childTrueName: result.childTrueName || '',
        childNickName: result.childNickName || '',
        childSex: result.childSex || '',
        childIdentity: result.childIdentity || '',
        currentSchool: result.currentSchool || '',
        currentClass: result.currentClass || '',
        childId: result.id || '',
        id: result.id || '',
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

  bindChildInfo(e){
    let key = e.currentTarget.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },

  bindChildSex(e) {
    this.setData({ childSex: 'women'}) // TODO
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

        wx.navigateBack({
          delta: 1
        })
      })
    } else {
      AXIOS.POST('auth/child/add', data, res => {
        // alert('成功添加了')
        wx.navigateBack({
          delta: 1
        })
      })
    }

  },

  handleDelete(e) {
    var data = this.data
    let childId = data.id
    AXIOS.POST('auth/child/del', {
      childId
    }, res => {
      console.log(res) // TODO alert一下
      wx.navigateBack({
        delta: 1
      })
    })
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