import React from 'react';
import { shallow } from 'enzyme';
import Filters from 'views/components/filters';
import { OptionSelect, CheckedOption } from 'govuk-react-components';

describe('<Filters />', () => {
  describe('render', () => {
    const filterSettings = {
      a: {
        values: ['a', 'b', 'c']
      }
    };
    const filters = { a: [] };

    test('creates an OptionSelect element for each filterSettings item passed in', () => {
      const wrapper = shallow(<Filters filterSettings={filterSettings} filters={filters} />);
      expect(wrapper.find(OptionSelect).length).toBe(1);
    });

    test('creates a CheckedOption element for each value in each filterSettings item', () => {
      const wrapper = shallow(<Filters filterSettings={filterSettings} filters={filters} />);
      expect(wrapper.find(CheckedOption).length).toBe(3);
    });

    test('creates a passes checked option from props', () => {
      const wrapper = shallow(<Filters filterSettings={filterSettings} filters={{
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
        const filters = { a: ['b', 'c', 'd'] };
        const wrapper = shallow(<Filters filters={filters} />);
        expect(wrapper.instance().state.filters).toEqual(filters);
      });
    });

    describe('emitChange()', () => {
      test('calls props.setFilters with state.filters when called', () => {
        const setFilters = jest.fn();
        const filters = { a: ['b'] };
        const wrapper = shallow(<Filters setFilters={setFilters} />);
        wrapper.instance().state = { filters };
        wrapper.instance().emitChange();
        expect(setFilters.mock.calls[0][0]).toEqual(filters);
      });
    });

    describe('clearFilters()', () => {
      const setFilters = jest.fn();
      const wrapper = shallow(<Filters setFilters={setFilters} />);

      test('calls setFilters with an empty object', () => {
        wrapper.instance().clearFilters();
        expect(setFilters.mock.calls[0][0]).toEqual({});
      });
    });

    describe('onCheckboxChange()', () => {
      let instance;

      beforeEach(done => {
        const wrapper = shallow(<Filters />);
        instance = wrapper.instance();
        instance.setState({ filters: {} }, done);
      });

      test('adds the filter to state if checked', () => {
        instance.onCheckboxChange('a', 'b', true);
        expect(instance.state.filters).toEqual({ a: ['b'] });
        instance.onCheckboxChange('a', 'c', true);
        expect(instance.state.filters).toEqual({ a: ['b', 'c'] });
        instance.onCheckboxChange('b', 'a', true);
        expect(instance.state.filters).toEqual({ a: ['b', 'c'], b: ['a'] });
      });

      test('removes the filter from the state if not checked', () => {
        instance.state.filters = {
          a: ['b', 'c', 'd'],
          b: ['e', 'f', 'g']
        };
        instance.onCheckboxChange('a', 'b', false);
        expect(instance.state.filters).toEqual({
          a: ['c', 'd'],
          b: ['e', 'f', 'g']
        });
        instance.onCheckboxChange('a', 'd', false);
        expect(instance.state.filters).toEqual({
          a: ['c'],
          b: ['e', 'f', 'g']
        });
        instance.onCheckboxChange('b', 'f', false);
        expect(instance.state.filters).toEqual({
          a: ['c'],
          b: ['e', 'g']
        });
      });

      test('removed the key from state.filters if no filters exist', () => {
        instance.state.filters = {
          a: ['b'],
          b: ['c']
        };
        instance.onCheckboxChange('a', 'b', false);
        expect(instance.state.filters).toEqual({ b: ['c'] });
        instance.onCheckboxChange('b', 'a', false);
        expect(instance.state.filters).toEqual({});
      });
    });

    describe('isChecked()', () => {
      test('returns true if item is in state.filters', () => {
        const wrapper = shallow(<Filters />);
        const instance = wrapper.instance();
        instance.state = { filters: { a: ['test'] } };
        expect(instance.isChecked('a', 'test')).toBe(true);
      });

      test('returns true if item is in props and state is null', () => {
        const filters = { a: ['test'] };
        const wrapper = shallow(<Filters filters={filters} />);
        const instance = wrapper.instance();
        instance.state = null;
        expect(instance.isChecked('a', 'test')).toBe(true);
      });
    });
  });
});
