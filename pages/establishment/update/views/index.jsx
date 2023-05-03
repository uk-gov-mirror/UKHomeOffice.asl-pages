import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import { v4 as uuid } from 'uuid';
import {
  Snippet,
  FormLayout,
  Header,
  Inset,
  Fieldset
} from '@ukhomeoffice/asl-components';
import { Button } from '@ukhomeoffice/react-components';
import InProgressWarning from '../../../common/components/in-progress-warning';

const connectComponent = value => {
  const mapStateToProps = ({ model, static: { schema, errors } }) => {
    schema = schema.authorisationTypes.options.find(authorisation => authorisation.value === value).reveal;
    return {
      model,
      errors,
      schema: mapKeys(schema, (v, k) => `authorisation-${value}-${k}`)
    };
  };

  return connect(mapStateToProps)(RepeatedFieldset);
};

class RepeatedFieldset extends Component {
  render () {
    return (
      <Repeat {...this.props} authorisations={this.props.model.authorisations.filter(a => a.type === this.props.type)} />
    );
  }
}

class Repeat extends Component {
  constructor(options) {
    super(options);

    this.state = {
      authorisations: this.props.authorisations.length
        ? this.props.authorisations
        : [{ id: uuid() }]
    };

    this.addAnother = this.addAnother.bind(this);
    this.remove = this.remove.bind(this);
  }

  addAnother(e) {
    e.preventDefault();
    this.setState({
      authorisations: [
        ...this.state.authorisations,
        { id: uuid() }
      ]
    });
  }

  remove (id) {
    return e => {
      e.preventDefault();
      this.setState({
        authorisations: this.state.authorisations.filter(authorisation => authorisation.id !== id)
      });
    };
  }

  render () {
    const { authorisations } = this.state || this.props;
    const { schema } = this.props;

    return <Fragment>
      {
        authorisations.map((authorisation, index) => {
          return (
            <Inset key={authorisation.id} className="repeater">
              <div>
                {
                  authorisations.length > 1 &&
                  <a href="#" onClick={this.remove(authorisation.id)} className="remove">
                    <Snippet>action.repeat.remove</Snippet>
                  </a>
                }
                <h3><Snippet index={index + 1}>repeat.title</Snippet></h3>
              </div>

              <Fieldset
                {...this.props}
                model={mapKeys(authorisations[index], (val, key) => `authorisation-${authorisation.type}-${key}-${authorisation.id}`)}
                schema={
                  mapKeys(
                    mapValues(schema,
                      (value, key) => ({
                        ...value,
                        label: <Snippet>{`fields.${key}.label`}</Snippet>
                      })),
                    (value, key) => `${key}-${authorisation.id}`
                  )
                }
              />
            </Inset>
          );
        })
      }

      <Button onClick={this.addAnother} className="button-secondary">
        <Snippet>action.repeat.add</Snippet>
      </Button>
    </Fragment>;
  }
}

const formatters = {
  authorisationTypes: {
    mapOptions: op => {
      const ConnectedComponent = connectComponent(op.value);
      return {
        ...op,
        prefix: op.value,
        reveal: <ConnectedComponent type={op.value} />
      };
    }
  }
};

const Page = ({ establishment }) => {
  if (establishment.openTasks.length && !get(establishment, 'openTasks[0].editable')) {
    return <InProgressWarning task={establishment.openTasks[0]} />;
  }

  return (
    <FormLayout formatters={formatters} openTasks={establishment.openTasks}>
      <Header title={<Snippet>pages.establishment.edit</Snippet>} />
    </FormLayout>
  );
};

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Page);
