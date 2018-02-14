// pages/userCenter/myHonor/MyHonorPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSet: [{
      id: '1',
      courseName: '亲子钢琴课',
      ognName: '金宝贝早教中心',
      date: '2017年7月30日',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png'
    }
    , {
      id: '2', courseName: '亲子钢琴课',
      ognName: '金宝贝早教中心',
      date: '2017年7月30日',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/newYearDay_201701208.png'
    }, 
    {
      id: '3', courseName: '亲子钢琴课',
      ognName: '金宝贝早教中心',
      date: '2017年7月30日',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    }
    ],
  },

  toggleData(){
    this.setData({
      dataSet: []
    })
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