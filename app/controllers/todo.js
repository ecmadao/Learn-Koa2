import Todo from '../services/todo';

const todoIndex = async (ctx, next) => {
  await ctx.render('todo/index', {
    title: 'todos page'
  });
};

const allTodos = async (ctx, next) => {
  const user = ctx.session.user;
  const todos = await Todo.getTodos(user.name);
  ctx.body = todos;
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
  todoIndex,
  delay,
  addNew,
  allTodos,
  complete,
  detailTodo,
  updateTodo,
  deleteTodo
};
