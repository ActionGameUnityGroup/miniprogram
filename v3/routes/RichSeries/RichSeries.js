const app = getApp();

const courseList = [{
        cover: '/assets/icon/marchTowardRichCover.jpg',
        url: '/routes/CourseDetail/CourseDetail?category=marchTowardRich&courseId=',
      },{
        cover: '/assets/icon/richDoorCover.jpg',
        url: '/routes/CourseList/CourseList?category=richDoor',
      },{
        cover: '/assets/icon/richRoadCover.jpg',
        url: '/routes/CourseDetail/CourseDetail?courseId=2019061903',
      },{
        cover: '/assets/icon/richSourceCover.jpg',
        url: '/routes/CourseDetail/CourseDetail?courseId=2019061904',
      },{
        cover: '/assets/icon/healthSeriesCover.jpg',
        url: '/routes/CourseList/CourseList?category=healthSeries',
      },{
        cover: '/assets/icon/studentShareCover.jpg',
        url: '/routes/StudentShare/StudentShare',
      }];

Page({
  data: {
    courseList,
  },
  onLoad: function (option) {
  },
});