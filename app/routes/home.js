import koaRouter from 'koa-router';
import home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});
router.get('about', home.about);

module.exports = router;
