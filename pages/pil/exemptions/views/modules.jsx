import React, { Component, Fragment } from 'react';
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

    // console.log('connectComponent schema begin');
    // console.log(JSON.stringify(schema));
    // console.log('connectComponent schema end');

    const p = {
      model,
      errors,
      schema: mapKeys(schema, (v, k) => `module-${key}-${k}`),
      modulesThatRequireSpecies
    };

    if (modulesThatRequireSpecies.includes(key)) {
      p.schema[`module-${key}-species`] = {
        inputType: 'select',
        options: species,
        label: content.fields.species.label
      };
    }

    // console.log('connectComponent p begin');
    // console.log(JSON.stringify(p));
    // console.log('connectComponent p end');

    return p;
  };

  return connect(mapStateToProps)(RepeatedFieldset);
};

class RepeatedFieldset extends Component {

  render () {

    // console.log('>>> FIELDSET PROPS BEGIN<<<');
    // console.log(this.props);
    // console.log('>>> FIELDSET PROPS END<<<');

    return (
      <Repeat {...this.props} />
    );
  }
}

class Repeat extends Component {
  constructor(options) {
    super(options);

    // console.log('>>> REPEAT PROPERTIES BEGIN<<<');
    // console.log(this.props);
    // console.log('>>> REPEAT PROPERTIES END<<<');

    this.state = {
      species: this.props.model[`module-${this.props.type}-species`] ? this.props.model[`module-${this.props.type}-species`] : []
    };

    // console.log('STATE BEGIN');
    // console.log(this.state);
    // console.log('STATE END');

    // I do not need to do that

    // this.state = {
    //   species:
    //   this.props.model.modules.reduce((species, key) => {
    //     species[key] = this.props.model[`module-${key}-species`];
    //     return species;
    //   }, {})
    // };

    this.addAnother = this.addAnother.bind(this);
    this.remove = this.remove.bind(this);
  }

  addAnother(e) {
    e.preventDefault();
    this.setState({
      species: [
        ...this.state.species,
        // ,
        // { id: uuid() }
        'Sheep (Ovis aries)'
      ]
    });
  }

  remove (id) {
    // console.log('remove');
    return e => {
      e.preventDefault();
      this.setState({
        authorisations: this.state.authorisations.filter(authorisation => authorisation.id !== id)
      });
    };
  }

  // onFieldsetChange(index) {
  onFieldsetChange() {

    // console.log('HELLO onFieldsetChange');

    // return (model) => {
    //   const { species } = this.state;
    //   this.setState({
    //     species: authorisations.map((authorisation, i) => {
    //       if (i === index) {
    //         return {
    //           ...authorisation,
    //           ...model
    //         };
    //       }
    //       return authorisation;
    //     })
    //   });
    // };
  }

  render () {
    // const { species } = this.state || this.props;
    const { model, modulesThatRequireSpecies, type } = this.props;

    // console.log('MODEL BEGIN');
    // console.log(model);
    // console.log('MODEL END');

    // console.log('modulesThatRequireSpecies BEGIN');
    // console.log(modulesThatRequireSpecies);
    // console.log('modulesThatRequireSpecies END');

    // console.log('TYPE BEGIN');
    // console.log(type);
    // console.log('TYPE END');

    const { schema } = this.props;

    // const species = model[`module-${type}-species`];

    const species = this.state.species || model[`module-${type}-species`];
    let newModel = {
      ...model
    };
    if (model[`module-${type}-species`]) {

      // console.log('species from state begin');
      // console.log(species);
      // console.log('species from state end');

      // console.log('model before concat begin');
      // console.log(model);
      // console.log('model before concat end');

      // console.log('I am looking at key begin');
      // console.log(`module-${type}-species`);
      // console.log('I am looking at key end');

      newModel[`module-${type}-species`] = species;

      console.log('model for fieldset begin');
      console.log(newModel);
      console.log('model for fieldset end');

    }

    // console.log('>>> SPECIES BEGIN<<<');
    // console.log(species);
    // console.log('>>> SPECIES END<<<');
    if (modulesThatRequireSpecies.includes(type)) {

      // console.log('THE MOMENT OF THE TRUTH BEGIN');
      // console.log({...this.props});
      // console.log('THE MOMENT OF THE TRUTH END');

      return <Fragment>
        {
        // model.modules.map((m, index) => {

        // if (modulesThatRequireSpecies.includes(m)) {
        // return (
        // <Inset key={authorisation.id} className="repeater">
        //   <div>
        //     {
        //       authorisations.length > 1 &&
        //       <a href="#" onClick={this.remove(authorisation.id)} className="remove">
        //         <Snippet>action.repeat.remove</Snippet>
        //       </a>
        //     }
        //     <h3><Snippet index={index + 1}>repeat.title</Snippet></h3>
        //   </div>

        //   <Fieldset
        //     {...this.props}
        //     model={mapKeys(authorisations[index], (val, key) => `authorisation-${authorisation.type}-${key}-${authorisation.id}`)}
        //     onChange={this.onFieldsetChange(index)}
        //     schema={
        //       mapKeys(
        //         mapValues(schema,
        //           (value, key) => ({
        //             ...value,
        //             label: <Snippet>{`fields.${key}.label`}</Snippet>
        //           })),
        //         (value, key) => `${key}-${authorisation.id}`
        //       )
        //     }
        //   />
        // </Inset>

        // <Inset key={index}>
          <Inset>
            <div className="govuk-grid-row add-another-item">
              <div className="govuk-grid-column-one-quarter">
                { species && species.length > 1 &&
                  <a href="#" onClick={this.remove(species)} className="remove">
                    <Snippet>action.repeat.remove</Snippet>
                  </a>
                }
              </div>
            </div>

            <Fieldset
              {...this.props}
              model={newModel}
              onChange={this.onFieldsetChange()}
              // schema={
              //   mapKeys(
              //     mapValues(schema,
              //       (value, key) => ({
              //         ...value,
              //         label: <Snippet>{`fields.${key}.label`}</Snippet>
              //       })),
              //     (value, key) => `${key}-${authorisation.id}`
              //   )
              // }
              schema = {schema}
            />
            {/* <AddAnother
              labelAdd={<Snippet>fields.species.add</Snippet>}
              labelRemove={<Snippet>fields.species.remove</Snippet>}
              totalCount={SPECIES_REVEAL_TOTAL_COUNT}
              visibleCount= {SPECIES_REVEAL_VISIBLE_COUNT}>
              <Select
                id={`module-${normalise(type)}-species`}
                name={`module-${type}-species`}
                label={<Snippet>{`fields.species.label`}</Snippet>}
                options={species}
              />
            </AddAnother> */}
            <div className="add-another">
              <a href="#" className="add-another-add" onClick={e => this.addAnother(e)}><Snippet>action.repeat.add</Snippet></a>
            </div>
          </Inset>

        // );
        // }
          // }
        }

        {/* <Button onClick={this.addAnother} className="button-secondary">
        <Snippet>action.repeat.add</Snippet>
      </Button> */}
      </Fragment>;
    }
    return null;
  }

}

const formatters = modulesThatRequireSpecies => {
  return {
    modules: {
      mapOptions: (op, b) => {
        const ConnectedComponent = connectComponent(op.value, modulesThatRequireSpecies);
        return {
          ...op,
          prefix: op.value,
          reveal: <ConnectedComponent type={op.value} />
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
