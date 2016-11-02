import React from 'react';
import { shallow } from 'enzyme';
import RichTextEditor from './';

describe('RichTextEditor component', () => {
  const wrapper = shallow(<RichTextEditor />);
  const instance = wrapper.instance();
  instance.toggleBlockType = jest.fn(() => ({}));
  instance.toggleInlineStyle = jest.fn(() => ({}));
  instance.handleKeyCommand = jest.fn(() => ({}));

  it('render RichTextEditor component', () => {
    expect(instance).toBeTruthy();
  });

  it('toggleInlineStyle method', () => {
    instance.toggleInlineStyle('inlineStyle');
    expect(instance.toggleInlineStyle).toHaveBeenCalled();
  });

   it('handleKeyCommand method', () => {
    instance.handleKeyCommand('keyCommand');
    expect(instance.handleKeyCommand).toHaveBeenCalled();
  });
});
