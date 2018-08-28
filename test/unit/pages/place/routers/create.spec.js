import reqres from 'reqres';
import sinon from 'sinon';
import form from '../../../../../pages/place/create';

describe('Create Router', () => {
  let req;
  let res;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });

  describe('POST /confirm', () => {

    beforeEach(() => {
      req.method = 'post';
      req.path = '/confirm';
      req.model = { id: 'abc-123' };
      req.session = {
        'abc123': {
          values: {
            name: 'name',
            site: 'site',
            declaration: 'true'
          }
        }
      };
      req.api = sinon.stub().returns(Promise.resolve());
    });

    it('removes `declaration` property from form values', () => {
      form(req, res, () => {
        expect(req.api.calledOnce).toBe(true);
        const payload = req.api.lastCall.args[1].body;
        expect(payload).toEqual(JSON.stringify({ name: 'name', site: 'site' }));
      });
    });

  });
});
