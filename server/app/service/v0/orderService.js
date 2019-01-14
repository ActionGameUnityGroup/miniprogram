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
      console.log(courseList[0], '课程信息');
      console.log(courseList[0].mainTitle, '课程名称');
      console.log(courseList[0].expenses, '价格1');
      console.log(courseList[0].unifieldPrice, '价格2');
      const time = new Date().getTime();
      const orderId = `changdao${time}`;
      // const orderId = uuid.v1();
      const newOrder = new orderModel({
        orderId: orderId,
        courseId: courseList[0].courseId,
        attach: courseList[0].mainTitle,
        detail: courseList[0].subTitle,
        money: courseList[0].expenses,
        orderTime: time,
        payTime: 0,
        confirmTime: 0,
        openId: openId,
      });
      let res = await newOrder.save();
      console.log(res, '保存');
      response = this.formatDataSuccess({orderId, money: courseList[0].expenses});
    } catch(e){
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new orderService();