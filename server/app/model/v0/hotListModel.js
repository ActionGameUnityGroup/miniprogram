const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../db');
const { db, mongoose } = require(`${dbDirectory}/db-config`);

/**
 * @param {String} hotListId 课程ID
 * @param {Array} activityName 活动标题
 * @param {Array} activityAuthorList 活动讲师列表
 * @param {Array} activityDate 活动日期
 * @param {Array} activityPlace 活动地点
 * @param {Array} isExpire 活动已过期
 * 
*/
const hotListSchema = new mongoose.Schema({
	hotListId: String,
	activityName: Array,
	activityYear: Number,
	activityDate: String,
	activityPlace: String,
	activityAuthorList: Array,
  isExpire: Boolean,
}, {collection: 'HotList', versionKey: false});

const hotListModel = db.model('hotList', hotListSchema);

module.exports = hotListModel;