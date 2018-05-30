import React from 'react';
import { shallow } from 'enzyme';
import LinkFilter from 'views/components/link-filter';
import ApplyChanges from 'views/containers/apply-changes';

describe('<LinkFilter />', () => {
  test('renders an \'All\' ApplyChanges element if a filter is selected', () => {
    const filters = [];
    const expected = 'All';
    const wrapper = shallow(<LinkFilter filters={filters} selected={'a filter'} />);
    const el = wrapper.find(ApplyChanges);
    expect(el.length).toBe(1);
    expect(el.prop('label')).toBe(expected);
  });

  test('renders \'All\' as text if filter not selected', () => {
    const filters = [];
    const expected = 'All';
    const wrapper = shallow(<LinkFilter filters={filters} />);
    expect(wrapper.find(ApplyChanges).length).toBe(0);
    expect(wrapper.text().includes(expected)).toBe(true);
  });

  test('renders an ApplyChanges component for each filter', () => {
    const filters = ['a filter', 'b filter', 'c filter'];
    const wrapper = shallow(<LinkFilter filters={filters} />);
    const els = wrapper.find(ApplyChanges);
    expect(els.length).toBe(3);
    expect(els.at(0).prop('label')).toBe('a filter');
    expect(els.at(1).prop('label')).toBe('b filter');
    expect(els.at(2).prop('label')).toBe('c filter');
  });

  test('renders a text label instead of a filter if filter is selected', () => {
    const filters = ['a filter'];
    const selected = 'a filter';
    const wrapper = shallow(<LinkFilter filters={filters} selected={selected} />);
    expect(wrapper.find(ApplyChanges).length).toBe(1);
    expect(wrapper.text().includes(selected)).toBe(true);
  });

  test('ApplyChanges: All calls onChange with null when onApply is called', () => {
    const onChange = jest.fn();
    const filters = ['a filter'];
    const selected = 'a filter';
    const wrapper = shallow(<LinkFilter filters={filters} selected={selected} onChange={onChange} />);
    wrapper.find(ApplyChanges).prop('onApply')();
    expect(onChange.mock.calls[0][0]).toBe(null);
  });

  test('ApplyChanges: filter calls onChange with filter when onApply is called', () => {
    const onChange = jest.fn();
    const filters = ['a filter'];
    const wrapper = shallow(<LinkFilter filters={filters} onChange={onChange} />);
    wrapper.find(ApplyChanges).prop('onApply')();
    expect(onChange.mock.calls[0][0]).toBe(filters[0]);
  });
});
