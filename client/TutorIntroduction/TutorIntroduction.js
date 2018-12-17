const app = getApp();
let _this;

Page({
  data: {
  	tutorInfo: {},
  },
  onLoad: function(option){
  	_this = this;
  	const { tutorId } = option;
  	wx.request({
  		url: `https://www.changdaolife.cn/api/v0/tutor/getTutorInfo?tutorId=${tutorId}`,
  		method: 'GET',
  		success: function(res){
  			console.log(res.data, '回调');
  			_this.setData({
  				tutorInfo: res.data.data[0],
  			});
  		}
  	});
  },
});