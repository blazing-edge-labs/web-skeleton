import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { emailResendFetch } from '../actions/auth';

@connect(state => ({
  user: state.get('user'),
}))
export default class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onEmailResend = this.onEmailResend.bind(this);
  }

  onEmailResend(e) {
    e.preventDefault();
    const { dispatch, user } = this.props;
    return dispatch(emailResendFetch({ email: user.get('email') }));
  }

  render() {
    const { user } = this.props;

    return (
      <article>
        {!user.get('confirmed') &&
          <p>
            You have to confirm your email. Please open email to follow link
            or <a href onClick={this.onEmailResend}>resend</a> email again.
          </p>
        }
        <p>Home Page</p>
      </article>
    );
  }
}
