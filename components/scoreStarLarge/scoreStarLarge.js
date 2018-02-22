// utils/scoreStar/scoreStar.js
const _ = require('../../utils/underscore');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //评分
    score: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: './img/star_grey.png',
    selectedSrc: './img/star_green.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectRight: function (e) {
      var key = e.currentTarget.dataset.key * 10
      var score = key == this.data.score ? key-10 : key
      this.setData({score})
      this.triggerEvent('change', { score }, {})
    }
  }
})
