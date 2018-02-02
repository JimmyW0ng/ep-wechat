// pages/orgnization/OrgnizationPage.js
const AXIOS = require('../../utils/axios')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orgnizationList: [],
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const self = this
    AXIOS.POST('security/organ/page', {
      page: 0
    }, (res) => {
      const result = res.result || {}
      // debugger
      const content = result.content || []
      console.log('content', content)
      self.setData({ orgnizationList: content })
    })
  },
  //下拉刷新
  onPullDownRefresh () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载

    // //模拟加载
    // setTimeout(function () {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 1500);
  },
  onReachBottom() {
    alert('gogogo')
  },
  // loadMore: function (e) {
  //   console.log(e)
  //   var self = this;
  //   // self.setData({
  //   //   hasRefesh: true,
  //   // });
  //   // if (!this.data.hasMore) return
  //   AXIOS.POST('security/organ/page', {
  //     page: ++self.page
  //   }).then((res) => {
  //     console.log('jacksomhel')
  //     // self.setData({
  //     //   list: self.data.list.concat(res.data.result.list),
  //     //   hidden: true,
  //     //   hasRefesh: false,
  //     // });
  //   })
  // },
  refesh: function (e) {
    console.log('fdmasfoda')
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