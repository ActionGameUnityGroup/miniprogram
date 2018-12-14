module.exports = async (ctx) => {
  const date = new Date();
  ctx.body = { message: 'request:success', data: date, status: 200, };
  ctx.type = 'text/json';
};