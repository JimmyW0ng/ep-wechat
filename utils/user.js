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

const getSelectedChild = () => {
  return wx.getStorageSync('ep_selectedChildId');
}

const setSelectedChild = (value) => {
  wx.setStorageSync('ep_selectedChildId', value)
}

const getSelectedChildIndex = () => {
  return wx.getStorageSync('ep_selectedChildIndex');
}

const setSelectedChildIndex = (value) => {
  wx.setStorageSync('ep_selectedChildIndex', value);
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
  getSelectedChildIndex,
  setSelectedChildIndex
}