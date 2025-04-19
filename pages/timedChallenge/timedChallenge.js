// pages/timedChallenge/timedChallenge.js
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
      answerDetail: [],
      startTime: 0,
      answerTimes: [],
      currentQuestionAnswer: '' // 新增：存储当前题目正确答案
    },
  
    startChallenge() {
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
        answerDetail: [],
        startTime: 0,
        answerTimes: [],
        currentQuestionAnswer: ''
      });
      const countdown = setInterval(() => {
        if (this.data.countdown > 1) {
          this.setData({ countdown: this.data.countdown - 1 });
        } else {
          clearInterval(countdown);
          this.setData({
            isCountdown: false,
            isAnswering: true,
            startTime: Date.now()
          });
          this.randomNextQuestion();
          this.startTimeCountdown();
        }
      }, 1000);
    },
  
    // 生成随机题目
    generateQuestion() {
      const num1 = Math.floor(Math.random() * 100); // 生成0-99的数
      const num2 = Math.floor(Math.random() * 100);
      const operator = Math.random() < 0.5? '+' : '-'; // 随机加减
      let answer;
      if (operator === '+') {
        answer = num1 + num2;
      } else {
        // 确保减法结果非负
        if (num1 < num2) [num1, num2] = [num2, num1];
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
        currentQuestionAnswer: newQuestion.answer // 存储当前题目正确答案
      });
    },
  
    inputAnswer(e) {
      this.setData({ answer: e.detail.value });
    },
  
    submitAnswer() {
      if (!this.data.isAnswering) return;
      const answer = this.data.answer;
      const isCorrect = answer === this.data.currentQuestionAnswer; // 使用存储的答案判断
      const answerTime = Date.now() - this.data.startTime;
      this.data.answerTimes.push(answerTime);
  
      this.setData({
        completedQuestions: this.data.completedQuestions + 1,
        [isCorrect? 'correctQuestions' : 'wrongQuestions']: this.data[isCorrect? 'correctQuestions' : 'wrongQuestions'] + 1,
        accuracyRate: (this.data.correctQuestions / this.data.completedQuestions * 100).toFixed(0),
        answer: ''
      });
  
      this.data.answerDetail.push({
        question: this.data.currentQuestion,
        answer: answer,
        isCorrect: isCorrect,
        correctAnswer: this.data.currentQuestionAnswer,
        time: (answerTime / 1000).toFixed(0)
      });
  
      if (this.data.remainingTime > 0) {
        this.randomNextQuestion();
        this.setData({
          startTime: Date.now()
        });
      } else {
        this.endChallenge();
      }
    },
  
    startTimeCountdown() {
      const interval = setInterval(() => {
        this.setData({ remainingTime: this.data.remainingTime - 1 });
        this.setData({ timeProgress: this.data.remainingTime / 60 * 100 });
        if (this.data.remainingTime <= 0) {
          clearInterval(interval);
          this.setData({
            isAnswering: false
          });
          this.endChallenge();
        }
      }, 1000);
    },
  
    endChallenge() {
      this.setData({
        isFinished: true,
        averageTime: this.data.answerTimes.length > 0? (this.data.answerTimes.reduce((sum, time) => sum + time, 0) / this.data.answerTimes.length / 1000).toFixed(1) : 0,
        speedRating: (this.data.averageTime < 3)? '极速' : (this.data.averageTime < 5)? '快速' : '普通'
      });
    },
  
    retryChallenge() {
      this.startChallenge();
    },
  
    returnToSelect() {
      wx.navigateBack();
    }
  });