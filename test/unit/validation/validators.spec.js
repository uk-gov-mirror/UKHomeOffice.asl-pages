import moment from 'moment';
import sinon from 'sinon';
import validators from '../../../lib/validation/validators';

const doTest = (fieldName, value, params, type, expected, values, model, field) => {
  test(`testing '${value}' against ${params}`, () => {
    expect(validators[type](null, value, params, values, model, field)).toBe(expected);
  });
};

describe('validation', () => {
  describe('type', () => {
    describe('valid', () => {
      const values = [
        'A string value',
        [1, 2, 3],
        57,
        { an: 'Object' }
      ];

      const params = [
        'string',
        'array',
        'number',
        'object'
      ];

      values.forEach((value, index) => doTest(null, value, params[index], 'type', true));
    });

    describe('invalid', () => {
      const values = [
        'A string',
        [1, 2, 3],
        { a: 'b' },
        [1, 2, 3]
      ];

      const params = [
        'number',
        'string',
        'array',
        'object'
      ];

      values.forEach((value, index) => doTest(null, value, params[index], 'type', false));
    });
  });

  describe('maxLength', () => {
    describe('valid', () => {
      const values = [
        'A string value',
        [1, 2, 3],
        new Array(256).fill('.').join('')
      ];
      const params = [
        15,
        5,
        256
      ];
      values.forEach((value, index) => doTest(null, value, params[index], 'maxLength', true));
    });

    describe('invalid', () => {
      const values = [
        'A string value',
        [1, 2, 3],
        new Array(257).fill('.').join('')
      ];
      const validators = [
        5,
        2,
        256
      ];
      values.forEach((value, index) => doTest(null, value, validators[index], 'maxLength', false));
    });
  });

  describe('match', () => {
    describe('valid', () => {
      const values = [
        'A string value',
        '12345',
        'www.something.com/test'
      ];
      const params = [
        /^A string/,
        /\d/,
        /\/test$/
      ];
      values.forEach((value, index) => doTest(null, value, params[index], 'match', true));
    });

    describe('invalid', () => {
      const values = [
        'A string value',
        12345,
        ['A string']
      ];
      const validators = [
        /striing/,
        /\d/,
        /A string/
      ];
      values.forEach((value, index) => doTest(null, value, validators[index], 'match', false));
    });
  });

  describe('definedValues', () => {
    describe('valid', () => {
      const values = [
        'A string',
        ['a', 'b', 'c']
      ];
      const validators = [
        ['A string', 'something'],
        ['a', 'b', 'something', 'c']
      ];
      values.forEach((value, index) => doTest(null, value, validators[index], 'definedValues', true));
    });

    describe('invalid', () => {
      const values = [
        'Something else',
        ['a', 'b', 'c', 'd']
      ];
      const validators = [
        ['A string', 'Something'],
        ['a', 'something', 'b', 'c']
      ];
      values.forEach((value, index) => doTest(null, value, validators[index], 'definedValues', false));
    });
  });

  describe('required', () => {
    describe('valid', () => {
      const values = [
        0,
        false,
        'string'
      ];
      values.forEach(value => doTest(null, value, true, 'required', true));
    });

    describe('invalid', () => {
      const values = [
        '',
        null,
        undefined
      ];
      values.forEach(value => doTest(null, value, true, 'required', false));
    });
  });

  describe('dates', () => {

    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers({
        now: moment('2020-01-20').valueOf()
      });
    });

    afterEach(() => {
      clock.restore();
    });

    describe('isDateBefore/isDateAfter', () => {

      describe('can use a hardcoded date as a comparator', () => {
        const before = [
          '2019-01-01',
          '2018-12-31'
        ];
        const after = [
          '2019-01-03',
          '2020-01-01'
        ];
        describe('before', () => {
          before.forEach(value => doTest(null, value, '2019-01-02', 'dateIsBefore', true));
          before.forEach(value => doTest(null, value, '2019-01-02', 'dateIsAfter', false));
        });
        describe('after', () => {
          after.forEach(value => doTest(null, value, '2019-01-02', 'dateIsBefore', false));
          after.forEach(value => doTest(null, value, '2019-01-02', 'dateIsAfter', true));
        });
      });

      describe('can use a dynamic date as a comparator', () => {
        // current date is mocked to 2010-01-20
        const before = [
          '2020-01-14'
        ];
        const after = [
          '2020-01-16'
        ];
        describe('before', () => {
          before.forEach(value => doTest(null, value, () => moment().subtract(5, 'days'), 'dateIsBefore', true));
          before.forEach(value => doTest(null, value, () => moment().subtract(5, 'days'), 'dateIsAfter', false));
        });
        describe('after', () => {
          after.forEach(value => doTest(null, value, () => moment().subtract(5, 'days'), 'dateIsBefore', false));
          after.forEach(value => doTest(null, value, () => moment().subtract(5, 'days'), 'dateIsAfter', true));
        });
      });

      describe('can use "now" as a shortcut to the current date as a comparator', () => {
        // current date is mocked to 2010-01-20
        const before = [
          '2020-01-19'
        ];
        const after = [
          '2020-01-21'
        ];
        describe('before', () => {
          before.forEach(value => doTest(null, value, 'now', 'dateIsBefore', true));
          before.forEach(value => doTest(null, value, 'now', 'dateIsAfter', false));
        });
        describe('after', () => {
          after.forEach(value => doTest(null, value, 'now', 'dateIsBefore', false));
          after.forEach(value => doTest(null, value, 'now', 'dateIsAfter', true));
        });
      });

    });

  });

  describe('exclusive', () => {
    describe('should be valid with only exclusive behaviour', () => {
      const values = { mandatory: 'yes' };
      const field = {
        options: [
          {
            value: 'yes',
            behaviour: 'exclusive'
          },
          {
            value: 'exemption'
          },
          {
            value: 'delay'
          }
        ]
      };
      doTest(null, 'yes', null, 'exclusive', true, values, null, field);
    });

    describe('should be valid with non exclusive values', () => {
      const values = { mandatory: ['delay', 'exemption'] };
      const field = {
        options: [
          {
            value: 'yes',
            behaviour: 'exclusive'
          },
          {
            value: 'exemption'
          },
          {
            value: 'delay'
          }
        ]
      };
      doTest(null, ['delay', 'exemption'], null, 'exclusive', true, values, null, field);
    });

    describe('should be invalid with exclusive and non exclusive values', () => {
      const values = { mandatory: ['yes', 'delay'] };
      const field = {
        options: [
          {
            value: 'yes',
            behaviour: 'exclusive'
          },
          {
            value: 'exemption'
          },
          {
            value: 'delay'
          }
        ]
      };
      doTest(null, ['yes', 'delay'], null, 'exclusive', false, values, null, field);
    });
  });
});
