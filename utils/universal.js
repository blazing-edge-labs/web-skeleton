import { Router } from 'routes'
import env from 'constants/env'

export const isServer = typeof window === 'undefined' && env.NODE_ENV !== 'test'

export function redirect(ctx, url) {
  if (isServer) {
    ctx.res.redirect(url)
  } else {
    Router.pushRoute(url)
  }
}
