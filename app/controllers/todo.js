import config from 'config';
const production = config.get('production');
let Todo;
if (process.env.NODE_ENV === "production") {
  Todo = require('../services/todo_leancloud');
} else {
  Todo = require('../services/todo_mongo');
}

const todoIndex = async (ctx, next) => {
  await ctx.render('todo/index', {
    title: 'todos page'
  });
};

const allTodos = async (ctx, next) => {
  const user = ctx.session.user;
  let query = {};
  const requestQuery = ctx.request.query;
  if (requestQuery && requestQuery.complete && requestQuery.complete === 'true') {
    query['complete'] = true;
  }
  if (requestQuery && requestQuery.important && requestQuery.important === 'true') {
    query['important'] = true;
  }
  const todos = await Todo.getTodos(user.login, query);
  ctx.body = {
    data: todos,
    success: true
  };
};

const addNew = async (ctx, next) => {
  const requestData = ctx.request.body;
  const user = ctx.session.user.login;
  const todo = {
    user,
    content: requestData.content
  };
  const newTodo = await Todo.addTodo(todo);
  ctx.body = {
    data: newTodo,
    success: true
  };
};

const detailTodo = async (ctx, next) => {

};

const updateTodo = async (ctx, next) => {
  const requestData = ctx.request.body;
  const result = await Todo.updateTodo(JSON.parse(requestData.todo));
  ctx.body = {
    success: result
  };
};

const deleteTodo = async (ctx, next) => {
  const result = await Todo.deleteTodo(ctx.params.id);
  ctx.body = {
    success: result
  };
};

export default {
  todoIndex,
  addNew,
  allTodos,
  detailTodo,
  updateTodo,
  deleteTodo
};
