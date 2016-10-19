import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { emailConfirmFetch } from '../../actions/auth';
import { REDIRECTION } from '../../constants/application';

export class EmailConfirmComponent extends Component {
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
        {auth.get('emailConfirmationSuccess') &&
          <p>Email successfully checked. Redirecting...</p>
        }
        {auth.get('emailConfirmationError') &&
          <p>{auth.get('emailConfirmationError')}</p>
        }
      </article>
    );
  }
}

export default connect(state => ({
  auth: state.get('auth'),
}))(withRouter(EmailConfirmComponent));
