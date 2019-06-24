import React from 'react';
import mapKeys from 'lodash/mapKeys';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Inset,
  Fieldset,
  Header,
  AddAnother
} from '@asl/components';
import { Select } from '@ukhomeoffice/react-components';
import { species } from '@asl/constants';

import { normalise } from '../../../../lib/utils';
const content = require('../content/modules');
const SPECIES_REVEAL_TOTAL_COUNT = 10;
const SPECIES_REVEAL_VISIBLE_COUNT = 0;

const connectComponent = (key, modulesThatRequireSpecies) => {
  const mapStateToProps = ({ model, static: { schema, errors } }) => {
    schema = schema.modules.options.find(m => m.value === key).reveal;
    const s = {
      model,
      errors,
      schema: mapKeys(schema, (v, k) => `module-${key}-${k}`)
    };

    if (modulesThatRequireSpecies.includes(key)) {
      s.schema[`module-${key}-species`] = {
        inputType: 'select',
        options: species,
        label: content.fields.species.label
      };
    }
    return s;
  };

  return connect(mapStateToProps)(Fieldset);
};

const formatters = modulesThatRequireSpecies => {
  return {
    modules: {
      mapOptions: (op, b) => {
        const ConnectedComponent = connectComponent(op.value, modulesThatRequireSpecies);
        return {
          ...op,
          prefix: op.value,
          reveal: (
            <Inset><ConnectedComponent />
              { modulesThatRequireSpecies.includes(op.value) &&
                <AddAnother
                  labelAdd={<Snippet>fields.species.add</Snippet>}
                  labelRemove={<Snippet>fields.species.remove</Snippet>}
                  totalCount={SPECIES_REVEAL_TOTAL_COUNT}
                  visibleCount= {SPECIES_REVEAL_VISIBLE_COUNT}>
                  <Select
                    id={`module-${normalise(op.value)}-species`}
                    name={`module-${op.value}-species`}
                    label={<Snippet>{`fields.species.label`}</Snippet>}
                    options={species}
                  />
                </AddAnother> }
            </Inset>
          )
        };
      }
    }
  };
};

const Page = ({ modulesThatRequireSpecies }) => (
  <FormLayout formatters={formatters(modulesThatRequireSpecies)}>
    <Header title={<Snippet>title</Snippet>} />
  </FormLayout>
);

const mapStateToProps = ({ static: { modulesThatRequireSpecies } }) => ({ modulesThatRequireSpecies });

export default connect(mapStateToProps)(Page);
