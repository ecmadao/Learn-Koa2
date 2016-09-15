import Koa from 'koa';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import views from 'koa-views';
import router from './routes/index';
import nunjucks from 'nunjucks';

const app = new Koa();
onerror(app);
// 配置nunjucks模板文件所在的路径，否则模板继承时无法使用相对路径
nunjucks.configure(__dirname + '/templates', { autoescape: true });

// bodyparser
app.use(bodyParser());
// logger
app.use(convert(logger()));
//views with nunjucks
app.use(views(__dirname + '/templates', {
  map: {
    html: 'nunjucks'
  }
}));
// router
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
