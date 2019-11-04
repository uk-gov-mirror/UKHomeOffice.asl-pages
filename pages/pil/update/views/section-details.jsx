import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplyChanges,
  ModelSummary,
  Completable,
  Link
} from '@asl/components';

const SectionDetails = ({
  models = [],
  establishment = null,
  removeLink = true,
  addOrEdit = 'add',
  url,
  page,
  name,
  schema,
  completed,
  formatters = {}
}) => (
  <Completable
    page={page}
    label={<Snippet>{`pil.${name}.title`}</Snippet>}
    completed={completed}
  >
    {
      name === 'establishment' && establishment &&
        <p>{establishment.name}</p>
    }
    {
      models.map((model, index) => {
        if (model.accreditingBody === 'Other' && model.otherAccreditingBody) {
          model.accreditingBody = model.otherAccreditingBody;
        }

        return (
          <div className="govuk-grid-row" key={index}>
            <div className="govuk-grid-column-three-quarters">
              <ModelSummary className="section-data" model={model} schema={schema} formatters={formatters} />
            </div>
            <div className="actions govuk-grid-column-one-quarter">
              {
                removeLink && (
                  <ApplyChanges
                    type="form"
                    method="POST"
                    action={`${url}/${name}/${model.id}?action=delete&referrer=${url}`}
                  >
                    <button className="link">
                      <span><Snippet>actions.remove</Snippet></span>
                    </button>
                  </ApplyChanges>
                )
              }
            </div>
          </div>
        );
      })
    }
    {
      !!models.length && <Link
        page={page}
        label={<Snippet>{`actions.${addOrEdit}`}</Snippet>}
      />
    }
  </Completable>
);

const mapStateToProps = ({ static: { url } }) => ({ url });

export default connect(mapStateToProps)(SectionDetails);
