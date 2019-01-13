const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const reservedModel = require(`${rootDirectory}/model/v0/reservedModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class reservedService extends formatData{

	async getReservedList(ctx){
		let response;
		try{
			let data = await reservedModel.find({}, '-_id');
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async setReservedInfo(ctx){
		let response;
		try{
			console.log(ctx.request.body);
			const { openId, name, mobile, profession, city, email, gender, courseId, } = ctx.request.body;
			console.log(openId, name, mobile, profession, city, email, gender, courseId);
			if(!openId || !name || !mobile || !profession || !city || !gender) {
				console.log('something wrong...');
				throw new Error('报名失败！请正确填写信息！');
			}
			let newReservedInfo = new reservedModel({
				openId,
				name,
				mobile,
				profession,
				city,
				email,
				gender,
				courseId,
			});
			let res = await newReservedInfo.save();
			console.log(res);
			if(res){
				response = this.formatDataSuccess('报名成功！');
			} else {
				console.log('something wrong...');
				throw new Error('报名失败！');
			}
		} catch(e){
			response = this.formatDataFail(e.message);
		}
		return response;
	}

}

module.exports = new reservedService();