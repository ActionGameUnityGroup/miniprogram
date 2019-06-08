const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const tutorModel = require(`${rootDirectory}/model/v0/tutorModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class TutorService extends formatData {

	async getTutorList (ctx) {
		let response,
				query = ctx.request.query;
		try {
			let type = query.type || '',
					params = {},
					sortParams = {sort: 1};
			if (type) {
				params['type'] = type;
				if (type === 'contribution') {
					sortParams.sort = -1;
				}
			}
			let data = await tutorModel.find(params, '-_id').sort(sortParams);
			response = this.formatDataSuccess(data);
		} catch (e) {
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getTutorInfo (ctx) {
		const { tutorId } = ctx.request.query || '';
		let response;
		try {
			let data = await tutorModel.find({ tutorId }, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e) {
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	/*async getTeachingAssistant (ctx) {
		let response;
		try {
			let data = await TeachingAssistant.find({}, '-_id');
			response = this.formatData(data);
		} catch (e) {
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
	}*/

}

module.exports = new TutorService();