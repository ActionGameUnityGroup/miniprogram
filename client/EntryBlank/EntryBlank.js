//获取应用实例
const app = getApp()
let _this;

Page({
  data: {
    maleChecked: false,
    femaleChecked: false,
    name: '',
    mobile: '',
    profession: '',
    city: '',
    email: '',
    courseId: '',
  },
  onLoad(options) {
    const { courseId } = options;
    _this = this;
    this.setData({ courseId, });
  },
  inputOperation(e){
    const { id } = e.currentTarget;
    const { data } = this;
    data[id] = e.detail.value;
    this.setData(data);
  },
  selectGenderOperation(e){
    const { id } = e.currentTarget;
    const { data } = this;
    data.maleChecked = false;
    data.femaleChecked = false;
    data[id] = true;
    this.setData(data);
  },
  submitOperation(){
    const { name, mobile, profession, city, email, maleChecked, femaleChecked, courseId } = this.data;
    if(!name.length){
      wx.showToast({
        title: '姓名不能为空！',
        image: '/assets/icon/warning.png',
        duration: 3000,
      });
    } else if(!maleChecked && !femaleChecked) {
      wx.showToast({
        title: '性别不能为空！',
        image: '/assets/icon/warning.png',
        duration: 3000,
      });
    } else if(!mobile.length){
      wx.showToast({
        title: '手机号不能为空！',
        image: '/assets/icon/warning.png',
        duration: 3000,
      });
    } else if(!profession.length){
      wx.showToast({
        title: '职业不能为空！',
        image: '/assets/icon/warning.png',
        duration: 3000,
      });
    } else if(!city.length){
      wx.showToast({
        title: '城市不能为空！',
        image: '/assets/icon/warning.png',
        duration: 3000,
      });
    } else {
      console.log('提交');
      let gender = '';
      if(maleChecked) {
        gender = 'male';
      }else if(femaleChecked) {
        gender = 'female';
      }
      const openId = wx.getStorageSync('openid');
      let body = JSON.stringify({
        openId,
        name,
        mobile,
        profession,
        city,
        email,
        gender,
        courseId,
      });
      console.log(body);
      app.request(
        'https://www.changdaolife.cn/api/v0/reserved/setReservedInfo',
        {
          method: 'POST',
          data: body,
        },
        function(res){
          console.log(res);
          if(res.status.includes('ok')){
            wx.navigateTo({
              url: `/Pay/Pay?courseId=${courseId}`,
            });
          } else {
            wx.showToast({
              title: res.errMsg,
              image: '/assets/icon/warning.png',
              duration: 3000,
            });
          }
        }
      );
    }
  },
});