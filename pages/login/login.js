// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    rememberMe: false
  },

  /**
   * 输入用户名
   */
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },

  /**
   * 输入密码
   */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 记住我切换
   */
  toggleRememberMe: function () {
    this.setData({
      rememberMe: !this.data.rememberMe
    });
  },

  /**
   * 登录操作
   */
  login: function () {
    const { username, password } = this.data;
    if (!username || !username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    if (!password || !password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }

    // 这里添加实际登录逻辑
    console.log('登录信息:', this.data);
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1000
    });

    // 登录成功后跳转到首页
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index',
      });
    }, 1000);
  },

  /**
   * 跳转到注册页面
   */
  goToRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },

  /**
   * 跳转到忘记密码页面
   */
  goToForgotPassword: function () {
    wx.navigateTo({
      url: '/pages/forgot-password/forgot-password',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以在这里做一些初始化工作
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