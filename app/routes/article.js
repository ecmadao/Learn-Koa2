import koaRouter from 'koa-router';

const router = koaRouter({
  prefix: '/articles'
});
router.get('/', (ctx, next) => {
  ctx.body = 'articles page';
});
router.get('/author', (ctx, next) => {
  ctx.body = 'article author page';
});
router.get('/:id/author', (ctx, next) => {
  ctx.body = 'article author page';
});
router.get('/:id/info', (ctx, next) => {
  ctx.body = 'article info page';
});

module.exports = router;
