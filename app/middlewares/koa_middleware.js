export const catchError = async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    const status = err.status || 500;
    ctx.status = status;
    await ctx.render('error/error', {
      title: 'error'
    });
    if (status === 500) {
      console.log(err);
    }
  }
};
