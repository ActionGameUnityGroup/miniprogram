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
    console.log('确认支付');
    const [ orderId, money, openid ] = [ wx.getStorageSync('orderId'), wx.getStorageSync('money'), wx.getStorageSync('openid') ];
    app.request(
      'https://www.changdaolife.cn/api/v0/pay/payment',
      {
        method: 'POST',
        data: JSON.stringify({orderId, money, openid}),
      },
      function(res){
        console.log(res);
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(res) {
            console.log(res);
          },
          fail(res) {
            console.log(res);
          },
        });
      }
    )
  },
});