const home = async (ctx, next) => {
  await ctx.render('home/index', {
    title: 'home page',
    content: 'this is home page'
  });
};

const about = async (ctx, next) => {
  await ctx.render('home/about', {
    title: 'about page',
    content: 'this is about page'
  });
};

export default {
  home,
  about
};
