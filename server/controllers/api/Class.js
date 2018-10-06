const classModel = require('../../models/classModel');
const {formatData, formatDataFail} = require('./formatData');

class ClassRoom {
  async getClassList(ctx){
    const data = await classModel.find({}, '-_id').sort({classType: 1});
    ctx.body = formatData(data);
  }
}

module.exports = new ClassRoom();