import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  ErrorSummary,
  Header,
  Snippet,
  WidthContainer,
  Fieldset
} from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import RTEFieldset from '@asl/projects/client/components/fieldset';

const commentsSchema = {
  comments: {
    inputType: 'textarea'
  }
};

const FormBody = ({ fields, values, formFields, setValue, submit, project }) => (
  <Fragment>
    <WidthContainer>
      <dl>
        <dt>Current PPL holder</dt>
        <dd>{`${project.licenceHolder.firstName} ${project.licenceHolder.lastName}`}</dd>
      </dl>
      { formFields }
    </WidthContainer>
    <RTEFieldset
      fields={fields}
      values={values}
      altLabels={true}
      noComments={true}
      onFieldChange={setValue}
    />
    {
      Object.keys(values).filter(key => !['licenceHolderId', 'experience-projects', 'comments'].includes(key)).map(key => (
        <input key={key} type="hidden" name={key} value={values[key]} />
      ))
    }
    {
      project.status === 'active' && !project.isLegacyStub && <Fieldset model={values} schema={commentsSchema} />
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
            project={project}
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
