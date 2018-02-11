// pages/course/evaluatePage/EvaluatePage.js

const AXIOS = require('../../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    picture: [],
    content:[]
  },

  changeScore(scoreItem){
    console.log(scoreItem)
    let score = scoreItem.detail.score
    this.setData({
      score: score
    })
  },

  upload(){
    if (this.data.picture.length> 8) {
      wx.showModal({
        title: "图片与视频总共不可超过9个",
        showCancel: false,
      })
      return;
    }
    let uploadTask;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        debugger
        const filePath = res.tempFilePaths[0];
        const content = this.data.content
        const len = content.length;
        const name = new Date().valueOf() + '.png'
        content.push({
          type: 2,
          content: filePath,
          status: 1,
          progress: 0,
          name
        });
        // this.resolveData(content);
        AXIOS.UPLOAD(filePath, name, (res, name) => {
          // content.map((item) => {
          //   if (item.name == name) {
          //     item.content = res.url;
          //     item.status = 0;
          //     this.setData({ content });
          //     this.resolveData(content);
          //   }
          // })
        }, (res, name) => {
          // content.map((item) => {
          //   if (item.name == name) {
          //     item.progress = res.progress;
          //     this.resolveData(content);
          //   }
          // })
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