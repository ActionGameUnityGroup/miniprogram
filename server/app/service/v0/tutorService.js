const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const tutorModel = require(`${rootDirectory}/model/v0/tutorModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class TutorService extends formatData{

	async getTutorList(ctx){
		let response;
		try{
			let data = await tutorModel.find({}, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getTutorInfo(ctx){
		const { tutorId } = ctx.request.query || '';
		let response;
		try{
			let data = await tutorModel.find({tutorId: tutorId}, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new TutorService();