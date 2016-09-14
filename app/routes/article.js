import koaRouter from 'koa-router';

const router = koaRouter({
  prefix: '/article'
});
router.get('/', (ctx, next) => {
  ctx.body = 'article page';
});
router.get('/about', (ctx, next) => {
  ctx.body = 'article about page';
});

module.exports = router;
