import koaRouter from 'koa-router';
// import home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});
router.get('/', (ctx, next) => {
  ctx.body = 'home page';
});
router.get('/about', (ctx, next) => {
  ctx.body = 'about page';
});

// router.get('/', home.index);
// router.get('direct', home.direct);

// export default router;
module.exports = router;
