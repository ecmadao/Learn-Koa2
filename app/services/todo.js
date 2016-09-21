import Model from '../models/index';

const getTodos = (user) => {
  return new Promise((resolve, reject) => {
    Model.Todo
      .find({user: user})
      .sort('updated_at')
      .exec().then((result) => {
        resolve(result);
    });
  });
};

const addTodo = (options) => {
  return new Promise((resolve, reject) => {
    Model.Todo.create(options).then((result) => {
      resolve(result);
    });
  });
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
