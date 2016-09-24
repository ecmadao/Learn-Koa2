import Koa from 'koa';
import path from 'path';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import views from 'koa-views';
import csrf from 'koa-csrf';
import flash from 'koa-flash';
import json from 'koa-json';
import session from 'koa-session';
import nunjucks from 'nunjucks';
import config from 'config';
import router from './routes/index';
import {assetsPath} from './middlewares/assets_helper';
import {catchError} from './middlewares/koa_middleware';

const appKey = config.get('appKey');
const app = new Koa();
app.keys = [appKey];

onerror(app);
// bodyparser
app.use(bodyParser());
// json parse
app.use(convert(json()));
// logger
app.use(convert(logger()));
// catch error
app.use(catchError)
// session
app.use(convert(session(app)));
// or you can use MongoStore as session,
// but you must connect mongo server first
// app.use(convert(session({
//   store: new MongoStore()
// })));

// csrf
app.use(new csrf());
// helper func
app.use(async (ctx, next) => {
  ctx.state = {
    csrf: ctx.csrf,
    assetsPath
  };
  await next();
});
// 配置nunjucks模板文件所在的路径，否则模板继承时无法使用相对路径
nunjucks.configure(path.join(__dirname, './templates'), { autoescape: true });
// flash
app.use(convert(flash()));
// frontend static file
app.use(convert(require('koa-static')(path.join(__dirname, '../public'))));
//views with nunjucks
app.use(views(path.join(__dirname, './templates'), {
  map: {
    html: 'nunjucks'
  }
}));
// router
app.use(router.routes(), router.allowedMethods());
// error
app.on('error', function(err, ctx){
  console.log(err);
  logger.error('server error', err, ctx);
});
app.listen(process.env.PORT || 7000);

export default app;
