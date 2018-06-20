// 类
const Koa = require('koa');
// 功能对象
const app = new Koa();
const routesLoader = require('./routesLoader');
// console.log(routesLoader);

app.use(async (ctx, next) => {
  console.log(ctx.method, ctx.url);
  await next();
});

app.use(routesLoader());

app.listen(9000, () => {
  console.log('Server running at http://127.0.0.1:9000');
});