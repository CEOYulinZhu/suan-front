// pages/user-profile-detail/user-profile-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../assets/bar/profile_32px.png',
    name: '小明',
    class: '三年级二班',
    phone: '138****1234',
    email: 'xiaoming@example.com',
    isEditing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  changeAvatar() {
    // 这里添加选择图片并上传设置头像的逻辑，例如调用wx.chooseImage等接口
    console.log('更换头像功能待实现');
    wx.showModal({
      content: '更换头像功能待实现',
    });
  },
  editProfile() {
    this.setData({
      isEditing: true
    });
  },
  cancelEdit() {
    this.setData({
      isEditing: false
    });
  },
  saveEdit() {
    console.log('保存功能待实现');
    this.setData({
      isEditing: false
    });
    wx.showModal({
      content: '保存功能待实现',
    });
  },
})