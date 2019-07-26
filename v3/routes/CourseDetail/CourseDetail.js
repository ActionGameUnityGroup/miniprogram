const app = getApp();

Page({
  data: {
    showShareBar: false,
    shareBarClass: 'share-bar',
    courseInfo: {}
  },
  onLoad  (option) {
    let { courseId } = option;
    let _this = this;
    wx.request({
      url: `https://www.changdaolife.cn/api/v0/course/getCourseInfo?courseId=${courseId}`,
      method: 'GET',
      success (res) {
        if (res.data.code === 200) {
          let courseInfo = res.data.data[0];
          _this.setData({ courseInfo });
        }
      }
    });
  },
  onShareAppMessage (e) {
    console.log(e);
  },
  shareCourse () {
    this.setData({
      shareBarClass: 'share-bar show',
      showShareBar: true
    });
  },
  cancelShare () {
    this.setData({
      shareBarClass: 'share-bar',
      showShareBar: false
    });
  },
  selectShareTarget (e) {
    let { id } = e.currentTarget;
    wx.updateShareMenu({
      withShareTicket: true,
      success (res) {
        console.log(res);
      }
    })
  },
});