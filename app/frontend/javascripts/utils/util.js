import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import {polyfill} from 'es6-promise';
// polyfill();

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
};
