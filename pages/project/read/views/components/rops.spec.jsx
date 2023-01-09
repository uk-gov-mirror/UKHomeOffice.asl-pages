import React from 'react';
import { shallow } from 'enzyme';
import { Rops, Rop } from './rops';
import moment from 'moment';

describe('<Rops />', () => {
  test('renders a rop per year', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-12-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(2);
  });

  test('does not render rop for the current year if not past 1st feb', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        expiryDate: new Date('2025-01-31'),
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-01-31')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(1);
  });

  test('renders a rop for the current year if past 1st feb', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-02-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(2);
  });

  test('renders rop for the current year if project is expired and not past 1st feb', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        expiryDate: new Date('2022-01-30 23:59:59'),
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-01-31')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(2);
  });

  test('renders rop for the current year if project is revoked and not past 1st feb', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        revocationDate: new Date('2022-01-30 23:59:59'),
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-01-31')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(2);
  });

  test('renders an active rop per unsubmitted year', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        rops: [{
          year: 2021,
          status: 'draft'
        },
        {
          year: 2022,
          status: 'draft'
        }]
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-02-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    const rops = wrapper.find(Rop);
    expect(rops.length).toBe(2);
    expect(rops.get(0).props.rop.status).toBe('draft');
    expect(rops.get(0).props.rop.year).toBe(2021);
    expect(rops.get(0).props.active).toBe(true);

    expect(rops.get(1).props.rop.status).toBe('draft');
    expect(rops.get(1).props.rop.year).toBe(2022);
    expect(rops.get(0).props.active).toBe(true);
  });

  test('renders an inactive rop per submitted year', () => {
    const props = {
      ropsYears: [2020, 2021, 2022],
      project: {
        rops: [
        {
          year: 2020,
          status: 'submitted'
        },
        {
          year: 2021,
          status: 'draft'
        },
        {
          year: 2022,
          status: 'draft'
        }]
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-02-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    const rops = wrapper.find(Rop);

    expect(rops.length).toBe(3);

    expect(rops.get(0).props.rop.status).toBe('draft');
    expect(rops.get(0).props.rop.year).toBe(2021);
    expect(rops.get(0).props.active).toBe(true);

    expect(rops.get(1).props.rop.status).toBe('draft');
    expect(rops.get(1).props.rop.year).toBe(2022);
    expect(rops.get(1).props.active).toBe(true);

    expect(rops.get(2).props.rop.status).toBe('submitted');
    expect(rops.get(2).props.rop.year).toBe(2020);
    expect(rops.get(2).props.active).toBe(undefined);
  });

  test('renders an active for last years ROP if in first half of the year', () => {
    const props = {
      ropsYears: [2020, 2021, 2022],
      project: {
        rops: [
        {
          year: 2020,
          status: 'submitted'
        },
        {
          year: 2021,
          status: 'submitted'
        },
        {
          year: 2022,
          status: 'draft'
        }]
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-02-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    const rops = wrapper.find(Rop);

    expect(rops.length).toBe(3);

    expect(rops.get(0).props.rop.status).toBe('submitted');
    expect(rops.get(0).props.rop.year).toBe(2021);
    expect(rops.get(0).props.active).toBe(true);

    expect(rops.get(1).props.rop.status).toBe('draft');
    expect(rops.get(1).props.rop.year).toBe(2022);
    expect(rops.get(1).props.active).toBe(true);

    expect(rops.get(2).props.rop.status).toBe('submitted');
    expect(rops.get(2).props.rop.year).toBe(2020);
    expect(rops.get(2).props.active).toBe(undefined);
  });

  test('renders an active for last years ROP if in first half of the year', () => {
    const props = {
      ropsYears: [2020, 2021, 2022],
      project: {
        rops: [
        {
          year: 2020,
          status: 'submitted'
        },
        {
          year: 2021,
          status: 'submitted'
        },
        {
          year: 2022,
          status: 'draft'
        }]
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-08-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    const rops = wrapper.find(Rop);

    expect(rops.length).toBe(3);

    expect(rops.get(0).props.rop.status).toBe('draft');
    expect(rops.get(0).props.rop.year).toBe(2022);
    expect(rops.get(0).props.active).toBe(true);

    expect(rops.get(1).props.rop.status).toBe('submitted');
    expect(rops.get(1).props.rop.year).toBe(2020);
    expect(rops.get(1).props.active).toBe(undefined);

    expect(rops.get(2).props.rop.status).toBe('submitted');
    expect(rops.get(2).props.rop.year).toBe(2021);
    expect(rops.get(2).props.active).toBe(undefined);

  });
});
