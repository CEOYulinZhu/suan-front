// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      avatarUrl: '/assets/bar/profile_32px.png',
      name: '小明',
      class: '三年级二班',
      cumulativePractice: 120,
      accuracyRate: 85,
      continuousCheckins: 15
    },
    userImgSize: 150, // 初始宽度和高度值，单位rpx
    userImgMarginLeft: 50, // 初始左边距值，单位rpx
    isEnlarged: false // 新增一个标志位，用于记录是否已经放大
  },

   /**
   * 点击头像，长宽变大;放大后再点一下，还原
   */
  handleUserImgClick(e) {
    const index = e.currentTarget.dataset.index;
    if (!this.data.isEnlarged) {
      // 如果没有放大，进行放大操作
      let newSize = this.data.userImgSize + 20;
      this.setData({
        userImgSize: newSize,
        userImgMarginLeft: this.data.userImgMarginLeft - 10,
        isEnlarged: true
      });
    }
  },
  handleOutsideClick(e) {
    // 检查点击的目标是否是.user-img
    const target = e.target;
    if (!target.dataset.index) {
      // 如果不是.user-img，恢复原样
      this.setData({
        userImgSize: 150,
        userImgMarginLeft: 50,
        isEnlarged: false
      });
    }
  },

  /**
   * 跳转到个人资料页面
   */
  goToPersonalInfo() {
    wx.navigateTo({
      url: '/pages/user-profile-detail/user-profile-detail'
    });
  },

  /**
   * 跳转到消息通知页面
   */
  goToNotifications() {
    wx.navigateTo({
      url: '/pages/notifications/notifications'
    });
  },

  /**
   * 跳转到系统设置页面
   */
  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  },

  /**
   * 跳转到帮助与反馈页面
   */
  goToHelpAndFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  /**
   * 退出登录
   */
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 这里添加退出登录的逻辑，比如清除登录态等
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  }

})