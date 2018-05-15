// components/xzmQrcode/xzmQrcode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    qrcode: 'http://ost0qtman.bkt.clouddn.com/609fa57e08434e6397a2804d1cfd355a.jpg'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    doPreview(){
      const self=  this
      wx.previewImage({
        current: self.data.qrcode, // 当前显示图片的http链接
        urls: [self.data.qrcode] // 需要预览的图片http链接列表
      })
    }
  }
})
