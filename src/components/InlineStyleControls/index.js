import React, { PropTypes } from 'react';
import { INLINE_STYLES } from '../../constants/richTextEditor';
import StyleButton from '../StyleButton';

const InlineStyleControls = (props) => {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;
