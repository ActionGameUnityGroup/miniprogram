const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const orderModel = require(`${rootDirectory}/model/v0/orderModel`);
const courseModel = require(`${rootDirectory}/model/v0/courseModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
const uuid = require('uuid');

class orderService extends formatData{

  async getOrderList(ctx){
    let response;
    try{
      let data = await orderModel.find({}, '-_id');
      response = this.formatDataSuccess(data);
    } catch(e){
      response = this.formatDataFail(e.message);
      ctx.throw(500);
    }
    return response;
  }

  async generateOrder(ctx){
    let response;
    try{
      const { openId, courseId, courseName, money, } = ctx.request.body;
      const courseList = await courseModel.find({courseId: courseId}, '-_id');
      console.log(courseList.length);
      console.log(courseList);
      const time = new Date().getTime();
      const orderId = uuid.v1();
      const newOrder = new orderModel({
        orderId: orderId,
        courseId: courseId,
        courseName: courseName,
        money: money,
        orderTime: time,
        payTime: 0,
        confirmTime: 0,
        openId: openId,
      });
      let res = await newOrder.save();
      console.log(res, '保存');
      response = this.formatDataSuccess({orderId, money});
    } catch(e){
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new orderService();