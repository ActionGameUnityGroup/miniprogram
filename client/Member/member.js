let _this;

Page({
  data: {
    isFirst: false,
    isSecond: true,
    isThird: false,
  },
  onLoad: function(options){
    _this = this;
    wx.setNavigationBarTitle({
      title: '会员'
    });
  },
  firstNavAction:function(){
    this.setData({
      isFirst: true,
      isSecond: false,
      isThird: false
    });
  },
  secondNavAction:function(){
    this.setData({
      isFirst: false,
      isSecond: true,
      isThird: false
    });
  },
  thirdNavAction:function(){
    this.setData({
      isFirst: false,
      isSecond: false,
      isThird: true
    });
  },
});