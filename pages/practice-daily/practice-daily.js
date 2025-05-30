// pages/practice-daily/practice-daily.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkInDays: 13,
    showCalendar: false, // 是否显示日历
    showCheck: true,
    showProgres: true,
    showRewards: true,
    showPractice:false,
    currentMonth: '2025年4月',//当前月份
    calendarDays: [], // 日历数据
    checkedDays: [1, 3, 5, 16], // 已打卡日期
    today: 16, // 当天日期（4月16日）

    total: 10, // 总题目数
    questions: [],          // 所有题目数组
    currentQuestionIndex: 0, // 当前题号（从开始）
    showResult: false,        // 是否显示结果提示
    resultMessage: '',        // 结果提示信息
    resultType: '',           // 结果类型（correct/incorrect）
    isChecking: false,        // 正在验证答案状态
    isComplete: false,
    correctCount:0,
    errorCount: 0,
  },
    toggleCalendar:function()  {
    this.setData({
      showCalendar: !this.data.showCalendar
    });

},

    showPractice(){
        this.setData({
            showCheck: !this.data.showCheck,
            showProgres: !this.data.showProgres,
            showRewards: !this.data.showRewards,
            showPractice: !this.data.showPractice,
            showCalendar: false
          });
},
    nextTime(){
        this.setData({
            showCheck: !this.data.showCheck,
            showProgres: !this.data.showProgres,
            showRewards: !this.data.showRewards,
            showPractice: !this.data.showPractice,

          });
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

      // 切换日历显示
      this.generateCalendar();
      this.generateQuestions();
      this.loadCurrentQuestion();
      
    },
    generateCalendar() {
        const calendarDays = [];
        const checkedDays = this.data.checkedDays;
        const today = this.data.today;
        const now = new Date();
        const currentYear = now.getFullYear(); // 2025
        const currentMonth = now.getMonth(); // 3（对应4月）
    
        // 当月第一天是星期几（0=周日，6=周六）
        const firstDay = new Date(currentYear, currentMonth, 1).getDay(); 
        // 当月天数（4月有30天）
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); 
        // 上个月天数（3月有31天）
        const prevDays = new Date(currentYear, currentMonth, 0).getDate(); 
    
        // 填充上个月日期（倒推）
        for (let i = firstDay - 1; i >= 0; i--) {
          calendarDays.push({
            day: prevDays - i,
            month: 'pre'
          });
        }
    
        // 填充当月日期
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push({
              day: i,
              month: 'current',
              checked: checkedDays.includes(i), // 检查日期是否在签到列表中
              isToday: i === today
            });
          }
    
        // 填充下个月日期（补满42格）
        const daysToFill = 42 - calendarDays.length;
        for (let i = 1; i <= daysToFill; i++) {
          calendarDays.push({
            day: i,
            month: 'next'
          });
        }
    
        this.setData({
          calendarDays,
          currentMonth: `${currentYear}年${currentMonth + 1}月`
        });
      },
    
      // 上下月切换（示例未完整实现，仅日志）
      prevMonth() {
        console.log('上个月');
      },
      nextMonth() {
        console.log('下个月');
      },

  // 生成题目（确保结果为3位数以内+重置字段初始化）
  generateQuestions() {
    const questions = [];
    const operators = ['+', '-'];
    
    for (let i = 0; i < 10; i++) {
      let num1, num2, operator;
      
      do {
        num1 = Math.floor(Math.random() * 1000);
        num2 = Math.floor(Math.random() * 1000);
        operator = operators[Math.floor(Math.random() * 2)];
        
        // 验证结果范围
        const isValid = 
          (operator === '+' && num1 + num2 <= 999) || 
          (operator === '-' && num1 >= num2 && num1 - num2 >= 0);
        
        if (!isValid) continue;
        
      } while (false); // 单次循环验证
        
      questions.push({
        num1,
        num2,
        operator,
        correctAnswer: operator === '+' ? num1 + num2 : num1 - num2,
        userAnswer: '' // 初始化用户答案为空（关键重置字段）
      });
    }
    
    this.setData({ questions });
  },

  // 加载当前题目（包含input框重置逻辑）
  loadCurrentQuestion() {
    const { currentQuestionIndex, questions } = this.data;
    if (currentQuestionIndex >= questions.length) {
      return this.setData({ isComplete: true });
    }
    
    // 切换题目时自动重置input框（通过重新赋值空字符串）
    questions[currentQuestionIndex].userAnswer = ''; // 重置当前题目的输入值
    this.setData({
      currentQuestion: questions[currentQuestionIndex],
      isChecking: false,
      showResult: false
    });
  },

  // 答案输入处理
  onAnswerInput(e) {
    const { currentQuestionIndex, questions } = this.data;
    questions[currentQuestionIndex].userAnswer = e.detail.value;
    this.setData({ questions });
  },

  // 检查答案（含3秒等待和input框重置触发）
  checkAnswer() {
    const { currentQuestionIndex, questions } = this.data;
    const currentQuestion = questions[currentQuestionIndex];
    
    if (!currentQuestion.userAnswer.trim()) {
      return this.showTip('请输入答案', 'incorrect');
    }
    
    const userAnswer = parseInt(currentQuestion.userAnswer);
    const correctAnswer = currentQuestion.correctAnswer;
    
    // 显示结果并锁定3秒
    this.setData({
      showResult: true,
      resultType: userAnswer === correctAnswer ? 'correct' : 'incorrect',
      resultMessage: userAnswer === correctAnswer ? '回答正确！' : '回答错误',
      isChecking: true
      
      
    });
 

    // 3秒后切换题目并重置input框（通过loadCurrentQuestion实现）
    setTimeout(() => {
      if (currentQuestionIndex <= 10) {
        this.setData({ currentQuestionIndex: currentQuestionIndex + 1 ,
            correctCount: userAnswer === correctAnswer ? this.data.correctCount + 1 : this.data.correctCount,
            errorCount: userAnswer !== correctAnswer ? this.data.errorCount + 1 : this.data.errorCount
        
                    });
        this.loadCurrentQuestion(); // 加载下一题时自动重置input框
        
      } else {
        this.setData({ isComplete: true });
      }
      this.setData({ showResult: false, isChecking: false }); // 清除结果显示
    },2000);
  },

  // 显示提示
  showTip(message, type) {
    this.setData({
      showResult: true,
      resultType: type,
      resultMessage: message,
      isChecking: false
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