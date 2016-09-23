const homeIndex = async (ctx, next) => {
  await ctx.redirect('/user');
  // await ctx.render('home/index', {
  //   title: 'index page',
  //   content: 'index page'
  // });
};

const about = async (ctx, next) => {
  await ctx.redirect('/user');
  // await ctx.render('home/about', {
  //   title: 'about page',
  //   content: 'about page'
  // });
};

export default {
  homeIndex,
  about
};
