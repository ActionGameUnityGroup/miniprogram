Page({
  data: {
    courseFeatureList: [],
    number: 1,
    size: 10,
  },
  onLoad () {
    this.queryCourseFeatureList();
  },
  queryCourseFeatureList () {
    let { number, size } = this.data;
    const _this = this;

    wx.request({
      url: `https://www.changdaolife.cn/api/v0/courseFeature/getCourseFeatureList?number=${number}&size=${size}`,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 200) {
          let courseFeatureList = res.data.data.data;
          number += 1;
          _this.setData({ courseFeatureList, number });
        }
      }
    })
  },
  navigateAction (e) {
    const url = e.currentTarget.dataset.route;
    wx.navigateTo({ url });
  },
});