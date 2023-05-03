import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplyChanges,
  ModelSummary,
  Completable,
  Link
} from '@ukhomeoffice/asl-components';

const SectionDetails = ({
  models = [],
  removeLink = true,
  addOrEdit = 'add',
  canTransferPil = false,
  url,
  page,
  name,
  schema,
  completed,
  modelTitle,
  addLink,
  formatters = {},
  template
}) => (
  <Completable
    page={page}
    label={<Snippet>{`pil.${name}.title`}</Snippet>}
    completed={completed}
  >
    {
      template || (
        <Fragment>
          {
            models.map((model, index) => {
              if (model.accreditingBody === 'Other' && model.otherAccreditingBody) {
                model.accreditingBody = model.otherAccreditingBody;
              }

              return (
                <div className="govuk-grid-row" key={index}>
                  <div className="govuk-grid-column-three-quarters">
                    {
                      modelTitle && modelTitle(index)
                    }
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
        </Fragment>
      )
    }
    {
      !!models.length &&
        <Link
          page={page}
          label={addLink || <Snippet>{`actions.${addOrEdit}`}</Snippet>}
        />
    }
    {
      name === 'establishment' && canTransferPil &&
        <Link
          page="pil.update.establishment"
          label={<Snippet>{`actions.edit`}</Snippet>}
        />
    }
  </Completable>
);

const mapStateToProps = ({ static: { url } }) => ({ url });

export default connect(mapStateToProps)(SectionDetails);
