Page({
  data: {
    banner: '',
    name: '',
    address: '',
    intro: ''
  },
  onLoad() {
    let _this = this;
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/introduction/getIntroductionInfo?type=miniprogram',
      method: 'GET',
      success(res) {
        if (res.data.code === 200) {
          let businessInfo = res.data.data;
          console.log(businessInfo);
          let { banner, name, address, intro } = businessInfo;
          _this.setData({ banner, name, address, intro });
        }
      }
    })
  }
})