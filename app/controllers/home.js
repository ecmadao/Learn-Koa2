const homeIndex = async (ctx, next) => {
  await ctx.redirect('/user');
};

const about = async (ctx, next) => {
  await ctx.redirect('/user');
};

export default {
  homeIndex,
  about
};
