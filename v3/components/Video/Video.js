Component({
  properties: {
    videoId: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    url: {
      type: String,
      value: '',
    },
    poster: {
      type: String,
      value: '',
    },
    duration: {
      type: Number,
      value: 100,
    },
    isPlay: {
      type: Boolean,
      value: false
    },
    current: {
      type: Number,
      value: 0,
    },
    videoMaxLength: {
      type: String,
      value: '00:00',
    },
  },
  data: {
    video: null
  },
  ready() {
    let video = wx.createVideoContext(this.data.videoId, this);
    video.play();
    this.setData({ video });
  },
  methods: {
    changeSlider(e) {
      console.log(e);
    },
    playVideo() {
      console.log('播放');
      let { video } = this.data;
      console.log(video);
      video.play();
      this.setData({
        isPlay: true,
        video,
      });
    },
    pauseVideo() {
      console.log('暂停');
      let { video } = this.data;
      console.log(video);
      video.pause();
      this.setData({
        isPlay: false,
        video,
      });
    },
    videoPlay(e) {
      console.log(e);
    },
    videoPause(e) {
      console.log(e);
    },
    videoEnd(e) {
      console.log(e);
    },
  }
})