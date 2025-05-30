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
    filteredNotifications: [],
    isDeleteVisible: {}, // 用于记录每个通知删除按钮是否显示，初始为空对象
    allRead: false, // 新增属性，用于标识是否所有消息都为已读
    startX: 0, // 记录触摸开始时的 X 坐标
    currentX: 0, // 记录当前触摸的 X 坐标
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setFilteredNotificationsToAll();
    this.checkAllRead(); // 页面加载时检查是否所有消息都为已读
    this.checkHasMessages(); // 新增检查是否有消息
    // 初始化 isDeleteVisible
    const notifications = this.data.notifications;
    const initialObj = {};
    notifications.forEach((item) => {
        initialObj[item.id] = false;
    });
    this.setData({
        isDeleteVisible: initialObj
    });
  },
  setFilteredNotificationsToAll: function () {
      this.setData({
          filteredNotifications: [...this.data.notifications]
      });
  },
  checkAllRead: function () {
    const allNotifications = this.data.notifications;
    const allRead = allNotifications.every(item =>!item.isUnread);
    this.setData({
        allRead: allRead
    });
  },
  checkHasMessages: function () {
    const hasMessages = this.data.filteredNotifications.length > 0;
    this.setData({
      hasMessages: hasMessages
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
    const updatedNotifications = this.data.notifications.map(item => {
      item.isUnread = false;
      return item;
    });
    const updatedFilteredNotifications = this.data.filteredNotifications.map(filteredItem => {
        filteredItem.isUnread = false;
        return filteredItem;
    });
    const newUnreadCount = {
        all: 0,
        system: 0,
        reminder: 0
    };
    this.setData({
        notifications: updatedNotifications,
        filteredNotifications: updatedFilteredNotifications,
        unreadCount: newUnreadCount
    }, () => {
        this.checkAllRead();
    });
  },
  handleNotificationTap: function (e) {
    const notificationId = e.currentTarget.dataset.notificationId;
    const filteredNotifications = this.data.filteredNotifications;
    const targetNotification = filteredNotifications.find(item => item.id === parseInt(notificationId));
    if (targetNotification) {
        if (targetNotification.isUnread) {
            targetNotification.isUnread = false;
            if (targetNotification.type ==='system') {
                this.data.unreadCount.system--;
            } else if (targetNotification.type ==='reminder') {
                this.data.unreadCount.reminder--;
            }
            this.data.unreadCount.all--;
            const updatedFilteredNotifications = filteredNotifications.map(filteredItem => {
                if (filteredItem.id === targetNotification.id) {
                    return {...filteredItem, isUnread: false };
                }
                return filteredItem;
            });
            this.setData({
                filteredNotifications: updatedFilteredNotifications,
                unreadCount: this.data.unreadCount
            }, () => {
                this.checkAllRead();
                // 跳转到消息详情页面并传递id参数
                wx.navigateTo({
                    url: `/pages/notification-detail/notification-detail?id=${notificationId}`
                });
            });
        } else {
            // 若已读，直接跳转到消息详情页面
            wx.navigateTo({
                url: `/pages/notification-detail/notification-detail?id=${notificationId}`
            });
        }
    }
  },
  handleTouchStart: function (e) {
    this.setData({
      startX: e.changedTouches[0].clientX
    });
  },
  handleTouchMove: function (e) {
    const { startX, isDeleteVisible } = this.data;
    if (!startX) return;
    const currentX = e.changedTouches[0].clientX;
    const diffX = startX - currentX;
    const notificationId = e.currentTarget.dataset.notificationId;

    if (diffX > 0 &&!isDeleteVisible[notificationId]) { 
      // 左滑且删除按钮未显示
      const newIsDeleteVisible = {
       ...isDeleteVisible,
        [notificationId]: true
      };
      this.setData({
        isDeleteVisible: newIsDeleteVisible,
        currentX
      });
    } else if (diffX < 0 && isDeleteVisible[notificationId]) { 
      // 右滑且删除按钮已显示
      const newIsDeleteVisible = {
       ...isDeleteVisible,
        [notificationId]: false
      };
      this.setData({
        isDeleteVisible: newIsDeleteVisible,
        currentX
      });
    } else {
      this.setData({
        currentX
      });
    }
  },
  handleTouchEnd: function (e) {
    this.setData({
      startX: 0,
      currentX: 0
    });
  },
  deleteNotification: function (e) {
    const notificationId = e.currentTarget.dataset.notificationId;
    const notifications = this.data.notifications;
    const filteredNotifications = this.data.filteredNotifications;
    const targetNotification = notifications.find(item => item.id === parseInt(notificationId));
    if (targetNotification) {
        const newNotifications = notifications.filter((item) => item.id!== notificationId);
        const newFilteredNotifications = filteredNotifications.filter((item) => item.id!== notificationId);
        // 根据通知是否未读以及类型更新未读计数
        if (targetNotification.isUnread) {
            if (targetNotification.type ==='system') {
                this.data.unreadCount.system--;
                this.data.unreadCount.all--;
            } else if (targetNotification.type ==='reminder') {
                this.data.unreadCount.reminder--;
                this.data.unreadCount.all--;
            }
        }
        this.setData({
            notifications: newNotifications,
            filteredNotifications: newFilteredNotifications,
            unreadCount: this.data.unreadCount
        }, () => {
            this.checkAllRead();
        });
    }
  }
})