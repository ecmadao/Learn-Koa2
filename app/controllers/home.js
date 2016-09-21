import {
  getGithubToke,
  getGithubUser
} from '../services/github';

const home = async (ctx, next) => {
  // ctx.cookies.set('username', 'ecmadao');
  // const user = User.addUser('ecmadao', 'wlec@outlook.com', '12345678');
  // console.log(user);
  await ctx.render('home/index', {
    title: 'home page',
    content: 'this is home page'
  });
};

const about = async (ctx, next) => {
  // console.log('ctx cookies');
  // console.log(ctx.cookies.get('username'));
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
    ctx.session.token = token;
    const userInfo = await getGithubUser(token);
    if (userInfo) {
      ctx.session.user = userInfo;
      return ctx.redirect('/todo');
    }
    return ctx.redirect('/');
  } catch (TypeError) {
    return ctx.redirect('/');
  }
};

export default {
  home,
  about,
  github
};
