import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../../pages/common/views/components/pagination';
import ApplyChanges from '../../../../pages/common/views/containers/apply-changes';

describe('<Pagination />', () => {

  test('renders 1-5 page links with the first selected when on page 1', () => {
    const props = {
      page: 0,
      totalPages: 10,
      limit: 10,
      count: 96
    };
    const container = shallow(<Pagination {...props}/>);
    const labels = container.find(ApplyChanges);
    expect(labels.at(1).prop('label')).toBe(1);
    expect(labels.at(2).prop('label')).toBe(2);
    expect(labels.at(3).prop('label')).toBe(3);
    expect(labels.at(4).prop('label')).toBe(4);
    expect(labels.at(5).prop('label')).toBe(5);
    expect(labels.at(1).prop('className')).toContain('current');
    expect(labels.at(2).prop('className')).not.toContain('current');
    expect(labels.at(3).prop('className')).not.toContain('current');
    expect(labels.at(4).prop('className')).not.toContain('current');
    expect(labels.at(5).prop('className')).not.toContain('current');
  });

  test('renders 3-7 page links with the middle page selected when on page 5 of 10', () => {
    const props = {
      page: 4,
      totalPages: 10,
      limit: 10,
      count: 96
    };
    const container = shallow(<Pagination {...props}/>);
    const labels = container.find(ApplyChanges);
    expect(labels.at(1).prop('label')).toBe(3);
    expect(labels.at(2).prop('label')).toBe(4);
    expect(labels.at(3).prop('label')).toBe(5);
    expect(labels.at(4).prop('label')).toBe(6);
    expect(labels.at(5).prop('label')).toBe(7);
    expect(labels.at(1).prop('className')).not.toContain('current');
    expect(labels.at(2).prop('className')).not.toContain('current');
    expect(labels.at(3).prop('className')).toContain('current');
    expect(labels.at(4).prop('className')).not.toContain('current');
    expect(labels.at(5).prop('className')).not.toContain('current');
  });

  test('renders 6-10 page links with the last page selected when on page 10 of 10', () => {
    const props = {
      page: 9,
      totalPages: 10,
      limit: 10,
      count: 96
    };
    const container = shallow(<Pagination {...props}/>);
    const labels = container.find(ApplyChanges);
    expect(labels.at(1).prop('label')).toBe(6);
    expect(labels.at(2).prop('label')).toBe(7);
    expect(labels.at(3).prop('label')).toBe(8);
    expect(labels.at(4).prop('label')).toBe(9);
    expect(labels.at(5).prop('label')).toBe(10);
    expect(labels.at(1).prop('className')).not.toContain('current');
    expect(labels.at(2).prop('className')).not.toContain('current');
    expect(labels.at(3).prop('className')).not.toContain('current');
    expect(labels.at(4).prop('className')).not.toContain('current');
    expect(labels.at(5).prop('className')).toContain('current');
  });

});
