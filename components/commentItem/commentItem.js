// components/commentItem/commentItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comment: {
      type: Object,
      value: {
        childAvatar: '',
        childNickName: '',
        chosenFlag: '',
        createAt: '',
        className: '',
        score: 0,
        content: ''
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    doPreview(e){
      let current = e.currentTarget.dataset.src || ''
      let comment = this.data.comment || {}
      let urls = comment.pics || []
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    }
  }
})
