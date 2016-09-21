import Model from '../models/index';

const getTodos = (user) => {
  return Model.Todo.find({user: user}).sort('updated_at');
};

const addTodo = (options) => {

};

const deleteTodo = (todoId) => {

};

const completeTodo = (todoId) => {

};

const editTodo = (todoId, options) => {

};

export default {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  editTodo
};
