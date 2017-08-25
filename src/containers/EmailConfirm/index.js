import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { emailConfirmFetch } from '../../actions/auth';
import { REDIRECTION } from '../../constants/application';
import ErrorMsg from '../../components/ErrorMsg';

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
      setTimeout(() => router.push('/'), REDIRECTION),
    ));
  }

  render() {
    const { auth } = this.props;

    return (
      <main>
        <p>Checking your email...</p>
        {auth.emailConfirmationSuccess &&
          <p>Email successfully checked. Redirecting...</p>
        }
        {auth.emailConfirmationError &&
          <ErrorMsg>{auth.emailConfirmationError}</ErrorMsg>
        }
      </main>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
}))(withRouter(EmailConfirmComponent));
