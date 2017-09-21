module.exports = require('next-routes')()
.add('home', '/', 'home')
.add('recoverPassword', '/recoverPassword/:code', 'recoverPassword');

// import React from 'react';
// import PropTypes from 'prop-types';
// import { Provider } from 'react-redux';
// import { Router, Route, IndexRoute } from 'react-router';
// import App from '../containers/App';
// import Home from '../containers/Home';
// import Profile from '../containers/Profile';
// import EditProfile from '../containers/EditProfile';
// import FormExample from '../containers/FormExample';
// import Login from '../containers/Login';
// import Signup from '../containers/Signup';
// import ForgotPassword from '../containers/ForgotPassword';
// import RecoverPassword from '../containers/RecoverPassword';
// import Page404 from '../containers/Page404';

// const Routes = ({ store, history }) =>
//   <Provider store={store}>
//     <Router history={history}>
//       <Route path="/">
//         <Route component={App}>
//           <IndexRoute component={Home} />
//           <Route path="profile" component={Profile} />
//           <Route path="editProfile" component={EditProfile} />
//           <Route path="formExample" component={FormExample} />
//         </Route>
//         <Route path="login" component={Login} />
//         <Route path="signup" component={Signup} />
//         <Route path="forgotPassword" component={ForgotPassword} />
//         <Route path="recoverPassword/:code" component={RecoverPassword} />
//         <Route path="*" component={Page404} />
//       </Route>
//     </Router>
//   </Provider>;

// Routes.propTypes = {
//   store: PropTypes.object.isRequired,
//   history: PropTypes.object.isRequired,
// };

// export default Routes;
