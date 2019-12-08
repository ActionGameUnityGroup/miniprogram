const app = getApp();

Page({
  data: {
    showShareBar: false,
    shareBarClass: 'share-bar',
  },
  onLoad  (option) {
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