const app = getApp();
// let _this;

Page({
	data: {
		courseList: [],
    number: 1,
    size: 10,
	},
	onLoad () {
    this.queryCourseList();
	},
  queryCourseList () {
    const _this = this;
    let { number, size } = this.data;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/course/getCourseList?type=rich&number=${number}&size=${size}`,
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.code === 200) {
          let courseList = res.data.data.data;
          number += 1;
          _this.setData({ courseList, number });
        }
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
	navigateOperation (e) {
    const url = e.currentTarget.dataset.route;
		wx.navigateTo({ url });
	},
});