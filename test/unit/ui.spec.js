import UI from '../../ui';

describe('ui', () => {

  test('can initialise without error', () => {
    expect(() => UI({})).not.toThrow();
  });

});
