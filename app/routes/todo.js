import koaRouter from 'koa-router';

const router = koaRouter({
  prefix: '/todo'
});
router.get('/', (ctx, next) => {
  ctx.body = 'todo page';
});
router.get('/complete', (ctx, next) => {
  ctx.body = 'complete todo';
});
router.get('/delay', (ctx, next) => {
  ctx.body = 'delay todo';
});
router.get('/:id', (ctx, next) => {
  ctx.body = 'todo';
});

module.exports = router;
