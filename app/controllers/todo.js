import Todo from '../services/todo';

const home = async (ctx, next) => {
  const user = ctx.session.user;
  const todos = await Todo.getTodos(user.name);
  await ctx.render('todo/index', {
    todos: todos,
    csrf: ctx.csrf,
    title: 'todos page',
    content: 'this is todo page'
  });
};

const addNew = async (ctx, next) => {
  const requestData = ctx.request.body;
  const user = ctx.session.user.name;
  const todo = {
    user,
    tags: [],
    content: requestData.content
  }
  const newTodo = await Todo.addTodo(todo);
  ctx.body = newTodo;
};

const complete = async (ctx, next) => {

};

const delay = async (ctx, next) => {

};

const detailTodo = async (ctx, next) => {

};

const updateTodo = async (ctx, next) => {

};

const deleteTodo = async (ctx, next) => {

};

export default {
  home,
  delay,
  addNew,
  complete,
  detailTodo,
  updateTodo,
  deleteTodo
};
