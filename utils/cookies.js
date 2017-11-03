import Cookies from 'universal-cookie'
import { getPageContext } from 'utils/page-context'

const browserCookies = new Cookies()

function getCookies() {
  const { req } = getPageContext() || {}
  return req && req.universalCookies || browserCookies // eslint-disable-line
}

function castSecureInOptions(options) {
  if (options && options.secure && process.env.NODE_ENV === 'development') {
    return { ...options, secure: false }
  }
  return options
}

export default {
  get(name, options) {
    return getCookies().get(name, options)
  },

  set(name, value, options) {
    return getCookies().set(name, value, castSecureInOptions(options))
  },

  remove(name, options) {
    return getCookies().remove(name, castSecureInOptions(options))
  },
}
