import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './style.local.scss';

class Checkbox extends Component {
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
    const { input } = this.props;
    const { value } = input;
    input.onChange(!value || false);
  }

  render() {
    const { label, input } = this.props;
    const { focused } = this.state;

    return (
      <div
        htmlFor={input.name}
        onClick={this.changeValue}
        aria-checked={input.value}
        role="checkbox"
        tabIndex={0}
        onFocus={this.changeFocus}
        onBlur={this.changeFocus}
        onKeyDown={this.onKeyPressed}
        className="root"
      >
        <style jsx>{css}</style>
        <span
          id={input.name}
          className={`checkbox ${input.value ? 'checked' : ''} ${focused ? 'focused' : ''}`}
        >
          {input.value && <i className="fa fa-check checkIcon" />}
        </span>
        <label htmlFor={input.name}>{label}</label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
};

export default Checkbox;
