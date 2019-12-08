//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    /*wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        // this.request('https://www.changdaolife.cn/api/v0/user/login', {method: 'POST', data: JSON.stringify({code: res.code})});
      }
    })*/
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: (info) => {
        this.globalData.systemInfo = info;
      }
    });
    // this.globalData.backgroundAudio = wx.getBackgroundAudioManager();
    this.globalData.backgroundAudio1 = wx.createInnerAudioContext();
    this.globalData.backgroundAudio2 = wx.createInnerAudioContext();
    this.globalData.backgroundAudio1.autoplay = true;
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    backgroundAudio1: null,
    backgroundAudio2: null
  },
  request: function(url, options = {method: 'GET'}, fn){
    /**
      @Description 自定义请求方法
      @params url- String 请求路由
      @params options Object 请求参数
      @return 请求回调
      */
    wx.request({
      url: url,
      ...options,
      success: function(res){
        console.log(res);
        fn(res.data);
      },
      fail: function(err) {
        console.log(err);
        fn(err);
      },
    });
  },
})