// pages/basicPractice/basicPractice.js
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
        isExitConfirmDialogVisible: false
    },
    onLoad: function () {
        this.setData({
            startTime: Date.now()
        });
    },
    inputAnswer: function (e) {
        this.setData({
            userAnswer: e.detail.value
        });
    },
    submitAnswer: function () {
        const userAnswer = this.data.userAnswer;
        const currentQuestion = this.data.questionContent;
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
        this.setData({
            currentQuestionIndex: currentQuestionIndex + 1 < totalQuestions? currentQuestionIndex + 1 : currentQuestionIndex,
            completedQuestions: completedQuestions,
            correctQuestions: correctQuestions,
            wrongQuestions: wrongQuestions,
            accuracyRate: accuracyRate,
            totalTime: totalTime.toFixed(0),
            questionContent: this.getNextQuestion()
        });
        wx.showToast({
            title: userAnswer == correctAnswer? '回答正确' : '回答错误',
            icon: 'none'
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
    showExitConfirmDialog: function () {
        this.setData({
            isExitConfirmDialogVisible: true
        });
    },
    cancelExit: function () {
        this.setData({
            isExitConfirmDialogVisible: false
        });
    },
    confirmExit: function () {
        wx.navigateBack({});
    }
});