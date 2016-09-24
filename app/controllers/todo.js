import config from 'config';
const production = config.get('production');
let Todo;
if (production) {
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
  const todos = await Todo.getTodos(user.name);
  console.log(todos);
  ctx.body = {
    data: todos,
    success: true
  };
};

const addNew = async (ctx, next) => {
  const requestData = ctx.request.body;
  const user = ctx.session.user.name;
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

const complete = async (ctx, next) => {

};

const delay = async (ctx, next) => {

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
  delay,
  addNew,
  allTodos,
  complete,
  detailTodo,
  updateTodo,
  deleteTodo
};
