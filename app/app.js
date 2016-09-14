import Koa from 'koa';
import router from './routes/index';
const app = new Koa();

app.use(router.routes(), router.allowedMethods());

// app.use((ctx, next) => {
//   const start = new Date;
//   console.log('app 1')
//   return next().then(() => {
//     const ms = new Date - start;
//     console.log('app 1 callback')
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//   });
// });
//
// app.use(async (ctx, next) => {
//   const start = new Date;
//   console.log('app 2')
//   await next();
//   const ms = new Date - start;
//   console.log('app 2 callback')
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });
//
// app.use(ctx => {
//   console.log('app 3')
//   ctx.body = "hello KOA";
// });

app.listen(7000);

export default app;
