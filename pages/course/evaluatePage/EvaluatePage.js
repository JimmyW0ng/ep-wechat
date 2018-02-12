// pages/course/evaluatePage/EvaluatePage.js

const AXIOS = require('../../../utils/axios')

Page({

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
    // , {
    //   id: '4',
    //   avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    // },
    // {
    //   id: '5',
    //   avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    // }
    ],
    picture: [],
    content: [],
    previewImg: ''
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

  upload() {
    const self = this
    if (this.data.picture.length > 8) {
      wx.showModal({
        title: "图片与视频总共不可超过9个",
        showCancel: false,
      })
      return;
    }
    let uploadTask;
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const filePath = res.tempFilePaths[0];
        AXIOS.UPLOAD(filePath, (res) => {
          debugger
          let result = res.result || {}
          console.log(result)
          // self.previewImg = result.fileUrl
          self.setData({
            previewImg: result.fileUrl
          })

        }, (res) => {
          console.log('todo?')
        });
      }
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