import { can } from '../../../lib/permissions';

describe('can', () => {
  let user;

  beforeEach(() => {
    user = {
      get: jest.fn(),
      is: jest.fn()
    };
  });

  test('Rejects with an error if task is unknown', done => {
    const task = 'unknown.task';
    const expected = 'Unknown task: unknown.task';
    can(user, task)
      .catch(err => {
        expect(err.message).toBe(expected);
        done();
      });
  });

  test('Inspector can view all establishments', done => {
    const task = 'establishment.list';
    user.is.mockReturnValueOnce(true);
    can(user, task)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(true);
        done();
      })
      .catch(done);
  });

  test('Inspector can view any establishment', done => {
    const task = 'establishment.read';
    const params = { id: '123' };
    user.is.mockReturnValueOnce(true);
    user.get.mockReturnValueOnce('321');
    can(user, task, params)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(true);
        done();
      })
      .catch(done);
  });

  test('User cannot view all establishments', done => {
    const task = 'establishment.list';
    user.is.mockReturnValueOnce(false);
    can(user, task)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(false);
        done();
      })
      .catch(done);
  });

  test('User cannot view an establishment if they are not associated', done => {
    const task = 'establishment.read';
    const params = { id: '123' };
    user.is.mockReturnValueOnce(false);
    user.get.mockReturnValueOnce('321');
    can(user, task, params)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(false);
        done();
      })
      .catch(done);
  });

  test('User can view their own establishment', done => {
    const task = 'establishment.read';
    const params = { id: '123' };
    user.is.mockReturnValueOnce(false);
    user.get.mockReturnValueOnce('123');
    can(user, task, params)
      .then(authorised => {
        expect(user.is).toBeCalledWith('inspector');
        expect(authorised).toBe(true);
        done();
      })
      .catch(done);
  });
});
