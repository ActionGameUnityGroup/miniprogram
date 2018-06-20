class Index {
	getPage(ctx){
		ctx.body = 'INDEX';
		ctx.type = 'text/html';
	}
};

module.exports = new Index();