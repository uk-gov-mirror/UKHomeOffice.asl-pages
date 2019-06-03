import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { ProfileLink } from '../../components';

import {
  Accordion,
  ExpandingPanel,
  Snippet,
  Header,
  LicenceStatusBanner,
  Form
} from '@asl/components';

class Index extends Component {
  constructor(options) {
    super(options);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    this.setState({
      editing: false
    })
  }

  toggleEdit(e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    const {
      establishment,
      asruUser,
      ...props
    } = this.props;

    const { editing } = this.state || {}

    const killing = establishment.authorisations.filter(({ type }) => type === 'killing');
    const rehomes = establishment.authorisations.filter(({ type }) => type === 'rehomes');

    return (
      <Fragment>
        <LicenceStatusBanner licence={establishment} licenceType="pel" />

        <Header
          title={<Snippet>pages.establishment.read</Snippet>}
          subtitle={establishment.name}
        />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <dl>
              <dt><Snippet>establishmentLicenceNumber</Snippet></dt>
              <dd>{ establishment.licenceNumber }</dd>

              <dt><Snippet>address</Snippet></dt>
              <dd>{ establishment.address }</dd>

              {
                establishment.pelh && <ProfileLink type="pelh" profile={establishment.pelh} />
              }
              {
                establishment.nprc && <ProfileLink type="nprc" profile={establishment.nprc} />
              }
              <dt><Snippet>licenced.title</Snippet></dt>
              <dd>
                <ul>
                  {
                    ['procedure', 'breeding', 'supplying'].filter(auth => establishment[auth]).map(auth =>
                      <li key={auth}><Snippet>{`licenced.${auth}`}</Snippet></li>
                    )
                  }
                </ul>
              </dd>
            </dl>
            <Accordion>
              <ExpandingPanel title={<Snippet>conditions.title</Snippet>}>
                { establishment.conditions
                  ? (
                    <Fragment>
                      <p><Snippet>conditions.hasConditions</Snippet></p>
                      {
                        editing
                          ? <Form />
                          : (
                            <Fragment>
                              <ReactMarkdown>{ establishment.conditions }</ReactMarkdown>
                              {
                                asruUser && <a href="#" onClick={this.toggleEdit}>Update conditions</a>
                              }
                            </Fragment>
                          )
                      }

                    </Fragment>
                  )
                  : (
                    <Fragment>
                      <p><Snippet>conditions.noConditions</Snippet></p>
                      {
                        asruUser && <a href="#" onClick={this.toggleEdit}>Add conditions</a>
                      }
                    </Fragment>
                  )
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
    )
  }
}

const mapStateToProps = ({ static: { establishment, asruUser } }) => ({ establishment, asruUser });

export default connect(mapStateToProps)(Index);
