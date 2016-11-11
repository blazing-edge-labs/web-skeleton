import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { emailResendFetch } from '../../actions/auth';

export class HomeComponent extends Component {
  static propTypes = {
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
    return dispatch(emailResendFetch({ email: user.get('email') }));
  }

  render() {
    const { user } = this.props;

    return (
      <main>
        {!user.get('confirmed') &&
          <p>
            You have to confirm your email. Please open email to follow link
            or <a href onClick={this.handleEmailResend}>resend</a> email again.
          </p>
        }
        <p>Home Page</p>
      </main>
    );
  }
}

export default connect(state => ({
  user: state.get('user'),
}))(HomeComponent);
