import koaRouter from 'koa-router';
import todo from '../controllers/todo';
import {checkIfLogin} from '../middlewares/utils';

const router = koaRouter({
  prefix: '/todo'
});
router.get('/all', todo.allTodos);
router.post('/new', checkIfLogin, todo.addNew);
router.get('/:id', checkIfLogin, todo.detailTodo);
router.put('/:id', checkIfLogin, todo.updateTodo);
router.delete('/:id', checkIfLogin, todo.deleteTodo);
router.get('/', checkIfLogin, todo.todoIndex);

module.exports = router;
