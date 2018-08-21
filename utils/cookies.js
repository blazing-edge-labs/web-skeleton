import Cookies from 'universal-cookie'
import { isServer } from 'utils/universal'

const browserCookies = !isServer ? new Cookies() : null

const getCookies = ctx => browserCookies || ctx.req.universalCookies

function castSecureInOptions(options) {
  if (options && options.secure && process.env.NODE_ENV !== 'production') {
    return { ...options, secure: false }
  }
  return options
}

export default {
  get(name, { ctx, ...options } = {}) {
    return getCookies(ctx).get(name, options)
  },

  set(name, value, { ctx, ...options } = {}) {
    return getCookies(ctx).set(name, value, castSecureInOptions(options))
  },

  remove(name, { ctx, ...options } = {}) {
    return getCookies(ctx).remove(name, castSecureInOptions(options))
  },
}
