Page({
  data: {
    banner: '',
    name: '',
    slogan: '',
    intro: ''
  },
  onLoad() {
    let _this = this;
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/business/getBusinessInfo?type=miniprogram',
      method: 'GET',
      success(res) {
        if (res.data.code === 200) {
          let businessInfo = res.data.data;
          console.log(businessInfo);
          let { banner, name, slogan, intro } = businessInfo;
          _this.setData({ banner, name, slogan, intro });
        }
      }
    })
  }
})