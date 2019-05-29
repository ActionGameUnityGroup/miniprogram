const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const tutorService = require(`${rootDirectory}/service/v0/tutorService`);

class Tutor {

	async getTutorList (ctx) {
		let response = await tutorService.getTutorList(ctx);
		ctx.body = response;
	}

	async getTutorInfo (ctx) {
		let response = await tutorService.getTutorInfo(ctx);
		ctx.body = response;
	}

}

module.exports = new Tutor();