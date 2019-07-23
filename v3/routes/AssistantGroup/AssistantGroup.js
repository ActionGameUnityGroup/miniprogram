const app = getApp();
let _this;

Page({
  data: {
    intro: '',
  	assistantList: [/*{
      cover: '',
      name: '常虹',
      title: '常道助教',
    }, {
      cover: '',
      name: '常喜',
      title: '常道助教',
    }, {
      cover: '',
      name: '常悦',
      title: '常道助教',
    }, {
      cover: '',
      name: '常宁',
      title: '常道助教',
    },*/],
  },
  onLoad(option) {
  	_this = this;

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/assistant/getAssistantList?type=miniprogram',
      method: 'GET',
      success(res) {
        if (res.data.code === 200) {
          let assistantList = res.data.data;
          _this.setData({ assistantList });
        }
      }
    });

  	wx.request({
  		url: `https://www.changdaolife.cn/api/v0/assistant/getAssistantIntroduce`,
  		method: 'GET',
  		success(res) {
        if (res.data.code === 200) {
          let intro = res.data.data;
          _this.setData({ intro });
        }
  		}
  	});
  },
  navigateAction(e) {
    const url = '/routes/AssistantIntroduction/AssistantIntroduction?assistantId=' + e.currentTarget.id;
    wx.navigateTo({ url });
  }
});