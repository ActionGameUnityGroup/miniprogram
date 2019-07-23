const app = getApp();
// const io = require('utils/weapp.socket.io.js');

Page({
  data: {
    dialogList: [{
      from: 'customer',
      avatar: '/assets/icon/logo.jpg',
      content: '尊敬的用户，您好，我是智能客服小道，很高兴为您服务~',
      time: ''
    }],
    lastestTime: '',
    dialogContentScrollTop: '0rpx',
    showSelectContent: false,
    inputValue: '',
  },
  onLoad () {
    let _this = this;
    setTimeout(function() {
      _this.setData({ showSelectContent: true });
    }, 1000);
  },
  updateInputContent () {
    const { dialogList, inputValue } = this.data;
    dialogList.push({
      from: 'user',
      avatar: '',
      content: inputValue,
      time: new Date().getTime(),
    });
    this.setData({ dialogList, inputValue: '' });
  },
  changeInputValue (e) {
    let inputValue = e.detail.value.replace(/^\s*/, '');
    this.setData({ inputValue });
  }
});