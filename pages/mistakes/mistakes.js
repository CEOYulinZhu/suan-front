// pages/mistakes/mistakes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[
      {
        date: '2024-02-20',
        question: '12 + 15',
        useranswer: 28,
        successanswer: 27,
        analyse: '计算时要注意进位，可以先算个位再算十位。个位：2+5=7，十位：1+1=2，所以结果是27。',
        type:['加法','进位']
      },
      {
        date: '2024-02-20',
        question: '45 - 17',
        useranswer: 32,
        successanswer: 28,
        analyse: '减法计算时要注意借位，可以先算个位再算十位。个位：5-7需要借位，变成15-7=8，十位：4-1-1=2，所以结果是28。',
        type:['减法','借位']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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