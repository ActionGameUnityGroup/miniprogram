// PublicWelfare/publicAction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    publicActionList:[{
      image:"",
      title:"标题",
      date:"时间",
      isOnline:false,
      actionType:0,   /*0 stand for free, 1 stand for charge, 2 stand for over*/
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*Set navigation title*/
  wx.setNavigationBarTitle({
    title: '公益活动',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // click action
  onClickAction: function(e) {
    console.log("click " + e);
  }
})