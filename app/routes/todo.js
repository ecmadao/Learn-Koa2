import koaRouter from 'koa-router';
import todo from '../controllers/todo';

const router = koaRouter({
  prefix: '/todo'
});
router.get('/', todo.home);
router.get('/new', todo.addNew);
router.get('/complete', todo.complete);
router.get('/delay', todo.delay);
router.get('/:id', todo.operation);

module.exports = router;
