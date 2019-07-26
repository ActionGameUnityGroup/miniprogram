let _this;
let video = {};

Page({
  data: {
    videoList: [],
  },
  onLoad(options) {
    _this = this;
    _this.getVideoList(options.videoId);
  },
  getVideoList(videoId) {
    wx.request({
      url: 'https://www.changdaolife.cn/api/v0/video/getVideoList?type=miniprogram&number=1&size=10',
      method: 'GET',
      success(res) {
        if (res.data.code) {
          let videoList = [];
          for (let i = 0, length = res.data.data.data.length; i < length; i++) {
            let item = res.data.data.data[i];
            item.showPoster = true;
            video[item.videoId] = wx.createVideoContext(item.videoId, _this);
            if (item.videoId === videoId) {
              video[item.videoId].play();
              item.showPoster = false;
            }
            videoList.push(item);
          }
          _this.setData({ videoList });
        }
      }
    });
  },
  playVideo(e) {
    let videoId = e.currentTarget.id;
    let videoItem = video[videoId];
    if (videoItem) {
      videoItem.play();
      let { videoList } = this.data;
      let key = e.currentTarget.dataset.key;
      videoList[key].showPoster = false;
      this.setData({ videoList });
    }
  },
  pauseVideo(e) {
    let videoId = e.currentTarget.id
    let videoItem = video[videoId];
    if (videoItem) {
      let { videoList } = this.data;
      let key = e.currentTarget.dataset.key;
      videoList[key].showPoster = true;
      this.setData({ videoList });
    }
  },
  videoEnd(e) {
    let videoId = e.currentTarget.id
    let videoItem = video[videoId];
    if (videoItem) {
      videoItem.stop();
      let { videoList } = this.data;
      let key = e.currentTarget.dataset.key;
      videoList[key].showPoster = true;
      this.setData({ videoList });
    }
  }
});