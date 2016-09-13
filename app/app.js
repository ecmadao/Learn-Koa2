import Koa from 'koa';
import koaRouter from 'koa-router';
const router = koaRouter();
const app = new Koa();

router.get('/about', (ctx, next) => {
    ctx.body = "this is the about page";
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use((ctx, next) => {
  const start = new Date;
  console.log('app 1')
  return next().then(() => {
    const ms = new Date - start;
    console.log('app 1 callback')
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});

app.use(async (ctx, next) => {
  const start = new Date;
  console.log('app 2')
  await next();
  const ms = new Date - start;
  console.log('app 2 callback')
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => {
  console.log('app 3')
  ctx.body = "hello KOA";
});

app.listen(7000);

export default app;
