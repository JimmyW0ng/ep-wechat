// pages/orgnization/OrgnizationPage.js
const AXIOS = require('../../utils/axios')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '精选培训机构',

    orgnizationList: [{
      orgName: '金宝贝早教中心文三路店',
      orgAddress: '西湖区文三西路221号',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/app-registration_201801015.png',
      point: 'TODO',
      tagList: ['很好', '很强大', '很暴力'],
      learnNum: 12192
    }, {
      orgName: '钓的一笔教育机构',
      orgAddress: '上海海上海浙江教育路23号',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/app-newYearDay_201701208.png',
      point: 'TODO',
      tagList: ['很好', '很强大', '很暴力', '很暴力', '很暴力', '很暴力', '很暴力'],
      learnNum: 1219
      }, {
        orgName: '非常好的机构',
        orgAddress: '西湖区文三西路221号',
        avatar: 'http://res.xiaomaiketang.com/xiaomai/app-halloween_2017010016.png',
        point: 'TODO',
        tagList: ['很好'],
        learnNum: 12
    }, {
      orgName: '绍兴机构和哈哈教育中心',
      orgAddress: '绍兴市越城区小管路22号',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/labourDay_201704021.png',
      point: 'TODO',
      tagList: ['很好', '很强大', '很暴力'],
      learnNum: 12192
    }]
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
      page: 1
    }, (res) => {
      const result = res.result || {}
      const content = result.content || []
      var param = {}
      var string = "orgnizationList[" + 0 + "].point";
      param[string] = content[0].organShortIntroduce;
      console.log('param',param)
      self.setData(param)
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