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
    childSex: 'man',
    childIdentity: '',
    currentSchool: '',
    currentClass: '',
    childId: '',
    id:'',
    memberId: '',
    sign: '',
    radioItems: [
      { name: '男', value: 'man', checked: true},
      { name: '女', value: 'woman' },
    ],
    today: new Date(),
    canDeleteFlag: false
  },

  loadDetail(childId){
    const self = this
    AXIOS.POST('auth/child/get', {childId}, res => {
      let result = res.result || {}
      let childSex = result.childSex || 'man'
      let radioItems = self.data.radioItems;
      for (var i = 0; i < radioItems.length; i++) {
        radioItems[i].checked = radioItems[i].value == childSex
      }

      self.setData({
        avatar: result.avatar || '',
        childBirthday: result.childBirthdayFormat || '',
        childTrueName: result.childTrueName || '',
        childNickName: result.childNickName || '',
        childSex: result.childSex || '',
        childIdentity: result.childIdentity || '',
        currentSchool: result.currentSchool || '',
        currentClass: result.currentClass || '',
        childId: result.id || '',
        id: result.id || '',
        memberId: result.memberId || '',
        sign: result.sign || '',
        radioItems: radioItems,
        canDeleteFlag: result.canDeleteFlag
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

  radioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    let childSex = ''
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
        childSex = this.data.radioItems[i].value
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    changed.childSex = childSex
    this.setData(changed)
  },

  bindDateChange (e) {
    this.setData({
      childBirthday: e.detail.value
    })
  },

  validForm(data){
    if (!data.childTrueName) {
      wx.showToast({
        icon: 'none',
        title: '请填写学生姓名',
      })
      return false
    } else if (!data.childNickName) {
      wx.showToast({
        icon: 'none',
        title: '请填写学生昵称',
      })
      return false
    } else if (!data.childBirthday) {
      wx.showToast({
        icon: 'none',
        title: '请选择学生生日',
      })
      return false
    } else {
      return true
    }
  },

  handleSave (e){
    const self = this
    var data = self.data
    if(this.validForm(data)){
      let url = data.childId ? 'auth/child/edit' : 'auth/child/add'
      AXIOS.POST(url, data, res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      })
    }
  },

  confirmDelete(e){
    const self = this
    let data = this.data
    let childId = data.id
    wx.showModal({
      title: '提示',
      content: '确定要删除学生信息吗？',
      success: function (res) {
        if (res.confirm) {
          self.handleDelete(childId)
        }
      }
    })
  },

  handleDelete(childId) {
    AXIOS.POST('auth/child/del', {
      childId
    }, res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
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
  // onShareAppMessage: function () {
  
  // }
})