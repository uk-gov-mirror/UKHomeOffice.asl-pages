import React from 'react';
import { render } from 'enzyme';
import Acronym from 'views/components/acronym';
import dictionary from '@asl/dictionary';

describe('<Acronym />', () => {
  Object.keys(dictionary).forEach(key => {
    test(`handles input ${key}`, () => {
      const wrapper = render(<Acronym>{key}</Acronym>);
      expect(wrapper.attr('title')).toBe(dictionary[key]);
      expect(wrapper.text()).toBe(key);
      expect(wrapper.get(0).tagName).toBe('abbr');
    });
  });
});
