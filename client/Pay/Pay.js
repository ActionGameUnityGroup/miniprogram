//获取应用实例
const app = getApp()
let _this;

Page({
  data: {
    mainTitle: '',
    expenses: '00.00',
    totalExpenses: '00.00',
    cover2: '',
  },
  onLoad: function (options) {
    const { courseId } = options;
    _this = this;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/course/getCourseInfo?courseId=${courseId}`,
      method: 'GET',
      success: function(res){
        let { mainTitle, expenses, cover2, } = res.data.data[0];
        _this.setData({ mainTitle, expenses, cover2, totalExpenses: expenses, });
      }
    });
  },
  confirmPaymentOperation: function(){
    const [ orderId, money, openid ] = [ wx.getStorageSync('orderId'), wx.getStorageSync('money'), wx.getStorageSync('openid') ];
    app.request(
      'https://www.changdaolife.cn/api/v0/pay/payment',
      {
        method: 'POST',
        data: JSON.stringify({orderId, money, openid}),
      },
      function(res){
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          complete(res) {
            if(res.errMsg.includes('ok')){
              app.request(
                'https://www.changdaolife.cn/api/v0/pay/receivePaymentInfo',
                {
                  method: 'POST',
                  data: JSON.stringify({ orderId, openId: openid, }),
                },
                function(){
                  wx.showToast({
                    title: '支付成功！请在 我的课程 页面查看已购买的课程！',
                    duration: 3000,
                    complete(){
                      wx.redirectTo({
                        url: '/Index/Index',
                      });
                    }
                  });
                }
              )
            }
          },
        });
      }
    );
  },
});