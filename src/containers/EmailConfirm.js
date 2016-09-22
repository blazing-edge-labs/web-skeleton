import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { emailConfirmFetch } from '../actions/auth';
import { REDIRECTION } from '../constants/application';

@connect(({ auth }) => ({
  auth,
}))
@withRouter
export default class EmailConfirm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch, params, router } = this.props;
    return dispatch(emailConfirmFetch({ token: params.code }, () =>
      setTimeout(() => router.push('/'), REDIRECTION)
    ));
  }

  render() {
    const { auth } = this.props;

    return (
      <article>
        <p>Checking your email...</p>
        {auth.emailConfirmationSuccess &&
          <p>Email successfully checked. Redirecting...</p>
        }
        {auth.emailConfirmationError &&
          <p>{auth.emailConfirmationError}</p>
        }
      </article>
    );
  }
}
