const { toArray } = require('../../../../lib/utils');

module.exports = profile => {
  const alertOptions = [
    {
      value: 'pil',
      label: 'all personal licences'
    },
    {
      value: 'ppl',
      label: 'all project licences',
      hint: 'This includes endorsement requests'
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

  const newsletterOptions = [
    {
      value: 'operational',
      label: 'Yes, I want to receive ASRU’s operational newsletter'
    }
  ];

  const newsletterSchema = {
    newsletters: {
      inputType: 'checkboxGroup',
      options: newsletterOptions,
      nullValue: [],
      format: toArray,
      validate: [
        {
          definedValues: newsletterOptions.map(o => o.value)
        }
      ]
    }
  };

  // HOLCs must receive newsletter
  const canUnsubscribeNewsletter = !profile.roles.some(r => r.type === 'holc');

  return {
    ...alertsSchema,
    ...canUnsubscribeNewsletter ? newsletterSchema : {}
  };
};
