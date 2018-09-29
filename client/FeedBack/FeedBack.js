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
    this.setData({
      suggest: e.detail.value
    });
  },
  inputContactAction: function(e){
    console.log(e.detail.value);
    this.setData({
      contact: e.detail.value
    });
  },
  submitAction: function(){
    console.log(this.data);
    const date = new Date();
    const feedbackDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const feedbackTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  }
});