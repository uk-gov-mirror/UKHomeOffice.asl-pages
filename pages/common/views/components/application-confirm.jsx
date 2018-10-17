import React from 'react';
import Form from '../containers/form';
import Snippet from '../containers/snippet';

const formatters = {
  declaration: {
    mapOptions: option => {
      return {
        ...option,
        reveal: (
          <button type="submit" className="govuk-button"><Snippet>actions.submit</Snippet></button>
        )
      };
    }
  }
};

export default () => (
  <Form
    formatters={formatters}
    className="application-confirm"
    model={{
      declaration: []
    }}
    submit={false}
  >
    <input type="hidden" name="action" value="submit-pil-application" />
  </Form>
);
