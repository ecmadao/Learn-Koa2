import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {polyfill} from 'es6-promise';
polyfill();

export const handleAsyncFunc = async (asyncFunc, ...args) => {
  let result;
  try {
    NProgress.start();
    NProgress.set(0.4);
    result = await asyncFunc(...args);
  } catch (err) {
    result = null;
  } finally {
    NProgress.done();
    return result;
  }
  // return new Promise((resolve, reject) => {
  //   NProgress.start();
  //   NProgress.set(0.4);
  //   console.log('args');
  //   console.log(args);
  //   asyncFunc(...args).then((data) => {
  //     NProgress.done();
  //     resolve(data);
  //   }).catch((err) => {
  //     NProgress.done();
  //     reject(false);
  //   });
  // });
};
