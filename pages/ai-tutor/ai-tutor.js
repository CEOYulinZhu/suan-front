Page({
  data: {
    activeTab: '互动练习',
    currentPage: '互动练习', // 默认显示的页面
    question: {
      num1: 17,
      num2: 10,
      answer: 27,
      options: [25, 26, 27, 28],
      selectedOption: null,
      isCorrect: null
    },
    showVideo: true,
    currentVideoIndex: 0,
    videos: [
      '/assets/ai/math-video1.jpg',
      '/assets/ai/math-video2.jpg'
    ],
    
    visualize: {
      tens1: 10,
      ones1: 7,
      tens2: 10,
      ones2: 0,
      sumTens: 20,
      sumOnes: 7,
      sumTotal: 27
    },
    progress: {
      overall: 68,
      addition: 65,
      consecutive: 40,
      multiplication: 80,
      application: 25
    },
    learningPaths: [
      { title: '加法进位专题', progress: '3/5', status: '进行中', description: '掌握加法进位的原理和方法' },
      { title: '退位减法专题', progress: '1/5', status: '进行中', description: '学习退位减法的计算技巧' },
      { title: '混合运算专题', progress: '未开始', status: '未开始', description: '综合运用加减法解决问题' }
    ],
    hotQuestions: [
      '怎么计算25+17?',
      '进位加法怎么算?',
      '连加题有什么技巧?',
      '退位减法怎么教孩子?',
      '口算有哪些常见错误?',
      '如何提高计算速度?'
    ],
    messages: [
      {
        type: 'assistant',
        content: '你好！我是你的AI数学老师，我可以帮你解决口算问题，提供可视化解释！试试问我"怎么计算25+17?"',
        time: '20:49'
      }
    ],
    userMessage: ''
  },
  
  onLoad: function() {
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },
  
  // 切换标签页
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab,
      currentPage: tab
    });
  },
  
  // 生成新题目
  generateNewQuestion: function() {
    const num1 = Math.floor(Math.random() * 14) + 10; // 10-99之间的随机数
    const num2 = Math.floor(Math.random() * 14) + 10; // 10-99之间的随机数
    const answer = num1 + num2;
    const options = this.generateOptions(answer);
    
    // 拆分数字
    const tens1 = Math.floor(num1 / 10) * 10;
    const ones1 = num1 % 10;
    const tens2 = Math.floor(num2 / 10) * 10;
    const ones2 = num2 % 10;
    const sumTens = tens1 + tens2;
    const sumOnes = ones1 + ones2;
    const sumTotal = sumTens + sumOnes;
    
    this.setData({
      'question.num1': num1,
      'question.num2': num2,
      'question.answer': answer,
      'question.options': options,
      'question.selectedOption': null,
      'question.isCorrect': null,
      'visualize.tens1': tens1,
      'visualize.ones1': ones1,
      'visualize.tens2': tens2,
      'visualize.ones2': ones2,
      'visualize.sumTens': sumTens,
      'visualize.sumOnes': sumOnes,
      'visualize.sumTotal': sumTotal
    });
  },
  
  // 生成选项
  generateOptions: function(answer) {
    const options = [answer];
    while (options.length < 4) {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      if (!options.includes(randomNum)) {
        options.push(randomNum);
      }
    }
    // 打乱选项顺序
    return options.sort(() => Math.random() - 0.5);
  },
  
  // 检查答案
  checkAnswer: function(e) {
    const userAnswer = e.currentTarget.dataset.value;
    const isCorrect = userAnswer == this.data.question.answer;
    
    if (isCorrect) {
      wx.showToast({
        title: '答对了！',
        icon: 'success'
      });
      
      this.setData({
        'question.selectedOption': userAnswer,
        'question.isCorrect': true
      });
    } else {
      wx.showToast({
        title: '答错了！',
        icon: 'none'
      });
      
      this.setData({
        'question.selectedOption': userAnswer,
        'question.isCorrect': false
      });
    }
  },
  
  // 下一题
  nextQuestion: function() {
    this.setData({
      'question.selectedOption': null,
      'question.isCorrect': null
    });
    this.generateNewQuestion();
  },
  
  // 切换视频
  changeVideo: function(e) {
    const index = e.detail.current;
    this.setData({
      currentVideoIndex: index
    });
  },
  
  // 发送消息
  sendMessage: function() {
    const message = this.data.userMessage.trim();
    if (message) {
      const newMessage = {
        type: 'user',
        content: message,
        time: this.formatTime(new Date())
      };
      
      this.setData({
        messages: [...this.data.messages, newMessage],
        userMessage: ''
      });
      
      // 模拟AI回复
      setTimeout(() => {
        const reply = {
          type: 'assistant',
          content: '好的，让我来帮你解答这个问题。17 + 10 = 27。你可以先将17拆分为10 + 7，然后将10拆分为10 + 0。接着计算十位数10 + 10 = 20，再计算个位数7 + 0 = 7。最后将结果相加20 + 7 = 27。',
          time: this.formatTime(new Date())
        };
        
        this.setData({
          messages: [...this.data.messages, reply]
        });
      }, 1000);
    }
  },
  
  // 格式化时间
  formatTime: function(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  },
  
  // 输入框变化
  onInput: function(e) {
    this.setData({
      userMessage: e.detail.value
    });
  }
});