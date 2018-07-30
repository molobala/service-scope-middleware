/**
 * This middleware will check if the action to call need to check a pack if so then it check it
 *
 *
 */
/**
 * check a possible operation based on the pack
 *
 * @method
 *
 *
 * @Returns {Boolean}
 */
async function can(ctx, {
  workspace,
  key,
  check
}) {
  ///
  return false;
}
module.exports = () => (handler) => {
  return async (ctx) => {
    let pack = ctx.action.pack;
    if (!pack) //no check angainst ths action
    {
     	return handler(ctx);
    }
    const packCheck = (typeof pack === 'function' ) ? await pack.call(ctx.action.service, ctx) : pack;
    if(!packCheck) return handler(ctx);
    const yes = await can(ctx, {
      //workspace: ctx.meta.user.workspace,
      //key: packCheck.key,
      //check: packCheck.check
    });
    if (!yes) return Promise.reject(packCheck.message || `Your pack doesn't allow you to do such operation`);
  	return handler(ctx);
  }
}