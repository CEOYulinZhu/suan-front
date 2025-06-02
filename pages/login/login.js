// pages/login/login.js
import { post } from '../../utils/request';
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
  login: async function() {
    const { username, password } = this.data;
    
    // 表单验证
    if (!username || !username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    if (!password || !password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    try {
      // 调用登录接口
      const res = await post('/api/v1/account/login', {
        username: username.trim(),
        password: password
      });

      wx.hideLoading();
      
      // 登录成功处理
      if (res.code === 200) {
        // 存储token
        wx.setStorageSync('token', res.data);
        
        // 如果勾选了"记住我"，将用户名存储到本地
        if (this.data.rememberMe) {
          wx.setStorageSync('rememberedUsername', username.trim());
        } else {
          wx.removeStorageSync('rememberedUsername');
        }

        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        });

        // 跳转到首页
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          });
        }, 1500);
      } else {
        // 登录失败提示
        wx.showToast({
          title: res.msg || '登录失败',
          icon: 'none',
          duration: 2000
        });
      }
    } catch (error) {
      wx.hideLoading();
      wx.showToast({
        title: error.message || '网络错误',
        icon: 'none',
        duration: 2000
      });
    }
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
  onShow: function() {
    // 如果之前记住过用户名，自动填充
    const rememberedUsername = wx.getStorageSync('rememberedUsername');
    if (rememberedUsername) {
      this.setData({
        username: rememberedUsername,
        rememberMe: true
      });
    }
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