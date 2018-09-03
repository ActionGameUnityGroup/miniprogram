Page({
  data: {
    suggest: '',
    contact: ''
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '意见反馈'
    });
  },
  inputSuggestAction: function(e){
    console.log(e.detail.value);
  },
  inputContactAction: function(e){
    console.log(e.detail.value);
  },
  submitAction: function(){}
});