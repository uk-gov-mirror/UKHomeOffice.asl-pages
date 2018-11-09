import React from 'react';
import {
  Snippet,
  FormLayout,
  Inset,
  AddAnother
} from '@asl/components';
import { Select } from '@ukhomeoffice/react-components';
import { species } from '@asl/constants';

const SPECIES_REVEAL_TOTAL_COUNT = 10;
const SPECIES_REVEAL_VISIBLE_COUNT = 1;

const formatters = {
  modules: {
    mapOptions: (op, b) => {
      return {
        ...op,
        prefix: op.value,
        reveal: (
          <Inset>
            <AddAnother label={<Snippet>fields.species.add</Snippet>}
              totalCount={SPECIES_REVEAL_TOTAL_COUNT}
              visibleCount= {SPECIES_REVEAL_VISIBLE_COUNT}>
              <Select
                name={`module-${op.value}-species`}
                label={<Snippet>{`fields.species.label`}</Snippet>}
                options={species}
              />
            </AddAnother>
          </Inset>
        )
      };
    }
  }
};

const Page = () => (
  <FormLayout formatters={formatters}>
    <header>
      <h1>
        <Snippet>title</Snippet>
      </h1>
    </header>
  </FormLayout>
);

export default Page;
