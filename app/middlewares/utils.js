export const checkIfLogin = async (ctx, next) => {
  const user = ctx.session.user;
  const token = ctx.session.token;
  if (!user || !token) {
    return ctx.redirect('/user');
  }
  await next();
};

export const checkIfNotLogin = async (ctx, next) => {
  const user = ctx.session.user;
  const token = ctx.session.token;
  if (user && token) {
    return ctx.redirect('/user');
  }
  await next();
};
