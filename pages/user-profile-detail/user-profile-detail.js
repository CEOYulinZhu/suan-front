// pages/user-profile-detail/user-profile-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headShot: '/assets/bar/headpicture.png',
    name: '小明',
    classroom: '三年级二班',
    phoneNumber: '138****1234',
    email: 'xiaoming@example.com',
    isEditing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const that = this;
    wx.request({
      url: 'http://localhost:8080/api/v1/account/info',
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.data.code === 200) {
          const { data } = res.data;
          that.setData({
            'headShot': data.headShot,
            'name': data.name,
            'classroom': data.classroom,
            'phoneNumber': data.phoneNumber,
            'email': data.email,
          });
        } else {
          wx.showToast({ title: '数据获取失败', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error('加载用户信息失败:', err);
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  /**
   * 页面相关事件处理函数
   */
  // 输入事件处理
  onNameInput(e) {
    this.setData({ name: e.detail.value });
  },
  onClassInput(e) {
    this.setData({ classroom: e.detail.value });
  },
  onPhoneInput(e) {
    this.setData({ phoneNumber: e.detail.value });
  },
  onEmailInput(e) {
    this.setData({ email: e.detail.value });
  },

  // 编辑模式控制
  editProfile() {
    this.setData({ isEditing: true });
  },
  cancelEdit() {
    // 取消时恢复原始数据（可选）
    this.onLoad();
    this.setData({ isEditing: false });
  },

  // 保存编辑（核心逻辑）
  saveEdit() {
    const { name, classroom, phoneNumber, email } = this.data;
    
    // 简单表单验证
    if (!name || !classroom || !phoneNumber || !email) {
      return wx.showToast({ title: '请填写完整信息', icon: 'none' });
    }
    
    wx.request({
      url: 'http://localhost:8080/api/v1/account/edit',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token'),
        'Content-Type': 'application/json'
      },
      data: { name, classroom, phoneNumber, email },
      success: (res) => {
        
        if (res.data.code === 200) {
          wx.showToast({ title: '保存成功' });
          
          // 方案一：重新加载数据（推荐）
          this.onLoad();
          
          // 模拟网络延迟，提升用户体验
          setTimeout(() => {
            this.setData({ isEditing: false });
          }, 500);
        } else {
          wx.showToast({ 
            title: res.data.message || '保存失败', 
            icon: 'none' 
          });
        }
      },
      fail: (err) => {
        console.error('保存失败：', err);
        wx.showToast({ title: '网络请求失败', icon: 'none' });
      }
    });
  },

  // 更换头像（待实现）
  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        // 上传图片逻辑
        wx.uploadFile({
          url: 'http://localhost:8080/api/v1/account/upload-avatar',
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Authorization': 'Bearer ' + wx.getStorageSync('token')
          },
          success: (uploadRes) => {
            const data = JSON.parse(uploadRes.data);
            if (data.code === 200) {
              wx.showToast({ title: '头像更新成功' });
              this.setData({ headShot: data.data }); // 更新头像URL
            } else {
              wx.showToast({ title: '上传失败', icon: 'none' });
            }
          },
          fail: (err) => {
            console.error('上传失败：', err);
            wx.showToast({ title: '网络请求失败', icon: 'none' });
          }
        });
      }
    });
  },

  // 其他生命周期函数（保持不变）
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
})