import koaRouter from 'koa-router';
import home from '../controllers/home';

const router = koaRouter({
  prefix: '/'
});
router.get('/', home.home);
router.get('about', home.about);
router.get('github/login', home.github);

module.exports = router;
