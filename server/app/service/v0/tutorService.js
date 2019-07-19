const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const tutorModel = require(`${rootDirectory}/model/v0/tutorModel`);
const formatData = require(`${rootDirectory}/service/formatData`);
// const checkSession = require(`${rootDirectory}/service/checkSession`);
const uuid = require('uuid');

class TutorService extends formatData {

	async setTutorInfo(ctx) {
		let response;
		try {
			let params = JSON.parse(ctx.request.body);
			let tutorInfo = new tutorModel({
				tutorId: uuid.v4(),
				...params
			});
			let data = await tutorInfo.save();
			if (!data) {
				throw new Error('保存导师信息失败');
			}
			response = this.formatDataSuccess({info: '保存导师信息成功'});
		} catch(e) {
			response = this.formatDataFail(e.message);
		}
		return response;
	}

	async updateTutorInfo(ctx) {
		let response;
		try {
			let params = JSON.parse(ctx.request.body);
			let tutorId = params.tutorId;
			let updateOptions = Object.assign({}, params);
			delete updateOptions.tutorId;
			if (!tutorId) {
				throw new Error('请选择导师!');
			}
			let data = await tutorModel.update({ tutorId }, updateOptions, { multi: false });
			if (!data) {
				throw new Error('保存导师信息失败');
			}
			response = this.formatDataSuccess({info: '保存导师信息成功'});
		} catch(e) {
			response = this.formatDataFail(e.message);
		}
		return response;
	}

	async getTutorList(ctx) {
		let response,
				query = ctx.request.query;
		try {
			let params = {},
					sortParams = {sort: -1};
      let { type, number, size } = query;
			if (type) {
				params['type'] = type;
			}
      if (!number && !size) {
        throw new Error('请添加查询页数和查询数量');
      }
			let data = await tutorModel.find(params, '-_id').limit(size * 1).skip((number * 1) - 1).sort(sortParams);
			const count = Math.ceil(await tutorModel.countDocuments({}));
			const total = Math.ceil(count/size);
			response = this.formatDataSuccess({ data, count, total, size: size * 1, current: number * 1 });
		} catch (e) {
			response = this.formatDataFail(e.message);
		}
		return response;
	}

	async getTutorInfo(ctx) {
		const tutorId = ctx.request.query.tutorId || '';
		let response;
		try {
			let data = await tutorModel.find({ tutorId }, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e) {
			response = this.formatDataFail(e.message);
		}
		return response;
	}

	/*async getTeachingAssistant(ctx) {
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