const nextRouter = require('next/router').default
const { getPageContext } = require('./page-context')

const wrap = method => (url, as) => {
  if (nextRouter.router) {
    return nextRouter.router[method](url, as)
  }
  getPageContext().res.redirect(url)
  return new Promise(() => {})
}

module.exports = {
  push: wrap('push'),
  replace: wrap('replace'),
}
