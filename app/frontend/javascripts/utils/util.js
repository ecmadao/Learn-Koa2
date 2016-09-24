import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export const handleAsyncFunc = (asyncFunc, ...args) => {
  return new Promise((resolve, reject) => {
    NProgress.start();
    NProgress.set(0.4);
    console.log('args');
    console.log(args);
    asyncFunc(...args).then((data) => {
      NProgress.done();
      resolve(data);
    }).catch((err) => {
      NProgress.done();
      reject(false);
    });
  });
};
