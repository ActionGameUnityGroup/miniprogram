const upload = require('./upload');
const fs = require('fs');
const path = require('path');
const lessonModel = require('../../models/lessonModel');

class Course {

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

      audioID: '',
      audioName : '',
      audioUrl : '',
      author : '',
      courseName: '',
      lessonCoverUrl : `https://www.changdaolife.cn/image/${fileStream.fileName}`,
      audioLength : String
    }
  }

}