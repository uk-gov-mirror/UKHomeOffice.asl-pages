import React from 'react';
import { shallow } from 'enzyme';
import ExpandingPanel from 'views/components/expanding-panel';

describe('<ExpandingPanel />', () => {
  test('sets open state to false on mount', () => {
    const wrapper = shallow(<ExpandingPanel />);
    expect(wrapper.instance().state.open).toBe(false);
  });

  test('renders only a header if not passed open prop', () => {
    const wrapper = shallow(<ExpandingPanel title="The Title">The Content</ExpandingPanel>);
    expect(wrapper.find('header').text()).toBe('The Title');
    expect(wrapper.find('.content').length).toBe(0);
  });

  test('renders content if open prop is set to true', () => {
    const wrapper = shallow(<ExpandingPanel open={true} title="The Title">The Content</ExpandingPanel>);
    expect(wrapper.find('.content').text()).toBe('The Content');
  });

  describe('methods', () => {
    describe('controlled()', () => {
      test('returns false if props.open is not defined', () => {
        const wrapper = shallow(<ExpandingPanel />);
        expect(wrapper.instance().controlled()).toBe(false);
      });

      test('returns false if props.open is not boolean', () => {
        const wrapper = shallow(<ExpandingPanel open={1} />);
        expect(wrapper.instance().controlled()).toBe(false);
      });

      test('returns true if props.open is true', () => {
        const wrapper = shallow(<ExpandingPanel open={true} />);
        expect(wrapper.instance().controlled()).toBe(true);
      });

      test('returns true if props.open is false', () => {
        const wrapper = shallow(<ExpandingPanel open={false} />);
        expect(wrapper.instance().controlled()).toBe(true);
      });
    });

    describe('toggle()', () => {
      test('calls props.onToggle if controlled', () => {
        const fn = jest.fn();
        const instance = shallow(<ExpandingPanel onToggle={fn} open={true} />).instance();
        jest.spyOn(instance, 'setState');
        instance.toggle();
        expect(instance.setState.mock.calls.length).toBe(0);
        expect(fn.mock.calls.length).toBe(1);
      });

      test('calls setState if not controlled', () => {
        const instance = shallow(<ExpandingPanel />).instance();
        jest.spyOn(instance, 'setState');
        instance.toggle();
        expect(instance.setState.mock.calls[0][0]).toEqual({ open: true });
        instance.toggle();
        expect(instance.setState.mock.calls[1][0]).toEqual({ open: false });
      });
    });

    describe('isOpen()', () => {
      test('returns this.props.open if controlled', () => {
        const instance = shallow(<ExpandingPanel open={true} />).instance();
        expect(instance.isOpen()).toBe(true);
      });

      test('returns this.props.open if controlled', () => {
        const instance = shallow(<ExpandingPanel open={false} />).instance();
        expect(instance.isOpen()).toBe(false);
      });

      test('returns this.state.open if not controlled', () => {
        const instance = shallow(<ExpandingPanel />).instance();
        expect(instance.isOpen()).toBe(false);
      });

      test('returns this.state.open if not controlled', () => {
        const instance = shallow(<ExpandingPanel />).instance();
        instance.setState({ open: true });
        expect(instance.isOpen()).toBe(true);
      });
    });
  });
});
