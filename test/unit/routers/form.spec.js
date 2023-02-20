import { omit } from 'lodash';
import reqres from 'reqres';
import form from '../../../pages/common/routers/form';

describe('Form Router', () => {
  let req;
  let res;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });

  describe('GET', () => {
    beforeEach(() => {
      req.method = 'get';
      req.model = { id: 'test-model' };
    });

    describe('setup', () => {
      test('adds a form property to request containing values, schema and validationErrors', done => {
        const schema = {
          field: { options: [] }
        };
        const expected = {
          schema,
          validationErrors: {},
          values: {
            id: 'test-model'
          }
        };
        form({ schema })(req, res, () => {
          expect(req.form).toEqual(expected);
          done();
        });
      });

      test('adds the form data to the session', done => {
        form()(req, res, () => {
          expect(req.session.form['test-model']).toBeDefined();
          done();
        });
      });
    });

    describe('_processQuery', () => {
      test('calls cancelEdit if query contains clear', done => {
        req.query = {
          clear: true
        };
        const cancelEdit = jest.fn().mockImplementation((req, res, next) => next());
        form({ cancelEdit })(req, res, () => {
          expect(cancelEdit).toHaveBeenCalled();
          done();
        });
      });

      test('calls editAnswers if query contains edit', done => {
        req.query = {
          edit: true
        };
        const editAnswers = jest.fn().mockImplementation((req, res, next) => next());
        form({ editAnswers })(req, res, () => {
          expect(editAnswers).toHaveBeenCalled();
          done();
        });
      });
    });

    describe('_getValues', () => {
      let formRouter;
      beforeEach(() => {
        const schema = {
          field1: {},
          field2: {},
          field3: {}
        };
        req.model = {
          id: 'test-model',
          field1: 'value1',
          field2: 'value2',
          field3: 'value3'
        };
        formRouter = form({ schema });
      });

      test('sets req.form.values from values from model', done => {
        const expected = req.model;
        formRouter(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('extends model values with session values if set', done => {
        req.session = {
          form: {
            'test-model': {
              values: {
                field1: 'something'
              }
            }
          }
        };
        const expected = {
          id: 'test-model',
          field1: 'something',
          field2: 'value2',
          field3: 'value3'
        };
        formRouter(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('flattens nested values using accessor if provided', done => {
        const schema = {
          field1: {
            accessor: 'id'
          },
          field2: {
            accessor: 'nested.value'
          }
        };
        req.model = {
          field1: {
            id: 'an ID'
          },
          field2: {
            nested: {
              value: 'test'
            }
          }
        };
        const expected = {
          field1: 'an ID',
          field2: 'test'
        };
        form({ schema })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('does not extend virtual props based on session value if session is empty', done => {
        const schema = {
          props: {
            getValue: model => ['prop1', 'prop2'].filter(p => model[p])
          }
        };
        req.model = {
          prop1: true,
          prop2: false
        };
        const expected = {
          prop1: true,
          prop2: false,
          props: ['prop1']
        };
        form({ schema })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('extends virtual props based on session value if session is populated', done => {
        const schema = {
          props: {
            getValue: model => ['prop1', 'prop2'].filter(p => model[p])
          }
        };
        req.model = {
          id: 'test',
          prop1: true,
          prop2: false
        };
        req.session = {
          form: {
            test: {
              values: {
                prop1: true,
                prop2: true
              }
            }
          }
        };
        const expected = {
          id: 'test',
          prop1: true,
          prop2: true,
          props: ['prop1', 'prop2']
        };
        form({ schema })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

    });

    describe('_getValidationErrors', () => {
      test('sets req.form.validation errors from the session', done => {
        req.session = {
          form: {
            'test-model': {
              validationErrors: {
                field1: 'required'
              }
            }
          }
        };
        const expected = { field1: 'required' };
        form({ schema: { field1: {} } })(req, res, () => {
          expect(req.form.validationErrors).toEqual(expected);
          done();
        });
      });
      test('ignores errors from the session on fields that do not appear in the schema', done => {
        req.session = {
          form: {
            'test-model': {
              validationErrors: {
                field1: 'required',
                field2: 'required'
              }
            }
          }
        };
        const expected = { field1: 'required' };
        form({ schema: { field1: {} } })(req, res, () => {
          expect(req.form.validationErrors).toEqual(expected);
          done();
        });
      });
      test('includes errors from the session on fields that are revealed', done => {
        req.session = {
          form: {
            'test-model': {
              validationErrors: {
                field1: 'required',
                field2: 'required'
              }
            }
          }
        };
        const expected = { field1: 'required', field2: 'required' };
        form({ schema: { field1: { reveal: { field2: {} } } } })(req, res, () => {
          expect(req.form.validationErrors).toEqual(expected);
          done();
        });
      });
      test('includes unchanged form errors', done => {
        req.session = {
          form: {
            'test-model': {
              validationErrors: {
                form: 'unchanged'
              }
            }
          }
        };
        const expected = { form: 'unchanged' };
        form({ schema: { field1: {} } })(req, res, () => {
          expect(req.form.validationErrors).toEqual(expected);
          done();
        });
      });
    });

    describe('_locals', () => {
      test('assigns model and errors to res.locals', done => {
        req.model = {
          id: 'test-model',
          field: 'value'
        };
        res.locals.static = {};
        const errors = {
          field1: 'required'
        };
        req.session.form = {
          'test-model': {
            validationErrors: errors
          }
        };
        form({ schema: { field1: {} } })(req, res, () => {
          expect(res.locals.model).toEqual(req.model);
          expect(res.locals.static.errors).toEqual(errors);
          done();
        });
      });
    });
  });

  describe('POST', () => {
    beforeEach(() => {
      req.method = 'POST';
      req.model = { id: 'test-model' };
    });

    describe('setup', () => {
      test('adds a form property to request and sets up session', done => {
        form()(req, res, () => {
          expect(req.form).toBeDefined();
          expect(req.session.form['test-model']).toBeDefined();
          done();
        });
      });
    });

    describe('_clearErrors', () => {
      test('clears validation errors for model on post', done => {
        req.session.form = {
          'test-model': {
            validationErrors: {
              field1: 'required'
            }
          }
        };
        form()(req, res, () => {
          expect(req.session.form['test-model'].validationErrors).toBeUndefined();
          done();
        });
      });
    });

    describe('_process', () => {
      let schema;
      beforeEach(() => {
        schema = {
          field1: {},
          field2: {},
          field3: {}
        };
      });

      test('sets fields from req.body to req.form.values', done => {
        req.body = {
          field1: 'a value',
          field2: 'another value',
          field3: 'and another value'
        };
        const expected = req.body;
        form({ schema })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('only sets fields from schema', done => {
        req.body = {
          field1: '',
          field2: '',
          field3: '',
          extraField: ''
        };
        const expected = omit(req.body, 'extraField');
        form({ schema })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('trims whitespace', done => {
        req.body = {
          field1: '   A Value   ',
          field2: `  * a multiline string
          * should also be trimmed    `
        };
        const expected = {
          field1: 'A Value',
          field2: '* a multiline string\n* should also be trimmed'
        };
        form({ schema })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });

      test('applies formatters', done => {
        req.body = {
          field1: 'a value'
        };
        const expected = {
          field1: ['a value']
        };
        form({
          schema: {
            field1: {
              format: value => !Array.isArray(value) ? [value] : value
            }
          }
        })(req, res, () => {
          expect(req.form.values).toEqual(expected);
          done();
        });
      });
    });

    describe('_validate', () => {
      let formRouter;

      beforeEach(() => {
        const schema = {
          field1: {
            validate: ['required']
          },
          field2: {
            validate: [{ type: 'string' }]
          }
        };
        formRouter = form({ schema, checkChanged: true });
      });

      test('validates fields and sets errors to session', done => {
        req.body = {
          field1: null,
          field2: 123
        };
        const expected = {
          field1: 'required',
          field2: 'type'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        formRouter(req, res);
      });

      test('includes reveal fields', done => {
        const schema = {
          field1: {
            options: [
              {
                value: true,
                reveal: {
                  revealField: {
                    validate: 'required'
                  }
                }
              },
              {
                value: false
              }
            ]
          }
        };
        req.body = {
          field1: true
        };
        const expected = {
          revealField: 'required'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        form({ schema })(req, res);
      });

      test('includes fields within fieldset', done => {
        const schema = {
          fieldset1: {
            inputType: 'fieldset',
            fields: {
              field1: {
                inputType: 'inputText',
                validate: ['required']
              },
              field2: {
                inputType: 'inputText',
                validate: ['required']
              }
            }
          }
        };
        const expected = {
          field1: 'required',
          field2: 'required'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        form({ schema })(req, res);
      });

      test('includes fields from fieldset with reveal', done => {
        const schema = {
          fieldWithOptionsReveal: {
            options: [{
              value: 'valueWithReveal',
              reveal: {
                fieldset1: {
                  inputType: 'fieldset',
                  fields: {
                    field1: {
                      inputType: 'inputText',
                      validate: ['required']
                    },
                    field2: {
                      inputType: 'inputText',
                      validate: ['required']
                    }
                  }
                }
              }
            }]
          }
        };
        req.body = {
          fieldWithOptionsReveal: ['valueWithReveal']
        };
        const expected = {
          field1: 'required',
          field2: 'required'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        form({ schema })(req, res);
      });

      test('includes multiple reveal fields', done => {
        const schema = {
          field1: {
            options: [
              {
                value: 'first-val',
                reveal: {
                  reveal1: {
                    validate: 'required'
                  }
                }
              },
              {
                value: 'second-val',
                reveal: {
                  reveal2: {
                    validate: 'required'
                  }
                }
              },
              {
                value: 'third-val',
                reveal: {
                  reveal3: {
                    validate: 'required'
                  }
                }
              }
            ]
          },
          field2: {
            options: [
              {
                value: 'yes',
                reveal: {
                  reveal4: {
                    validate: 'required'
                  }
                }
              },
              {
                value: 'no'
              }
            ]
          }
        };
        req.body = {
          field1: ['first-val', 'third-val'],
          field2: 'yes'
        };
        const expected = {
          reveal1: 'required',
          reveal3: 'required',
          reveal4: 'required'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        form({ schema })(req, res);
      });

      test('persists form values to session', done => {
        req.body = {
          field1: null,
          field2: 123
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].values).toEqual(req.body);
            done();
          } catch (e) {
            done(e);
          }
        });
        formRouter(req, res);
      });

      test('throws a validation error if the form is submitted unchanged', done => {
        req.model = {
          id: 'test-model',
          field1: 'a value',
          field2: 'another value'
        };
        req.body = { ...req.model };
        const expected = {
          form: 'unchanged'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        formRouter(req, res);
      });

      test('throws a validation error if arrays contain the same values', done => {
        req.model = {
          id: 'test-model',
          field1: ['a value', 'another value']
        };
        req.body = {
          field1: ['another value', 'a value']
        };
        const expected = {
          form: 'unchanged'
        };
        res.redirect = jest.fn().mockImplementation(() => {
          try {
            expect(req.session.form['test-model'].validationErrors).toEqual(expected);
            done();
          } catch (e) {
            done(e);
          }
        });
        formRouter(req, res);
      });

      test('doesn\'t mutate the arrays', done => {
        req.model = {
          id: 'test-model',
          field1: ['a value', 'another value']
        };
        req.body = {
          field1: ['another value', 'a value', 'blah']
        };

        formRouter(req, res, () => {
          expect(req.session.form['test-model'].values.field1).toEqual(req.body.field1);
          done();
        });
      });
    });

    describe('_saveValues', () => {
      test('saves the values to the session', done => {
        const schema = {
          field1: {},
          field2: {}
        };
        req.body = {
          field1: 'test',
          field2: 'value'
        };
        form({ schema })(req, res, () => {
          expect(req.session.form['test-model'].values).toEqual(req.body);
          done();
        });
      });
    });
  });
});
