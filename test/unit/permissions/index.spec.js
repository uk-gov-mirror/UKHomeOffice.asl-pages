import { can } from '../../../lib/permissions';

describe('can', () => {
  let user;

  beforeEach(() => {
    user = {
      get: jest.fn(),
      is: jest.fn()
    };
  });

  test('Rejects with an error if task is unknown', () => {
    const task = 'unknown.task';
    const expected = 'Unknown task: unknown.task';
    return can(user, task)
      .catch(err => {
        expect(err.message).toBe(expected);
      });
  });

  test('Inspector can view all establishments', () => {
    const task = 'establishment.list';
    user.is.mockReturnValueOnce(true);
    return can(user, task)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(true);
      });
  });

  test('Inspector can view any establishment', () => {
    const task = 'establishment.read';
    const params = { id: '123' };
    user.is.mockReturnValueOnce(true);
    user.get.mockReturnValueOnce('321');
    return can(user, task, params)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(true);
      });
  });

  test('User cannot view all establishments', () => {
    const task = 'establishment.list';
    user.is.mockReturnValueOnce(false);
    return can(user, task)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(false);
      });
  });

  test('User cannot view an establishment if they are not associated', () => {
    const task = 'establishment.read';
    const params = { id: '123' };
    user.is.mockReturnValueOnce(false);
    user.get.mockReturnValueOnce('321');
    return can(user, task, params)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(false);
      });
  });

  test('User can view their own establishment', () => {
    const task = 'establishment.read';
    const params = { id: '123' };
    user.is.mockReturnValueOnce(false);
    user.get.mockReturnValueOnce('123');
    return can(user, task, params)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(true);
      });
  });
});
