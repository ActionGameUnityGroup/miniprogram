class Page {

  async index(ctx) {
    await ctx.render('index.html');
  }

  async login(ctx) {
    await ctx.render('index.html');
  }

  async tutor(ctx) {
    await ctx.render('index.html');
  }

  async setTutor(ctx) {
    await ctx.render('index.html');
  }

  async assistant(ctx) {
    await ctx.render('index.html');
  }

  async setAssistant(ctx) {
    await ctx.render('index.html');
  }

  async feature(ctx) {
    await ctx.render('index.html');
  }

  async setFeature(ctx) {
    await ctx.render('index.html');
  }

  async rich(ctx) {
    await ctx.render('index.html');
  }

  async setRich(ctx) {
    await ctx.render('index.html');
  }

  async video(ctx) {
    await ctx.render('index.html');
  }

  async setVideo(ctx) {
    await ctx.render('index.html');
  }

  async studentShare(ctx) {
    await ctx.render('index.html');
  }

  async setStudentShare(ctx) {
    await ctx.render('index.html');
  }

  async introduction(ctx) {
    await ctx.render('index.html');
  }

  async business(ctx) {
    await ctx.render('index.html');
  }

  async upload(ctx) {
    await ctx.render('upload.html');
  }

  async webview(ctx) {
    await ctx.render('webview.html');
  }

  async staticFile(ctx) {
    await ctx.render('static.txt');
  }

  session(ctx) {
    ctx.body = `session: ${ctx.session.token}`;
  }

}

module.exports = new Page();