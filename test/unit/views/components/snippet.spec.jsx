import React from 'react';
import { render } from 'enzyme';
import Snippet from 'views/components/snippet';

describe('<Snippet />', () => {

  const content = {
    string: 'one line',
    list: `* one
      * two
      * three`,
    paragraphs: `one

      two`
  };

  test('does not include a wrapping element on single line input', () => {
    const wrapper = render(<div><Snippet content={content}>string</Snippet></div>);
    expect(wrapper.find('p').length).toEqual(0);
    expect(wrapper.text()).toEqual('one line');
  });

  test('includes wrapping elements on list inputs inputs', () => {
    const wrapper = render(<div><Snippet content={content}>list</Snippet></div>);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.text()).toEqual('onetwothree');
  });

  test('includes wrapping elements on multi-line paragraph inputs', () => {
    const wrapper = render(<div><Snippet content={content}>paragraphs</Snippet></div>);
    expect(wrapper.find('p').length).toEqual(2);
    expect(wrapper.text()).toEqual('onetwo');
  });

});
