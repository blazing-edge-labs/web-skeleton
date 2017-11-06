import withRedux from 'next-redux-wrapper'
import { makeStore } from 'store'
import { compose } from 'redux'
import { setPageContext } from 'utils/page-context'

function trackContext(Component) {
  const { getInitialProps } = Component
  Component.getInitialProps = function (ctx) { //eslint-disable-line
    setPageContext(ctx)
    if (!getInitialProps) return {}
    return getInitialProps.apply(this, arguments) //eslint-disable-line
  }
  return Component
}

export const connectPage = (...args) => compose(
  withRedux(makeStore, ...args),
  trackContext
)
