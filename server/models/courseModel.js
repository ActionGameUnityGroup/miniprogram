const {mongoose, db} = require('../mongodb/db');

console.log('模型内连接数据库');

let courseSchema = new mongoose.Schema({
    courseCover: String,
    author: String,
    courseId: String,
    courseTitle: String,
    courseDetail: String,
    courseStatus: String,
    status: Number,
    courseLength: Number,
    statue: Number
}, {collection: 'Course', versionKey: false});

let courseModel = db.model('course', courseSchema);

module.exports = courseModel;