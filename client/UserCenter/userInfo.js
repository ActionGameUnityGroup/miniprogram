const app = getApp()
var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechatUserInfo: {},
    titleName: "个人信息",
    userInfo:{headUrl:"", nickName:"Haku", sex:"男", birthday:"2000-01-01", realName:"Haku", phoneNumber:"8000000000", address:"New York"},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    // Set navigation title
    wx.setNavigationBarTitle({
      title: this.data.titleName,
      success: function (res) {
        console.log("set navigation title complete")
      },
      fail: function (res) {
        console.log("set navigation title failse")
      },
      complete: function (res) {
      },
    });

    if (app.globalData.userInfo) {
      this.setData({
        wechatUserInfo: app.globalData.userInfo,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
    })
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

  /**
   * Confirm button event
   */
  onClickConfirmBtn: function (e) {
    console.log("Click confirm button");

    // Test for turning to puclic action page
    wx:wx.navigateTo({
      url: '../PublicWelfare/publicAction',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onDateChange: function (e) {   
    var _userInfo = formatUserInfo("birthday", e.detail.value);
    this.setData({
      userInfo: _userInfo
    });
  },

})

const formatUserInfo = function (key, value) {
  var _userInfo = _this.data.userInfo;
  _userInfo[key] = value;

  return _userInfo;
};

