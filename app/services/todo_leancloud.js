import AV from 'leancloud-storage';
import config from 'config';

const appId = config.get('leancloud.appId');
const appKey = config.get('leancloud.appKey');
console.log('appId');
console.log(appId);
AV.init({ appId, appKey });

class LeancloudStorage {
  constructor() {
    const TodoObject = AV.Object.extend('Todo');
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

  getTodos(user) {
    return new Promise((resolve, reject) => {
      const query = new AV.Query('Todo');
      query.equalTo('user', user);
      query.find().then((results) => {
        resolve(results);
      }).then((err) => {
        reject(err);
      });
    });
  }

  async updateTodo(todo) {
    return await todo;
  }

  async deleteTodo(todoId) {
    return await todoId;
  }
}

module.exports = new LeancloudStorage();

// export default new LeancloudStorage();
