import { Router } from 'routes'

export const isServer = typeof window === 'undefined' && process.env.NODE_ENV !== 'test'

export function redirect(ctx, url) {
  if (isServer) {
    ctx.res.redirect(url)
  } else {
    Router.pushRoute(url)
  }
}
