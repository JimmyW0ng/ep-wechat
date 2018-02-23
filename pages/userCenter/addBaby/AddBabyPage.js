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
    radioItems: [
      { name: '男', value: 'man', checked: true},
      { name: '女', value: 'woman' },
    ],
    today: new Date()
  },

  loadDetail(childId){
    const self = this
    AXIOS.POST('auth/child/get', {childId}, res => {
      let result = res.result || {}
      let birthDayFormat = UTIL.formatDate('YYYY-MM-DD', new Date(result.childBirthday || '').valueOf())

      let childSex = result.childSex || 'man'
      let radioItems = self.data.radioItems;
      for (var i = 0; i < radioItems.length; i++) {
        if (radioItems[i].value == childSex) {
          radioItems[i].checked = true
        } else {
          radioItems[i].checked = false
        }
      }

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
        sign: result.sign || '',
        radioItems: radioItems
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

  handleSave (e){
    const self = this
    var data = self.data
    if(data.childId){
      AXIOS.POST('auth/child/edit', data, res => {
        // alert('成功添加了')
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000
        })
        wx.navigateBack({
          delta: 1
        })
      })
    } else {
      AXIOS.POST('auth/child/add', data, res => {
        // alert('成功添加了')
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
      content: '确定要删除宝贝信息吗？',
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
  onShareAppMessage: function () {
  
  }
})