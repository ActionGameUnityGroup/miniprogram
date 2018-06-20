module.exports = {
	'GET /': async (ctx) => {
		ctx.body = 'INDEX';
		ctx.type = 'text/html';
	},
};