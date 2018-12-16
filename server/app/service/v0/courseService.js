const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseModel = require(`${rootDirectory}/model/v0/courseModel`);
const { formatDataSuccess, formatDataFail } = require(`${rootDirectory}/service/formatData`);

class CourseService{

	async getKurseList(ctx){
		let response;
		try{
			let data = await courseModel.find({key: 'kurse'}, '-_id').limit(3);
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getLastestList(ctx){
		let { page } = ctx.request.query || '';
		let response;
		try{
			if(page === 'index' || page === ''){
				let data = await courseModel.find({key: 'lastestCourse', isExpire: false}, '-_id -key -isExpire').sort({courseId: 1}).limit(2);
				response = formatDataSuccess(data);
			} else {
				let data = await courseModel.find({key: 'lastestCourse'}, '-_id -key -isExpire').sort({courseId: -1});
				response = formatDataSuccess(data);
			}
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getAllCourse(ctx){
		let response;
		try{
			let data = await courseModel.find({}, '-_id -key -isExpire');
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getCourseInfo(ctx){
		const { courseId } = ctx.request.query;
		let response;
		try{
			let data = await courseModel.find({courseId: courseId}, '-_id -key -isExpire').sort({courseId: 1});
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

	async getUnexpireCourse(ctx){
		let response;
		try{
			let data = await courseModel.find({isExpire: false}, '-_id cover courseId').sort({courseId: 1});
			response = formatDataSuccess(data);
		} catch(e){
			response = formatDataFail(e.message);
			ctx.throw(500);
		}
		return response;
	}

}

module.exports = new CourseService();