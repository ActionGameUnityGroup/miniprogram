const path = require('path');
const dbDirectory = path.resolve(__dirname, '../../../config');
const { db, mongoose } = require(`${dbDirectory}/config.db`);

/**
 * @param {String} orderId 订单id
 * @param {String} courseId 课程ID
 * @param {String} courseName 课程名称
 * @param {Number} money 订单金额（分）
 * @param {Number} orderTime 下单时间
 * @param {Number} payTime 支付时间
 * @param {Number} confirmTime 确认时间
 * @param {String} openId 用户openid
 * 
*/
const orderSchema = new mongoose.Schema({
  orderId: String,
  courseId: String,
  attach: String,
  detail: String,
  money: String,
  orderTime: Number,
  payTime: Number,
  confirmTime: Number,
  openId: String,
}, {collection: 'Order', versionKey: false});

const orderModel = db.model('order', orderSchema);

module.exports = orderModel;