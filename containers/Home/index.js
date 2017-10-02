import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import css from './style.scss';

const HomeComponent = () => {
  return (
    <main>
      <style jsx>{css}</style>
      <p className="test">Home Page!</p>
    </main>
  );
};

// export default HomeComponent;

HomeComponent.propTypes = {
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(state => ({
  auth: state.auth,
  user: state.user,
}))(HomeComponent);
