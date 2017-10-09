/* eslint react/no-multi-comp:0 */
/* eslint no-underscore-dangle:0 */
/* eslint class-methods-use-this:0 */

import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import addStyles from './addStyles';

export default function applyStyles(styles) {
  return (WrappedComponent) => {
    class ApplyStyles extends Component {
      componentWillMount() {
        this.updateNextStyles = addStyles(styles);
      }

      componentWillUnmount() {
        // Remove component styles
        this.updateNextStyles([]);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    ApplyStyles.displayName = `ApplyStyles(${displayName})`;
    ApplyStyles.ComposedComponent = WrappedComponent;

    return hoistStatics(ApplyStyles, WrappedComponent);
  };
}
