// components/avatarSelector/avatarSelector.js
const _ = require('../../utils/underscore');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
      type: Number
    },
    list: {
      type: Array,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
    startPos: 0,
    windowWidth: 320
  },

  attached(){
    var res = wx.getSystemInfoSync()
    this.setData({
      windowWidth: res.windowWidth
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      if (index == this.data.activeIndex){
        let id = e.currentTarget.dataset.id
        this.triggerEvent('clickItem', { id }, {})
      }
    },

    handlerStart(e) {
      let touched = e.changedTouches || []
      let touched0 = touched[0] || {}
      let { clientX } = touched0
      this.setData({
        startPos: clientX || 0
      })
    },

    handlerMove: _.throttle(function (e) {

    }, 300, true),

    handlerCancel(e) {
      console.log(e)
    },

    handlerEnd(e) {
      let { clientX } = e.changedTouches[0]

      let list = this.data.list || []
      let length = this.data.list.length
      let activeIndex = this.data.activeIndex

      if (clientX < this.data.startPos) {
        if (activeIndex < length - 1) {
          let temp = activeIndex + 1
          this.setData({
            activeIndex: temp,
            startPos: 0
          })

          this.triggerEvent('changeItem', { activeIndex: temp }, {})
        }

      } else if (clientX > this.data.startPos){
        if (activeIndex > 0) {
          let temp = activeIndex - 1
          this.setData({
            activeIndex: activeIndex - 1,
            startPos: 0
          })
          this.triggerEvent('changeItem', { activeIndex: temp }, {})
        }
      }
    }
  }
})
