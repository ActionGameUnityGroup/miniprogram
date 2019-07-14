class Page {

  async index(ctx) {
    await ctx.render('index');
  }

  async upload(ctx) {
    await ctx.render('upload');
  }

  session(ctx) {
    ctx.body = `session: ${ctx.session.token}`;
  }

}

module.exports = new Page();