// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ['全部','基础练习','计时挑战','每日一练','关卡挑战','自定义练习','错题练习'],
    timeRangeList: ['全部时间', '今天', '本周', '本月'],
    questionTypeList: ['全部', '加法', '减法', '乘法', '除法', '混合'],
    selectedType: '全部',
    selectedTime: '全部时间',
    selectedQuestionType: '全部',
    selectedList: [],
    activeIndex: 0,
    selectedTimeIndex: 0,
    selectedTypeIndex: 0,
    user: [
      {
        type: '基础练习',
        iconPath: '/assets/icons/CalculatorOutline_32px.svg',
        labelList: ['简单','加法'],
        date: '4-2',
        time: '10:30',
        questionNum: 10,
        rightNum: 9,
        correctness: '90%',
        timeSpent: 180,
        starNum: 0,
        timestamp: new Date(new Date().getFullYear(), 3, 2, 10, 30).getTime() 
      },
      {
        type: '计时挑战',
        iconPath: '/assets/icons/TimeOutLine_32px.svg',
        labelList: ['中等','减法'],
        date: '4-1',
        time: '15:45',
        questionNum: 15,
        rightNum: 12,
        correctness: '80%',
        timeSpent: 60,
        starNum: 0,
        timestamp: new Date(new Date().getFullYear(), 3, 1, 15, 45).getTime() 
      },
      {
        type: '每日一练',
        iconPath: '/assets/icons/DateOutLine_32px.svg',
        labelList: ['简单','乘法'],
        date: '3-31',
        time: '09:15',
        questionNum: 10,
        rightNum: 10,
        correctness: '100%',
        timeSpent: 120,
        starNum: 0,
        timestamp: new Date(new Date().getFullYear(), 2, 31, 9, 15).getTime() 
      },
      {
        type: '关卡挑战',
        iconPath: '/assets/icons/FlashlightOutline_32px.svg',
        labelList: ['中等','乘法'],
        date: '3-30',
        time: '14:20',
        questionNum: 12,
        rightNum: 10,
        correctness: '83%',
        timeSpent: 240,
        starNum: 2,
        timestamp: new Date(new Date().getFullYear(), 2, 30, 14, 20).getTime() 
      },
      {
        type: '自定义练习',
        iconPath: '/assets/icons/SetOutline_32px.svg',
        labelList: ['困难','除法'],
        date: '3-29',
        time: '11:05',
        questionNum: 20,
        rightNum: 15,
        correctness: '75%',
        timeSpent: 300,
        starNum: 0,
        timestamp: new Date(new Date().getFullYear(), 2, 29, 11, 5).getTime() 
      },
      {
        type: '错题练习',
        iconPath: '/assets/icons/BookOutline_32px.svg',
        labelList: ['混合','混合'],
        date: '3-28',
        time: '16:30',
        questionNum: 8,
        rightNum: 6,
        correctness: '75%',
        timeSpent: 160,
        starNum: 0,
        timestamp: new Date(new Date().getFullYear(), 2, 28, 16, 30).getTime() 
      },
    ]
  },

  // 处理标签点击
  handleTabClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      activeIndex: index,
      selectedType: index === 0 ? '全部' : this.data.typeList[index]
    }, this.filterData);
  },

  // 处理时间范围点击
  handleTimeRangeClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      selectedTimeIndex: index,
      selectedTime: this.data.timeRangeList[index]
    }, this.filterData);
  },

  // 处理题目类型点击
  handleQuestionTypeClick(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      selectedTypeIndex: index,
      selectedQuestionType: this.data.questionTypeList[index]
    }, this.filterData);
  },

  // 重置筛选条件
  handleReset() {
    this.setData({
      activeIndex: 0,
      selectedTimeIndex: 0,
      selectedTypeIndex: 0,
      selectedType: '全部',
      selectedTime: '全部时间',
      selectedQuestionType: '全部'
    }, this.filterData);
  },

  // 筛选数据
  filterData() {
    const { user, selectedType, selectedTime, selectedQuestionType } = this.data;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).getTime();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    
    let filteredData = user.filter(item => {
      // 类型筛选
      const typeMatch = selectedType === '全部' || item.type === selectedType;
      
      // 时间筛选
      let timeMatch = true;
      if (selectedTime === '今天') {
        timeMatch = item.timestamp >= todayStart;
      } else if (selectedTime === '本周') {
        timeMatch = item.timestamp >= weekStart;
      } else if (selectedTime === '本月') {
        timeMatch = item.timestamp >= monthStart;
      }
      
      // 题目类型筛选
      let questionTypeMatch = true;
      if (selectedQuestionType !== '全部') {
        questionTypeMatch = item.labelList.includes(selectedQuestionType);
      }
      
      return typeMatch && timeMatch && questionTypeMatch;
    });
    
    this.setData({ selectedList: filteredData });
  },

  // 查看详情
  handleViewDetail(e) {
    const type = e.currentTarget.dataset.type;
    const typeIndex = this.data.typeList.indexOf(type) - 1; // 减去"全部"的索引
    wx.navigateTo({
      url: `/pages/practice-detail/practice-detail?type=${typeIndex}`
    });
  },

  // 去训练
  goToPractice() {
    wx.switchTab({
      url: '/pages/practice/practice'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.filterData();
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
    this.filterData();
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