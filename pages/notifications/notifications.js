// pages/notifications/notifications.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'all',
    unreadCount: {
      all: 2,
      system: 1,
      reminder: 1
    },
    notifications: [
      {
        id: 1,
        type: "system",
        iconPath: "/assets/icons/SysteNoticeOutline_32px.svg",
        title: "练习提醒",
        time: "10分钟前",
        desc: "今天还没完成每日练习，快来挑战一下吧！",
        isUnread: true
      },
      {
        id: 2,
        type: "system",
        iconPath: "/assets/icons/SysteNoticeOutline_32px.svg",
        title: "新功能上线",
        time: "2小时前",
        desc: "口算挑战赛功能已上线，快来参与吧！",
        isUnread: false
      },
      {
        id: 3,
        type: "reminder",
        iconPath: "/assets/icons/MessageNoticeOutline_32px.svg",
        title: "老师回复",
        time: "昨天",
        desc: "你的问题已解答，请查看详情。",
        isUnread: true
      },
      {
        id: 4,
        type: "system",
        iconPath: "/assets/icons/SysteNoticeOutline_32px.svg",
        title: "系统维护通知",
        time: "3天前",
        desc: "系统将于明天凌晨2:00-4:00进行维护，请提前安排好学习时间。",
        isUnread: false
      }
    ],
    filteredNotifications: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        filteredNotifications: this.data.notifications
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

  },

  filteredNotifications: function (e) {
    const type = e.currentTarget.dataset.type;
    const allNotifications = this.data.notifications;
    if (type === 'all') {
      this.setData({
        filteredNotifications: allNotifications,
        activeTab: 'all'
      });
    } else {
      const filtered = allNotifications.filter(item => item.type === type);
      this.setData({
        filteredNotifications: filtered,
        activeTab: type ==='system'?'system' :'reminder'
      });
    }
  },
  markAllAsRead: function () {
    const notifications = this.data.notifications.map(item => {
      item.isUnread = false;
      return item;
    });
    this.setData({
      notifications: notifications,
      filteredNotifications: notifications,
      unreadCount: {
        all: 0,
        system: 0,
        reminder: 0
      }
    });
  },
  handleNotificationTap: function (e) {
    const index = e.currentTarget.dataset.index;
    const notificationId = e.currentTarget.dataset.notificationId;
    const notifications = this.data.notifications;
    if (index >= 0 && index < notifications.length) { // 增加索引有效性检查
        const item = notifications[index];
        if (item.isUnread) {
            item.isUnread = false;
            // 变为已读状态样式
            item.className ='read-bg'; 
            // 根据通知类型更新对应的未读计数
            if (item.type ==='system') {
                this.data.unreadCount.system--;
            } else if (item.type ==='reminder') {
                this.data.unreadCount.reminder--;
            }
            this.data.unreadCount.all--;
            this.setData({
                notifications: notifications,
                filteredNotifications: notifications,
                unreadCount: this.data.unreadCount
            }, () => {
                // 跳转至详细页面
                console.log('即将跳转的页面 ', notificationId);
                wx.navigateTo({
                    //url: `/pages/notification-detail/notification-detail?id=${notificationId}`
                });
            });
        } else {
          console.log('即将跳转的页面 ', notificationId);
            // 如果通知已经是已读状态，直接跳转至详细页面
            wx.navigateTo({
                //url: `/pages/notification-detail/notification-detail?id=${notificationId}`
            });
        }
    }
}
})