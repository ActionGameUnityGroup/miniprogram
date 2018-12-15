const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseModel = require(`${rootDirectory}/model/v0/courseModel`);
const { formatDataSuccess, formatDataFail } = require(`${rootDirectory}/service/formatData`);

class CourseService{

	async getKurseList(ctx){
		let response;
		try{
			let data = await courseModel.find({}, '-_id').limit(3);
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getLastestList(ctx){
		let response;
		try{
			let data = await courseModel.find({}, '-_id').sort({}).limit(2);
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new CourseService();