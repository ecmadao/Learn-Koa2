import {
  getGithubToke,
  getGithubUser
} from '../services/github';

const userIndex = async (ctx, next) => {
  await ctx.render('user/index', {
    title: 'user home page',
    user: (ctx.session.user && ctx.session.user.name) || null
  });
};

const github = async (ctx, next) => {
  const code = ctx.request.query.code;
  const result = await getGithubToke(code);
  try {
    const token = result.match(/^access_token=(\w+)&/)[1];
    const userInfo = await getGithubUser(token);
    if (userInfo) {
      ctx.session.token = token;
      ctx.session.user = JSON.parse(userInfo);
      return ctx.redirect('/todo');
    }
    return ctx.redirect('/user');
  } catch (TypeError) {
    return ctx.redirect('/user');
  }
};

const logout = async (ctx, next) => {
  ctx.session.token = null;
  ctx.session.user = null;
  ctx.redirect('/user');
};

export default {
  userIndex,
  github,
  logout
};
