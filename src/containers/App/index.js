import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { logoutAction } from '../../actions/auth';

export class AppComponent extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    const { dispatch, router } = this.props;

    e.preventDefault();
    dispatch(logoutAction(() => router.push('/login')));
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <nav>
          <Link to="/profile">Profile</Link>
          <a href onClick={this.handleLogout}>Logout</a>
        </nav>
        <div>{children}</div>
      </div>
    );
  }
}

export default connect()(withRouter(AppComponent));
