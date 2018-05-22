import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumbs, { Breadcrumb } from 'views/components/breadcrumbs';

describe('<Breadcrumbs />', () => {
  test('returns null when crumbs undefined', () => {
    const wrapper = shallow(<Breadcrumbs />);
    expect(wrapper.html()).toBe(null);
  });

  test('returns null when crumbs is empty array', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={[]} />);
    expect(wrapper.html()).toBe(null);
  });

  test('returns null when crumbs is not an array', () => {
    const wrapper = shallow(<Breadcrumbs crumbs={'A crumb'} />);
    expect(wrapper.html()).toBe(null);
  });

  describe('with one crumb', () => {
    const crumbs = ['A crumb'];
    const wrapper = shallow(<Breadcrumbs crumbs={crumbs} />);

    test('renders 2 <Breadcrumb /> elements', () => {
      expect(wrapper.find(Breadcrumb).length).toBe(2);
    });

    test('passes a home link crumb to the first <Breadcrumb />', () => {
      const el = wrapper.find(Breadcrumb).first();
      expect(el.props().crumb).toEqual({ href: '/', label: 'Home' });
    });

    test('passes a label crumb to the last <Breadcrumb />', () => {
      const el = wrapper.find(Breadcrumb).last();
      expect(el.props().crumb).toBe('A crumb');
    });
  });

  describe('with many crumbs', () => {
    const crumbs = [
      { href: '/page-1', label: 'Page 1' },
      { href: '/page-1/child-page', label: 'Child Page' },
      'A crumb'
    ];
    const wrapper = shallow(<Breadcrumbs crumbs={crumbs} />);

    test('renders 4 <Breadcrumb /> elements', () => {
      expect(wrapper.find(Breadcrumb).length).toBe(4);
    });

    test('passes a home link crumb to the first <Breadcrumb />', () => {
      const el = wrapper.find(Breadcrumb).first();
      expect(el.props().crumb).toEqual({ href: '/', label: 'Home' });
    });

    test('passes a label crumb to the last <Breadcrumb />', () => {
      const el = wrapper.find(Breadcrumb).last();
      expect(el.props().crumb).toBe('A crumb');
    });

    test('passes an intermediate link crumb to the second <Breadcrumb />', () => {
      const el = wrapper.find(Breadcrumb).at(1);
      expect(el.props().crumb).toEqual(crumbs[0]);
    });

    test('passes an intermediate link crumb to the third <Breadcrumb />', () => {
      const el = wrapper.find(Breadcrumb).at(2);
      expect(el.props().crumb).toBe(crumbs[1]);
    });
  });
});
