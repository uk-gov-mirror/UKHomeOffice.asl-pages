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
      url: 'http://localhost:8080/'
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(2);
  });

  test('renders a single rop if not past 1st feb', () => {
    const props = {
      ropsYears: [2021],
      project: {
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-01-31')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(1);
  });

  test('renders a rop for next year if past 1st feb', () => {
    const props = {
      ropsYears: [2021],
      project: {
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2022-02-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(2);
  });

  test('doesn\'t render an extra rop if ropsYears updated', () => {
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

  test('renders a third rop if past 1st feb the following year', () => {
    const props = {
      ropsYears: [2021, 2022],
      project: {
        rops: []
      },
      url: 'http://localhost:8080/',
      today: new Date('2023-02-01')
    };
    const wrapper = shallow(<Rops {...props} />);
    expect(wrapper.find(Rop).length).toBe(3);
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
});
