import Model from '../models/index';

const getTodos = (user) => {
  return new Promise((resolve, reject) => {
    Model.Todo
      .find({user: user})
      .sort('-updated_at')
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
  return new Promise((resolve, reject) => {
    Model.Todo.remove({_id: todoId}).then((result) => {
      resolve(true);
    }).catch((err) => { resolve(false); });
  });
};

const updateTodo = (todo) => {
  return new Promise((resolve, reject) => {
    const {_id} = todo;
    delete todo._id;
    Model.Todo.update({_id: _id}, todo).then((result) => {
      resolve(true);
    }).catch((err) => { resolve(false); });
  });
};

export default {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
};
