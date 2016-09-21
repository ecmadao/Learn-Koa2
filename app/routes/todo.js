import koaRouter from 'koa-router';
import todo from '../controllers/todo';

const router = koaRouter({
  prefix: '/todo'
});
// router.get('/', todo.home);
router.get('/', (ctx, next) => {
  ctx.body = 'todos page';
});
router.get('/new', todo.addNew);
router.get('/complete', todo.complete);
router.get('/delay', todo.delay);
router.get('/:id', todo.detailTodo);
router.put('/:id', todo.updateTodo);
router.delete('/:id', todo.deleteTodo);

module.exports = router;
