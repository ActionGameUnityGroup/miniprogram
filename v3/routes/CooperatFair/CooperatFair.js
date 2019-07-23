const app = getApp();

Page({
  data: {
    assistantList: []
  },
  onLoad() {
    let _this = this;

    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/assistant/getAssistantList?type=miniprogram',
      method: 'GET',
      success: function (res) {
        if (res.data.code === 200) {
          let assistantList = res.data.data;
          _this.setData({ assistantList });
        }
      }
    });
  },
  saveQRCode(e) {
    wx.showLoading({ title: '正在加载二维码' });
    let { image } = e.currentTarget.dataset;
    wx.getImageInfo({
      src: image,
      success(info) {
        wx.hideLoading();
        wx.saveImageToPhotosAlbum({
          filePath: info.path,
          complete(msg) {
            console.log(msg);
            let flag = msg.errMsg.includes('ok');
            if (flag) {
              wx.showToast({
                title: '保存二维码成功',
                mask: true
              });
            } else {
              wx.showToast({
                title: '保存二维码失败',
                icon: 'none',
                mask: true
              });
            }
          }
        });
      }
    })
  }
})