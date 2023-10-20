import viewSchema from '../../../../../pages/task/schema/view';

describe('Next steps hints should be model specific', () => {
  const buildStubTaskWithModel = (model) => ({
    data: {model},
    type: 'application',
    nextSteps: [
      {id: 'resolved'}
    ]
  });

  test('When next steps for a PIL task are displayed, show the basic hint by default', () => {
    const schema = viewSchema(buildStubTaskWithModel('pil'));

    expect(schema.status.options).toContainEqual({
      value: 'resolved',
      label: 'Grant licence',
      hint: 'A new licence will be granted.'
    });
  });

  test('When next steps for a project task are displayed, show the HBA upload hint', () => {
    const schema = viewSchema(buildStubTaskWithModel('project'));

    expect(schema.status.options).toContainEqual({
      value: 'resolved',
      label: 'Grant licence',
      hint: 'Upload the harm benefit analysis and a new licence will be granted.'
    });
  });
});
