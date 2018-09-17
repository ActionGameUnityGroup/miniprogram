Page({
  data: {
    defaultIcon: '../../assets/icon/miniprogram-icon-19.png',
    isDefault: false,
    region: [],
    name: '',
    phone: ''
  },
  onLoad: function(){
    wx.setNavigationBarTitle({
      title: '新建地址'
    });
  },
  changeDefault: function(){
    let _this = this;
    this.setData({
      isDefault: !_this.data.isDefault,
      defaultIcon: !_this.data.isDefault ? '../../assets/icon/miniprogram-icon-50.png' : '../../assets/icon/miniprogram-icon-19.png'
    });
  },
  changeName: function(e){
    console.log(e.detail.value);
  },
  changePhone: function(e){
    console.log(e.detail.value);
  },
  changeAddressDetail: function(e){
    console.log(e.detail.value);
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  saveAction: function(){
    console.log('保存');
  }
});