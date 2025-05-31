// pages/level/level.js
Page({
    data: {
        passed: 0,
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
        showRewardModal: false,
        progress: 0,
        // 新增提示相关数据
        showResultTip: false,
        resultTipType: '', // 'correct', 'wrong', 'warning'
        resultTipMessage: ''
    },

    onLoad() {
        this.updateProgress();
    },

    handleLevelTap(e) {
        const idx = parseInt(e.currentTarget.dataset.id, 10);
        const levels = this.data.levels;
        if (idx < 0 || idx >= levels.length) {
          return;
        }
        const level = levels[idx];
        if (level &&!level.locked) {
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
        
        // 确保随机选择的题目不重复
        while (selectedQuestions.length < currentLevel.questionNum) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            const selected = questions[randomIndex];
            if (!selectedQuestions.some(q => q.question === selected.question)) {
                selectedQuestions.push(selected);
            }
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
        // 检查输入是否为空
        if (!this.data.inputValue.trim()) {
            this.showResultTip('warning', '请输入答案');
            return;
        }
        
        const currentIndex = this.data.currentIndex;
        const selectedQuestions = this.data.selectedQuestions;
        
        if (currentIndex >= selectedQuestions.length) {
            console.error('Invalid question index');
            return;
        }
        
        const currentQuestionObj = selectedQuestions[currentIndex];
        const userAnswer = parseInt(this.data.inputValue);
        const correctAnswer = currentQuestionObj.answer;
        
        let newCorrectNum = this.data.correctNum;
        let newWrongNum = this.data.wrongNum;
        let newWrongList = this.data.wrongList.concat();
        
        if (userAnswer === correctAnswer) {
            newCorrectNum++;
            this.showResultTip('correct', '回答正确');
        } else {
            newWrongNum++;
            newWrongList.push({
                question: currentQuestionObj.question,
                answer: correctAnswer
            });
            this.showResultTip('wrong', `回答不正确，正确答案是${correctAnswer}`);
        }
        
        const totalAnswered = newCorrectNum + newWrongNum;
        const accuracyRate = totalAnswered > 0 
            ? ((newCorrectNum / totalAnswered) * 100).toFixed(2) 
            : 0;
            
        const progressWidth = ((currentIndex + 1) / this.data.currentLevel.questionNum) * 100;
        
        if (currentIndex + 1 >= this.data.currentLevel.questionNum) {
            const levels = this.data.levels.slice();
            
            // 使用正确的索引解锁下一关
            if (this.data.currentLevel.num < this.data.total) {
                const nextLevelIndex = this.data.currentLevel.num;
                if (nextLevelIndex < levels.length) {
                    levels[nextLevelIndex].locked = false;
                }
            }
            
            const currentLevelIndex = this.data.levels.findIndex(
                level => level.num === this.data.currentLevel.num
            );
            
            if (currentLevelIndex > -1) {
                const wasNotPassed = !levels[currentLevelIndex].passed;
                levels[currentLevelIndex].passed = true;
                
                const correctRate = (newCorrectNum / this.data.currentLevel.questionNum) * 100;
                let stars = 0;
                if (correctRate >= 90) {
                    stars = 3;
                } else if (correctRate >= 70) {
                    stars = 2;
                } else {
                    stars = 1;
                }
                levels[currentLevelIndex].star = stars;
                
                this.setData({ 
                    levels,
                    showRewardModal: wasNotPassed 
                });
            }
            
            this.setData({
                inputValue: '',
                correctNum: newCorrectNum,
                wrongNum: newWrongNum,
                accuracyRate: accuracyRate,
                wrongList: newWrongList,
                currentIndex: currentIndex + 1,
                progressWidth: progressWidth,
                isAnswering: false,
                isResult: true
            });
            
            this.updateProgress();
        } else {
            this.setData({
                inputValue: '',
                correctNum: newCorrectNum,
                wrongNum: newWrongNum,
                accuracyRate: accuracyRate,
                wrongList: newWrongList,
                currentIndex: currentIndex + 1,
                progressWidth: progressWidth,
                currentQuestion: selectedQuestions[currentIndex + 1].question
            });
        }
    },
    
    // 显示结果提示的辅助函数
    showResultTip(type, message) {
        this.setData({
            showResultTip: true,
            resultTipType: type,
            resultTipMessage: message
        });
        
        // 2秒后自动隐藏提示
        setTimeout(() => {
            this.setData({ showResultTip: false });
        }, 2000);
    },
    
    // 关闭结果提示
    closeResultTip() {
        this.setData({ showResultTip: false });
    },

    showGiveupModal() {
        this.setData({ showGiveupModal: true });
    },

    confirmGiveUp() {
        this.setData({
          showGiveupModal: false,
          isAnswering: false,
          isResult: false,
          showModal: false,
          currentIndex: 0,
          correctNum: 0,
          wrongNum: 0,
          inputValue: '',
          wrongList: [],
          progressWidth: 0
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
            showModal: false,
            showRewardModal: false
        });
    },

    claimReward() {
        this.setData({
            showRewardModal: false
        });
    },

    updateProgress() {
        const passedCount = this.data.levels.filter(level => level.passed).length;
        const progressPercentage = (passedCount / this.data.total) * 100;
        this.setData({
            passed: passedCount,
            progress: progressPercentage.toFixed(0)
        });
    }
});