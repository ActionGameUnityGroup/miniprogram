const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const orderModel = require(`${rootDirectory}/model/v0/orderModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
const wxpay = require(`${rootDirectory}/service/utils`);

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
    const courseModel = require(`${rootDirectory}/model/courseModel`);
    try{
      console.log(ctx.request.body);
      const { openId, courseId, } = ctx.request.body;
      const courseList = await courseModel.find({courseId: courseId});
      if(!courseList.length) {
        throw new Error('Course Error! This course dosen\'t exist!');
      } else {
        const course = courseList[0];
        let money = 0;
        if(course.isSpread){
          money = course.expenses * 1;
        } else {
          money = course.unifieldPrice * 1;
        }
        const time = new Date().getTime();
        const orderId = `${time}${wxpay.createNonceStr()}`;
        const newOrder = new orderModel({
          orderId: orderId,
          courseId: courseId,
          courseName: course.mainTitle,
          money: money,
          orderTime: time,
          payTime: 0,
          confirmTime: 0,
          openId: openId,
        });
        let res = await newOrder.save();
        response = this.formatDataSuccess('下单成功！');
      }
    } catch(e){
      response = this.formatDataFail(e.message);
    }
    return response;
  }

}

module.exports = new orderService();