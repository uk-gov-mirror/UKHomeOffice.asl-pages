import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import {
  Accordion,
  ExpandingPanel,
  Snippet,
  Link,
  Header
} from '@asl/components';

const Index = ({
  establishment: {
    name,
    licenceNumber,
    address,
    authorisations,
    conditions,
    pelh,
    ...rest
  },
  url,
  ...props
}) => {

  const killing = authorisations.filter(({ type }) => type === 'killing');
  const rehomes = authorisations.filter(({ type }) => type === 'rehomes');

  return (
    <Fragment>
      <Header
        title={<Snippet>pages.establishment.read</Snippet>}
        subtitle={name}
      />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <dl>
            <dt><Snippet>establishmentLicenceNumber</Snippet></dt>
            <dd>{ licenceNumber }</dd>

            <dt><Snippet>address</Snippet></dt>
            <dd>{ address }</dd>

            <dt><Snippet>establishmentLicenceHolder</Snippet></dt>
            <dd><Link page="profile.view" profileId={ pelh.id } label={ pelh.name } /></dd>

            <dt><Snippet>licenced.title</Snippet></dt>
            <dd>
              <ul>
                {
                  ['procedures', 'breeding', 'supplying'].filter(auth => rest[auth]).map(auth =>
                    <li key={auth}><Snippet>{`licenced.${auth}`}</Snippet></li>
                  )
                }
              </ul>
            </dd>
          </dl>
          <Accordion>
            <ExpandingPanel title={<Snippet>conditions.title</Snippet>}>
              { conditions
                ? (
                  <Fragment>
                    <p><Snippet>conditions.hasConditions</Snippet></p>
                    <ReactMarkdown>{ conditions }</ReactMarkdown>
                  </Fragment>
                )
                : <p><Snippet>conditions.noConditions</Snippet></p>
              }
            </ExpandingPanel>
            {
              (!!killing.length || !!rehomes.length) && <ExpandingPanel title={<Snippet>authorisations.title</Snippet>}>
                {
                  !!killing.length && <Fragment>
                    <h2><Snippet>authorisations.killing.title</Snippet></h2>
                    <dl>
                      {
                        killing.map(({ method, description }, index) =>
                          <div key={index}>
                            <dt><Snippet>authorisations.killing.method</Snippet></dt>
                            <dd>{ method }</dd>

                            <dt><Snippet>authorisations.killing.applicableAnimals</Snippet></dt>
                            <dd>{ description }</dd>
                          </div>
                        )
                      }
                    </dl>
                  </Fragment>
                }
                {
                  !!rehomes.length && <Fragment>
                    <h2><Snippet>authorisations.rehoming.title</Snippet></h2>
                    <dl>
                      {
                        rehomes.map(({ method, description }, index) =>
                          <Fragment key={index}>
                            <dt><Snippet>authorisations.rehoming.circumstances</Snippet></dt>
                            <dd>{ method }</dd>

                            <dt><Snippet>authorisations.rehoming.applicableAnimals</Snippet></dt>
                            <dd>{ description }</dd>
                          </Fragment>
                        )
                      }
                    </dl>
                  </Fragment>
                }
              </ExpandingPanel>
            }
          </Accordion>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Index);
