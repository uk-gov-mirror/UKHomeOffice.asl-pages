import React from 'react';
import { shallow } from 'enzyme';
import Diff from '../../../../pages/common/views/components/diff';

describe('<Diff />', () => {
  test('renders a table row for each field', () => {
    const diff = {
      name: { oldValue: '', newValue: 'Sterling Archer' },
      codename: { oldValue: '', newValue: 'Duchess' },
      age: { oldValue: null, newValue: 36 }
    };
    const container = shallow(<Diff diff={diff}/>);
    expect(container.find('tbody tr').length).toBe(3);
  });

  test('applies formatters if present', () => {
    const diff = {
      name: { oldValue: '', newValue: 'Sterling Archer' }
    };
    const formatters = {
      name: { format: value => value.toUpperCase() }
    };
    const container = shallow(<Diff diff={diff} formatters={formatters} />);
    expect(container.find('tbody tr td').last().text()).toBe('STERLING ARCHER');
  });

  test('adds a highlight if a value has changed', () => {
    const diff = {
      name: { oldValue: '', newValue: 'Sterling Archer' },
      codename: { oldValue: '', newValue: '' }
    };
    const container = shallow(<Diff diff={diff} />);
    expect(container
      .find('tbody tr span')
      .first()
      .prop('className')
    ).toBe('highlight');
    expect(container
      .find('tbody tr span')
      .last()
      .prop('className')
    ).toBe('');
  });

  test('adds a doesn\'t add a highlight class if comparing falsy values', () => {
    const diff = {
      name: { oldValue: null, newValue: '' }
    };
    const container = shallow(<Diff diff={diff} />);
    expect(container
      .find('tbody tr span')
      .prop('className')
    ).toBe('');
  });

  test('renders a hyphen if value is falsy', () => {
    const diff = {
      name: { oldValue: null, newValue: '' }
    };
    const container = shallow(<Diff diff={diff} />);
    expect(container.find('tbody tr td').at(1).text()).toBe('-');
    expect(container.find('tbody tr td').at(2).text()).toBe('-');
  });
});
