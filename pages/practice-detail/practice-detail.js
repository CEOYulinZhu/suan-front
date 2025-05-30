// pages/practice-detail/practice-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parcticeType: null,
    selectList: {},
    user: {
      basicExercises: {
        type: '基础练习',
        iconPath: '/assets/icons/CalculatorOutline_32px.svg',
        date: '2023-04-02',
        time: '10:30',
        difficulty: '中等',
        questionType: '加法',
        correctness: '80%',
        statsLsit: [
          {
            type: '总题数',
            value: '10'
          },
          {
            type: '正确题数',
            value: '8'
          },
          {
            type: '总用时',
            value: '180秒'
          },
          {
            type: '平均用时',
            value: '18秒/题'
          },
          {
            type: '正确率',
            value: '80%'
          },
          {
            type: '错误题数',
            value: '2'
          },
        ],
        questionList: [
          {
            question: '5 + 3 = ?',
            type: true,
            userAnswer:  8,
            correctAnswer: 8
          },
          {
            question: '12 + 7 = ?',
            type: true,
            userAnswer:  19,
            correctAnswer: 19
          },
          {
            question: '24 + 18 = ?',
            type: true,
            userAnswer:  42,
            correctAnswer: 42
          },
          {
            question: '35 + 27 = ?',
            type: true,
            userAnswer:  62,
            correctAnswer: 62
          },
          {
            question: '49 + 33 = ?',
            type: false,
            userAnswer: 83,
            correctAnswer: 82
          },
          {
            question: '56 + 29 = ?',
            type: true,
            userAnswer:  85,
            correctAnswer: 85
          },
          {
            question: '71 + 45 = ?',
            type: true,
            userAnswer:  116,
            correctAnswer: 116
          },
          {
            question: '83 + 59 = ?',
            type: true,
            userAnswer:  142,
            correctAnswer: 142
          },
          {
            question: '97 + 64 = ?',
            type: false,
            userAnswer:  162,
            correctAnswer: 161
          },
          {
            question: '108 + 73 = ?',
            type: true,
            userAnswer:  181,
            correctAnswer: 181
          }
        ]
      },

      //别的类型练习时的数据
      timedChallenge: {

      }
    },
    isPracticeActive: false,
    isHistoryActive: false,
  },

  // 跳转practice界面
  toPractice() {
    this.setData({ isPracticeActive: true });
    
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/practice/practice'
      });
      this.setData({ isPracticeActive: false });
    }, 400);
  },

  // 跳转history界面
  toHistory() {
    this.setData({ isHistoryActive: true });
    
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/history/history',
      });
      this.setData({ isHistoryActive: false });
    }, 400);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type = options.type; // 从url中提取type参数
    this.setData({
      practiceType: type // 存储到data中供页面使用
    });
    
    if(type === '0') {
      this.setData({selectList: this.data.user.basicExercises});
    }
    else if(type === '1') {
      this.setData({selectList: this.data.user.basicExercises});
    }
    else if(type === '2') {
      this.setData({selectList: this.data.user.basicExercises});
    }
    else if(type === '3') {
      this.setData({selectList: this.data.user.basicExercises});
    }
    else if(type === '4') {
      this.setData({selectList: this.data.user.basicExercises});
    }
    else {
      this.setData({selectList: this.data.user.basicExercises});
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})