class Session {

  checkSession(ctx) {
    let response;

    let token = ctx.session.token;
    let flag = ctx.url.includes('');
    console.log('token: ', token);
    if (!token) {
      try {
        ctx.session.token = '';
        ctx.status = 401;
        return new Error('token is over-time');
      } catch(e) {
        console.log(e);
      }
    }
    return null;
  }

}

module.exports = new Session().checkSession;
