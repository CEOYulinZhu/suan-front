// pages/practice/practice.js
Page({
    // 选择基础练习
    selectBasicPractice: function() {
        wx.showToast({
          title: '进入基础练习',
          icon: 'none'
        });
        wx.navigateTo({
          url: '/pages/basicPractice/basicPractice'  // 这里根据实际页面路径填写
        });
        // 后续可添加跳转到基础练习页面等实际逻辑
      },
    // 选择计时挑战
    selectTimedChallenge: function() {
      wx.showToast({
        title: '进入计时挑战',
        icon: 'none'
      });
      wx.navigateTo({
        url: '/pages/timedChallenge/timedChallenge'  // 这里根据实际页面路径填写
      });
      // 后续可添加跳转到计时挑战页面等实际逻辑
    },
    // 选择错题训练
    selectWrongQuestionTraining: function() {
      wx.showToast({
        title: '进入错题训练',
        icon: 'none'
      });
      // 后续可添加跳转到错题训练页面等实际逻辑
    },
    // 选择闯关模式
    selectLevelMode: function() {
      wx.showToast({
        title: '进入闯关模式',
        icon: 'none'
      });
      wx.navigateTo({
        url: '/pages/levelPractice/levelPractice'
      });
      // 后续可添加跳转到闯关模式页面等实际逻辑
    },
    // 开始每日练习
    startDailyPractice: function() {
      wx.showToast({
        title: '开始每日练习',
        icon: 'none'
      });
      // 后续可添加加载每日练习题目等实际逻辑
    }
  });