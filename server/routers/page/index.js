const IndexPage = require('../../controllers/page/index');

module.exports = {
	'GET /': async (ctx) => {
		IndexPage.getPage(ctx);
	},
};