// utils/scoreStar/scoreStar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //评分
    score: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: './img/star_grey_small.png',
    selectedSrc: './img/star_green_small.png',
    halfSrc: './img/star_half_small.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
