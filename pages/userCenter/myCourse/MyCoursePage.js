// pages/userCenter/myCourse/MyCoursePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: [],
    comments: [],
    course: {},
    successOrders: 1,
    team: [],
    courseList: [{
      courseAddress: "杭州市拱墅区运河广场",
      courseCatalogId : 4,
      courseContent :  "<view>这是详情</view>",
      courseIntroduce: "这是课程目的",
      courseName  :  "英语中级班",
      courseNote :"<view>这是报名须知</view>",
      courseStatus :"opening",
      courseType  : "training",
      enterTimeEnd :"2018-11-20 00:00:00",
      enterTimeStart: "2017-10-21 00:00:00",
      id : 2,
      label : "英语",
      mainPicUrl:  "http://ost0qtman.bkt.clouddn.com/ogn_1_course_1.jpg",
      ognId  : 1,
      onlineTime : "2017-09-20 00:00:00",
      prizeMin : 0,
      totalParticipate :0,
    }, {
      courseAddress: "杭州市拱墅区运河广场",
      courseCatalogId: 4,
      courseContent: "<view>这是详情</view>",
      courseIntroduce: "这是课程目的",
      courseName: "英语中级班",
      courseNote: "<view>这是报名须知</view>",
      courseStatus: "opening",
      courseType: "training",
      enterTimeEnd: "2018-11-20 00:00:00",
      enterTimeStart: "2017-10-21 00:00:00",
      id: 2,
      label: "英语",
      mainPicUrl: "http://ost0qtman.bkt.clouddn.com/ogn_1_course_1.jpg",
      ognId: 1,
      onlineTime: "2017-09-20 00:00:00",
      prizeMin: 0,
      totalParticipate: 0,
      }, {
        courseAddress: "杭州市拱墅区运河广场",
        courseCatalogId: 4,
        courseContent: "<view>这是详情</view>",
        courseIntroduce: "这是课程目的",
        courseName: "英语中级班",
        courseNote: "<view>这是报名须知</view>",
        courseStatus: "opening",
        courseType: "training",
        enterTimeEnd: "2018-11-20 00:00:00",
        enterTimeStart: "2017-10-21 00:00:00",
        id: 2,
        label: "英语",
        mainPicUrl: "http://ost0qtman.bkt.clouddn.com/ogn_1_course_1.jpg",
        ognId: 1,
        onlineTime: "2017-09-20 00:00:00",
        prizeMin: 0,
        totalParticipate: 0,
      }],

    selectedTab: 0,
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab
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