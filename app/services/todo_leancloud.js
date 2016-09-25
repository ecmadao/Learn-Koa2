import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
const appDB = config.get('leancloud.appDB');

AV.init({ appId, appKey });

class LeancloudStorage {
  constructor() {
    const TodoObject = AV.Object.extend(appDB);
    this.todoObject = new TodoObject();
  }

  async addTodo(option) {
    const todo = {
      tags: [],
      important: false,
      complete: false,
      steps: [],
      ...option
    }
    return await this.todoObject.save(todo);
  }

  getTodos(user, options) {
    return new Promise((resolve, reject) => {
      const query = new AV.Query(appDB);
      query.equalTo('user', user);
      Object.keys(options).forEach((key) => {
        query.equalTo(key, options[key]);
      });
      query.descending('createdAt');
      query.find().then((results) => {
        resolve(results);
      }).then((err) => {
        reject(err);
      });
    });
  }

  async updateTodo(todo) {
    const targetTodo = AV.Object.createWithoutData(appDB, todo.objectId);
    Object.keys(todo).forEach((todoKey) => {
      targetTodo.set(todoKey, todo[todoKey]);
    });
    await targetTodo.save();
    return true;
  }

  async deleteTodo(todoId) {
    return new Promise((resolve, reject) => {
      const todo = AV.Object.createWithoutData(appDB, todoId);
      todo.destroy().then(() => {
        resolve(true);
      }).catch((err) => {
        resolve(false);
      });
    });
  }
}

module.exports = new LeancloudStorage();

// export default new LeancloudStorage();
