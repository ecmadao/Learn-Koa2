import koaRouter from 'koa-router';
import home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});
router.get('/', home.homeIndex);
router.get('about', home.about);

module.exports = router;
