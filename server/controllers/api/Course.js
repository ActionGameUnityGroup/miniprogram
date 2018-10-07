const upload = require('./upload');
const fs = require('fs');
const path = require('path');
const lessonModel = require('../../models/lessonModel');
const courseModel = require('../../models/courseModel');
const {formatData} = require('./formatData');
const crypto = require('crypto');
const date = new Date();

function setFileName(){
  const md5 = crypto.createHash('md5');
  md5.update(`${data.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`);
  return md5.digest('hex');
}

class Course {

  async getCourseList(ctx){
    let courseList = await courseModel.find({}, '-_id');
    console.log(courseList, '课程列表');
    ctx.body = await formatData({courseList: courseList});
  }

  async getCourse(ctx){
    let courseList = await courseModel.find({}, '-_id');
    console.log(courseList, '课程列表');
    ctx.body = await formatData({courseList: courseList});
  }

  async setCourseCover(ctx){
    console.log('设置课程封面');
    let course = {
      courseId : "",
      author : "",
      honor : "",
      authorInfo : [],
      courseName : "",
      courseCover : "",
      coursePrice : 0,
    }
  }

  async setCourse(ctx) {
    console.log('设置课程封面');
    let params = JSON.parse(ctx.request.body);
    console.log(params, '课程信息');
    let fileStream = await upload(ctx);
    console.log(fileStream, '文件流');
    const fileType = fileStream.fileName.substring(fileStream.fileName.indexOf('.'), fileStream.fileName.length);
    const fileName = setFileName();
    fileStream.file.pipe(fs.createWriteStream(path.resolve(__dirname, `../../public/image/${fileName}${fileType}`)));
    let courseInfo = {
      courseId : "",
      author : params.author || '',
      authorInfo: params.authorInfo|| [],
      courseTitle: params.courseTitle || "",
      courseDetail: params.courseDetail||"",
      courseLength: 0,
      status: 0
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