module.exports = (ctx) => {
  let logged = ctx.session.logged;
  if (!logged) {
    return false;
  }
  return true;
};
