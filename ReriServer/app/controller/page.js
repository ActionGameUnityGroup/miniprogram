class Page {

  async index(ctx){
    await ctx.render('index');
  }

  async upload(ctx){
    await ctx.render('upload');
  }

}

module.exports = new Page();