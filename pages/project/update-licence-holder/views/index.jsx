import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  ErrorSummary,
  Header,
  Snippet,
  WidthContainer
} from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import Fieldset from '@asl/projects/client/components/fieldset';

const FormBody = ({ fields, values, formFields, setValue, submit }) => (
  <Fragment>
    <WidthContainer>{ formFields }</WidthContainer>
    <Fieldset
      fields={fields}
      values={values}
      altLabels={true}
      noComments={true}
      onFieldChange={setValue}
    />
    {
      Object.keys(values).filter(key => !['licenceHolder', 'experience-projects'].includes(key)).map(key => (
        <input key={key} type="hidden" name={key} value={values[key]} />
      ))
    }
    <Button>
      <Snippet>buttons.submit</Snippet>
    </Button>
  </Fragment>
);

class UpdateLicenceHolder extends Component {
  constructor(options) {
    super(options);
    this.state = {
      values: this.props.model
    };
    this.setValue = this.setValue.bind(this);
  }

  setValue(key, value) {
    this.setState({
      values: {
        ...this.state.values,
        [key]: value
      }
    });
  }

  render() {
    const { values } = this.state;
    const { fields, project } = this.props;
    return (
      <Fragment>
        <ErrorSummary />
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={project.title || 'Untitled project'}
        />
        <Form detachFields submit={false}>
          <FormBody
            fields={fields}
            values={values}
            setValue={this.setValue}
          />
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ model, static: { fields, project } }) => ({ model, fields, project });

export default connect(mapStateToProps)(UpdateLicenceHolder);
