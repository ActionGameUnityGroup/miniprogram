module.exports = {
  'GET /api/getName': async (ctx) => {
    ctx.body = {name: 'Ward'};
    ctx.type = 'text/json';
  }
};