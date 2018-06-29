var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:{
      addressIcon:"",
      addressText:"",
      goodsImage:"",
      goodsTitle:"小米电视",
      goodsPrice:"4999",
      goodsNumber:"1",
      freight:"8.00",
      creditsNumber:0,
      useCredits:true,
      remarkDetail:"",
      isTermChecked:true,
      termText:"《常道智慧生活积分商城用户购物条款》",
    },
    defaultAddressText:"添加收货地址",
    remarkPlaceHolder:"若对订单有特殊要求，请在次填写（50紫以内）",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    wx.setNavigationBarTitle({
      title: '确认订单',
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

  onChangeSwitcher: function (e) {
    var _orderInfo = formatOrderInfo("useCredits", e.detail.value);
    
    this.setData({
      orderInfo: _orderInfo
    });
  },

  onRemarkInputConfirm: function (e) {
    var _orderInfo = formatOrderInfo("remarkDetail", e.detail.value);
    
    this.setData({
      orderInfo: _orderInfo
    });
  },

  onCheckBoxChange: function (e) {
    var _orderInfo = formatOrderInfo("isTermChecked", e.detail.value);

    this.seData({
      orderInfo:_orderInfo
    });
  },

  onClickTerm: function (e) {
    // Turn to term page
    console.log("click term")
  },
  onClickConfirm: function (e) {
    console.log("click comfirm")
  }
})


const formatOrderInfo = function (key, value) {
  var _orderInfo = _this.data.orderInfo;
  _orderInfo[key] = value;

  return _orderInfo;
};