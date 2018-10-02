let _this;

const sendSuggest = (options) => {
  const openid = wx.getStorageSync('openid');
  wx.request({
    url: 'https://www.changdaolife.cn/api/feedback/sendFeedBack', //仅为示例，并非真实的接口地址
    data: JSON.stringify(options),
    method: 'POST',
    header: {
      'content-type': 'text/plain', // 默认值
      'Authorization': openid
    },
    success (res) {
      console.log(res.data.status == 200);
      if(res.data.status == 200){
        wx.showToast({
          title: res.data.requestData.info,
          icon: 'none',
          mask: true,
          complete: function(){
            _this.setData({
              suggest: '',
              contact: ''
            });
          }
        });
      } else {
        wx.showToast({
          title: res.data.requestData.info,
          icon: 'none',
          mask: true
        });
      }
    }
  });
}


Page({
  data: {
    suggest: '',
    contact: ''
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '意见反馈'
    });
    _this = this;
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
    const feedbackTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const options = {
      suggest: this.data.suggest,
      contact: this.data.contact,
      date: feedbackDate,
      time: feedbackTime
    };
    console.log(JSON.stringify(options), '提交的内容');
    sendSuggest(options);
  }
});