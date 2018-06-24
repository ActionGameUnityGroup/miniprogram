const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const hua = require('./controllers/pages/hua');

router.get('/', async (ctx) => {
  ctx.type = 'text/html';
  ctx.body = 'INDEX';
});

router.get('/hua', hua());

module.exports = router;