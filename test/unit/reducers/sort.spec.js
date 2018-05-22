import sortReducer, { getSortedData } from 'reducers/sort';
import schema from '../fixtures/schema';
import data from '../fixtures/data';

describe('sortReducer', () => {
  test('returns the correct initial state', () => {
    const expected = {
      column: '',
      ascending: true
    };

    expect(sortReducer(undefined, {})).toEqual(expected);
  });

  describe('SET_SORT_COLUMN', () => {
    test('sets column to provided value, and ascending to true if previous column state is \'\'', () => {
      const initialState = { column: '', ascending: true };
      const action = { type: 'SET_SORT_COLUMN', column: 'a column' };
      const expected = { column: 'a column', ascending: true };

      expect(sortReducer(initialState, action)).toEqual(expected);
    });

    test('sets column to provided value, and ascending to true if previous column is different from new column', () => {
      const initialState = { column: 'a column', ascending: true };
      const action = { type: 'SET_SORT_COLUMN', column: 'b column' };
      const expected = { column: 'b column', ascending: true };

      expect(sortReducer(initialState, action)).toEqual(expected);
    });

    test('sets column to provided value, and ascending to false if previous column is the same as new column', () => {
      const initialState = { column: 'a column', ascending: true };
      const action = { type: 'SET_SORT_COLUMN', column: 'a column' };
      const expected = { column: 'a column', ascending: false };

      expect(sortReducer(initialState, action)).toEqual(expected);
    });
  });

  describe('SET_SORT', () => {
    test('sets state to provided value', () => {
      const sort = { column: 'a column', ascending: false };
      const action = { type: 'SET_SORT', sort };

      expect(sortReducer(undefined, action)).toEqual(sort);
    });
  });
});

describe('getSortedData', () => {
  const state = {
    data,
    schema
  };

  test('sorts on text fields', () => {
    const sort = {
      column: 'name',
      ascending: true
    };
    expect(getSortedData({ ...state, sort })).toEqual([
      data[0],
      data[2],
      data[5],
      data[1],
      data[3],
      data[4]
    ]);
  });

  test('sorts in descending order', () => {
    const sort = {
      column: 'name',
      ascending: false
    };
    expect(getSortedData({ ...state, sort })).toEqual([
      data[4],
      data[3],
      data[1],
      data[5],
      data[2],
      data[0]
    ]);
  });

  test('sorts on numerical fields', () => {
    const sort = {
      column: 'id',
      ascending: true
    };

    expect(getSortedData({ ...state, sort })).toEqual([
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5]
    ]);
  });

  test('sorts on nested fields', () => {
    const sort = {
      column: 'car',
      ascending: true
    };
    expect(getSortedData({ ...state, sort })).toEqual([
      data[2],
      data[1],
      data[4],
      data[0],
      data[3],
      data[5]
    ]);
  });

  test('sorts using custom sort methods', () => {
    const sort = {
      column: 'address',
      ascending: true
    };
    expect(getSortedData({ ...state, sort })).toEqual([
      data[0],
      data[2],
      data[5],
      data[1],
      data[4],
      data[3]
    ]);
  });
});
