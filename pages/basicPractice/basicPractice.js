Page({
    data: {
        currentQuestionIndex: 0,
        totalQuestions: 10,
        questionContent: "4 + 3 =?",
        completedQuestions: 0,
        correctQuestions: 0,
        wrongQuestions: 0,
        accuracyRate: 0,
        totalTime: 0,
        startTime: null,
        userAnswer: '',
        isExitConfirmDialogVisible: false,
        isCompleted: false,
        answerDetails: []
    },
    onLoad: function () {
        this.setData({
            startTime: Date.now()
        });
    },
    inputAnswer: function (e) {
        const value = e.detail.value;
        const validValue = value.match(/^-?\d*$/)?.[0] || '';
      
        let formattedValue = validValue;
        if (formattedValue.startsWith('-') && formattedValue.length === 1) {
            formattedValue = '-';
        } else {
            formattedValue = formattedValue.replace(/-+/g, '-').replace('--', '-');
            formattedValue = formattedValue.slice(0, 10);
        }
      
        this.setData({
            userAnswer: formattedValue
        });
    },
    submitAnswer: function () {
        const userAnswer = this.data.userAnswer;
        const currentQuestion = this.data.questionContent;
        
        if (userAnswer === '' || userAnswer === '-') {
            wx.showToast({
              title: '请输入答案',
              icon: 'none'
            });
            return;
        }
        
        const correctAnswer = this.calculateAnswer(currentQuestion);
        const currentQuestionIndex = this.data.currentQuestionIndex;
        const totalQuestions = this.data.totalQuestions;
        let completedQuestions = this.data.completedQuestions;
        let correctQuestions = this.data.correctQuestions;
        let wrongQuestions = this.data.wrongQuestions;
        
        if (userAnswer == correctAnswer) {
            correctQuestions++;
        } else {
            wrongQuestions++;
        }
        
        completedQuestions++;
        const accuracyRate = (correctQuestions / completedQuestions * 100).toFixed(0);
        const totalTime = (Date.now() - this.data.startTime) / 1000;
        
        const answerDetail = {
            question: currentQuestion,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isCorrect: userAnswer == correctAnswer
        };
        
        this.setData({
            currentQuestionIndex: currentQuestionIndex + 1 < totalQuestions ? currentQuestionIndex + 1 : currentQuestionIndex,
            completedQuestions: completedQuestions,
            correctQuestions: correctQuestions,
            wrongQuestions: wrongQuestions,
            accuracyRate: accuracyRate,
            totalTime: totalTime.toFixed(0),
            questionContent: this.getNextQuestion(),
            userAnswer: '',
            answerDetails: [...this.data.answerDetails, answerDetail],
            isCompleted: completedQuestions >= totalQuestions
        });
        
        if (userAnswer == correctAnswer) {
            wx.showToast({
                title: '回答正确',
                icon: 'none'
            });
        } else {
            wx.showToast({
                title: `回答不正确，正确答案是${correctAnswer}`,
                icon: 'none',
                duration: 2000
            });
        }
    },
    restartPractice: function () {
        this.setData({
            currentQuestionIndex: 0,
            completedQuestions: 0,
            correctQuestions: 0,
            wrongQuestions: 0,
            accuracyRate: 0,
            totalTime: 0,
            startTime: Date.now(),
            isCompleted: false,
            userAnswer: '',
            answerDetails: []
        });
        
        const firstQuestion = this.getNextQuestion();
        this.setData({
            questionContent: firstQuestion
        });
    },
    calculateAnswer: function (question) {
        const expression = question.replace('?', '');
        const parts = expression.split(' ');
        let result = parseInt(parts[0]);
        for (let i = 1; i < parts.length; i += 2) {
            const operator = parts[i];
            const num = parseInt(parts[i + 1]);
            if (operator === '+') {
                result += num;
            } else if (operator === '-') {
                result -= num;
            } else if (operator === '*') {
                result *= num;
            }
        }
        return result;
    },
    getNextQuestion: function () {
        const operators = ['+', '-', '*'];
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operator = operators[Math.floor(Math.random() * operators.length)];
        return `${num1} ${operator} ${num2} =?`;
    },
    cancelExit: function () {
        this.setData({
            isExitConfirmDialogVisible: false
        });
    },
    confirmExit: function () {
        wx.navigateBack({});
    },
    goBackToSelect() {
        wx.navigateBack();
    }
});  