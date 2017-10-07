import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import BlockStyleControls from '../BlockStyleControls'
import InlineStyleControls from '../InlineStyleControls'

export default class RichTextEditor extends Component {
  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.toggleBlockType = this.toggleBlockType.bind(this)
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this)

    this.state = { editorState: EditorState.createEmpty() }
  }

  onChange(editorState) {
    this.setState({ editorState })
  }

  toggleBlockType(blockType) {
    const { editorState } = this.state

    this.onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType,
      )
    )
  }

  toggleInlineStyle(inlineStyle) {
    const { editorState } = this.state

    this.onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle,
      )
    )
  }

  // handling key commands (cmd+B, cmd+I etc.)
  handleKeyCommand(command) {
    const { editorState } = this.state

    const newState = RichUtils.handleKeyCommand(
      editorState,
      command,
    )

    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  render() {
    const { editorState } = this.state

    return (
      <div>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <Editor
          handleKeyCommand={this.handleKeyCommand}
          editorState={editorState}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
