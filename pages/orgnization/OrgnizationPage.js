// pages/orgnization/OrgnizationPage.js
const AXIOS = require('../../utils/axios')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    resPupet: {
      "error": "string",
      "errorDescription": "string",
      "result": {
        "content": [{
          "catalogIds": "string",
          "catalogLabelFormat": [
            "string"
          ],
          "fileUrl": "string",
          "id": 0,
          "marketWeight": "string",
          "organAddress": "string",
          "organCreateDate": {
            "date": 0,
            "day": 0,
            "hours": 0,
            "minutes": 0,
            "month": 0,
            "nanos": 0,
            "seconds": 0,
            "time": 0,
            "timezoneOffset": 0,
            "year": 0
          },
          "organEmail": "string",
          "organIntroduce": "string",
          "organLat": "string",
          "organLng": "string",
          "organName": "string",
          "organPhone": "string",
          "organRegion": 0,
          "organShortIntroduce": "string",
          "organUrl": "string",
          "status": "normal",
          "togetherScore": "string",
          "totalParticipate": 0
        }],
        "first": true,
        "last": true,
        "number": 0,
        "numberOfElements": 0,
        "size": 0,
        "sort": {},
        "totalElements": 0,
        "totalPages": 0
      },
      "success": true
    },
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
      const content = result.content || []
      // var param = {}
      // var string = "orgnizationList[" + 0 + "].point";
      // param[string] = content[0].organShortIntroduce;
      // console.log('param',param)
      console.log('content')
      self.setData({ orgnizationList: content })
    })
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