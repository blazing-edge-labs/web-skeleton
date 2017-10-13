import React from 'react'
import { RichUtils } from 'draft-js'
import { shallow } from 'enzyme'
import RichTextEditor from './'

describe('RichTextEditor component', () => {
  const wrapper = shallow(<RichTextEditor />)
  const instance = wrapper.instance()

  it('toggleBlockType method', () => {
    spyOn(instance, 'onChange')
    spyOn(RichUtils, 'toggleBlockType').and.callThrough()
    instance.toggleBlockType('H1')

    expect(RichUtils.toggleBlockType)
      .toHaveBeenCalledWith(instance.state.editorState, 'H1')
    expect(instance.onChange).toHaveBeenCalled()
  })

  it('toggleInlineStyle method', () => {
    spyOn(instance, 'onChange')
    spyOn(RichUtils, 'toggleInlineStyle').and.callThrough()
    instance.toggleInlineStyle('Bold')

    expect(RichUtils.toggleInlineStyle)
      .toHaveBeenCalledWith(instance.state.editorState, 'Bold')
    expect(instance.onChange).toHaveBeenCalled()
  })

  it('handleKeyCommand method with handled key event', () => {
    spyOn(instance, 'onChange')
    spyOn(RichUtils, 'handleKeyCommand').and.callThrough()
    instance.handleKeyCommand('bold')

    expect(RichUtils.handleKeyCommand)
      .toHaveBeenCalledWith(instance.state.editorState, 'bold')
    expect(instance.onChange).toHaveBeenCalled()
  })

  it('handleKeyCommand method with unhandled key event', () => {
    spyOn(instance, 'onChange')
    spyOn(RichUtils, 'handleKeyCommand').and.callThrough()
    instance.handleKeyCommand('unhandled-event')

    expect(RichUtils.handleKeyCommand)
      .toHaveBeenCalledWith(instance.state.editorState, 'unhandled-event')
    expect(instance.onChange).not.toHaveBeenCalled()
  })

  it('onChange method', () => {
    instance.onChange({})

    expect(instance.state).toEqual({ editorState: {} })
  })
})
