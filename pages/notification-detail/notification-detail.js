Page({

  /**
   * 页面的初始数据
   */
  data: {
    receivedId: null, // 新增变量用于存储传过来的id
    type: '',
    title: '',
    time: '',
    message: '',
    historyTitle: '',
    notifications: [
      {
        id: 1,
        type: "system",
        iconPath: "/assets/icons/SysteNoticeOutline_32px.svg",
        title: "练习提醒",
        time: "10分钟前",
        desc: "今天还没完成每日练习，快来挑战一下吧！",
      },
      {
        id: 2,
        type: "system",
        iconPath: "/assets/icons/SysteNoticeOutline_32px.svg",
        title: "新功能上线",
        time: "2小时前",
        desc: "口算挑战赛功能已上线，快来参与吧！",
      },
      {
        id: 3,
        type: "reminder",
        iconPath: "/assets/icons/MessageNoticeOutline_32px.svg",
        title: "老师回复",
        time: "昨天",
        desc: "您关于 100 以内加减法进位的问题，关键在于理解“凑十法”。例如 8 + 7，可以把 7 分成 2 和 5，先算 8 + 2 = 10，再算 10 + 5 = 15。多加练习就能熟练掌握了！",
      },
      {
        id: 4,
        type: "system",
        iconPath: "/assets/icons/SysteNoticeOutline_32px.svg",
        title: "系统维护通知",
        time: "3天前",
        desc: "系统将于明天凌晨2:00-4:00进行维护，请提前安排好学习时间。",
      }
    ],
    historyMessages: [
      {
        title: "练习提醒",
        time: "昨天上午",
        content: "昨天的“除法练习”你表现很棒，今天继续保持哦！去完成新的练习吧！",
      },
      {
        title: "练习提醒",
        time: "上周六",
        content: "你设置的“周末加法冲刺”练习时间到了，开始挑战吧！",
      },
      {

      }
    ]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const notificationId = options.id;
    this.setData({
      receivedId: notificationId // 将获取到的id存储到data中
    });
    const targetNotification = this.data.notifications.find(item => item.id === parseInt(notificationId));
    if (targetNotification) {
      let historyTitle = '';
      const mockData = {
        type: targetNotification.type,
        title: targetNotification.title, // 将title添加到mockData中
        time: targetNotification.time,
        message: targetNotification.desc,
        historyMessages: []
      };
      historyTitle = "历史" + mockData.title;
      // 过滤historyMessages，只保留title与mockData.title相同的项
      const filteredHistoryMessages = this.data.historyMessages.filter(item => item.title === mockData.title);
      mockData.historyMessages = filteredHistoryMessages;
      this.setData({
       ...mockData,
        historyTitle: historyTitle
      });
    }
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