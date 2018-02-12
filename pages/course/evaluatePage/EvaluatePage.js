// pages/course/evaluatePage/EvaluatePage.js

const AXIOS = require('../../../utils/axios')
import { $wuxDialog } from '../../../wux/components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    avatarList: [{
      id: '1',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/theRabit_201801017.png'
    }
    , {
      id: '2',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/newYearDay_201701208.png'
    }, 
    {
      id: '3',
      avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    }
    // , {
    //   id: '4',
    //   avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    // },
    // {
    //   id: '5',
    //   avatar: 'http://res.xiaomaiketang.com/xiaomai/vote_20170807.png'
    // }
    ],
    picture: [],
    content: [],
    previewImg: ''
  },

  open() {
    if (this.timeout) clearTimeout(this.timeout)

    const hideDialog = $wuxDialog.open({
      title: '三秒后自动关闭',
      content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
      buttons: [
        {
          text: '取消',
        },
        {
          text: '确定',
          type: 'weui-dialog__btn--primary',
          onTap(e) {
            console.log(e)
          },
        },
      ],
    })

    this.timeout = setTimeout(hideDialog, 3000)
  },

  confirm() {
    $wuxDialog.confirm({
      title: '定制冰激凌',
      content: '你确定要吃我的冰淇淋吗？',
      onConfirm(e) {
        console.log('凭什么吃我的冰淇淋！')
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })
  },
  alert() {
    $wuxDialog.alert({
      title: '不要吃果冻',
      content: '它们可能是用旧的皮鞋帮做的！',
      onConfirm(e) {
        console.log('感谢上帝，你没吃鞋帮！')
      },
    })
  },
  prompt() {
    const that = this
    const alert = (content) => {
      $wuxDialog.alert({
        title: '提示',
        content: content,
      })
    }

    $wuxDialog.prompt({
      title: '提示',
      content: '密码为8位数字',
      fieldtype: 'number',
      password: !0,
      defaultText: '',
      placeholder: '请输入Wi-Fi密码',
      maxlength: 8,
      onConfirm(e) {
        const value = that.data.$wux.dialog.prompt.response
        const content = value.length === 8 ? `Wi-Fi密码到手了: ${value}` : `请输入正确的Wi-Fi密码`
        alert(content)
      },
    })
  },
  custom() {
    const alert = (content) => {
      $wuxDialog.alert({
        title: '提示',
        content: content,
      })
    }

    $wuxDialog.open({
      title: '我是标题',
      content: '我是自定义的对话框！',
      buttons: [
        {
          text: '现金支付',
          type: 'weui-dialog__btn--primary',
          onTap(e) {
            alert('你选择了现金支付！')
          },
        },
        {
          text: '微信支付',
          type: 'weui-dialog__btn--primary',
          onTap(e) {
            alert('你选择了微信支付！')
          },
        },
        {
          text: '取消',
        },
      ],
    })
  },
  vertical() {
    $wuxDialog.open({
      title: '请问需要反馈什么问题？',
      content: '你也可以在个人页的反馈帮助中心里找到这个功能',
      verticalButtons: !0,
      buttons: [
        {
          text: '遇到问题',
          bold: !0,
        },
        {
          text: '意见建议',
          bold: !0,
        },
        {
          text: '没啥事',
          bold: !0,
        },
      ],
    })
  },

  changeScore(item) {
    console.log(item)
    let score = item.detail.score
    this.setData({
      score: score
    })
  },

  changeImg(item){
    const self = this
    let fileUrl = item.detail.fileUrl
    self.setData({
      previewImg: fileUrl
    })
  },

  upload() {
    const self = this
    if (this.data.picture.length > 8) {
      wx.showModal({
        title: "图片与视频总共不可超过9个",
        showCancel: false,
      })
      return;
    }
    let uploadTask;
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const filePath = res.tempFilePaths[0];
        AXIOS.UPLOAD(filePath, (res) => {
          debugger
          let result = res.result || {}
          console.log(result)
          // self.previewImg = result.fileUrl
          self.setData({
            previewImg: result.fileUrl
          })

        }, (res) => {
          console.log('todo?')
        });
      }
    })
  },

  // resolveData(content) {
  //   // const picture = content.filter((item) => {
  //   //   return item.type == this.data.type.picture;
  //   // })

  //   this.setData({ content, picture });
  //   console.log(this.data.picture)
  // },

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