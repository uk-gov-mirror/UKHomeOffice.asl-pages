import React from 'react';
import { shallow } from 'enzyme';
import ApplyChanges from 'views/components/apply-changes';

describe('<ApplyChanges />', () => {
  describe('defaults', () => {
    test('renders a link with \'Submit\' label by default', () => {
      const wrapper = shallow(<ApplyChanges />);
      expect(wrapper.find('a').length).toBe(1);
      expect(wrapper.find('form').length).toBe(0);
      expect(wrapper.text()).toBe('Submit');
    });
  });

  describe('link', () => {
    test('adds the label passed as a prop', () => {
      const label = 'A Label';
      const wrapper = shallow(<ApplyChanges label={label} />);
      expect(wrapper.text()).toBe(label);
    });

    test('creates a stringified href from superfluous props', () => {
      const props = {
        query: {
          filters: {
            a: [1, 2, 3],
            b: [2, 3, 4]
          },
          sort: {
            ascending: true,
            column: 'test'
          }
        }
      };
      const expected = '?filters%5Ba%5D%5B0%5D=1&filters%5Ba%5D%5B1%5D=2&filters%5Ba%5D%5B2%5D=3&filters%5Bb%5D%5B0%5D=2&filters%5Bb%5D%5B1%5D=3&filters%5Bb%5D%5B2%5D=4&sort%5Bascending%5D=true&sort%5Bcolumn%5D=test';
      const wrapper = shallow(<ApplyChanges { ...props } />);
      expect(wrapper.find('a').prop('href')).toBe(expected);
    });

    test('prevents default and calls the onApply function on click', () => {
      const fn = jest.fn();
      const preventDefault = jest.fn();
      const wrapper = shallow(<ApplyChanges onApply={fn} />);
      wrapper.find('a').simulate('click', { preventDefault });
      expect(preventDefault.mock.calls.length).toBe(1);
      expect(fn.mock.calls.length).toBe(1);
    });
  });

  describe('form', () => {
    test('renders children', () => {
      const child = <div id="child" />;
      const wrapper = shallow(<ApplyChanges type="form">{child}</ApplyChanges>);
      expect(wrapper.find('#child').length).toBe(1);
    });

    test('accepts id', () => {
      const id = 'test';
      const wrapper = shallow(<ApplyChanges type="form" id={id} />);
      expect(wrapper.find('form').prop('id')).toBe(id);
    });

    test('adds a hidden input with stringified superfluous props', () => {
      const props = {
        query: {
          filters: {
            a: [1, 2, 3],
            b: [2, 3, 4]
          },
          sort: {
            ascending: true,
            column: 'test'
          }
        }
      };
      const wrapper = shallow(
        <ApplyChanges
          type="form"
          { ...props }
        />
      );
      const expected = 'filters%5Ba%5D%5B0%5D=1&filters%5Ba%5D%5B1%5D=2&filters%5Ba%5D%5B2%5D=3&filters%5Bb%5D%5B0%5D=2&filters%5Bb%5D%5B1%5D=3&filters%5Bb%5D%5B2%5D=4&sort%5Bascending%5D=true&sort%5Bcolumn%5D=test';
      const input = wrapper.find('input[type="hidden"]');
      expect(input.length).toBe(1);
      expect(input.prop('name')).toBe('props');
      expect(input.prop('value')).toBe(expected);
    });

    test('prevents default and calls onApply on submit', () => {
      const fn = jest.fn();
      const preventDefault = jest.fn();
      const wrapper = shallow(<ApplyChanges type="form" onApply={fn} />);
      wrapper.find('form').simulate('submit', { preventDefault });
      expect(preventDefault.mock.calls.length).toBe(1);
      expect(fn.mock.calls.length).toBe(1);
    });
  });
});
