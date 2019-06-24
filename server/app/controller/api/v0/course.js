const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const courseService = require(`${rootDirectory}/service/v0/courseService`);

class Course{

	async getCourseList(ctx) {
		const response = await courseService.getCourseList(ctx);
		ctx.body = response;
	}

	async getCourseInfo(ctx) {
		const response = await courseService.getCourseInfo(ctx);
		ctx.body = response;
	}

	/*async getLastestList(ctx) {
		const response = await courseService.getLastestList(ctx);
		ctx.body = response;
	}

	async getAllCourse(ctx) {
		const response = await courseService.getAllCourse(ctx);
		ctx.body = response;
	}

	async getCourseList(ctx) {
		const response = await courseService.getCourseList(ctx);
		ctx.body = response;
	}

	async getUnexpireCourse(ctx) {
		const response = await courseService.getUnexpireCourse(ctx);
		ctx.body = response;
	}

	async getHotList(ctx) {
		const response = await courseService.getHotList(ctx);
		ctx.body = response;
	}*/

}

module.exports = new Course();