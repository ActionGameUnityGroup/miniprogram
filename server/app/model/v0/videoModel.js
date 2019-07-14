const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} videoId 视频Id
 * @param {String} title 视频名称
 * @param {String} cover 视频封面
 * @param {String} url 视频地址
 * @param {Number} time 上传时间
 * @param {Number} sort 视频排序
*/
const videoSchema = new mongoose.Schema({
    videoId: String,
    title: String,
    cover: String,
    url: String,
    time: Number,
    sort: Number
}, { collection: 'Video', versionKey: false });

const video = db.model('video', videoSchema);

module.exports = video;
