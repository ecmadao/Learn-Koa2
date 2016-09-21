import Koa from 'koa';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import views from 'koa-views';
import csrf from 'koa-csrf';
import flash from 'koa-flash';
import session from 'koa-generic-session';
import MongoStore from 'koa-generic-session-mongo';
import router from './routes/index';
import nunjucks from 'nunjucks';
import {appKey} from 'config-lite';

const app = new Koa();
app.keys = [appKey];

onerror(app);
// 配置nunjucks模板文件所在的路径，否则模板继承时无法使用相对路径
nunjucks.configure(__dirname + '/templates', { autoescape: true });
// bodyparser
app.use(bodyParser());
// logger
app.use(convert(logger()));
// session
app.use(convert(session({
  store: new MongoStore()
})));
// csrf
app.use(new csrf());
// flash
app.use(convert(flash()));
//views with nunjucks
app.use(views(__dirname + '/templates', {
  map: {
    html: 'nunjucks'
  }
}));
// router
app.use(router.routes(), router.allowedMethods());

app.listen(7000);

export default app;
