import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import Home from '../containers/Home';
import Profile from '../containers/Profile';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import ForgotPassword from '../containers/ForgotPassword';
import ChangePassword from '../containers/ChangePassword';
import EmailConfirm from '../containers/EmailConfirm';

const Routes = ({ store, history }) =>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <Route component={App}>
          <IndexRoute component={Home} />
          <Route path="profile" component={Profile} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="forgotPassword" component={ForgotPassword} />
        <Route path="changePassword/:code" component={ChangePassword} />
        <Route path="emailConfirm/:code" component={EmailConfirm} />
      </Route>
    </Router>
  </Provider>;

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Routes;