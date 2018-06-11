import validate from '../../../lib/validation';

describe('validate', () => {
  test('validates a single field', () => {
    const fields = {
      site: {
        value: 'A site',
        validate: [
          {
            type: 'type',
            params: 'number'
          }
        ]
      }
    };
    const expected = { site: 'type' };
    expect(validate(fields)).toEqual(expected);
  });

  test('uses the first error found if multiple', () => {
    const fields = {
      site: {
        value: 1,
        validate: [
          {
            type: 'type',
            params: 'string'
          },
          {
            type: 'match',
            params: /\s/
          }
        ]
      }
    };
    const expected = { site: 'type' };
    expect(validate(fields)).toEqual(expected);
  });

  test('validates multiple fields', () => {
    const fields = {
      site: {
        value: 'A site',
        validate: [
          {
            type: 'match',
            params: /^Another string/
          }
        ]
      },
      options: {
        value: [1, 2, 3],
        validate: [
          {
            type: 'definedValues',
            params: [1, 3, 4]
          }
        ]
      }
    };
    const expected = { site: 'match', options: 'definedValues' };
    expect(validate(fields)).toEqual(expected);
  });

  test('validates multiple errors on multiple fields', () => {
    const fields = {
      site: {
        value: 'Another string',
        validate: [
          {
            type: 'match',
            params: /^A string/
          },
          {
            type: 'maxLength',
            parms: 10
          }
        ]
      },
      options: {
        value: [1, 2, 3, 4, 5],
        validate: [
          {
            type: 'definedValues',
            params: [1, 2, 4, 5, 6]
          },
          {
            type: 'maxLength',
            params: 4
          }
        ]
      }
    };
    const expected = { site: 'match', options: 'definedValues' };
    expect(validate(fields)).toEqual(expected);
  });

  test('returns an empty object if all validators pass', () => {
    const fields = {
      site: {
        value: 'A site',
        validate: [
          {
            type: 'type',
            params: 'string'
          },
          {
            type: 'match',
            params: /^A site/
          }
        ]
      },
      options: {
        value: [1, 2, 3],
        validate: [
          {
            type: 'definedValues',
            params: [1, 2, 3, 4, 5]
          }
        ]
      }
    };
    const expected = {};
    expect(validate(fields)).toEqual(expected);
  });
});
