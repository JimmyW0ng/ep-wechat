const getOpenId = () => {
  return global.openId || wx.getStorageSync('ep_openId')
}

const setOpenId = (value) => {
  wx.setStorageSync('ep_openId', value)
}

const getPhone = () => {
  return global.phone || wx.getStorageSync('ep_phone')
}

const setPhone = (value) => {
  wx.setStorageSync('ep_phone', value)
}

const getToken = () => {
  return wx.getStorageSync('ep_token')
}

const setToken = (value) => {
  wx.setStorageSync('ep_token', value)
}

const setMemberType = (value) => {
  wx.setStorageSync('ep_memberType', value)
}

const getMemberType = () => {
  return wx.getStorageSync('ep_memberType')
}

const getUserInfo = () => {
  return wx.getStorageSync('ep_userInfo') ? JSON.parse(wx.getStorageSync('ep_userInfo')) : false;
}

const setUserInfo = (value) => {
  wx.setStorageSync('ep_userInfo', JSON.stringify(value))
}

const getUid = () => {
  return wx.getStorageSync('ep_uid');
}

const setUid = (value) => {
  wx.setStorageSync('ep_uid', value)
}

const getOgnId = () => {
  return wx.getStorageSync('ep_ognid');
}

const setOgnId = (value) => {
  wx.setStorageSync('ep_ognid', value)
}

const getSelectedChild = () => {
  return wx.getStorageSync('ep_selectedChild');
}

const setSelectedChild = (value) => {
  wx.setStorageSync('ep_selectedChild', value)
}

const getSelectedChildId = () => {
  return wx.getStorageSync('ep_selectedChildId');
}

const setSelectedChildId = (value) => {
  wx.setStorageSync('ep_selectedChildId', value);
}

// TODO 不知道是否需要拿这个token去掉一下后台
const isLogined = () => {
  return !!wx.getStorageSync('ep_token')
}

// value {}: courseId || ognId,  mainPicUrl
const setLastPage = (value) => {
  wx.setStorageSync('ep_LastPage', value);
}

const getLastPage = () => {
  return wx.getStorageSync('ep_LastPage') || {}; 
}

const userLogout = () => {
  let ognId = getOgnId()
  let lastPage = getLastPage()

  wx.clearStorageSync()

  setOgnId(ognId)
  setLastPage(lastPage)
}

module.exports = {
  getOpenId,
  setOpenId,
  getPhone,
  setPhone,
  getToken,
  setToken,
  getUserInfo,
  setUserInfo,
  getUid,
  setUid,
  getMemberType,
  setMemberType,
  getSelectedChild,
  setSelectedChild,
  getSelectedChildId,
  setSelectedChildId,
  isLogined,
  setLastPage,
  getLastPage,
  getOgnId,
  setOgnId,
  userLogout
}