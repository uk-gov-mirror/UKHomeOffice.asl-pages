import React from 'react';
import { shallow } from 'enzyme';
import Filter from 'views/components/search';
import ApplyChanges from 'views/containers/apply-changes';

describe('<Filter />', () => {
  test('Creates a .text-filter element containing a govuk Input', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('.search-box input').length).toEqual(1);
  });

  test('Adds a label with the label prop provided', () => {
    const wrapper = shallow(<Filter label="Search by name"/>);
    expect(wrapper.find('.search-box label').text()).toEqual('Search by name');
  });

  test('Adds a default label of "Search"', () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper.find('.search-box label').text()).toEqual('Search');
  });

  test('Sets the value of the input to the filter attr if passed', () => {
    const filter = 'Hi';
    const wrapper = shallow(<Filter filter={ filter } />);
    expect(wrapper.find('input').prop('value')).toBe(filter);
  });

  test('Calls the provided onChange method on form submission', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Filter onChange={ onChange } />);
    wrapper.find('input').prop('onChange')({ target: { value: 'foo' } });
    wrapper.find(ApplyChanges).prop('onApply')();
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual('foo');
  });
});
