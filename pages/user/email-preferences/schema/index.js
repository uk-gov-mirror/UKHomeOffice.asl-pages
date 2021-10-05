const { toArray } = require('../../../../lib/utils');

module.exports = profile => {
  const alertOptions = [
    {
      value: 'pil',
      label: 'all personal licences and applications'
    },
    {
      value: 'ppl',
      label: 'all project licences and applications',
      hint: 'Includes endorsement requests'
    },
    {
      value: 'pel',
      label: 'establishment licence'
    }
  ];

  const alertsField = {
    inputType: 'checkboxGroup',
    options: alertOptions,
    nullValue: [],
    format: toArray,
    validate: [
      {
        definedValues: alertOptions.map(o => o.value)
      }
    ]
  };

  const alertsSchema = profile.establishments.reduce((schema, establishment) => {
    if (establishment.role === 'admin') {
      schema[`alerts-${establishment.id}`] = {
        label: establishment.name,
        ...alertsField
      };
    }
    return schema;
  }, {});

  return {
    projectCollaborations: {
      label: '',
      inputType: 'checkboxGroup',
      options: [
        {
          value: true,
          label: 'Get alerts for licences or applications you\'re invited to collaborate on'
        }
      ]
    },
    ...alertsSchema
  };
};
