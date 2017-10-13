import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StyleButton extends Component {
  static propTypes = {
    label: PropTypes.string,
    onToggle: PropTypes.func,
    style: PropTypes.string,
  }

  constructor() {
    super()
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle(e) {
    const { onToggle, style } = this.props

    e.preventDefault()
    onToggle(style)
  }

  render() {
    const { label } = this.props

    return (
      <span onMouseDown={this.onToggle}>{label}</span>
    )
  }
}
