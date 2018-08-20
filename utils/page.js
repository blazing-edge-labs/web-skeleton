import withRedux from 'next-redux-wrapper'
import { makeStore } from 'store'
import { compose } from 'redux'

function enhancePage(Component) {
  const { getInitialProps } = Component
  Component.getInitialProps = function (ctx) { //eslint-disable-line
    // Put here additional common logic

    if (!getInitialProps) return {}
    return getInitialProps.apply(this, arguments) //eslint-disable-line
  }
  return Component
}

export const connectPage = (...args) => compose(
  withRedux(makeStore, ...args),
  enhancePage
)
