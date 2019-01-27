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
      const { openId, courseId, } = ctx.request.body;
      const courseList = await courseModel.find({ courseId: courseId, }, '-_id');
      console.log(courseList);
      const courseItem = courseList[0];
      if(!courseItem){
        throw new Error('该课程目前暂时无法下单！');
      }
      const time = new Date().getTime();
      const orderId = `changdao${time}`;
      const newOrder = new orderModel({
        orderId: orderId,
        courseId: courseItem.courseId,
        attach: courseItem.mainTitle,
        detail: courseItem.subTitle,
        money: courseItem.expenses,
        orderTime: time,
        payTime: 0,
        confirmTime: 0,
        openId: openId,
      });
      let res = await newOrder.save();
      response = this.formatDataSuccess({orderId, money: courseItem.expenses});
    } catch(e){
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new orderService();