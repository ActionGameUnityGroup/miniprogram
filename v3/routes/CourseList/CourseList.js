const app = getApp();

Page({
  data: {
    courseList: [],
  },
  onLoad(option) {
    let { category } = option;
    const _this = this;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/course/getCourseList?number=1&size=10&category=${category}`,
      method: 'GET',
      success(data) {
        if (data.data.code === 200) {
          let courseList = data.data.data.data;
          _this.setData({ courseList });
        }
      }
    });
  },
  navigateToDetail(e) {
    let courseId = e.currentTarget.id;
    wx.navigateTo({ url: `/routes/CourseDetail/CourseDetail?courseId=${courseId}` });
  },
});