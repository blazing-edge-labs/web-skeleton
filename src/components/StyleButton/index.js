import React, { Component, PropTypes } from 'react';

export default class StyleButton extends Component {
  static propTypes = {
    onToggle: PropTypes.func,
    style: PropTypes.string,
    label: PropTypes.string,
  }

  constructor() {
    super();

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    return (
      <span onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
