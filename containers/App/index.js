import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Link } from '../../routes';
import { logoutAction } from '../../actions/auth';

export class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    const { dispatch } = this.props;

    e.preventDefault();
    dispatch(logoutAction()).then(() => Router.pushRoute('/login'));
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <nav>
          <Link to="/"><a>Home</a></Link>
          <Link to="/formExample"><a>Components</a></Link>
          <Link to="/profile"><a>Profile</a></Link>
          <a href onClick={this.handleLogout}>Logout</a>
        </nav>
        <div>{children}</div>
      </div>
    );
  }
}

export default connect()(AppComponent);
