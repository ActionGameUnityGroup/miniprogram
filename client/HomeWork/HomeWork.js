Page({
  data: {},
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '我的作业'
    });
  },
  addAction: function(){
    console.log('添加图片');
  },
  submitAction: function(){
    console.log('提交');
  }
});