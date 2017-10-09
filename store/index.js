import { createStore, applyMiddleware, compose } from 'redux'
import withRedux from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'

export function configureStore(env, initialState) {
  const dev = env === 'development'

  const store = compose(
    applyMiddleware(thunk),
    (dev && window.devToolsExtension) ? window.devToolsExtension() : f => f,
  )(createStore)(rootReducer, initialState)

  if (dev && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export function makeStore(initialState) {
  return configureStore(process.env.NODE_ENV, initialState)
}

export const connectPage = withRedux.bind(null, makeStore)
