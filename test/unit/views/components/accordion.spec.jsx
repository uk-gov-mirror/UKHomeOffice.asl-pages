import React from 'react';
import { shallow } from 'enzyme';
import Accordion from 'views/components/accordion';

const renderAccordion = () => shallow(
  <Accordion>
    {
      [1, 2, 3].map(el => <div className="child" key={el}>{el}</div>)
    }
  </Accordion>
);

describe('<Accordion />', () => {
  test('renders child elements adding onToggle and open props', () => {
    const wrapper = renderAccordion();
    wrapper.find('.child').forEach(child => {
      expect(child.prop('open')).toBe(false);
      expect(child.prop('onToggle')).toBeInstanceOf(Function);
    });
  });

  test('passes the open state to children', () => {
    const wrapper = renderAccordion();
    wrapper.instance().setState({ open: [true, false, true] });
    wrapper.update();
    const children = wrapper.find('.child');
    expect(children.at(0).prop('open')).toBe(true);
    expect(children.at(1).prop('open')).toBe(false);
    expect(children.at(2).prop('open')).toBe(true);
  });

  test('renders a button which calls toggleAll on click', () => {
    const wrapper = renderAccordion();
    const instance = wrapper.instance();
    jest.spyOn(instance, 'toggleAll');
    wrapper.find('button').simulate('click');
    expect(instance.toggleAll.mock.calls.length).toBe(1);
  });

  describe('methods', () => {
    test('toggle(i)', () => {
      const instance = renderAccordion().instance();
      jest.spyOn(instance, 'setState');
      instance.toggle(0);
      expect(instance.setState.mock.calls[0][0]).toEqual({ open: [true, false, false] });
      instance.toggle(0);
      instance.toggle(1);
      expect(instance.setState.mock.calls[0][0]).toEqual({ open: [false, true, false] });
      instance.toggle(0);
      instance.toggle(2);
      expect(instance.setState.mock.calls[0][0]).toEqual({ open: [true, true, true] });
    });

    test('allOpen', () => {
      const instance = renderAccordion().instance();
      expect(instance.allOpen()).toBe(false);
      instance.setState({ open: [false, true, true] });
      expect(instance.allOpen()).toBe(false);
      instance.setState({ open: [true, true, true] });
      expect(instance.allOpen()).toBe(true);
    });

    test('toggleAll', () => {
      const instance = renderAccordion().instance();
      jest.spyOn(instance, 'setState');
      instance.allOpen = jest.fn();
      instance.allOpen.mockReturnValue(true);
      instance.toggleAll();
      expect(instance.setState.mock.calls[0][0]).toEqual({ open: [false, false, false] });
      instance.allOpen.mockReturnValue(false);
      instance.toggleAll();
      expect(instance.setState.mock.calls[1][0]).toEqual({ open: [true, true, true] });
    });
  });
});
