const homeIndex = async (ctx, next) => {
  ctx.redirect('/user');
  // await ctx.render('home/index', {
  //   title: 'home page',
  //   content: 'this is home page',
  //   user: (ctx.session.user && ctx.session.user.name) || null
  // });
};

const about = async (ctx, next) => {
  await ctx.render('home/about', {
    title: 'about page',
    content: 'this is about page'
  });
};

export default {
  homeIndex,
  about
};
