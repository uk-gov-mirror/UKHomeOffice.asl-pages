import React, { Component, Fragment } from 'react';
import mapKeys from 'lodash/mapKeys';
import { connect } from 'react-redux';
import { Button } from '@ukhomeoffice/react-components';
import {
  Snippet,
  FormLayout,
  Inset,
  Fieldset,
  Header
} from '@asl/components';

import { species } from '@asl/constants';

const content = require('../content/modules');

const connectComponent = key => {
  const mapStateToProps = ({ model, static: { schema, errors, modulesThatRequireSpecies } }) => {
    schema = schema.modules.options.find(m => m.value === key).reveal;
    const props = {
      model,
      errors,
      option: key,
      schema: mapKeys(schema, (v, k) => `module-${key}-${k}`),
      modulesThatRequireSpecies
    };

    return props;
  };

  return connect(mapStateToProps)(RepeatedFieldset);
};

const speciesOptions = {
  inputType: 'select',
  options: species,
  label: content.fields.species.label
};

class RepeatedFieldset extends Component {

  constructor(options) {
    super(options);

    this.state = {
      items: this.props.model[`module-${this.props.type}-species`]
        ? this.props.model[`module-${this.props.type}-species`]
        : ['']
    };
  }

  addItem(e) {
    e.preventDefault();
    this.setState({
      items: [ ...this.state.items, '' ]
    });
  }

  removeItem (index, e) {
    e.preventDefault();
    this.setState({
      items: this.state.items.filter((item, i) => {
        return i !== index;
      })
    });

  }

  updateItem(index) {
    return val => {
      this.setState({
        items: this.state.items.map((item, i) => {
          if (i === index) {
            return Object.values(val)[0];
          }
          return item;
        })
      });
    };
  }

  render() {
    const { schema, modulesThatRequireSpecies, option } = this.props;
    const { items } = this.state;

    return (
      <Fragment>
        <Fieldset schema={schema} model={this.props.model} />
        {
          modulesThatRequireSpecies.includes(option) && (
            <Fragment>
              {
                items.map((item, index) => {
                  const fieldName = `module-${option}-species-${index}`;
                  return (
                    <Fragment key={index}>
                      {
                        index > 0 && (
                          <p>
                            <Button className="link" onClick={e => this.removeItem(index - 1, e)}>Remove item</Button>
                          </p>
                        )
                      }
                      <Fieldset
                        schema={{ [fieldName]: speciesOptions }}
                        onChange={this.updateItem(index)}
                        model={{ [fieldName]: item }}
                      />
                    </Fragment>
                  );
                })
              }
              <p>
                <a href="#" className="add-another-add" onClick={e => this.addItem(e)}><Snippet>action.repeat.add</Snippet></a>
              </p>
            </Fragment>
          )
        }

      </Fragment>
    );
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
          reveal: <Inset>
            <ConnectedComponent type={op.value} />
          </Inset>
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
