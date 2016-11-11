import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { emailResendFetch } from '../../actions/auth';
import ErrorMsg from '../../components/ErrorMsg';

export class HomeComponent extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.handleEmailResend = this.handleEmailResend.bind(this);
  }

  handleEmailResend(e) {
    const { dispatch, user } = this.props;

    e.preventDefault();
    return dispatch(emailResendFetch(user.get('id')));
  }

  render() {
    const { auth, user } = this.props;

    return (
      <main>
        {!user.get('confirmed') &&
          <div>
            <p>
              You have to confirm your email. Please open email to follow link
              or <a href onClick={this.handleEmailResend}>resend</a> email.
            </p>
            {auth.get('emailResendSuccess') && <p>Email sent!</p>}
            {auth.get('emailResendError') &&
              <ErrorMsg>{auth.get('emailResendError')}</ErrorMsg>
            }
          </div>
        }
        <p>Home Page</p>
      </main>
    );
  }
}

export default connect(state => ({
  auth: state.get('auth'),
  user: state.get('user'),
}))(HomeComponent);
