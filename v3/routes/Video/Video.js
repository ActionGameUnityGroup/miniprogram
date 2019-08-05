let _this;
let video = {};
let playTime = null;

Page({
  data: {
    videoList: [],
  },
  onLoad(options) {
    _this = this;
    _this.getVideoList(options.videoId);
  },
  onUnload() {
    console.log('返回');
    video['video1'].stop();
    video['video2'].stop();
    video['video3'].stop();
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
            item.showController = true;
            item.showPoster = true;
            item.isPlay = false;
            item.current = 0;
            item.currentTime = '00:00';
            item.videoMaxLength = _this.setMaxLength(item.duration);
            video[item.videoId] = wx.createVideoContext(item.videoId, _this);
            /*if (item.videoId === videoId) {
              video[item.videoId].play();
              item.showPoster = false;
            }*/
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
      let { videoList } = this.data;
      let key = e.currentTarget.dataset.key;
      videoList[key].isPlay = true;
      videoItem.play();
      console.log(videoList[key].current);
      // videoItem.seek(videoList[key].current);
      this.setData({ videoList });
      this.updateProgress(key);
    }
  },
  pauseVideo(e) {
    let videoId = e.currentTarget.id;
    let videoItem = video[videoId];
    if (videoItem) {
      videoItem.pause();
      let { videoList } = this.data;
      let key = e.currentTarget.dataset.key;
      // videoList[key].showPoster = true;
      videoList[key].isPlay = false;
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
  },
  videoTimeUpdate(e) {
    let current = e.detail.currentTime;
    let key = e.currentTarget.dataset.key;
    let { videoList } = this.data;
    if (videoList[key]) {
      let currentTime = this.updateCurrentTime(current);
      videoList[key].current = current;
      videoList[key].currentTime = currentTime;
      this.setData({ videoList });
    }
  },
  updateProgress(videoKey) {
    let { videoList } = this.data;
    let videoItem = videoList[videoKey];
    console.log(videoItem);
  },
  updateCurrentTime(time) {
    let minuteText = '00',
        secondText = '00';
    if (time < 60) {
      minuteText = '00';
      let second = Math.floor(time);
      if (second < 10) {
        secondText = `0${second}`;
      } else {
        secondText = second.toString();
      }
    } else {
      let minute = Math.floor(time / 60);
      if (minute < 10) {
        minuteText = `0${minute}`;
      } else {
        minuteText = minute.toString();
      }
      let second = Math.floor(time - minute);
      if (second < 10) {
        secondText = `0${second}`;
      } else {
        secondText = second.toString();
      }
    }
    return `${minuteText}:${secondText}`;
  },
  setMaxLength(length) {
    let minuteText = '00',
        secondText = '00';
    let minute = Math.floor(length / 60);
    if (minute < 10) {
      minuteText = `0${minute}`;
    } else {
      minuteText = minute;
    }
    let second = length - (minute * 60);
    if (second < 10) {
      secondText = `0${second}`;
    } else {
      secondText = second;
    }
    return `${minuteText}:${secondText}`;
  },
  showControlPanel(e) {
    let key = e.currentTarget.dataset.key;
    console.log(key);
    let { videoList } = this.data;
    videoList[key].showController = !videoList[key].showController;
    this.setData({ videoList });
  },
  changeSlider(e) {
    let value = e.detail.value,
        key = e.currentTarget.dataset.key;
    let { videoList } = this.data;
    let currentTime = this.updateCurrentTime(value);
    let videoId = videoList[key].videoId;
    videoList[key].currentTime = currentTime;
    videoList[key].current = value;
    let videoItem = video[videoId];
    if (videoItem) {
      console.log(videoItem);
      videoItem.seek(value);
    }
    this.setData({ videoList });
  },
});