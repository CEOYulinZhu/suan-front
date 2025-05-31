Page({
    data: {
      isCountdown: false,
      isAnswering: false,
      isFinished: false,
      countdown: 3,
      remainingTime: 60,
      timeProgress: 100,
      currentQuestion: '',
      answer: '',
      completedQuestions: 0,
      correctQuestions: 0,
      wrongQuestions: 0,
      accuracyRate: 0,
      speedRating: '',
      speedRatingClass: '',
      answerDetail: [], // 存储答题详情
      startTime: 0,
      answerTimes: [],
      currentQuestionAnswer: '',
      timeColorClass: '',
      averageTime: 0,
      countdownInterval: null,
      timeCountdownInterval: null,
      answerTipVisible: false,
      answerTipMessage: '',
      isSubmitting: false,
      answerTipTimeout: null
    },
  
    // 生命周期：页面卸载时清除定时器
    onUnload() {
      this.clearAllIntervals();
      if (this.data.answerTipTimeout) {
        clearTimeout(this.data.answerTipTimeout);
      }
    },
  
    // 清除所有定时器
    clearAllIntervals() {
      if (this.data.countdownInterval) {
        clearInterval(this.data.countdownInterval);
        this.setData({ countdownInterval: null });
      }
      if (this.data.timeCountdownInterval) {
        clearInterval(this.data.timeCountdownInterval);
        this.setData({ timeCountdownInterval: null });
      }
    },
  
    startChallenge() {
      this.clearAllIntervals();
      if (this.data.answerTipTimeout) {
        clearTimeout(this.data.answerTipTimeout);
      }
  
      this.setData({
        isCountdown: true,
        isAnswering: false,
        isFinished: false,
        countdown: 3,
        remainingTime: 60,
        timeProgress: 100,
        currentQuestion: '',
        answer: '',
        completedQuestions: 0,
        correctQuestions: 0,
        wrongQuestions: 0,
        accuracyRate: 0,
        speedRating: '',
        speedRatingClass: '',
        answerDetail: [], // 重置答题详情
        startTime: 0,
        answerTimes: [],
        currentQuestionAnswer: '',
        timeColorClass: '',
        averageTime: 0,
        answerTipVisible: false,
        answerTipMessage: '',
        isSubmitting: false,
        answerTipTimeout: null
      });
  
      const countdownInterval = setInterval(() => {
        if (this.data.countdown > 1) {
          this.setData({ countdown: this.data.countdown - 1 });
        } else {
          clearInterval(countdownInterval);
          
          // 直接在倒计时结束时生成题目
          const newQuestion = this.generateQuestion();
          this.setData({
            isCountdown: false,
            isAnswering: true,
            startTime: Date.now(),
            currentQuestion: newQuestion.question,
            currentQuestionAnswer: newQuestion.answer
          });
          
          this.startTimeCountdown();
        }
      }, 1000);
  
      this.setData({ countdownInterval });
    },
  
    // 修复num1/num2只读问题
    generateQuestion() {
      let num1 = Math.floor(Math.random() * 100); // 使用let允许修改
      let num2 = Math.floor(Math.random() * 100);
      const operator = Math.random() < 0.5 ? '+' : '-';
      let answer;
  
      if (operator === '+') {
        answer = num1 + num2;
      } else {
        if (num1 < num2) [num1, num2] = [num2, num1]; // 修复交换逻辑
        answer = num1 - num2;
      }
  
      return {
        question: `${num1} ${operator} ${num2} =?`,
        answer: answer.toString()
      };
    },
  
    randomNextQuestion() {
      const newQuestion = this.generateQuestion();
      this.setData({
        currentQuestion: newQuestion.question,
        currentQuestionAnswer: newQuestion.answer,
        answerTipVisible: false,
        answer: ''
      });
    },
  
    inputAnswer(e) {
      this.setData({ answer: e.detail.value });
    },
  
    submitAnswer() {
      if (this.data.isSubmitting) return;
      if (!this.data.isAnswering) return;
  
      const answer = this.data.answer.trim();
      if (!answer) {
        this.showAnswerTip('请输入答案', 2000);
        return;
      }
  
      this.setData({ isSubmitting: true });
  
      const isCorrect = answer === this.data.currentQuestionAnswer;
      const answerTime = Date.now() - this.data.startTime;
      this.data.answerTimes.push(answerTime);
  
      const completedQuestions = this.data.completedQuestions + 1;
      const correctQuestions = isCorrect ? this.data.correctQuestions + 1 : this.data.correctQuestions;
      const wrongQuestions = isCorrect ? this.data.wrongQuestions : this.data.wrongQuestions + 1;
      const averageTime = this.calculateAverageTime();
  
      // 记录答题详情
      const detailItem = {
        question: this.data.currentQuestion,
        userAnswer: answer,
        correctAnswer: this.data.currentQuestionAnswer,
        isCorrect: isCorrect,
        time: (answerTime / 1000).toFixed(1),
        timeClass: answerTime < 3000 ? 'fast' : (answerTime < 5000 ? 'medium' : 'slow')
      };
  
      this.data.answerDetail.push(detailItem);
      
      // 更新数据绑定
      this.setData({
        completedQuestions,
        correctQuestions,
        wrongQuestions,
        accuracyRate: completedQuestions > 0 ? (correctQuestions / completedQuestions * 100).toFixed(0) : 0,
        averageTime,
        answerDetail: this.data.answerDetail // 确保数据更新到视图层
      });
  
      this.showAnswerTip(
        isCorrect ? '回答正确!' : `回答不正确，正确答案是${this.data.currentQuestionAnswer}`,
        1500
      );
  
      setTimeout(() => {
        if (this.data.remainingTime > 0) {
          this.randomNextQuestion();
          this.setData({ startTime: Date.now(), isSubmitting: false });
        } else {
          this.endChallenge();
        }
      }, 1500);
    },
  
    startTimeCountdown() {
      if (this.data.timeCountdownInterval) {
        clearInterval(this.data.timeCountdownInterval);
      }
  
      const timeCountdownInterval = setInterval(() => {
        const remainingTime = this.data.remainingTime - 1;
        let timeColorClass = '';
  
        if (remainingTime <= 10) {
          timeColorClass = 'red';
        } else if (remainingTime <= 30) {
          timeColorClass = 'yellow';
        }
  
        this.setData({
          remainingTime,
          timeProgress: remainingTime / 60 * 100,
          timeColorClass
        });
  
        if (remainingTime <= 0) {
          clearInterval(timeCountdownInterval);
          this.setData({
            isAnswering: false,
            isSubmitting: false
          });
          this.endChallenge();
        }
      }, 1000);
  
      this.setData({ timeCountdownInterval });
    },
  
    endChallenge() {
      const averageTime = this.calculateAverageTime();
      let speedRating = '普通';
      let speedRatingClass = 'normal';
  
      if (averageTime < 3) {
        speedRating = '极速';
        speedRatingClass = 'fast';
      } else if (averageTime < 5) {
        speedRating = '快速';
        speedRatingClass = 'medium';
      }
  
      this.setData({
        isFinished: true,
        averageTime,
        speedRating,
        speedRatingClass,
        answerTipVisible: false,
        isSubmitting: false
      });
    },
  
    retryChallenge() {
      this.startChallenge();
    },
  
    returnToSelect() {
      wx.navigateBack();
    },
  
    showAnswerTip(message, duration = 1500) {
      if (this.data.answerTipTimeout) {
        clearTimeout(this.data.answerTipTimeout);
      }
      
      this.setData({
        answerTipVisible: true,
        answerTipMessage: message
      });
      
      const timeoutId = setTimeout(() => {
        this.setData({ answerTipVisible: false });
      }, duration);
      
      this.setData({ answerTipTimeout: timeoutId });
    },
  
    hideAnswerTip() {
      if (this.data.answerTipTimeout) {
        clearTimeout(this.data.answerTipTimeout);
      }
      this.setData({ answerTipVisible: false });
    },
  
    calculateAverageTime() {
      const answerTimes = this.data.answerTimes;
      return answerTimes.length > 0 
        ? (answerTimes.reduce((sum, time) => sum + time, 0) / answerTimes.length / 1000).toFixed(1) 
        : 0;
    }
  });