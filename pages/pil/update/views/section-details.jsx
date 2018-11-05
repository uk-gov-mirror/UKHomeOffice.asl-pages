import React from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import ApplyChanges from '../../../common/views/containers/apply-changes';
import ModelSummary from '../../../common/views/components/model-summary';
import Completable from '../../../common/views/components/completable';
import Link from '../../../common/views/containers/link';

const SectionDetails = ({
  models = [],
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
      models.map((model, index) =>
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
      )
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
