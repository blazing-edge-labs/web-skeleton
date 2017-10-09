import React from 'react'
import { shallow } from 'enzyme'
import StyleButton from 'components/StyleButton'

describe('StyleButton component', () => {
  const onToggle = jest.fn()
  const wrapper = shallow(
    <StyleButton
      label="H1"
      onToggle={onToggle}
      style="header-one"
    />
  )
  const instance = wrapper.instance()

  it('onToggle method', () => {
    const mockPreventDefault = jest.fn()
    const event = {
      preventDefault: mockPreventDefault,
    }
    instance.onToggle(event)

    expect(mockPreventDefault).toHaveBeenCalledTimes(1)
    expect(onToggle).toHaveBeenCalledWith('header-one')
  })
})
