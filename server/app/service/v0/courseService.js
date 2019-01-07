const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseModel = require(`${rootDirectory}/model/v0/courseModel`);
const formatData = require(`${rootDirectory}/service/formatData`);

class CourseService extends formatData{

	async getLastestList(ctx){
		let { page } = ctx.request.query || '';
		let response;
		try{
			if(page === 'index' || page === ''){
				let data = await courseModel.find({key: 'lastestCourse', isExpire: false}, '-_id -key -isExpire').sort({time: 1}).limit(4);
				response = this.formatDataSuccess(data);
			} else {
				let data = await courseModel.find({key: 'lastestCourse'}, '-_id -key -isExpire').sort({courseId: -1});
				response = this.formatDataSuccess(data);
			}
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getAllCourse(ctx){
		let response;
		try{
			let data = await courseModel.find({}, '-_id -key -isExpire').sort({time: 1});
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getCourseList(ctx){
		const type = ctx.request.query.type || '';
		let response;
		try{
			let data = await courseModel.find({type: type}, '-_id -isExpire');
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getCourseInfo(ctx){
		const { courseId } = ctx.request.query;
		let response;
		try{
			let data = await courseModel.find({courseId: courseId}, '-_id -key -isExpire').sort({time: 1});
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getUnexpireCourse(ctx){
		let response;
		try{
			let data = await courseModel.find({isExpire: false}, '-_id').sort({time: 1});
			response = this.formatDataSuccess(data);
		} catch(e){
			response = this.formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new CourseService();