import React from 'react';
import { shallow } from 'enzyme';
import Filters from 'views/components/filters';
import { OptionSelect, CheckedOption } from '@ukhomeoffice/react-components';

describe('<Filters />', () => {
  describe('render', () => {
    const options = {
      a: {
        values: ['a', 'b', 'c']
      }
    };
    const active = { a: [] };

    test('creates an OptionSelect element for each options item passed in', () => {
      const wrapper = shallow(<Filters options={options} active={active} />);
      expect(wrapper.find(OptionSelect).length).toBe(1);
    });

    test('creates a CheckedOption element for each value in each options item', () => {
      const wrapper = shallow(<Filters options={options} active={active} />);
      expect(wrapper.find(CheckedOption).length).toBe(3);
    });

    test('passes checked option from props', () => {
      const wrapper = shallow(<Filters options={options} active={{
        a: ['a']
      }} />);
      expect(wrapper.find(CheckedOption).at(0).prop('checked')).toBe(true);
      expect(wrapper.find(CheckedOption).at(1).prop('checked')).toBe(false);
      expect(wrapper.find(CheckedOption).at(2).prop('checked')).toBe(false);
    });
  });

  describe('methods', () => {
    describe('componentDidMount()', () => {
      test('sets state from filters passed in via props', () => {
        const active = { a: ['b', 'c', 'd'] };
        const wrapper = shallow(<Filters active={active} />);
        expect(wrapper.instance().state.active).toEqual(active);
      });
    });

    describe('emitChange()', () => {
      test('calls props.onFiltersChange with state.active when called', () => {
        const onFiltersChange = jest.fn();
        const active = { a: ['b'] };
        const wrapper = shallow(<Filters onFiltersChange={onFiltersChange} />);
        wrapper.instance().state = { active };
        wrapper.instance().emitChange();
        expect(onFiltersChange.mock.calls[0][0]).toEqual(active);
      });
    });

    describe('clearFilters()', () => {
      const onFiltersChange = jest.fn();
      const wrapper = shallow(<Filters onFiltersChange={onFiltersChange} />);

      test('calls onFiltersChange with null', () => {
        wrapper.instance().clearFilters();
        expect(onFiltersChange.mock.calls[0][0]).toEqual(null);
      });
    });

    describe('onCheckboxChange()', () => {
      let instance;

      beforeEach(done => {
        const wrapper = shallow(<Filters />);
        instance = wrapper.instance();
        instance.setState({ active: {} }, done);
      });

      test('adds the filter to state if checked', () => {
        instance.onCheckboxChange('a', 'b', true);
        expect(instance.state.active).toEqual({ a: ['b'] });
        instance.onCheckboxChange('a', 'c', true);
        expect(instance.state.active).toEqual({ a: ['b', 'c'] });
        instance.onCheckboxChange('b', 'a', true);
        expect(instance.state.active).toEqual({ a: ['b', 'c'], b: ['a'] });
      });

      test('removes the filter from the state if not checked', () => {
        instance.state.active = {
          a: ['b', 'c', 'd'],
          b: ['e', 'f', 'g']
        };
        instance.onCheckboxChange('a', 'b', false);
        expect(instance.state.active).toEqual({
          a: ['c', 'd'],
          b: ['e', 'f', 'g']
        });
        instance.onCheckboxChange('a', 'd', false);
        expect(instance.state.active).toEqual({
          a: ['c'],
          b: ['e', 'f', 'g']
        });
        instance.onCheckboxChange('b', 'f', false);
        expect(instance.state.active).toEqual({
          a: ['c'],
          b: ['e', 'g']
        });
      });

      test('removed the key from state.active if no filters exist', () => {
        instance.state.active = {
          a: ['b'],
          b: ['c']
        };
        instance.onCheckboxChange('a', 'b', false);
        expect(instance.state.active).toEqual({ b: ['c'] });
        instance.onCheckboxChange('b', 'a', false);
        expect(instance.state.active).toEqual({});
      });
    });

    describe('isChecked()', () => {
      test('returns true if item is in state.active', () => {
        const wrapper = shallow(<Filters />);
        const instance = wrapper.instance();
        instance.state = { active: { a: ['test'] } };
        expect(instance.isChecked('a', 'test')).toBe(true);
      });

      test('returns true if item is in props and state is null', () => {
        const active = { a: ['test'] };
        const wrapper = shallow(<Filters active={active} />);
        const instance = wrapper.instance();
        instance.state = null;
        expect(instance.isChecked('a', 'test')).toBe(true);
      });
    });
  });
});
