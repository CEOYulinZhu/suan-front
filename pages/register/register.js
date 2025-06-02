// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    confirmPassword: '',
    usernameError: '',
    passwordError: '',
    confirmPasswordError: ''
  },

  /**
   * 输入用户名
   */
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value,
      usernameError: ''
    });
  },

  /**
   * 输入密码
   */
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value,
      passwordError: '',
      confirmPasswordError: this.data.confirmPassword && e.detail.value !== this.data.confirmPassword ?
        '两次输入的密码不一致' : ''
    });
  },

  /**
   * 输入确认密码
   */
  confirmPasswordInput: function (e) {
    this.setData({
      confirmPassword: e.detail.value,
      confirmPasswordError: e.detail.value !== this.data.password ? '两次输入的密码不一致' : ''
    });
  },

  /**
   * 验证表单
   */
  validateForm: function () {
    let isValid = true;
    // 验证用户名
    if (!this.data.username || this.data.username.trim() === '') {
      this.setData({ usernameError: '请输入用户名' });
      isValid = false;
    } else if (this.data.username.length < 4) {
      this.setData({ usernameError: '用户名至少需要4个字符' });
      isValid = false;
    }

    // 验证密码
    if (!this.data.password || this.data.password.trim() === '') {
      this.setData({ passwordError: '请输入密码' });
      isValid = false;
    } else if (this.data.password.length < 6) {
      this.setData({ passwordError: '密码至少需要6个字符' });
      isValid = false;
    }

    // 验证确认密码
    if (!this.data.confirmPassword || this.data.confirmPassword.trim() === '') {
      this.setData({ confirmPasswordError: '请再次输入密码' });
      isValid = false;
    } else if (this.data.confirmPassword !== this.data.password) {
      this.setData({ confirmPasswordError: '两次输入的密码不一致' });
      isValid = false;
    }

    return isValid;
  },

  /**
   * 注册操作
   */
  register: function() {
    if (!this.validateForm()) {
      wx.showToast({
        title: '请完善注册信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }
  
    wx.showLoading({
      title: '正在注册...',
      mask: true
    });
  
    const registerData = {
      username: this.data.username.trim(),
      password: this.data.password
    };
  
    wx.request({
      url: 'http://localhost:8080/api/v1/account/register',
      method: 'POST',
      data: registerData,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        wx.hideLoading();
        
        // 统一处理响应数据
        try {
          const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          
          // 成功条件：HTTP 200且业务code 200
          if (res.statusCode === 200 && data.code === 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1500
            });
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/login/login'
              });
            }, 1500);
          } 
          // 用户名已存在
          else if (res.statusCode === 400 && data.code === 400) {
            this.setData({ usernameError: data.msg });
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2000
            });
          }
          // 其他错误
          else {
            wx.showToast({
              title: data?.msg || '注册失败',
              icon: 'none',
              duration: 2000
            });
          }
        } catch (e) {
          wx.showToast({
            title: '数据处理失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 跳转到登录页面
   */
  goToLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  /**
   * 查看服务条款
   */
  viewTerms: function () {
    wx.showModal({
      title: '服务条款',
      content: '这里是服务条款内容...',
      showCancel: false
    });
  },

  /**
   * 查看隐私政策
   */
  viewPrivacy: function () {
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策内容...',
      showCancel: false
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