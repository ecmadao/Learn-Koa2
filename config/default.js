var path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/learn-koa2'
  }
};
