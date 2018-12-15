// Syllabus/syllabusMenu.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    syllabueses: [
      {
        startTime: { timeRemain: 5, month: 6, day:5, hour:19, min: 30}, 
        image: "",
        title:"如何转变观念",
        content:"深度解读",
        times:"5",
      },
      {
        startTime: { timeRemain: 5, month: 6, day: 5, hour: 19, min: 30 },
        image: "",
        title: "如何转变观念",
        content: "深度解读",
        times: "5",
      }
    ],
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let height = app.globalData.systemInfo.windowHeight;
    console.log(height);
    this.setData({
      contentHeight: height
    });
    wx.setNavigationBarTitle({
      title: '课程表',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(){},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(){},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function(){},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function(){},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(){},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(){},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(){},

  onClickCource: function() {
    console.log("Click cource");
  },
  redirectAction: function(e){
    wx.redirectTo({
      url: e.currentTarget.id
    });
  }
})