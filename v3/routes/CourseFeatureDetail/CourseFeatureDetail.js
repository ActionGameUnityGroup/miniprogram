const formatDate = require('../../utils/formatDate');
let _this;

Page({
  data: {
    featureInfo: {
      title: '',
      viewCount: 0,
      releaseTime: '',
      content: '',
    },
  },
  onLoad (options) {
    _this = this;
    const featureId = options.courseFeatureId;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/courseFeature/getCourseFeatureInfo?featureId=${featureId}&source=miniprogram`,
      method: 'GET',
      success: function (res) {
        let featureInfo = res.data.data[0];
        let releaseTime = formatDate(featureInfo.releaseTime);
        featureInfo.releaseTime = releaseTime;
        _this.setData({ featureInfo });
      }
    });
  },
});