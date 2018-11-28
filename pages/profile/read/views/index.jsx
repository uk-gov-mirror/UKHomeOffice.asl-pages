import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { defineValue } from '../../../common/formatters';
import {
  Accordion,
  ExpandingPanel,
  Snippet,
  Link,
  Header
} from '@asl/components';
import PilApply from './pil-apply';
import { dateFormat } from '../../../../constants';

const getPremises = roles => {
  if (!roles) {
    return null;
  }
  const nacwo = roles.find(role => role.type === 'nacwo');
  if (!nacwo) {
    return null;
  }

  const mapAreas = val => {
    return flow(
      groupBy('area'),
      mapValues(p => p.map(place => place.name))
    )(val);
  };

  return flow(
    groupBy('site'),
    mapValues(mapAreas)
  )(nacwo.places);
};

const Index = ({
  isUser,
  model: {
    name,
    pil,
    certifications,
    address,
    postcode,
    telephone,
    email,
    roles,
    projects,
    trainingModules,
    id
  },
  establishment: {
    name: establishmentName,
    id: estId,
    role: estRole
  },
  ...props
}) => {
  const formatDate = date => format(date, dateFormat.medium);
  const premises = getPremises(roles);
  const hasNacwoCertifications = roles.length > 0 && roles.find(role => role.type === 'nacwo') && certifications;
  return (
    <Fragment>
      <article className='profile govuk-grid-row'>
        <div className='govuk-grid-column-two-thirds'>
          <Header title={name} />
          <dl className="inline">
            <dt><Snippet>establishment</Snippet></dt>
            <dd>{establishmentName}</dd>
            {
              pil && pil.licenceNumber && (
                <Fragment>
                  <dt><Snippet>licenceNumber</Snippet></dt>
                  <dd>{pil.licenceNumber}</dd>
                </Fragment>
              )
            }
          </dl>
          <PilApply pil={pil} />
          <Accordion>
            {
              (!isEmpty(roles) || !isEmpty(premises)) && (
                <ExpandingPanel title="Responsibilities">
                  <dl className="inline">
                    {
                      !isEmpty(roles) && (
                        <Fragment>
                          <dt><Snippet>roles</Snippet></dt>
                          <dd>
                            <ul>
                              {
                                roles.map(({ type, id }) =>
                                  <li key={id}>{defineValue(type.toUpperCase())}</li>
                                )
                              }
                            </ul>

                          </dd>
                        </Fragment>
                      )
                    }
                    {
                      !isEmpty(premises) && (
                        <Fragment>
                          <dt><Snippet>premises</Snippet></dt>
                          <dd>
                            <ul>
                              {
                                map(premises, (p, site) =>
                                  <li key={site}>
                                    {site}
                                    {
                                      map(p, (names, area) =>
                                        <Fragment key={area}>
                                          {
                                            area !== 'null'
                                              ? <Fragment>, {area} - <br /></Fragment>
                                              : <Fragment> - <br /></Fragment>
                                          }
                                          {
                                            names.join(', ')
                                          }
                                        </Fragment>
                                      )
                                    }
                                  </li>
                                )
                              }
                            </ul>
                          </dd>
                        </Fragment>
                      )
                    }
                  </dl>
                </ExpandingPanel>
              )
            }
            {
              projects && projects.length > 0 && (
                <ExpandingPanel title={<Snippet>projects.title</Snippet>}>
                  <dl className="inline">
                    <dt><Snippet>projects.projectTitles</Snippet></dt>
                    <dd>
                      <dl>
                        {
                          projects.map(project =>
                            <Fragment key={project.id}>
                              <dt>
                                <Link page="project.list" label={project.title} />
                              </dt>
                              <dd>
                                <span><Snippet licenceNumber={project.licenceNumber}>projects.licenceNumber</Snippet></span>
                              </dd>
                              <dd>
                                <span><Snippet expiryDate={format(project.expiryDate, dateFormat.medium)}>projects.expiryDate</Snippet></span>
                              </dd>
                            </Fragment>
                          )
                        }
                      </dl>
                    </dd>
                  </dl>
                </ExpandingPanel>
              )
            }
            {
              (hasNacwoCertifications || !isEmpty(trainingModules)) && (
                <ExpandingPanel title={<Snippet>training.title</Snippet>}>
                  {
                    hasNacwoCertifications && (
                      <dl className="inline">
                        <dt><Snippet>training.nacwo</Snippet></dt>
                        <dd>{certifications}</dd>
                      </dl>
                    )
                  }
                  {
                    !isEmpty(trainingModules) && (
                      <dl className="inline">
                        <dt><Snippet>training.modulesTitle</Snippet></dt>
                        <dd>
                          <dl>
                            {
                              map(trainingModules, (module, index) =>
                                <Fragment key={index}>
                                  <dt><Snippet module={module.module}>training.module</Snippet></dt>
                                  <dd>
                                    {
                                      module.species && (
                                        <Fragment>{module.species}<br /></Fragment>
                                      )
                                    }
                                    <Snippet date={formatDate(module.passDate)}>training.dateCompleted</Snippet>
                                  </dd>
                                </Fragment>
                              )
                            }
                          </dl>
                        </dd>
                      </dl>
                    )
                  }
                </ExpandingPanel>
              )
            }
            {
              (address || telephone || email) && (
                <ExpandingPanel title={<Snippet>contactDetails.title</Snippet>}>
                  <dl className="inline">
                    {
                      address && (
                        <Fragment>
                          <dt><Snippet>contactDetails.professionalAddress</Snippet></dt>
                          <dd>{address}<br />{postcode}</dd>
                        </Fragment>
                      )
                    }
                    {
                      telephone && (
                        <Fragment>
                          <dt><Snippet>contactDetails.telephone</Snippet></dt>
                          <dd>{telephone}</dd>
                        </Fragment>
                      )
                    }
                    {
                      email && (
                        <Fragment>
                          <dt><Snippet>contactDetails.email</Snippet></dt>
                          <dd><a href={`mailto:${email}`}>{email}</a></dd>
                        </Fragment>
                      )
                    }
                  </dl>
                </ExpandingPanel>
              )
            }
          </Accordion>
          <Fragment>
            <dl className="inline">
              <dt>Permission level</dt>
              <dd>{estRole}</dd>
              <dd><Link page="profile.permission" establishmentId={estId} label={<Snippet>pages.profile.permission.change</Snippet>} /></dd>
            </dl>
          </Fragment>
        </div>
      </article>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment, isUser }, model }) => ({ establishment, model, isUser });

module.exports = connect(mapStateToProps)(Index);
