import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Inset,
  AddAnother
} from '@asl/components';
import { Select } from '@ukhomeoffice/react-components';
import { species } from '@asl/constants';

import { normalise } from '../../../../lib/utils';

const SPECIES_REVEAL_TOTAL_COUNT = 10;
const SPECIES_REVEAL_VISIBLE_COUNT = 1;

const formatters = modulesThatRequireSpecies => {
  return {
    modules: {
      mapOptions: op => {
        return {
          ...op,
          prefix: op.value,
          reveal: modulesThatRequireSpecies.includes(op.value) ? (
            <Inset>
              <AddAnother label={<Snippet>fields.species.add</Snippet>}
                totalCount={SPECIES_REVEAL_TOTAL_COUNT}
                visibleCount= {SPECIES_REVEAL_VISIBLE_COUNT}>
                <Select
                  id={`module-${normalise(op.value)}-species`}
                  name={`module-${op.value}-species`}
                  label={<Snippet>{`fields.species.label`}</Snippet>}
                  options={species}
                />
              </AddAnother>
            </Inset>
          ) : null
        };
      }
    }
  };
};

const Page = ({ modulesThatRequireSpecies }) => (
  <FormLayout formatters={formatters(modulesThatRequireSpecies)}>
    <header>
      <h1>
        <Snippet>title</Snippet>
      </h1>
    </header>
  </FormLayout>
);

const mapStateToProps = ({ static: { modulesThatRequireSpecies } }) => ({ modulesThatRequireSpecies });

export default connect(mapStateToProps)(Page);
