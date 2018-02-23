// components/imgUploader/imgUploader.js

const AXIOS = require('../../utils/axios')

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    upload() {
      const self = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          const filePath = res.tempFilePaths[0];
          AXIOS.UPLOAD(filePath, (res) => {
            let result = res.result || {}
            let preCode = result.preCode 
            let fileUrl = result.fileUrl 
            self.triggerEvent('change', { preCode, fileUrl }, {})
          }, (res) => {
            console.log('upload error')
            // self.triggerEvent('error', { fileUrl }, {})
          });
        }
      })
    },

  }
})