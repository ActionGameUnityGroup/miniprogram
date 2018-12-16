const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../');
const courseService = require(`${rootDirectory}/service/v0/courseService`);

class Course{

	async getKurseList(ctx){
		const response = await courseService.getKurseList(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}

	async getLastestList(ctx){
		const response = await courseService.getLastestList(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}

	async getAllCourse(ctx){
		const response = await courseService.getAllCourse(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}

	async getCourseInfo(ctx){
		const response = await courseService.getCourseInfo(ctx);
		ctx.body = response;
		ctx.type = 'text/json';
	}

}

module.exports = new Course();