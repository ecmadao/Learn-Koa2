import User from '../services/user';
// import request from 'request';
import {
  getGithubToke,
  getGithubUser
} from '../services/github';

const home = async (ctx, next) => {
  console.log('request body');
  console.log(ctx.request.body);
  let n = ctx.session.num || 0;
  console.log(n);
  ctx.session.num = n + 1;
  ctx.cookies.set('username', 'ecmadao');
  // const user = User.addUser('ecmadao', 'wlec@outlook.com', '12345678');
  // console.log(user);
  await ctx.render('home/index', {
    title: 'home page',
    content: 'this is home page'
  });
};

const about = async (ctx, next) => {
  console.log('ctx cookies');
  console.log(ctx.cookies.get('username'));
  await ctx.render('home/about', {
    title: 'about page',
    content: 'this is about page'
  });
};

const github = async (ctx, next) => {
  const code = ctx.request.query.code;
  const result = await getGithubToke(code);
  try {
    const token = result.match(/^access_token=(\w+)&/)[1];
    console.log(token);
    ctx.session.token = token;
    ctx.body = 'github login callback';
  } catch (TypeError) {
    ctx.redirect('/');
  }
};

export default {
  home,
  about,
  github
};
