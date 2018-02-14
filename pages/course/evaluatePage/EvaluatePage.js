// pages/course/evaluatePage/EvaluatePage.js

const AXIOS = require('../../../utils/axios')
var Zan = require('../../../zanui/index');

Page(Object.assign({}, Zan.Toast, {

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    avatarList: [{
      id: '1',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png'
    }
    , {
      id: '2',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/newYearDay_201701208.png'
    }, 
    {
      id: '3',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    }
    ],
    picture: [],
    content: [],
  },
  showToast() {
    this.showZanToast('toast的内容');
  },
  showModal(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showActionSheet(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  changeScore(item) {
    console.log(item)
    let score = item.detail.score
    this.setData({
      score: score
    })
  },

  changeImg(item){
    const self = this
    let fileUrl = item.detail.fileUrl
    self.setData({
      previewImg: fileUrl
    })
  },

  // resolveData(content) {
  //   // const picture = content.filter((item) => {
  //   //   return item.type == this.data.type.picture;
  //   // })

  //   this.setData({ content, picture });
  //   console.log(this.data.picture)
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setTabBarBadge({
      index: 1,
      text: 'fuck'
    })

    wx.showTabBarRedDot({
      index: 2,
      
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
}))