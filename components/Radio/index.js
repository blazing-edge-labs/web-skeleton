import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './style.scss';

class Radio extends Component {
  constructor(props) {
    super(props);

    this.changeValue = this.changeValue.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);

    this.state = {
      focused: false,
    };
  }

  onKeyPressed(e) {
    if (e.key === 'Enter') this.changeValue();
  }

  changeFocus() {
    const { focused } = this.state;

    this.setState({ focused: !focused });
  }

  changeValue() {
    const { input, val } = this.props;

    input.onChange(val);
  }

  render() {
    const { label, input, val } = this.props;
    const { focused } = this.state;

    const isChecked = input.value === val;

    return (
      <div
        htmlFor={input.name}
        onClick={this.changeValue}
        aria-checked={isChecked}
        role="radio"
        tabIndex={0}
        onFocus={this.changeFocus}
        onBlur={this.changeFocus}
        onKeyDown={this.onKeyPressed}
        className="root"
      >
        <style jsx>{css}</style>
        <span
          id={input.name}
          className={`outer ${isChecked ? 'filled' : ''} ${focused ? 'focused' : ''}`}
        >
          {isChecked && <span className="inner" />}
        </span>
        <label htmlFor={input.name}>{label}</label>
      </div>
    );
  }
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Radio;
