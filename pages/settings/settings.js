Page({

  /**
   * 页面的初始数据
   */
  data: {
    soundEffectChecked: false,
    vibrationFeedbackChecked: false,
    dailyReminderChecked: true,
    answerTime: 30,
    questionNum: 20,
    defaultDifficulty: '一年级',
    currentVersion: '1.0.0',
    // 答题时间相关
    showAnswerTimeModal: false,
    answerTimeOptions: [
      {time: 15},
      {time: 30},
      {time: 45},
      {time: 60},
      {time: 90}
    ],
    selectedAnswerTime: 30,
    answerTimeSelectedIndex: 0,
    // 每组题目数量相关
    showQuestionNumModal: false,
    questionNumOptions: [
      {num: 5},
      {num: 10},
      {num: 15},
      {num: 20},
      {num: 25},
      {num: 30},
      {num: 40},
      {num: 50}
    ],
    selectedQuestionNum: 20,
    questionNumSelectedIndex: 0,
    // 默认难度等级相关
    showDifficultyModal: false,
    difficultyOptions: [
      {level: '一年级'},
      {level: '二年级'},
      {level: '三年级'},
      {level: '四年级'},
      {level: '五年级'},
      {level: '六年级'}
    ],
    selectedDifficulty: '一年级',
    difficultySelectedIndex: 0
  },

  // 声音效果开关变化处理
  handleSoundEffectChange: function (e) {
    this.setData({
      soundEffectChecked: e.detail.value
    });
  },
  // 震动反馈开关变化处理
  handleVibrationFeedbackChange: function (e) {
    this.setData({
      vibrationFeedbackChecked: e.detail.value
    });
  },
  // 每日提醒开关变化处理
  handleDailyReminderChange: function (e) {
    this.setData({
      dailyReminderChecked: e.detail.value
    });
  },

  // 打开答题时间选择模态框
  handleAnswerTimeTap: function () {
    this.setData({
      showAnswerTimeModal: true
    });
  },
  // 答题时间滚轮滚动结束处理
  answerTimePickerChange: function (e) {
    const index = e.detail.value;
    const selectedTime = this.data.answerTimeOptions[index].time;
    this.setData({
      answerTimeSelectedIndex: index,
      selectedAnswerTime: selectedTime
    });
  },
  // 确认答题时间
  confirmAnswerTime: function () {
    this.setData({
      answerTime: this.data.selectedAnswerTime,
      showAnswerTimeModal: false
    });
  },
  // 打开每组题目数量选择模态框
  handleQuestionNumTap: function () {
    this.setData({
      showQuestionNumModal: true
    });
  },
  // 每组题目数量滚轮滚动结束处理
  questionNumPickerChange: function (e) {
    const index = e.detail.value;
    const selectedNum = this.data.questionNumOptions[index].num;
    this.setData({
      questionNumSelectedIndex: index,
      selectedQuestionNum: selectedNum
    });
  },
  // 确认每组题目数量
  confirmQuestionNum: function () {
    this.setData({
      questionNum: this.data.selectedQuestionNum,
      showQuestionNumModal: false
    });
  },
  // 打开默认难度等级选择模态框
  handleDifficultyTap: function () {
    this.setData({
      showDifficultyModal: true
    });
  },
  // 默认难度等级滚轮滚动结束处理
  difficultyPickerChange: function (e) {
    const index = e.detail.value;
    const selectedLevel = this.data.difficultyOptions[index].level;
    this.setData({
      difficultySelectedIndex: index,
      selectedDifficulty: selectedLevel
    });
  },
  // 确认默认难度等级
  confirmDifficulty: function () {
    this.setData({
      defaultDifficulty: this.data.selectedDifficulty,
      showDifficultyModal: false
    });
  },
  // 隐藏模态框
  hideModal: function () {
    this.setData({
      showAnswerTimeModal: false,
      showQuestionNumModal: false,
      showDifficultyModal: false
    });
  },
  // 跳转到用户协议页面
  navigateToUserAgreement: function () {
    wx.navigateTo({
      url: '/pages/user-agreement/user-agreement'
    });
  },
  // 跳转到隐私政策页面
  navigateToPrivacyPolicy: function () {
    wx.navigateTo({
      url: '/pages/privacy-policy/privacy-policy'
    });
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

  }
})