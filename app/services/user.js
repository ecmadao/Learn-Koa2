import Model from '../models/index';

const addUser = (name, email, password) => {
  return Model.User.create({
    name,
    email,
    password
  });
};

const getUsers = () => {
  return Model.User.find();
};

export default {
  addUser,
  getUsers
};
