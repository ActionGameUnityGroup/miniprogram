const path = require('path');
const rootDirectory = path.resolve(__dirname, '../../../');
const tutorService = require(`${rootDirectory}/service/v0/tutorService`);

class Tutor {

  async setTutorInfo(ctx) {
    let response = await tutorService.setTutorInfo(ctx);
    ctx.body = response;
  }

  async updateTutorInfo(ctx) {
    let response = await tutorService.updateTutorInfo(ctx);
    ctx.body = response;
  }

	async getTutorList(ctx) {
		let response = await tutorService.getTutorList(ctx);
		ctx.body = response;
	}

	async getTutorInfo(ctx) {
		let response = await tutorService.getTutorInfo(ctx);
		ctx.body = response;
	}

}

module.exports = new Tutor();