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
    sort: row => row.country
  },
  car: {
    show: true,
    accessor: 'car.year'
  },
  animals: {
    show: true
  }
};
