const mongoose = require('mongoose');
const config = require('config-lite').mongodb;

mongoose.connect(config.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

import User from './user';
import Todo from './todo';

export default {
  User,
  Todo
}

// exports.User = require('./user');
// exports.Topic = require('./topic');
// exports.Comment = require('./comment');
