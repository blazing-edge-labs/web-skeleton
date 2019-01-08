import { Router } from 'routes'
import env from 'constants/env'

export const isServer = !process.browser && env.NODE_ENV !== 'test'

export function redirect(ctx, url) {
  if (isServer) {
    ctx.res.redirect(url)
  } else {
    Router.pushRoute(url)
  }
}
