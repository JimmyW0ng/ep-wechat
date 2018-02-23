const getOpenId = () => {
  return global.openId || wx.getStorageSync('wx_openId')
}

const setOpenId = (value) => {
  wx.setStorageSync('wx_openId', value)
}

const getPhone = () => {
  return global.phone || wx.getStorageSync('wx_phone')
}

const setPhone = (value) => {
  wx.setStorageSync('wx_phone', value)
}

const getToken = () => {
  return wx.getStorageSync('wx_token')
}

const setToken = (value) => {
  wx.setStorageSync('wx_token', value)
}

const setMemberType = (value) => {
  wx.setStorageSync('wx_memberType', value)
}

const getMemberType = () => {
  return wx.getStorageSync('wx_memberType')
}

const getUserInfo = () => {
  return wx.getStorageSync('wx_userInfo') ? JSON.parse(wx.getStorageSync('wx_userInfo')) : false;
}

const setUserInfo = (value) => {
  wx.setStorageSync('wx_userInfo', JSON.stringify(value))
}

const getUid = () => {
  return wx.getStorageSync('wx_uid');
}

const setUid = (value) => {
  wx.setStorageSync('wx_uid', value)
}

const getSelectedChild = () => {
  return wx.getStorageSync('wx_selectedChildId');
}

const setSelectedChild = (value) => {
  wx.setStorageSync('wx_selectedChildId', value)
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
  setSelectedChild
}