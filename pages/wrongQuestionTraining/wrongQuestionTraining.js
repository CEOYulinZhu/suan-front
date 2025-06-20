import { get } from '../../utils/request'; 
Page({
    data: {
      currentCategory: 'all', // 当前选中的分类（默认全选）
      allQuestions: [],
        categoryColor: [
            { category: '加法', color: '#1677ff' },
            { category: '减法', color: '#52c41a' },
            { category: '乘法', color: '#fa8c16' },
            { category: '除法', color: '#eb2f96' },
            { category: '混合运算', color: '#722ed1' }
          ],
          categoryColorMap: {} ,

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
    
    showEndModal: false,
    answerRecords: [], // 新增：答题记录数组
    },
  
    onLoad() {
        // 调用方法获取错题历史数据
    this.fetchMistakeHistory();
      this.updateSelectedStatus();
      //题目类型map
      const colorMap = this.data.categoryColor.reduce((acc, item) => {
        acc[item.category] = item.color;
        return acc;
      }, {});
       // 初始化时加载所有题目
       this.setData({
        questions: this.data.allQuestions,
        categoryColorMap: colorMap
      });
    },

 
  // 根据 selectedIds 更新 questions 中各项的 selected 字段
  updateSelectedStatus() {
    const { selectedIds, questions } = this.data;
    const updatedQuestions = questions.map(item => ({
        ...item,
        selected: selectedIds.includes(item.id) // 直接判断ID是否在已选列表
    }));
    this.setData({ questions: updatedQuestions });
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
        let filteredQuestions = category === 'all' 
            ? this.data.allQuestions 
            : this.data.allQuestions.filter(item => item.category === category);
        
        this.setData({
            currentCategory: category,
            questions: filteredQuestions,
            selectedCount: this.data.selectedIds.length, // 全局已选数量
            selectedIds: this.data.selectedIds, // 保留所有已选ID（关键：不丢失选中状态）
            totalQuestions: this.data.allQuestions.length
        }, () => {
            // 分类切换后，重新计算每个题目的选中状态（同步 selectedIds 和 questions.selected）
            this.updateSelectedStatus();
        });
        this.toggleCheck();
    },
    
       // 全选功能
       selectAll() {
        const currentCategoryQuestions = this.data.questions; // 当前分类题目
        const currentIds = currentCategoryQuestions.map(item => item.id);
        const newSelectedIds = [...new Set([...this.data.selectedIds, ...currentIds])]; // 去重合并
        this.setData({ 
          selectedIds: newSelectedIds, 
          selectedCount: newSelectedIds.length 
        });
        this.updateSelectedStatus(); // 同步状态
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
  
      // 记录答题情况到answerRecords
      const record = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer: userAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect
      };
      this.data.answerRecords.push(record);
  
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
        isChecking: false,
        answerRecords: this.data.answerRecords // 更新答题记录
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
            resultMessage: '专项训练完成！',
            resultType: 'success'
          });
        }
      }, 1000);
    }, 1000);
    isCorrect = userAnswerValue === currentQuestion.correctAnswer;
  },

   // 切换勾勾状态
   toggleCheck() {
    this.setData({
      isChecked: !this.data.isChecked
    });
  },
 // 显示结束确认模态框
 showEndModal() {
    this.setData({ showEndModal: true });
  },

  // 隐藏模态框（取消）
  hideEndModal() {
    this.setData({ showEndModal: false });
  },

  // 显示结束确认模态框（原生）
  showEndModal() {
    wx.showModal({
      title: '提示',
      content: '确定要结束本次练习吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 确认结束，执行清空和返回
          this.endPractice();
        }
      }
    });
  },
   // 结束练习逻辑
   endPractice() {
    // 清空已选题目和训练数据
    this.setData({
      selectedIds: [],
      selectedCount: 0,
      isPractice: false, // 切换回题目选择页
      currentQuestionIndex: 1,
      correctCount: 0,
      errorCount: 0,
      userAnswers: {},
      isComplete: false,
      showResult: false,
    });
    // 重新加载题目数据（触发 onLoad 初始化）
    this.onLoad();
  },
  handleReturnToWrongQuestions() {
    // 重定向到错题本页面（当前页面）
    wx.redirectTo({
      url: '/pages/wrongQuestionTraining/wrongQuestionTraining' // 当前页面路径
    });
  },
  handleReturnToPractice()  {
    // 重定向到错题本页面（当前页面）
    wx.switchTab({
      url: '/pages/practice/practice' // 当前页面路径
    });
  },

  // 获取错题历史数据的方法
  fetchMistakeHistory() {
    // 使用封装的get请求获取错题历史
    get('/api/v1/wrongQuestionTraining/getMistakeHistoryByUserId')
      .then(res => {
        if (res.code === 200) {
          // 处理返回的数据
          const mistakeHistory = res.data;
          // 将获取的数据转换为allQuestions期望的格式
          const processedQuestions = mistakeHistory.map(item => {
            return {
              id: item.id,
              question: item.question,
              // 根据type转换为对应的分类
              category: this.convertTypeToCategory(item.type),
              // 保留年月日
              date: item.dateTime.split(' ')[0],
              // 记录错误次数
              errors: item.errorNums,
              // 正确答案
              correctAnswer: parseInt(item.successAnswer, 10)
            };
          });
          // 更新allQuestions数据
          this.setData({
            allQuestions: processedQuestions
          });
          // 初始化题目列表（可以调用你已有的逻辑）
          this.initQuestions();
        } else {
          // 处理错误情况
          wx.showToast({
            title: res.msg || '获取错题历史失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        console.error('请求失败', err);
      });
  },

  // 根据type转换为对应的分类
  convertTypeToCategory(type) {
    const typeMap = {
      '1': '加法',
      '2': '减法',
      '3': '乘法',
      '4': '除法',
      '5': '混合运算'
    };
    return typeMap[type] || '未知分类'; // 默认为未知分类
  },

  // 初始化题目列表的方法
  initQuestions() {
    const colorMap = this.data.categoryColor.reduce((acc, item) => {
      acc[item.category] = item.color;
      return acc;
    }, {});

    this.setData({
      questions: this.data.allQuestions,
      categoryColorMap: colorMap
    });
    // 调用其他初始化逻辑
    this.updateSelectedStatus();
  },


  });