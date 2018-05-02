// components/imgUploader/imgUploader.js

const AXIOS = require('../../utils/axios')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    limit: {
      type: Number,
      value: 1
    },
    pathType: {
      type: String,
      value: 'childAvatar'
    },
    maxSize: {
      type: Number,
      value: 0.8 * 1024 * 1024 // 小程序图片大小用的是 b
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pathObj: {
      childAvatar: 'auth/file/child/avatar',
      commentPic: 'auth/file/child/class/comment/pic'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    upload() {
      const self = this
      let limit = self.data.limit
      let maxSize = self.data.maxSize
      let path = self.data.pathObj[self.data.pathType]
      if (limit > 0) {
        wx.chooseImage({
          count: self.data.limit, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const tempFiles = res.tempFiles || []
            tempFiles.map((item, index) => {
              if (item.size > maxSize) {
                wx.showToast({
                  icon: 'none',
                  title: '您选择的图片体积太大，请选择体积较小的图片',
                })
              } else {
                AXIOS.UPLOAD(item.path, path, (res) => {
                  let result = res.result || {}
                  let preCode = result.preCode
                  let fileUrl = result.fileUrl
                  self.triggerEvent('change', { preCode, fileUrl }, {})
                }, (res) => {
                  wx.showToast({
                    icon: 'none',
                    title: '图片上传失败',
                  })
                });
              }
            })
          }
        })
      }
    },

  }
})
