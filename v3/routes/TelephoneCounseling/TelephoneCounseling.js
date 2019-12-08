Page({
  data: {
    assistantList: [/*{
      avatar: '',
      title: '常道助教',
      name: '常美',
      phone: '159 2007 2589',
    }, {
      avatar: '',
      title: '常道助教',
      name: '常喜',
      phone: '181 2462 1969',
    }, {
      avatar: '',
      title: '常道助教',
      name: '常宁',
      phone: '181 2462 1969',
    }, {
      avatar: '',
      title: '常道助教',
      name: '常静',
      phone: '181 2462 1969',
    }*/],
    calling: false,
    callingTitle: '',
    callingName: '',
    callingPhone: '',
  },
  onLoad () {
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
  callUp (e) {
    const { key } = e.currentTarget.dataset;
    console.log(key);
    const { assistantList } = this.data;
    var assistant = assistantList[key];
    console.log(assistant);
    this.setData({
      calling: true,
      callingTitle: assistant.title,
      callingName: assistant.name,
      callingPhone: assistant.phone,
    });
  },
  makingCall () {
    const { callingPhone } = this.data;
    console.log('拨打', callingPhone);
    const _this = this;
    wx.makePhoneCall({
      phoneNumber: callingPhone,
      complete: function () {
        _this.setData({ calling: false });
      }
    });
  },
  cancelMakingCall () {
    this.setData({ calling: false });
  }
});