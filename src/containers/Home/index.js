import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const HomeComponent = () => {
  return (
    <main>
      <p>Home Page</p>
    </main>
  );
};

HomeComponent.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(state => ({
  auth: state.auth,
  user: state.user,
}))(HomeComponent);
