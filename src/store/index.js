import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export function configureStore(env) {
  const dev = env === 'development';

  const store = compose(
    applyMiddleware(thunk),
    (dev && window.devToolsExtension) ? window.devToolsExtension() : f => f,
  )(createStore)(rootReducer);

  if (dev && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}

export default configureStore(process.env.NODE_ENV);
