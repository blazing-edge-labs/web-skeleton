import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

let createStoreWithMiddleware;

if (process.env.NODE_ENV === 'development') {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      createStoreWithMiddleware.replaceReducer(rootReducer);
    });
  }
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk)
  )(createStore);
}

const store = createStoreWithMiddleware(rootReducer);

export default store;
