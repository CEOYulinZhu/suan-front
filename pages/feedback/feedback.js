Page({
  data: {
    currentTab: 'feedback',
    textareaLength: 0,
    rating: 0,
    feedbackContent: '', // 新增，用于存储textarea内容
    inputContent: '',    // 新增，存储 input 内容
    faqList: [
      {
        question: "如何开始我的第一次练习?",
        answer: "在首页点击'开始练习'按钮，或者在底部导航栏选择'练习'，然后选择合适的练习模式即可开始练习。"
      },
      {
        question: "如何查看我的错题集?",
        answer: "在'我的'页面找到'错题集'，或者在练习页面选择'错题练习'，系统会自动记录并整理您做错的题目。"
      },
      {
        question: "如何使用AI辅导功能?",
        answer: "点击底部导航栏的'AI辅导'，您可以向AI助手提问，获取针对性的解答和可视化的解释。"
      },
      {
        question: "如何更改练习难度?",
        answer: "在'设置'页面的'练习设置'中，您可以调整默认难度等级，也可以在开始练习前选择难度。"
      },
      {
        question: "如何查看学习报告?",
        answer: "在'我的'页面找到'学习报告'，系统会自动生成您的练习数据统计和进步报告。"
      }
    ]
  },
  navigateToFeedback() {
    this.setData({
      currentTab: 'feedback'
    });
  },
  navigateToFAQ() {
    this.setData({
      currentTab: 'faq'
    });
  },
  handleTextareaInput(e) {
    this.setData({
      feedbackContent: e.detail.value, // 更新textarea内容
      textareaLength: e.detail.value.length
    });
  },
  handleInput(e) { // 新增，处理 input 的输入
    this.setData({
      inputContent: e.detail.value
    });
  },
  rateApp(e) {
    const rate = e.currentTarget.dataset.rate;
    this.setData({
      rating: rate
    });
  },
  submitFeedback() {
    const { textareaLength, rating, feedbackContent, inputContent } = this.data;
    if (textareaLength > 0) {
      wx.showModal({
        title: '',
        content: '感谢您的反馈！我们会尽快处理。',
        success: (res) => {
          if (res.confirm) {
             // 后端接口地址
             console.log(feedbackContent+"评论传入后端")
             // wx.request({
             //   url: 'https://your-domain.com/api/submit-feedback', // 替换为实际接口地址
             //   method: 'POST',
             //   data: {
             //     feedback: feedbackContent,
             //     contact: contact,
             //     rating: rating
             //   }
             // })
          }
          this.setData({
            feedbackContent: '', // 清空 textarea 内容
            inputContent: '',    // 清空 input 内容
            textareaLength: 0,
            rating: 0
          });
        }
      });
    }
  }
});