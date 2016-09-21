var path = require('path');

module.exports = {
  port: process.env.PORT || 7000,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/koa2-todo'
  },
  githubConfig: {
    clientId: '1b1d94a101d42c0f6dee',
    clientSecret: 'e330762c3b920951f3b2ea7a68c2853a90245c0d',
    appName: 'Koa2-Todo'
  }
};
