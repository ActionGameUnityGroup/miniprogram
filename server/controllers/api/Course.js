const upload = require('./upload');
const fs = require('fs');
const path = require('path');
const lessonModel = require('../../models/lessonModel');
const courseModel = require('../../models/courseModel');
const {formatData} = require('./formatData');

class Course {

  async getCourse(ctx){
    let courseList = await courseModel.find({}, '-_id');
    console.log(courseList, '课程列表');
    ctx.body = await formatData({courseList: courseList});
  }

  async setCourseCover(ctx){
    console.log('设置课程封面');
    let fileStream = await upload(ctx);
    fileStream.file.pipe(fs.createWriteStream(path.resolve(__dirname, `../../public/image/${fileStream.fileName}`)));
    let course = {
      courseId : "",
      author : "",
      honor : "",
      authorInfo : [ 
          "", 
          ""
      ],
      courseName : "",
      courseCover : "",
      coursePrice : 0
    }
  }

  async setCourse(ctx) {
    console.log('设置课程封面');
    let params = JSON.parse(ctx.request.body);
    console.log(params, '课程信息');
    let courseInfo = {
      // courseId : "",
      author : params.author || '',
      // authorInfo: params.authorInfo|| [],
      courseTitle: params.courseTitle || "",
      courseDetail: params.courseDetail||"",
      courseLength: 0
    }
    let course = new courseModel(courseInfo);
    let res = await course.save();
    console.log(course, '插入信息');
    let courseList = await courseModel.find({}, '-_id');
    ctx.body = await formatData({info: '已增加课程', courseList: courseList});
  }

  async updateCourse(ctx){}

}

module.exports = new Course();