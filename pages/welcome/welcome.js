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
    // 直接体验，跳转到首页（使用switchTab适用于TabBar页面）
    wx.switchTab({
      url: '/pages/index/index'
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