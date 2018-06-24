const Koa = require('koa');
const app = new Koa();
const appFunction = require('./app/app');
const zlib = require('zlib');

appFunction(app, __dirname);

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000');
});