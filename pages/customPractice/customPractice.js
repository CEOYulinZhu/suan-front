import { post } from '../../utils/request';

Page({
  data: {
    // 练习设置数据
    operationTypes: ['addition'], // 默认选中加法
    defaultAdd: true,        // 初始默认选中加法
    defaultSubtract: false,
    defaultMultiply: false,
    defaultDivide: false,
    defaultMix: false,
    count: 10,               // 默认题目数量
    numberRange: 'doubleDigit', // 默认数字范围
    allowNegative: false,    // 是否允许负数结果
    enableTimer: false,      // 是否启用计时器
    setTime: 20,             // 设置的时间

    // 练习相关数据
    questions: [],          // 所有题目数组
    currentQuestionIndex: 0, // 当前题号
    showResult: false,        // 是否显示结果提示
    resultMessage: '',        // 结果提示信息
    resultType: '',           // 结果类型
    isChecking: false,        // 正在验证答案状态
    isComplete: false,        // 是否完成所有题目
    correctCount: 0,          // 正确题目数量
    errorCount: 0,           // 错误题目数量
    practice: false,         // 是否处于练习模式
    isPracticeStarted: false,// 是否已经开始练习,
    userAnswers: {}, // 用户答案对象
    startTime: null, // 练习开始时间
    endTime: null,   // 练习结束时间
    timeSpent: 0     // 练习花费时间（秒）
  },

  onLoad(options) {
    // 初始化页面，但不加载题目
    this.setData({
      isPracticeStarted: false
    });
  },

  // 开始练习
  startPractice() {
    if (this.data.isPracticeStarted) return;

    // 获取当前设置
    const { operationTypes, count, numberRange } = this.data;

    // 记录开始时间
    const startTime = new Date();
    this.setData({ startTime });

    // 发送POST请求获取题目数据
    post('/api/v1/questionGenerator/generateQuestions', {
      operationTypes: operationTypes,
      questionCount: count,
      numberRange: numberRange
    }).then(res => {
      if (res.code === 200) {
        // 处理返回的题目数据
        const questionsData = res.data.questions;
        const questions = questionsData.map(item => ({
          question: item.question,
          correctAnswer: item.answer,
          userAnswer: ''
        }));

        this.setData({
          questions,
          isPracticeStarted: true,
          currentQuestionIndex: 0,
          correctCount: 0,
          errorCount: 0,
          showResult: false,
          isComplete: false,
          userAnswers: {} // 初始化用户答案对象
        });

        this.loadCurrentQuestion();
      } else {
        wx.showToast({
          title: '获取题目失败',
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.showToast({
        title: '获取题目失败',
        icon: 'none'
      });
      console.error('请求失败', err);
    });
  },

  // 加载当前题目
  loadCurrentQuestion() {
    const { currentQuestionIndex, questions } = this.data;
    if (!questions || questions.length === 0) {
      return this.setData({ isComplete: true });
    }

    if (currentQuestionIndex >= questions.length) {
      return this.setData({ isComplete: true });
    }

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = '';

    this.setData({
      questions: updatedQuestions,
      currentQuestion: questions[currentQuestionIndex],
      isChecking: false,
      showResult: false
    });
  },

  // 答案输入处理
  onAnswerInput(e) {
    const { currentQuestionIndex, questions } = this.data;
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].userAnswer = e.detail.value;

    this.setData({ questions: updatedQuestions });
  },

  // 检查答案
  checkAnswer() {
    const { currentQuestionIndex, questions } = this.data;
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion.userAnswer.trim()) {
      return this.showTip('请输入答案', 'incorrect');
    }

    // 验证用户输入是否为数字
    const userAnswer = parseFloat(currentQuestion.userAnswer);
    if (isNaN(userAnswer)) {
      return this.showTip('请输入有效的数字', 'incorrect');
    }

    const correctAnswer = currentQuestion.correctAnswer;

    this.setData({
      showResult: true,
      resultType: userAnswer === correctAnswer ? 'correct' : 'incorrect',
      resultMessage: userAnswer === correctAnswer ? '回答正确！' : '回答错误',
      isChecking: true
    });

    setTimeout(() => {
      this.setData({
        currentQuestionIndex: currentQuestionIndex + 1,
        correctCount: userAnswer === correctAnswer ? this.data.correctCount + 1 : this.data.correctCount,
        errorCount: userAnswer !== correctAnswer ? this.data.errorCount + 1 : this.data.errorCount
      });

      this.loadCurrentQuestion();

      if (currentQuestionIndex === questions.length - 1) {
        this.setData({ isComplete: true });
        this.recordPractice();
      }

      this.setData({ showResult: false, isChecking: false });
    }, 2000);
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

  // 处理运算类型选择
  selectTypes(e) {
    const values = e.detail.value;
    if (values.length === 0) {
      wx.showToast({ title: '至少选择一个运算类型', icon: 'none' });
      return;
    }

    // 将简短的标识转换为正确的运算类型名称
    const typeMap = {
      'add': 'addition',
      'subtract': 'subtraction',
      'multiply': 'multiplication',
      'divide': 'division',
      'mix': 'mixed'
    };

    const operationTypes = values.map(value => typeMap[value] || value);

    this.setData({
      operationTypes,
      defaultAdd: values.includes('add'),
      defaultSubtract: values.includes('subtract'),
      defaultMultiply: values.includes('multiply'),
      defaultDivide: values.includes('divide'),
      defaultMix: values.includes('mix')
    });
  },

  // 处理数字范围选择
  handleDigitChange(e) {
    this.setData({
      numberRange: e.detail.value
    });
  },

  // 题目数量控制 - 减少
  decrement() {
    if (this.data.count > 1) {
      this.setData({
        count: this.data.count - 1
      });
    }
  },

  // 题目数量控制 - 增加
  increment() {
    if (this.data.count < 20) {
      this.setData({
        count: this.data.count + 1
      });
    }
  },

  // 处理允许负数结果开关
  toggleNegative(e) {
    this.setData({
      allowNegative: e.detail.value
    });
  },

  // 处理启用计时器开关
  toggleTimer(e) {
    this.setData({
      enableTimer: e.detail.value
    });
  },

  // 时间设置 - 减少
  addTime() {
    if (this.data.setTime > 1) {
      this.setData({
        setTime: this.data.setTime - 1
      });
    }
  },

  // 时间设置 - 增加
  incTime() {
    if (this.data.setTime < 60) {
      this.setData({
        setTime: this.data.setTime + 1
      });
    }
  },

  // 显示结束模态框
  showEndModal() {
    wx.showModal({
      title: '提示',
      content: '确定要结束本次练习吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 确认结束，执行清空和返回逻辑
          this.setData({
            isPracticeStarted: false,
            currentQuestionIndex: 0,
            correctCount: 0,
            errorCount: 0,
            showResult: false,
            isComplete: false,
          });
        }
      }
    });
  },

  // 记录练习
  recordPractice() {
    const { startTime } = this.data;
    const endTime = new Date();
    const timeSpent = Math.floor((endTime - startTime) / 1000); // 转换为秒

    // 构建发送给后端的数据
    const practiceData = {
      label: "自定义练习",
      dateTime: this.formatDate(endTime),
      timeSpent: timeSpent,
      questionNums: this.data.count,
      correctNums: this.data.correctCount,
      type: 1,
      icon: "1",
      difficulty: "中等",
      data: this.data.questions.map((q, index) => ({
        userId: 1,
        question: q.question,
        userAnswer: q.userAnswer,
        dateTime: this.formatDate(endTime),
        successAnswer: q.correctAnswer,
        analyse: "1",
        type: "1",
        errorNums: q.userAnswer !== q.correctAnswer ? 1 : 0
      }))
    };

    // 发送数据到后端
    post('/api/v1/PracticeRecord/submitPractice', practiceData)
      .then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '记录成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '记录失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        wx.showToast({
          title: '记录失败',
          icon: 'none'
        });
        console.error('记录失败', err);
      });
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
});