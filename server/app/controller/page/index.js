class Page {

  async index(ctx) {
    await ctx.render('index');
  }

  async login(ctx) {
    await ctx.render('index');
  }

  async tutor(ctx) {
    await ctx.render('index');
  }

  async setTutor(ctx) {
    await ctx.render('index');
  }

  async assistant(ctx) {
    await ctx.render('index');
  }

  async setAssistant(ctx) {
    await ctx.render('index');
  }

  async feature(ctx) {
    await ctx.render('index');
  }

  async setFeature(ctx) {
    await ctx.render('index');
  }

  async rich(ctx) {
    await ctx.render('index');
  }

  async setRich(ctx) {
    await ctx.render('index');
  }

  async video(ctx) {
    await ctx.render('index');
  }

  async setVideo(ctx) {
    await ctx.render('index');
  }

  async studentShare(ctx) {
    await ctx.render('index');
  }

  async setStudentShare(ctx) {
    await ctx.render('index');
  }

  async introduction(ctx) {
    await ctx.render('index');
  }

  async business(ctx) {
    await ctx.render('index');
  }

  async upload(ctx) {
    await ctx.render('upload');
  }

  async webview(ctx) {
    await ctx.render('webview');
  }

  session(ctx) {
    ctx.body = `session: ${ctx.session.token}`;
  }

}

module.exports = new Page();