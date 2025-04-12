// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  navigateToLogin: function () {
    wx.navigateTo({ // 使用 navigateTo 保留当前页，允许返回
      url: '/pages/login/login' // 假设登录页面的路径是 /pages/login/login
    });
  },

  navigateToRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register' // 假设注册页面的路径是 /pages/register/register
    });
  },

  navigateToExperience: function () {
    // 这里可以根据你的需求跳转到主功能页面或者其他体验页面
    // 例如，跳转到首页
    // wx.switchTab({
    //   url: '/pages/index/index' // 假设首页是 TabBar 页面
    // });
    // 如果体验页面不是 TabBar 页面，使用 wx.navigateTo 或 wx.redirectTo
    wx.navigateTo({
      url: '/pages/index/index' // 确认首页路径正确
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})