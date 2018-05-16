const AXIOS = require('../../../utils/axios')
const USER = require('../../../utils/user')
const LoginUrl = '/pages/login/LoginPage'
const WxParse = require('../../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCommentNum: 0,
    classes: [],
    comments: [],
    course: {},
    team: [],

    popupStatus: false,
    children: [],
    childrenNum: 0,
    childrenNumLimit: 4,
    selectedChild: {},
    selectedChildId: '',
    selectedClassIndex: '',
    selectedClass: {},

    selectedTab: 0,
    swiperHeight: '',

    courseId: '',
    courseCommentList: [],
    loading: true,
    fromOgnDetail: false,
    needLogin: false
  },


  openAddress(e) {
    let dataset = e.currentTarget.dataset
    let name = dataset.name
    let address = dataset.address
    let addressLat = Number(dataset.lat)
    let addressLng = Number(dataset.lng)

    if (addressLat && addressLng) {
      wx.openLocation({
        latitude: addressLat,
        longitude: addressLng,
        // scale: 18, // 缩放比例，范围5~18，默认为18
        name,
        address
      })
    }
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let scene = options.scene
    let courseId = ''
    // split scene ognId and courseId
    // 不能用 #，安卓不识别，fuck
    if (scene.indexOf('and') > -1) {
      let ognId = scene.split('and')[0]
      courseId = scene.split('and')[1]

      if (options.setScene !== 'no') {
        USER.setOgnId(ognId)
      }
    } else {
      courseId = scene
    }
    
    if (courseId) {
      this.getCourseDetail(courseId)
      this.setData({
        courseId,
        fromOgnDetail: options.fromOgnDetail || false
      })

      var self = this;
      //  高度自适应
      wx.getSystemInfo({
        success: function (res) {
          var clientHeight = res.windowHeight,
            clientWidth = res.windowWidth;
          var calc = clientHeight - 170; // TODO 这里有点操蛋
          self.setData({
            swiperHeight: calc
          });
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '没有查询到该课程信息，请前往首页',
        success: function (res) {
            wx.switchTab({
              url: '/pages/orgnization/OrgnizationPage',
            })
        }
      })
    }
  },

  getChildren() {
    const self = this
    const selectedClassId = '' + self.data.selectedClass.id
    AXIOS.POST('auth/order/init', { courseId: self.data.course.id }, (res) => {
      const result = res.result || {}
      let children = result.children || []
      children.map((item) => {
        if (item.joinedClasses) {
          item.joinedClasses = item.joinedClasses.split(',')
        }
      })
      children.map((item, index) => {
        item.joined = !!(item.joinedClasses && item.joinedClasses.indexOf(selectedClassId) > -1)
      })
      self.setData({
        needLogin: false,
        children,
        childrenNum: result.childrenNum,
        childrenNumLimit: result.childrenNumLimit
      })
    })
  },

  selectTab(e) {
    const self = this
    var tab = e.currentTarget.dataset.tab
    self.setData({
      selectedTab: tab
    })
  },

  changeSwiper(e) {
    let current = e.detail.current
    this.setData({
      selectedTab: current
    });
  },

  goOgnDetail(e) {
    let ognId = this.data.course && this.data.course.ognId

    if (this.data.fromOgnDetail) {
      wx.navigateBack()
    } else {
      wx.navigateTo({
        url: '/pages/orgnization/orgnizationDetail/OrganizationDetailPage?setScene=no&scene=' + ognId
      })
    }
  },

  goUserCenter() {
    let course = this.data.course || {}
    USER.setLastPage({
      fromPage: 'courseDetail',
      mainPicUrl: course.mainPicUrl,
      courseId: this.data.courseId
    })

    wx.switchTab({
      url: '/pages/userCenter/UserCenterPage',
    })
  },

  chooseClass(e) {
    const index = e.currentTarget.dataset.index
    const selectedClass = this.data.classes[index]
    const selectedClassId = '' + selectedClass.id
    let children = this.data.children
    children.map((item, index) => {
      item.joined = !!(item.joinedClasses && item.joinedClasses.indexOf(selectedClassId) > -1)
    })
    this.setData({
      selectedClassIndex: index,
      selectedClass,
      children,
      selectedChild: {},
      selectedChildId: '',
    })
  },

  chooseChild(e) {
    if (!e.currentTarget.dataset.joined) {
      this.setData({
        selectedChildId: e.currentTarget.dataset.id,
        selectedChild: e.currentTarget.dataset.child
      })
    }
  },

  showPopup() {
    this.setData({
      popupStatus: true
    })

    if (USER.isLogined()) {
      this.getChildren()
    } else {
      this.setData({
        needLogin: true
      })
    }
  },

  goLogin() {
    wx.navigateTo({
      url: LoginUrl
    })
  },

  closePopup() {
    this.setData({
      popupStatus: false
    })
  },

  addChild() {
    wx.navigateTo({
      url: '/pages/userCenter/addBaby/AddBabyPage'
    })
  },

  getCourseDetail(id) {
    const self = this
    AXIOS.POST('security/course/detail', {
      courseId: id
    }, (res) => {
      const result = res.result || {}
      WxParse.wxParse('courseContent', 'html', result.course.courseContent, self, 0);
      let course = result.course
      let courseStatus = course.courseStatus
      let now = new Date().valueOf()
      let enterTime = course.enterTimeStampStart

      course.isBegin = (now > enterTime) && (courseStatus != 'offline')

      self.setData({
        loading: false,
        classes: result.classes || [],
        selectedClass: result.classes[0],
        comments: result.comments || [],
        course: result.course || {},
        team: result.team || [],
        totalCommentNum: result.totalCommentNum || 0
      })
    })
  },

  goCourseCommentPage() {
    let courseId = this.data.courseId
    wx.navigateTo({
      url: `/pages/course/courseCommentPage/courseCommentPage?courseId=${courseId}`,
    })
  },

  callOgn(e) {
    const self = this
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ognphone
    })
  },

  handleJoin() {
    const self = this
    let selectedClass = self.data.selectedClass || {}
    let selectedClassId = selectedClass.id || ''
    let selectedChildId = self.data.selectedChildId

    if (self.data.children && self.data.children.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请先添加学员',
      })
    } else {
      if (!selectedChildId) {
        wx.showToast({
          icon: 'none',
          title: '请选择学员',
        })
      } else {
        AXIOS.POST('auth/order/new', {
          childId: selectedChildId,
          classId: selectedClassId
        }, (res) => {
          let result = res.result || {}
       
          setTimeout(() => {
            self.closePopup()
          }, 1000)

          self.setSelectedChild()

          if (result.waitPayFlag) {
            wx.showToast({
              icon: 'success',
              title: '报名成功！',
              duration: 3000
            })
            self.goJoinSuccess(result)
          } else {
            wx.showModal({
              title: '提示',
              content: '报名成功,请前往我的课程查看',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/userCenter/myCourse/MyCoursePage',
                  })
                }
              }
            })
          }
        })
      }
    }
  },

  setSelectedChild(){
    USER.setSelectedChildId(this.data.selectedChildId)

    let child = this.data.selectedChild
    child.id = child.childId
    USER.setSelectedChild(child)
  },

  goJoinSuccess(info){
    let orderId = info.orderId || ''
    wx.navigateTo({
      url: '/pages/course/joinSuccess/joinSuccess?orderId=' + orderId,
    })
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
    let course = this.data.course
    if (USER.isLogined() && this.data.popupStatus && course && course.id && course.courseStatus != 'offline') {
      this.getChildren()
    }
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
  onShareAppMessage: function (res) {
    let course = this.data.course || {}
    return {
      title: course.courseName || '',
      imageUrl: course.mainPicUrl,
      path: `/pages/course/courseDetailPage/courseDetailPage?setScene=no&scene=${course.ognId}and${course.id}`
    }
  }
})