// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '小明',
    emailNum: 3,
    workGoalNum: 5,
    finishWorkNum: 3,
    progress: '0%',
    clickState: [false, false, false, false], // 对应4个图标的点击状态
    iconList: [
      {
        iconPath: '/assets/icons/CalculatorOutline_32px.svg',
        title: '开始练习',
        pagePath: '/pages/practice/practice',
        navigationType: 'switchTab'
      },
      {
        iconPath: '/assets/icons/BookOutline_32px.svg',
        title: '错题本',
        pagePath: '/pages/mistakes/mistakes',
        navigationType: 'navigateTo'
      },
      {
        iconPath: '/assets/icons/MessageOutline_32px.svg',
        title: 'AI辅导',
        pagePath: '/pages/ai-tutor/ai-tutor',
        navigationType: 'switchTab'
      },
      {
        iconPath: '/assets/icons/AnalyseOutline_32px.svg',
        title: '学习报告',
        pagePath: '/pages/report/report',
        navigationType: 'navigateTo'
      }
    ],
    historyList: [
      {
        title: '基础练习',
        iconPath:  '/assets/icons/CalculatorOutline_32px.svg',
        date: '今天',
        time: '10:30',
        scores: 95
      },
      {
        title: '计时挑战',
        iconPath:  '/assets/icons/TimeOutLine_32px.svg',
        date: '昨天',
        time: '15:45',
        scores: 88
      },
      {
        title: '每日一练',
        iconPath:  '/assets/icons/DateOutLine_32px.svg',
        date: '10-15',
        time: '09:15',
        scores: 100
      }
    ]
  },

  //点击头像跳转‘我的’界面
  toProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  },

  //点击查看全部跳转‘历史’界面
  toHistory() {
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },

  //点击最近练习跳转‘练习细节’界面
  toPracticeDetail(e) {
    const index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/practice-detail/practice-detail?type=${index}`,
    })
  },

  // 统一处理触摸开始
  handleTouchStart(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`clickState[${index}]`]: true
    });
  },

  // 统一处理触摸结束
  handleTouchEnd(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      [`clickState[${index}]`]: false
    });
  },

  // 统一处理图标点击
  handleIconTap(e) {
    const index = e.currentTarget.dataset.index;
    const { pagePath, navigationType } = this.data.iconList[index];
    
    // 先显示点击效果
    this.setData({
      [`clickState[${index}]`]: true
    });
    
    // 150ms后执行跳转并恢复状态
    setTimeout(() => {
      wx[navigationType]({ 
        url: pagePath,
        complete: () => {
          this.setData({
            [`clickState[${index}]`]: false
          });
        }
      });
    }, 150);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 计算并更新 progress
    this.setData({
      progress: `${(this.data.finishWorkNum / this.data.workGoalNum * 100)}%`
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