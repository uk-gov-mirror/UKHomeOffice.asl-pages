import { isEmpty, map, chain } from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import dictionary from '@asl/dictionary';

const getPremises = roles => {
  if (!roles) {
    return null;
  }
  const nacwo = roles.find(role => role.type === 'nacwo');
  if (!nacwo) {
    return null;
  }
  return chain(nacwo.places)
    .groupBy('site')
    .mapValues(v => chain(v)
      .groupBy('area')
      .mapValues(p => p.map(place => place.name))
      .value()
    )
    .value();
};

const Index = ({
  profile: {
    name,
    pil,
    qualifications,
    address,
    postcode,
    telephone,
    email,
    roles
  },
  establishment: {
    name: establishmentName
  },
  ...props
}) => {
  const premises = getPremises(roles);
  return (
    <App {...props}>
      <article className='profile grid-row'>
        <div className='column-two-thirds'>
          <header>
            <h2>&nbsp;</h2>
            <h1>{ name }</h1>
          </header>

          <dl>
            <dt>Establishment name</dt>
            <dd>{establishmentName}</dd>
            {
              pil && pil.licenceNumber && (
                <Fragment>
                  <dt>Licence Number</dt>
                  <dd>{pil.licenceNumber}</dd>
                </Fragment>
              )
            }
          </dl>

          {
            (qualifications || premises || !isEmpty(roles)) && (
              <section className='profile-section'>
                <h3>Profile</h3>
                <dl>
                  {
                    !isEmpty(roles) && (
                      <Fragment>
                        <dt>Roles</dt>
                        <dd>
                          <ul>
                            {
                              roles.map(({ type, id }) =>
                                <li key={id}>{dictionary[type] || dictionary[type.toUpperCase()]} ({type.toUpperCase()})</li>
                              )
                            }
                          </ul>

                        </dd>
                      </Fragment>
                    )
                  }
                  {
                    qualifications && (
                      <Fragment>
                        <dt>Qualifications</dt>
                        <dd>{qualifications}</dd>
                      </Fragment>
                    )
                  }
                  {
                    premises && (
                      <Fragment>
                        <dt>Premises</dt>
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
              </section>
            )
          }
          {
            (address || telephone || email) && (
              <section className='profile-section'>
                <h3>Contact Details</h3>
                <dl>
                  {
                    address && (
                      <Fragment>
                        <dt>Professional Address</dt>
                        <dd>{address}<br />{postcode}</dd>
                      </Fragment>
                    )
                  }
                  {
                    telephone && (
                      <Fragment>
                        <dt>Telephone</dt>
                        <dd>{telephone}</dd>
                      </Fragment>
                    )
                  }
                  {
                    email && (
                      <Fragment>
                        <dt>Email Address</dt>
                        <dd><a href={`mailto:${email}`}>{email}</a></dd>
                      </Fragment>
                    )
                  }
                </dl>
              </section>
            )
          }
        </div>
      </article>
    </App>
  );
};

const mapStateToProps = ({ establishment, profile }) => ({ establishment, profile });

module.exports = connect(mapStateToProps)(Index);
