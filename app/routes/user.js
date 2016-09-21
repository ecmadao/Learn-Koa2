import koaRouter from 'koa-router';
import {checkIfNotLogin} from '../middlewares/utils';
import user from '../controllers/user';

const router = koaRouter({
  prefix: '/user'
});
router.get('/', user.userIndex);
router.get('/login/github', checkIfNotLogin, user.github);
router.get('/logout', user.logout);

module.exports = router;
