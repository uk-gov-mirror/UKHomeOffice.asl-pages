import { get } from 'lodash';

export default {
  id: {},
  name: {
    show: true
  },
  email: {
    show: true
  },
  phoneNumber: {
    show: true
  },
  address: {
    show: true,
    accessor(row) {
      return get(row, 'country');
    }
  },
  car: {
    show: true,
    accessor: 'car.year'
  },
  animals: {
    show: true
  }
};
