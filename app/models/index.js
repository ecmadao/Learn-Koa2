import mongoose from 'mongoose';
import {mongodb} from 'config-lite';

mongoose.connect(mongodb.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', mongodb.url, err.message);
    process.exit(1);
  }
});

// import User from './user';
import Todo from './todo';

export default {
  // User,
  Todo
}
