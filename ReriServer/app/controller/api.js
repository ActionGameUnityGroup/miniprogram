class Api {
  async upload(ctx){
    const files = ctx.request.files;
    console.log(files);
    const body = ctx.request.body;
    console.log(body);
    ctx.body = {status: 200, message: `上传的文件：${files}`};
    ctx.type = 'text/json';
  }
};

module.exports = {
  v1: new Api()
};