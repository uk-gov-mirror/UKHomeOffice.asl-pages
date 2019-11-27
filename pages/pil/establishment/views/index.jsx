import React from 'react';
import { connect } from 'react-redux';
import { Snippet, OpenTaskWarning, ErrorSummary, Header, Form, Link } from '@asl/components';

const currentEstablishment = establishment => {
  return (
    <dl>
      <dt><strong>Current establishment</strong></dt>
      <dd>{establishment.name}</dd>
    </dl>
  );
};

const explainMissingEstablishments = () => {
  return (
    <details>
      <summary><Snippet>details.summary</Snippet></summary>
      <p><Snippet>details.expand</Snippet></p>
    </details>
  );
};

const Index = ({ establishment, schema, csrfToken }) => {
  return (
    <div className="govuk-grid-row pil-transfer">
      <div className="govuk-grid-column-two-thirds">
        <OpenTaskWarning />
        <ErrorSummary />

        <Header title={<Snippet>title</Snippet>} />
        <Snippet>description</Snippet>

        {
          schema.establishment.options.length < 1 &&
            <div className="no-option">
              { currentEstablishment(establishment) }
              { explainMissingEstablishments() }
              <Link page="pil.update" label="Back" className="govuk-button" />
            </div>
        }

        {
          schema.establishment.options.length === 1 &&
            <div className="single-option">
              <table className="govuk-table compare">
                <thead>
                  <tr>
                    <th>Current establishment</th>
                    <th>Proposed establishment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{establishment.name}</td>
                    <td><span className="highlight">{schema.establishment.options[0].label}</span></td>
                  </tr>
                </tbody>
              </table>
              { explainMissingEstablishments() }
              <form method="POST">
                <input type="hidden" name="_csrf" value={csrfToken} />
                <input type="hidden" name="establishment" value={schema.establishment.options[0].value} />
                <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
              </form>
            </div>
        }

        {
          schema.establishment.options.length > 1 &&
            <div className="multi-option">
              { currentEstablishment(establishment) }
              { explainMissingEstablishments() }
              <Form />
            </div>
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({
  static: { establishment, schema, csrfToken }
}) => ({
  establishment, schema, csrfToken
});

export default connect(mapStateToProps)(Index);
