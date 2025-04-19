// pages/levelPractice/levelPractice.js
Page({
    data: {
        passed: 1,
        total: 16,
        levels: [
            { num: 1, type: '加法', locked: false, passed: true, star: 3, questionNum: 9, reward: 10 },
            { num: 2, type: '减法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 3, type: '乘法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 4, type: '混合运算', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 5, type: '加法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 6, type: '减法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 7, type: '乘法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 8, type: '混合运算', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 9, type: '加法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 10, type: '减法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 11, type: '乘法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 12, type: '混合运算', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 13, type: '加法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 14, type: '减法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 15, type: '乘法', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 },
            { num: 16, type: '混合运算', locked: true, passed: false, star: 0, questionNum: 9, reward: 10 }
        ],
        showModal: false,
        currentLevel: null,
        isAnswering: false,
        currentIndex: 0,
        currentQuestion: '',
        inputValue: '',
        correctNum: 0,
        wrongNum: 0,
        accuracyRate: 0,
        showGiveupModal: false,
        isResult: false,
        wrongList: [],
        isFirstComplete: true,
        progressWidth: 0,
        selectedQuestions: [],
        questionBank: {
            加法: [
                { question: '72 + 68', answer: 140 },
                { question: '47 + 51', answer: 98 },
                { question: '46 + 73', answer: 119 },
                { question: '68 + 36', answer: 104 },
                { question: '86 + 81', answer: 167 },
                { question: '37 + 22', answer: 59 },
                { question: '83 + 68', answer: 151 },
                { question: '74 + 78', answer: 152 },
                { question: '54 + 72', answer: 126 }
            ],
            减法: [
                { question: '98 - 32', answer: 66 },
                { question: '120 - 45', answer: 75 },
                { question: '85 - 37', answer: 48 },
                { question: '150 - 63', answer: 87 },
                { question: '77 - 29', answer: 48 },
                { question: '110 - 33', answer: 77 },
                { question: '92 - 46', answer: 46 },
                { question: '135 - 58', answer: 77 },
                { question: '64 - 28', answer: 36 }
            ],
            乘法: [
                { question: '12 × 5', answer: 60 },
                { question: '8 × 7', answer: 56 },
                { question: '15 × 4', answer: 60 },
                { question: '7 × 9', answer: 63 },
                { question: '14 × 6', answer: 84 },
                { question: '9 × 8', answer: 72 },
                { question: '11 × 7', answer: 77 },
                { question: '6 × 13', answer: 78 },
                { question: '10 × 12', answer: 120 }
            ],
            混合运算: [
                { question: '12 + 8 × 2', answer: 28 },
                { question: '25 - 15 ÷ 3', answer: 20 },
                { question: '3 × 6 + 12', answer: 30 },
                { question: '45 - 9 × 3', answer: 18 },
                { question: '16 ÷ 4 + 20', answer: 24 },
                { question: '5 × 7 - 15', answer: 20 },
                { question: '28 ÷ 7 + 14', answer: 18 },
                { question: '9 × 2 + 18', answer: 36 },
                { question: '30 - 12 ÷ 4', answer: 27 }
            ]
        },
        showRewardModal: false
    },

    handleLevelTap(e) {
        const idx = parseInt(e.currentTarget.dataset.id, 10);
        const levels = this.data.levels;
        if (idx < 0 || idx >= levels.length) {
            return;
        }
        const level = levels[idx];
        if (level && !level.locked) {
            this.setData({
                showModal: true,
                currentLevel: level
            });
        }
    },

    hideModal() {
        this.setData({ showModal: false });
    },

    startChallenge() {
        const currentLevel = this.data.currentLevel;
        const questions = this.data.questionBank[currentLevel.type];
        const selectedQuestions = [];
        while (selectedQuestions.length < currentLevel.questionNum) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            selectedQuestions.push(questions[randomIndex]);
        }
        this.setData({
            isAnswering: true,
            currentIndex: 0,
            correctNum: 0,
            wrongNum: 0,
            accuracyRate: 0,
            wrongList: [],
            currentQuestion: selectedQuestions[0].question,
            progressWidth: 0,
            selectedQuestions: selectedQuestions
        });
    },

    inputAnswer(e) {
        this.setData({ inputValue: e.detail.value });
    },

    checkAnswer() {
        const answer = this.data.inputValue;
        const currentQuestionObj = this.data.selectedQuestions[this.data.currentIndex];
        const correct = currentQuestionObj.answer;
        if (correct == answer) {
            this.setData({ correctNum: this.data.correctNum + 1 });
        } else {
            this.data.wrongList.push({
                question: currentQuestionObj.question,
                answer: correct
            });
            this.setData({ wrongNum: this.data.wrongNum + 1 });
        }
        this.setData({
            inputValue: '',
            currentIndex: this.data.currentIndex + 1,
            progressWidth: ((this.data.currentIndex + 1) / this.data.currentLevel.questionNum) * 100,
            accuracyRate: ((this.data.correctNum / this.data.currentLevel.questionNum) * 100).toFixed(2)
        });
        if (this.data.currentIndex + 1 < this.data.currentLevel.questionNum) {
            this.setData({
                currentQuestion: this.data.selectedQuestions[this.data.currentIndex + 1].question
            });
        } else {
            this.setData({
                isAnswering: false,
                isResult: true
            });
            // 解锁下一关逻辑
            const currentLevelNum = this.data.currentLevel.num;
            if (currentLevelNum < this.data.total) {
                const levels = this.data.levels;
                const nextLevelIndex = currentLevelNum - 1;
                if (nextLevelIndex + 1 < levels.length) {
                    levels[nextLevelIndex + 1].locked = false;
                    this.setData({ levels });
                }
            }
            // 显示奖励弹窗
            this.setData({ showRewardModal: true });
        }
    },

    showGiveupModal() {
        this.setData({ showGiveupModal: true });
    },

    confirmGiveUp() {
        this.setData({
            showGiveupModal: false,
            isAnswering: false
        });
    },

    cancelGiveUp() {
        this.setData({ showGiveupModal: false });
    },

    replayChallenge() {
        this.setData({
            isResult: false,
            correctNum: 0,
            wrongNum: 0,
            wrongList: [],
            isFirstComplete: true,
            currentIndex: 0,
            progressWidth: 0,
            showModal: false,
            showRewardModal: false
        });
        this.startChallenge();
    },

    backToLevel() {
        this.setData({
            isResult: false,
            isFirstComplete: false,
            showModal: false,
            showRewardModal: false
        });
    },

    claimReward() {
        this.setData({
            showRewardModal: false
        });
    }
});    