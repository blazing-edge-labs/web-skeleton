import React from 'react'
import PropTypes from 'prop-types'
import { BLOCK_TYPES } from '../../constants/richTextEditor'
import StyleButton from '../StyleButton'

const BlockStyleControls = (props) => {
  const { editorState, onToggle } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div>
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

BlockStyleControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default BlockStyleControls
