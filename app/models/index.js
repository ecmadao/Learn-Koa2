const mongoose = require('mongoose');
const config = require('config-lite').mongodb;

mongoose.connect(config.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

import Todo from './todo';

export default {
  Todo
};
