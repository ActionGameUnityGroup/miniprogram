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
    /*app.request(
      'https://www.changdaolife.cn/'
    )*/
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
      },
    });
  },
});