import React from 'react';
import { shallow } from 'enzyme';
import StyleButton from './';

describe('StyleButton component', () => {
  const onToggle = jest.genMockFunction();
  const wrapper = shallow(
    <StyleButton
      label="text"
      onToggle={onToggle}
    />);

  it('render StyleButton component', () => {
    expect(wrapper).toBeTruthy();
  });
});
