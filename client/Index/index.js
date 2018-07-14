//获取应用实例
const app = getApp()

Page({
  data: {
    bannerList: [],
    moduleList: [
      {moduleImage: '../assets/icon/miniprogram-icon-27.png', moduleName: '木元素'},
      {moduleImage: '../assets/icon/miniprogram-icon-23.png', moduleName: '火元素'},
      {moduleImage: '../assets/icon/miniprogram-icon-30.png', moduleName: '土元素'},
      {moduleImage: '../assets/icon/miniprogram-icon-24.png', moduleName: '金元素'},
      {moduleImage: '../assets/icon/miniprogram-icon-29.png', moduleName: '水元素'},
      {moduleImage: '../assets/icon/miniprogram-icon-25.png', moduleName: '课堂'},
      {moduleImage: '../assets/icon/miniprogram-icon-26.png', moduleName: '疗愈'},
      {moduleImage: '../assets/icon/miniprogram-icon-22.png', moduleName: '会员'},
      {moduleImage: '../assets/icon/miniprogram-icon-21.png', moduleName: '公益'},
      {moduleImage: '../assets/icon/miniprogram-icon-28.png', moduleName: '签到'},
    ],
    videoList: [
      {videoImg: '', videoName: '释道心精选单曲'},
      {videoImg: '', videoName: '释道心精选单曲'},
      {videoImg: '', videoName: '释道心精选单曲'},
      {videoImg: '', videoName: '释道心精选单曲'},
      {videoImg: '', videoName: '释道心精选单曲'},
      {videoImg: '', videoName: '释道心精选单曲'},
      {videoImg: '', videoName: '释道心精选单曲'},
    ],
    articleList: [
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
      {articleImg: '', articleName: '《中庸》第一章：天命之谓性', visitNumber: 526},
    ],
    courseList: [
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
      {courseImg: '', courseName: '《中庸》第一章：天命之谓性', courseText: '深度解读，给干货，教方法，智慧生活导师特别推荐并全程...', currentCourse: 4, coursePrice: 99},
    ],
    showVideoWidth: 180 * 7 + 19 * 6,
  },
  onLoad: function () {
   // 页面渲染完之后马上运行的函数
  },
});