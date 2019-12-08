const app = getApp();
let _this;

Page({
  data: {
    tutorInfo: {},
  },
  onLoad(option) {
    _this = this;
    console.log(option);
  	const { assistantId } = option;
  	wx.request({
  		url: `https://www.changdaolife.cn/api/v0/assistant/getAssistantInfo?assistantId=${assistantId}`,
  		method: 'GET',
  		success(res) {
        console.log(res.data);
        var tutorInfo = res.data.data[0];
  			_this.setData({ tutorInfo });
  		}
  	});
  },
});