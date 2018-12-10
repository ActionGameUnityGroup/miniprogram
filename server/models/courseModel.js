const {mongoose, db} = require('../mongodb/db');

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