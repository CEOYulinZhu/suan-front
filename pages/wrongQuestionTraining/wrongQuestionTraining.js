Page({
    data: {
      currentCategory: 'all', // 当前选中的分类（默认全选）
      allQuestions: [
        { id: 1, question: '58 + 68 = ?', category: '加法', errors: 3, date: '2025-04-19', correctAnswer: 126 },
        { id: 2, question: '47 + 10 = ?', category: '加法', errors: 3, date: '2025-04-14', correctAnswer: 57 },
        { id: 3, question: '95 - 36 = ?', category: '减法', errors: 2, date: '2025-04-13', correctAnswer: 59 },
        { id: 4, question: '82 - 15 = ?', category: '减法', errors: 3, date: '2025-04-08', correctAnswer: 67 },
        { id: 5, question: '16 × 4 = ?', category: '乘法', errors: 1, date: '2025-04-19', correctAnswer: 64 },
        { id: 6, question: '27 × 3 = ?', category: '乘法', errors: 2, date: '2025-04-10', correctAnswer: 81 },
        { id: 7, question: '84 ÷ 6 = ?', category: '除法', errors: 3, date: '2025-04-15', correctAnswer: 14 },
        { id: 8, question: '96 ÷ 8 = ?', category: '除法', errors: 1, date: '2025-04-20', correctAnswer: 12 },
        { id: 9, question: '18 + 5 × 3 = ?', category: '混合', errors: 4, date: '2025-04-05', correctAnswer: 33 },
        { id: 10, question: '50 - 24 ÷ 3 = ?', category: '混合', errors: 2, date: '2025-04-09', correctAnswer: 38 }],
      questions: [], // 过滤后的题目列表（用于渲染）
      selectedIds: [], // 存储已选题目ID（唯一标识，避免索引问题）
      selectedCount: 0 ,// 已选题目数量
      isChecked: false,//园框

    isPractice:false,
    currentQuestionIndex: 1,
    correctCount: 0,
    errorCount: 0,
    showResult: false,
    resultMessage: '',
    resultType: '',
    isComplete: false,
    isChecking: false,
    currentQuestion: {},
    userAnswers: {}, // 存储用户的答案

    },
  
    onLoad() {
      // 初始化时加载所有题目
      this.setData({
        questions: this.data.allQuestions,
      });
      this.updateSelectedStatus();

    },

 
  // 根据 selectedIds 更新 questions 中各项的 selected 字段
  updateSelectedStatus() {
    const updatedQuestions = this.data.questions.map(item => {
      return {
        ...item,
        selected: this.data.selectedIds.indexOf(item.id) !== -1
      }
    });
    this.setData({
      questions: updatedQuestions
    });
  },
// 题目点击事件处理函数
handleQuestionClick(event) {
    // 获取点击的题目ID，并转换为数字类型
    const id = Number(event.currentTarget.dataset.id);
    // 获取当前选中的ID数组
    const { selectedIds } = this.data;
    let newSelectedIds=[];
    if (selectedIds.includes(id)) {
      // 如果已存在，则过滤掉该ID
    //   console.log('有');
      newSelectedIds = selectedIds.filter(item => item !== id);
    } else {
      // 如果不存在，则添加该ID
    //   console.log('没有');
      newSelectedIds = [...selectedIds, id];
    }
    // console.log('newSelectedIds',newSelectedIds);
    // 更新数据，触发视图重新渲染
    this.setData({
      selectedIds: newSelectedIds,
      selectedCount: newSelectedIds.length
    });
    console.log(this.data.selectedIds);
    console.log(this.data.selectedIds.includes(2));
    // 更新 questions 中每个题目的 selected 状态
    this.updateSelectedStatus();
  },
    
    // 分类切换处理
    handleCategoryChange(e) {
        const category = e.currentTarget.dataset.category;
        let filteredQuestions;
        if (category === 'all') {
          filteredQuestions = this.data.allQuestions;
        } else {
          filteredQuestions = this.data.allQuestions.filter(item => item.category === category);
        }
        // 保留当前分类中存在的已选题目ID
        const retainedIds = filteredQuestions.map(item => item.id).filter(id => this.data.selectedIds.includes(id));
        this.setData({
          currentCategory: category,
          questions: filteredQuestions,
          selectedIds: retainedIds,
          selectedCount: retainedIds.length
        });
      },
    
       // 全选功能
    selectAll() {
      this.setData({
        selectedIds: this.data.questions.map(item => item.id),
        selectedCount: this.data.questions.length
      });
      const { selectedIds } = this.data;
      console.log(selectedIds);
      this.updateSelectedStatus();
    },
  
    // 清空功能
    clearAll() {
      this.setData({
        selectedIds: [],
        selectedCount: 0
      });
      this.updateSelectedStatus();
    },

  
    // 开始训练（可在此处添加跳转逻辑）
    startTraining() {
        if (this.data.selectedCount === 0) {
          wx.showToast({
            title: '请先选择题目',
            icon: 'none'
          });
          return;
        }
        this.setData({
          isPractice: true,
          currentQuestionIndex: 1,
          correctCount: 0,
          errorCount: 0,
          showResult: false,
          resultMessage: '',
          resultType: '',
          isComplete: false,
          isChecking: false,
          userAnswers: {},
          currentQuestion: this.getSelectedQuestion(1)
        });
      },
    // 获取选中的题目
    getSelectedQuestion(index) {
        const { selectedIds, allQuestions } = this.data;
        const questionId = selectedIds[index - 1];
        const question = allQuestions.find(q => q.id === questionId);
        return question;
      },

  // 提交答案
  onAnswerInput(e) {
    const { currentQuestionIndex } = this.data;
    const questionId = this.data.selectedIds[currentQuestionIndex - 1];
    this.setData({
      [`userAnswers.${questionId}`]: e.detail.value
    });
  },

  // 检查答案
  checkAnswer() {
    const { currentQuestionIndex, selectedCount } = this.data;
    if (currentQuestionIndex > selectedCount) {
      this.setData({
        isComplete: true,
        showResult: true,
        resultMessage: '恭喜你已完成所有题目！',
        resultType: 'success'
      });
      return;
    }

    this.setData({ isChecking: true });
    setTimeout(() => {
      const questionId = this.data.selectedIds[currentQuestionIndex - 1];
      const userAnswer = this.data.userAnswers[questionId];
      const currentQuestion = this.getSelectedQuestion(currentQuestionIndex);
      let isCorrect = false;

      if (userAnswer !== null && userAnswer !== undefined && userAnswer !== '') {
        const userAnswerValue = parseFloat(userAnswer);
        if (!isNaN(userAnswerValue)) {
          isCorrect = userAnswerValue === currentQuestion.correctAnswer;
        }
      }

      if (isCorrect) {
        this.setData({
          correctCount: this.data.correctCount + 1,
          resultMessage: '回答正确！',
          resultType: 'success'
        });
      } else {
        this.setData({
          errorCount: this.data.errorCount + 1,
          resultMessage: '回答错误！',
          resultType: 'error'
        });
      }

      this.setData({
        showResult: true,
        isChecking: false
      });

      setTimeout(() => {
        if (currentQuestionIndex < selectedCount) {
          this.setData({
            currentQuestionIndex: currentQuestionIndex + 1,
            showResult: false,
            currentQuestion: this.getSelectedQuestion(currentQuestionIndex + 1)
          });
        } else {
          this.setData({
            isComplete: true,
            resultMessage: '恭喜你已完成所有题目！',
            resultType: 'success'
          });
        }
      }, 1000);
    }, 1000);
  },

   // 切换勾勾状态
   toggleCheck() {
    this.setData({
      isChecked: !this.data.isChecked
    });
  },

  });