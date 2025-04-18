// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedType: 'week',

    user: {
      Week: {
        WeekList: [
          {
              type: '练习题目',
              value: '120',
              statetype: 'up',
              state: '↑ 较上期增加15题'
          },
          {
              type: '准确率',
              value: '85%',
              statetype: 'up',
              state: '↑ 较上期增加5%'
          },
          {
              type: '平均用时',
              value: '15秒',
              statetype: 'down',
              state: '↓ 较上期减少3秒'
          },
          {
              type: '连续练习',
              value: '5天',
              statetype: 'up',
              state: '↑ 个人最佳'
          }
        ],
        enhanceItems: ['减法借位','乘法进位','两位数除法','多位数加法'],
        graspsList: [
          {
            type: "加法",
            number: 35,
            best: true,
            ratio: '90%'
          },
          {
            type: "减法",
            number: 30,
            best: false,
            ratio: '75%'
          },
          {
            type: "乘法",
            number: 28,
            best: false,
            ratio: '60%'
          },
          {
            type: "除法",
            number: 27,
            best: false,
            ratio: '70%'
          }
        ],
        adviceList: [
          {
            title: '加强减法借位练习',
            iconPath: '/assets/icons/TextOutline_32px.svg',
            content: '根据你的练习情况，减法借位是你当前的薄弱环节，建议在下周增加此类题目的练习频率。'
          },
          {
            title: '增加乘法练习频率',
            iconPath: '/assets/icons/GoodOutline_32px.svg',
            content: '乘法是你的进步空间较大的区域，建议每天安排15分钟专项练习。'
          },
          {
            title: '保持每日练习习惯',
            iconPath: '/assets/icons/StarOutline_32px.svg',
            content: '你已经连续练习5天，继续保持将获得额外的积分奖励！'
          }
        ]
      },
      
      Month:  {
        WeekList: [
          {
              type: '练习题目',
              value: '480',
              statetype: 'up',
              state: '↑ 较上期增加20题'
          },
          {
              type: '准确率',
              value: '78%',
              statetype: 'up',
              state: '↑ 较上期增加7.5%'
          },
          {
              type: '平均用时',
              value: '18秒',
              statetype: 'down',
              state: '↓ 较上期减少10秒'
          },
          {
              type: '连续练习',
              value: '22天',
              statetype: 'up',
              state: '↑ 个人最佳'
          }
        ],
        enhanceItems: ['乘法进位','分数运算','两位数除法'],
        graspsList: [
          {
            type: "加法",
            number: 60,
            best: false,
            ratio: '60%'
          },
          {
            type: "减法",
            number: 90,
            best: true,
            ratio: '90%'
          },
          {
            type: "乘法",
            number: 70,
            best: false,
            ratio: '70%'
          },
          {
            type: "除法",
            number: 78,
            best: false,
            ratio: '78%'
          }
        ],
        adviceList: [
          {
            title: '加强减法借位练习',
            iconPath: '/assets/icons/TextOutline_32px.svg',
            content: '根据你的练习情况，减法借位是你当前的薄弱环节，建议在下周增加此类题目的练习频率。'
          },
          {
            title: '增加乘法练习频率',
            iconPath: '/assets/icons/GoodOutline_32px.svg',
            content: '乘法是你的进步空间较大的区域，建议每天安排20分钟专项练习。'
          },
          {
            title: '保持每日练习习惯',
            iconPath: '/assets/icons/StarOutline_32px.svg',
            content: '你已经连续练习22天，继续保持将获得额外的积分奖励！'
          }
        ]
      },
      
    },

    Current: {}
  },

  //给Current列表赋值
  CurrentToggle(type) {
    if (type == 'week')
      this.setData({Current: this.data.user.Week});
    else
      this.setData({Current: this.data.user.Month});
  },

  //点击顶部导航栏切换界面type值
  InterfaceSwitch(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({selectedType: type}); 
    this.CurrentToggle(type);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({Current:this.data.user.Week});
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