// index.js
Page({
    data: {
      selectedTypes: ['add'], // 默认选中加法
      defaultAdd: true, // 初始默认选中状态
      defaultSubtract: false,
      defaultMultiply: false,
      defaultDivide: false,
      defaultMix: false,
    
      count: 10,

      allowNegative: false,
      enableTimer: false,
      setTime: 20,
    
      practice:false,


    questions: [],          // 所有题目数组
    currentQuestionIndex: 0, // 当前题号（从开始）
    showResult: false,        // 是否显示结果提示
    resultMessage: '',        // 结果提示信息
    resultType: '',           // 结果类型（correct/incorrect）
    isChecking: false,        // 正在验证答案状态
    isComplete: false,
    correctCount:0,
    errorCount: 0,

    MultipleAdditions:false,
    
    },
  
    onLoad(options) {
        
        this.setData({MultipleAdditions: options.value});
        this.generateQuestions();
        this.loadCurrentQuestion();
      },
  
    // 处理选择事件
    selectTypes(e) {
        const values = e.detail.value
        if (values.length === 0) {
          wx.showToast({ title: '至少选择一个运算类型', icon: 'none' })
          return ;
        }

      
        this.setData({
          selectedTypes: values,
          defaultAdd: values.includes('add'),
          defaultSubtract: values.includes('subtract'),
          defaultMultiply: values.includes('multiply'),
          defaultDivide: values.includes('divide'),
          defaultMix: values.includes('mix'),
        }, () => {
          // 在回调函数中输出最新值
          console.log('当前选中类型:', this.data.selectedTypes) 
        })
      },
      
//题目数量控制   
       // 减少数量
       decrement() {
        if (this.data.count > 1) {
          this.setData({
            count: this.data.count - 1
          });
        }
      },
      // 增加数量（添加不大于20的判断）
      increment() {
        if (this.data.count < 20) {
          this.setData({
            count: this.data.count + 1
          });
        }
      },
//时间控制   
      //选中，出现计时器
      handleSwitchChange(e) {
        const { key } = e.target.dataset;
        this.setData({ [key]: e.detail.value });
      },   
      handleTimerSwitch(e) {
        this.setData({ enableTimer: e.detail.value });
        // 计时器关闭时重置时间（可选逻辑）
        if (!e.detail.value) this.setData({ setTime: 20 });
      }, 
       // 减少
       addTime() {
        if (this.data.setTime > 1) {
          this.setData({
            setTime: this.data.setTime - 1
          });
        }
      },
      // 增加（添加不大于20的判断）
      incTime() {
        if (this.data.setTime < 60) {
          this.setData({
            setTime: this.data.setTime + 1
          });
        }
      },
      
      //点击事件
      practice(){
        this.setData({
            practice: !this.data.practice,

          });
      },
  // 生成题目（确保结果为3位数以内+重置字段初始化）
  generateQuestions() {
    const questions = [];
    const operators = ['+', '-'];
    const MultipleAdditions= this.data.MultipleAdditions;
// 生成两项加
    if (MultipleAdditions=='false') { 

        for (let i = 0; i < 20; i++) {
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
    };
    //生成三项加
    if (MultipleAdditions=='ture') {
 
        for (let i = 0; i < 20; i++) {
            let num1, num2, num3, operator;
            
            do {
              num1 = Math.floor(Math.random() * 1000);
              num2 = Math.floor(Math.random() * 1000);
              num3 = Math.floor(Math.random() * 1000);
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
              num3,
              operator,
              correctAnswer: operator === '+' ? num1 + num2 + num3 : num1 - num2 - num3,
              userAnswer: '' // 初始化用户答案为空（关键重置字段）
            });
              }
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
    const count= parseInt(this.data.count);
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
      if (currentQuestionIndex < count) {
        this.setData({ currentQuestionIndex: currentQuestionIndex + 1 ,
            correctCount: userAnswer === correctAnswer ? this.data.correctCount + 1 : this.data.correctCount,
            errorCount: userAnswer !== correctAnswer ? this.data.errorCount + 1 : this.data.errorCount
        
                    });
        this.loadCurrentQuestion(); // 加载下一题时自动重置input框
      }
       if(currentQuestionIndex === count-1) {
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

      nextTime(){
        this.setData({
            practice:false,
          });
      },

      
    
  })