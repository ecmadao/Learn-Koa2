import koaRouter from 'koa-router';
import todo from '../controllers/todo';
import {checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/todo'
});
router.get('/', checkIfLogin, todo.home);
router.get('/complete', checkIfLogin, todo.complete);
router.get('/delay', checkIfLogin, todo.delay);
router.post('/new', checkIfLogin, todo.addNew);
router.get('/:id', checkIfLogin, todo.detailTodo);
router.put('/:id', checkIfLogin, todo.updateTodo);
router.delete('/:id', checkIfLogin, todo.deleteTodo);

module.exports = router;
